import GIF from '../../gif.js/dist/gif';
import EventEmitter from 'events';
import EXIF from 'exif-js';

//画像データの変換
const base64ToArrayBuffer = base64 => {
  base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, '');
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
export default class Gif extends EventEmitter {
  constructor() {
    super();
    this.$input = document.querySelector('#myImage');
    this.resizeImage = document.querySelector('.resize');
    this.$preview = document.getElementById('preview');
    this.newImage = document.querySelectorAll('#preview');
    this.image = document.querySelectorAll('img.input');
    this.$exif = document.querySelectorAll('.exif');
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    this.renderImg = document.querySelector('img.render');
    this.contentWidth = 600;
    this.contentHeight = 400;
    this.url = '';
    this.images = [];
    this.gifSrc = '';

    this.frame = new Array(
      'images/frame2/frame2-0.png',
      'images/frame2/frame2-1.png',
      'images/frame2/frame2-2.png',
      'images/frame2/frame2-3.png',
      'images/frame2/frame2-4.png',
      'images/frame2/frame2-5.png',
      'images/frame2/frame2-6.png',
      'images/frame2/frame2-7.png',
      'images/frame2/frame2-8.png',
      'images/frame2/frame2-9.png',
      'images/frame2/frame2-10.png',
      'images/frame2/frame2-11.png',
      'images/frame2/frame2-12.png',
      'images/frame2/frame2-13.png',
      'images/frame2/frame2-14.png',
      'images/frame2/frame2-15.png'
    );
    this.newFrame = {};
    this.frameIndex = 0;
    this.rotate = 0;

    this.gif = new GIF({
      debug: true, //consoleを出力するかどうか
      workers: 2, //一度にスタートさせる量
      repeat: 0, //gifをリピートさせるかどうか
      workerScript: './js/gif.worker.js',
      background: '#fff', //背景色
      quality: 10, //クオリティ
      width: 300,
      height: 200
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
      this.checkImageSize();
      // this.createImage();
    });
    this.on('checkImageSize', () => {
      this.createImage();
    });

    this.on('createImages', () => {
      this.downloadFrame();
    });
  }

  /**
   * 選択した画像をリサイズしてcanvasに設置
   */
  createImage() {
    const ctx = this.resizeImage.getContext('2d');
    this.canvas.width = this.contentWidth;
    this.canvas.height = this.contentHeight;
    this.resizeImage.width = this.contentWidth;
    this.resizeImage.height = this.contentHeight;
    this.createImages.onload = () => {
      const width = this.createImages.width;
      const centerPositionX = width / 2 - 150;
      ctx.rotate((this.rotate * Math.PI) / 180);
      ctx.drawImage(this.createImages, 0, 0);
      // ctx.drawImage(this.createImages, centerPositionX, 0, 300, 200, 0, 0, 300, 200);
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
        this.emit('inputImage', e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  checkImageSize() {
    const arrayBuffer = base64ToArrayBuffer(this.createImages.src);
    const exif = EXIF.readFromBinaryFile(arrayBuffer);
    const orientation = exif.Orientation;
    if (exif && orientation) {
      switch (orientation) {
        case 3:
          this.rotate = 180;
          break;
        case 6:
          this.rotate = 90;
          break;
        case 8:
          this.rotate = -90;
          break;
      }
    }
    this.emit('checkImageSize');
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
      const width = 300 - 20 * i;
      const height = (width * 2) / 3;
      const centerPointX = 150 - width / 2;
      const centerPointY = 100 - height / 2;
      const alpha = (10 - i * 0.6) / 10;
      this.context.clearRect(0, 0, this.contentWidth, this.contentHeight);
      this.context.drawImage(this.resizeImage, centerPointX, centerPointY, width, height);
      this.context.drawImage(this.newFrame[i], 0, 0, 300, 200);

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
