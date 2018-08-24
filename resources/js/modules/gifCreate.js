import GIF from '../../gif.js/dist/gif';
import EventEmitter from 'events';

export default class Gif extends EventEmitter {
  constructor() {
    super();
    this.$input = document.querySelector('#myImage');
    this.$preview = document.getElementById('preview');
    this.newImage = document.querySelectorAll('#preview');
    this.image = document.querySelectorAll('img.input');
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    this.renderImg = document.querySelector('img.render');
    this.contentWidth = 500;
    this.contentHeight = 500;
    this.url = '';
    this.images = [];
    this.gifSrc = '';

    this.frame = new Array(
      'images/frame0.png',
      'images/frame1.png',
      'images/frame2.png',
      'images/frame3.png',
      'images/frame4.png',
      'images/frame5.png',
      'images/frame6.png',
      'images/frame7.png',
      'images/frame8.png',
      'images/frame9.png',
      'images/frame10.png',
      'images/frame11.png',
      'images/frame12.png',
      'images/frame13.png',
      'images/frame14.png',
      'images/frame15.png'
    );
    this.newFrame = {};
    this.frameIndex = 0;

    this.gif = new GIF({
      debug: true, //consoleを出力するかどうか
      workers: 2, //一度にスタートさせる量
      repeat: 0, //gifをリピートさせるかどうか
      workerScript: './js/gif.worker.js',
      background: '#fff', //背景色
      quality: 5, //クオリティ
      width: 500,
      height: 500
    });

    this.addEvent();
  }

  /**
   * イベントまとめたもの
   */
  addEvent() {
    this.$input.addEventListener(
      'change',
      e => {
        this.inputImage(e);
      },
      false
    );

    this.on('inputImage', () => {
      this.createImage();
    });

    this.on('createImages', () => {
      this.downloadFrame();
    });
  }

  //canvasに作ったgifをおく
  createImage() {
    this.canvas.width = this.contentWidth;
    this.canvas.height = this.contentHeight;
    this.createImages.onload = () => {
      console.log(this.createImages);
      this.context.drawImage(this.createImages, 0, 0, 500, 500);
      this.emit('createImages');
    };
  }

  /**
   * 画像をアップする
   * @param {*} e
   */
  inputImage(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      this.createImages = new Image();
      reader.onload = e => {
        this.createImages.src = e.target.result;
        this.emit('inputImage');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  /**
   * 画像フレームのプリロード
   */
  downloadFrame() {
    const frameLength = this.frame.length;
    for (let i = 0; i < frameLength; i++) {
      this.newFrame[i] = new Image();
      this.newFrame[i].src = this.frame[i];
      this.newFrame[i].onload = () => {
        this.frameIndex++;
        if (this.frameIndex === frameLength) {
          this.createGif();
        }
      };
    }
  }

  /**
   * gifを作成する
   */
  createGif() {
    for (let i = 0; i < 16; i++) {
      const width = 500 - 33 * i;
      const centerPoint = 250 - width / 2;
      const alpha = (10 - i * 0.6) / 10;
      this.context.clearRect(0, 0, this.contentWidth, this.contentHeight);
      this.context.drawImage(this.createImages, centerPoint, centerPoint, width, width);
      this.context.drawImage(this.newFrame[i], 0, 0, 500, 500);
      this.context.globalAlpha = alpha;
      this.gif.addFrame(this.canvas, {
        delay: 100,
        copy: true
      });
    }

    this.gif.on('finished', blob => {
      this.renderImg.src = URL.createObjectURL(blob);
      this.canvas.style = 'display:none';
    });
    this.gif.render();
  }
}
