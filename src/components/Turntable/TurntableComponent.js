import cls from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import seedrandom from "seedrandom";
import ImageUtil, { isImageData } from "./Utils/imageUtil";
// import * as Audio from "./Utils/TurntableSounds";
import ButtonClick from "./Assets/Button.mp3";
import Tick from "./Assets/Tick.mp3";
// export function easeOut(t, b, c, d) {
//   if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
//   return (-c / 2) * (--t * (t - 2) - 1) + b;
// }

function accelerateCubic(t, b, c, d) {
  return c * (t /= d) * t * t * t;
}

function decelerateCubic(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1);
}

function decelerateExpo(t, b, c, d, e) {
  const param = 1.0013 - e < 1.0 ? 1.0013 - e : 1.0; //original is const 1 but tuned to 1.0013
  return t >= d ? c : c * param;
}

const prefix = "react-turntable";

export default class ReactTurntable extends PureComponent {
  state = {
    isRotate: false,
    startRotate: 0,
    finishRender: false,
    alwaysSpinning: false,
  };
  constructor(props) {
    super(props);
    this.canvas = null;
    this.ctx = null;
    this.animateId = null;
  }
  static defaultProps = {
    width: 500,
    height: 500,
    speed: 30,
    duration: 6000,
    prizes: [],
    clickText: "SPIN!",
    wheelColors: ["#2b580c", "#f7b71d", "#afa939", "#fdef96"],
    primaryColor: "#83AF9B",
    secondaryColor: "#C8C8A9",
    fontStyle: {
      color: "#fff",
      size: 28,
      fontWeight: "400",
      fontVertical: false,
      fontFamily: `-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui,
      helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif`,
    },
    onStart: () => true,
    hiddenButton: false,
    music: null,
  };

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    prizes: PropTypes.array.isRequired,
    wheelColors: PropTypes.array.isRequired,
    clickText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    speed: PropTypes.number,
    duration: PropTypes.number,
    onComplete: PropTypes.func,
    onStart: PropTypes.func,
    fontVertical: PropTypes.bool,
    fontStyle: PropTypes.object,
    hiddenButton: PropTypes.bool,
    music: PropTypes.object,
  };
  render() {
    const {
      clickText,
      style,
      className,
      width,
      height,
      hiddenButton,
      manualStop,
    } = this.props;
    const { finishRender, isRotate } = this.state;
    const styles = { ...style, width, height };
    return (
      <div
        className={cls(prefix, `${prefix}-section`, className)}
        style={styles}
      >
        <canvas
          id="react-turntable-section-canvas"
          ref={(node) => (this.canvas = node)}
        />
        {!hiddenButton &&
          (Object.is(typeof clickText, "string") ? (
            <div
              className="react-turntable-section-btn"
              onClick={this.onStartRotate}
            >
              {clickText}
            </div>
          ) : (
            <div onClick={this.onStartRotate}>{clickText}</div>
          ))}
      </div>
    );
  }

  noticePrize = () => {
    const prize = this.getSelectedPrize();
    this.props.onComplete && this.props.onComplete(prize);
  };

  rotateTurntable = (ms) => {
    const timeStep = 1000 / 60; //frame rate 60fps
    let msDiff;
    if (ms) {
      msDiff = ms - this.lastFrameMs;
      if (msDiff < 0) {
        this.animateId = requestAnimationFrame(this.rotateTurntable);
        return;
      }
      this.timeframeDelta += msDiff;
      if (this.timeframeDelta < timeStep) {
        this.lastFrameMs = ms; // added for fixed frame rate 60fps
        this.animateId = requestAnimationFrame(this.rotateTurntable);
        return;
      }
      // this.timeframeDelta -= msDiff  // variable fps
      this.timeframeDelta -= timeStep; // added for fixed frame rate 60fps
      this.lastFrameMs = ms;
    } else {
      msDiff = timeStep;
      this.timeframeDelta += msDiff;
    }

    if (this.rotateTime >= this.rotateAllTime) {
      // setTimeout(() => {
      this.setState({ isRotate: false });
      this.noticePrize();
      // }, 200)
      return;
    }

    if (
      this.props.manualStop &&
      this.rotateTime >= 950 && //950 because 1000 is too near to accceleration profile
      this.state.alwaysSpinning === true
    ) {
      if (this.autoStopTimer === null) {
        this.autoStopTimer = setTimeout(() => {
          this.setState({ alwaysSpinning: false });
        }, 60000);
      }
    } else {
      // this.rotateTime += msDiff // variable fps
      this.rotateTime += timeStep; // added for fixed frame rate 60fps
    }

    let value = 0;
    if (this.rotateTime <= 1000) {
      value = accelerateCubic(
        this.rotateTime,
        0,
        this.rotateChange * (1000 / this.rotateAllTime),
        1000
      );
    } else {
      if (this.decelConst === 0) {
        // for duration < 15 seconds
        value = decelerateCubic(
          this.rotateTime - 1000,
          0,
          this.rotateChange,
          this.rotateAllTime - 1000
        );
      } else {
        this.currentSpinSpeed = this.currentSpinSpeed * this.decelConst;
        // this.currentSpinSpeed =
        //   this.currentSpinSpeed *
        //   Math.pow(2, (-10 * msDiff) / (this.props.duration - 1000)) // variable fps
        value = decelerateExpo(
          this.rotateTime - 1000,
          0,
          this.rotateChange,
          this.rotateAllTime - 1000,
          this.currentSpinSpeed
        );
      }
    }

    // let value = easeOut(
    //   this.rotateTime,
    //   0,
    //   this.rotateChange,
    //   this.rotateAllTime,
    // )
    // let _rotateChange = ((value - this.pastEaseValue) * Math.PI) / 2 //the ending angle will be how many 90 degrees of this.rotatechange
    let _rotateChange = (value - this.pastEaseValue) * 2 * Math.PI; //the ending angle will be how many 360 degrees of this.rotatechange
    // if (_rotateChange > this.biggestRotate) {
    //   this.biggestRotate = _rotateChange
    // }

    if (
      this.props.manualStop &&
      this.rotateTime >= 950 &&
      this.state.alwaysSpinning === true
    ) {
    } else {
      this.pastEaseValue = value;
    }

    // (this.rotateChange -
    //   easeOut(this.rotateTime, 0, this.rotateChange, this.rotateAllTime)) *
    // (Math.PI / 180)
    this.startRotate += _rotateChange;
    if (this.startRotate > Math.PI * 2) {
      this.startRotate -= Math.PI * 2;
      // this.spinRound += 1
    }
    let pos = this.getCurrentPosition();
    if (this.props.soundOn && pos != this.pastPosition) {
      this.pastPosition = pos; //current index
      const tickSound = new Audio(Tick);
      tickSound.volume = 0.1;
      tickSound.play();
    }
    this.drawPickerWheel();
    this.animateId = requestAnimationFrame(this.rotateTurntable);
  };

  drawPickerWheel = async () => {
    if (!this.pwImage) {
      this.pwImage = ImageUtil.createTempImage(
        this.ctx.canvas.width,
        this.ctx.canvas.height
      );
      // const beforeDraw = Date.now()
      await this.drawTurntable(this.pwImage.getContext("2d"));
      // const afterDraw = Date.now()
    }
    if (this.ctx !== undefined) {
      //initial render has 2 times, the second time render is undefined
      this.ctx.clearRect(0, 0, this.pwImage.width, this.pwImage.height);
      this.ctx.save();
      this.ctx.translate(this.centerX, this.centerY);
      this.ctx.rotate(this.startRotate);
      this.ctx.translate(-this.centerX, -this.centerY);
      this.ctx.drawImage(this.pwImage, 0, 0);
      this.ctx.restore();
    }
  };

  drawSameColorSeparator(ctx) {
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "#fff";
    const x = this.R;
    const y = 0;
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  getWheelImage = async (imageData) => {
    if (imageData) {
      if (!this.props.wheelImages[imageData]) {
        return new Promise((resolve, reject) => {
          const image = new Image();
          // const self = this;
          image.onload = () => {
            // this.drawBgAndImage(image)
            this.props.setWheelImages({
              ...this.props.wheelImages,
              [imageData]: image,
            });
            resolve(image);
          };
          image.onerror = () => {
            resolve(false);
          };
          image.setAttribute("crossOrigin", "anonymous");
          image.src = imageData;

          // this.wheelImages[imageData] = image
        });
      } else {
        return this.props.wheelImages[imageData];
      }
    }
  };

  drawBgAndImage(ctx, rad, image, bgColor) {
    let imgBgColor = ImageUtil.getTopLeftColor(image);
    if (ImageUtil.isTransparent(imgBgColor)) {
      imgBgColor = bgColor;
    }

    this.drawBackColor(ctx, rad, imgBgColor);
    ctx.translate(0, 0);
    const halfRad = rad / 2;
    ctx.rotate(halfRad + Math.PI); //added Math.PI to invert the image.
    this.drawImage(ctx, halfRad, this.R, 40, image);
  }

  drawImage(ctx, radian, radius, buttonRadius, image) {
    let p = this.getImagePos(
      radian,
      radius,
      buttonRadius,
      image.height / image.width
    );
    ctx.drawImage(image, p.x, p.y, p.w, p.h);
  }

  getImagePos(radian, radius, buttonRadius, imageRatio) {
    let w, h;
    for (w = radius; w > 0; w--) {
      h = w * imageRatio;
      if (ImageUtil.boxFits(radian, radius, buttonRadius, w, h)) {
        break;
      }
    }
    return {
      x: -Math.max(
        (h * Math.cos(radian)) / (2 * Math.sin(radian)),
        buttonRadius
      ), //added - to invert the image.
      y: h / 2, //removed - to invert the image.
      w: -w, //added - to invert the image.
      h: -h, //added - to invert the image.
    };
  }

  drawBorder(ctx, rad, width, color = "#aaa") {
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.R, 0, rad, false); // this.R-1 better, thicker line
    ctx.lineTo(0, 0);
    ctx.stroke();
  }

  drawCircle(ctx, width) {
    ctx.lineWidth = width;
    ctx.strokeStyle = "#5a5a5a";
    ctx.arc(0, 0, this.R, 0, 2 * Math.PI);
    ctx.stroke();
  }

  drawBackColor(ctx, rad, bgColor) {
    // ctx.fillStyle = bgColor
    // ctx.beginPath()
    // ctx.arc(this.centerX, this.centerY, this.R, start, end, false)
    // ctx.arc(this.centerX, this.centerY, this.INSERT_R, end, start, true)
    // ctx.fill()
    // ctx.closePath()
    // ctx.restore()
    // ctx.save()

    ctx.fillStyle = bgColor;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, this.R, 0, rad);
    ctx.lineTo(0, 0);
    ctx.fill();
  }

  drawText(ctx, radian, bgColor, text, fontStyle, index) {
    const { fontWeight, fontFamily, size } = fontStyle;
    ctx.fillStyle = this.getTextColor(bgColor);
    ctx.lineJoin = "round";
    ctx.textBaseline = "middle";
    ctx.rotate(radian / 2 + Math.PI);
    const maxWidth = this.TEXT_R - 45;
    const preMaxSize = this.prizes.length < 100 ? size : 15;
    let height;
    if (this.props.weightOn === false) {
      height = this.heightPie;
    } else {
      height = this.heightPie[index];
    }
    const fittingText = this.fittingString(
      ctx,
      text,
      maxWidth,
      fontWeight,
      fontFamily,
      preMaxSize,
      height
    );

    ctx.fillText(fittingText, -this.TEXT_R, 0);
  }

  fittingString = (
    ctx,
    str,
    preMaxWidth,
    fontWeight,
    fontFamily,
    preMaxSize,
    heightPie
  ) => {
    let width = 0;
    let maxSize = preMaxSize;
    let minSize = 11;
    let maxWidth = preMaxWidth;
    if (heightPie > 0) {
      if (preMaxSize > heightPie) {
        minSize = 7;
        maxWidth = preMaxWidth - 50;
        if (heightPie > 8) {
          maxSize = heightPie - 1;
        } else {
          maxSize = 8;
        }
      }
    }

    for (let size = maxSize; size > minSize; size--) {
      ctx.font = `${fontWeight} ${size + "px"} ${fontFamily}`;
      width = ctx.measureText(str).width;

      if (width <= maxWidth) {
        return str;
      }
    }
    let len = str.length;
    let ellipsis = "…";
    let ellipsisWidth = ctx.measureText(ellipsis).width;
    while (width >= maxWidth - ellipsisWidth && len-- > 0) {
      str = str.substring(0, len);
      width = ctx.measureText(str).width;
    }
    return str + ellipsis;
  };

  getTextColor(bgColor) {
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "#000000" : "#FFFFFF";
  }

  getCurrentPosition = () => {
    // let startAngle = (this.startRotate * 180) / Math.PI,
    //   awardAngle = (this.awardRotate * 180) / Math.PI,
    //   pointerAngle = 90,
    //   overAngle = (startAngle + pointerAngle) % 360,
    //   restAngle = 360 - overAngle,
    //   index = Math.floor(restAngle / awardAngle)
    // return index
    const startAngle = (this.startRotate * 180) / Math.PI;
    const pointerAngle = 90;
    const overAngle = (startAngle + pointerAngle) % 360;
    const restAngle = 360 - overAngle;
    let index;
    if (this.props.weightOn === false) {
      const awardAngle = (this.awardRotate * 180) / Math.PI;
      index = Math.floor(restAngle / awardAngle);
    } else {
      let tempAngle = restAngle;
      for (let i = 0; i < this.awardRotate.length; i++) {
        const awardAngle = (this.awardRotate[i] * 180) / Math.PI;
        tempAngle -= awardAngle;
        if (tempAngle <= 0.0) {
          index = i;
          break;
        }
      }
    }
    return index;
  };

  getSelectedPrizeIndex = () => {
    // let startAngle = (this.startRotate * 180) / Math.PI,
    //   awardAngle = (this.awardRotate * 180) / Math.PI,
    //   pointerAngle = 90,
    //   overAngle = (startAngle + pointerAngle) % 360,
    //   restAngle = 360 - overAngle,
    //   index = Math.floor(restAngle / awardAngle)
    // return index
    const startAngle = (this.startRotate * 180) / Math.PI;
    const pointerAngle = 90;
    const overAngle = (startAngle + pointerAngle) % 360;
    const restAngle = 360 - overAngle;
    let index;
    if (this.props.weightOn === false) {
      const awardAngle = (this.awardRotate * 180) / Math.PI;
      index = Math.floor(restAngle / awardAngle);
    } else {
      let tempAngle = restAngle;
      for (let i = 0; i < this.awardRotate.length; i++) {
        const awardAngle = (this.awardRotate[i] * 180) / Math.PI;
        tempAngle -= awardAngle;
        if (tempAngle <= 0.0) {
          index = i;
          break;
        }
      }
    }
    return index;
  };

  getSelectedPrize = () => {
    let startAngle = (this.startRotate * 180) / Math.PI,
      awardAngle = (this.awardRotate * 180) / Math.PI,
      pointerAngle = 90,
      overAngle = (startAngle + pointerAngle) % 360,
      restAngle = 360 - overAngle,
      index = Math.floor(restAngle / awardAngle);

    return this.prizes[index];
  };

  drawTurntableOld() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const {
      primaryColor,
      secondaryColor,
      fontStyle: { fontVertical, fontWeight, fontFamily, size, color },
    } = this.props;

    for (let [i, prize] of this.prizes.entries()) {
      const _currentStartRotate = this.startRotate + this.awardRotate * i;
      const _currentEndRotate = _currentStartRotate + this.awardRotate;
      this.ctx.save();
      i % 2 === 0
        ? (ctx.fillStyle = primaryColor)
        : (ctx.fillStyle = secondaryColor);
      ctx.beginPath();
      ctx.arc(
        this.centerX,
        this.centerY,
        this.R,
        _currentStartRotate,
        _currentEndRotate,
        false
      );
      ctx.arc(
        this.centerX,
        this.centerY,
        this.INSERT_R,
        _currentEndRotate,
        _currentStartRotate,
        true
      );
      ctx.fill();
      ctx.closePath();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.font = `${fontWeight} ${
        /.*px$/.test(size) ? size : size + "px"
      } ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textBaseline = "middle";
      const currentX =
        Math.cos(_currentStartRotate + this.awardRotate / 2) * this.TEXT_R;
      const currentY =
        Math.sin(_currentStartRotate + this.awardRotate / 2) * this.TEXT_R;

      ctx.translate(this.centerX + currentX, this.centerY + currentY);
      ctx.rotate(_currentStartRotate + this.awardRotate / 2 + Math.PI / 2);

      const { width: fontWidth } = ctx.measureText(prize);

      if (fontVertical === true) {
        ctx.translate(0, Math.min(fontWidth, 50));
        ctx.rotate((90 / 180) * Math.PI);
      }

      ctx.fillText(prize, -fontWidth / 2, 0);

      ctx.closePath();
      ctx.restore();
    }
  }

  drawTurntable = async (ctx) => {
    const { wheelColors, fontStyle, weightOn, mysterySpin } = this.props;

    if (ctx.canvas.width === 0 || ctx.canvas.height === 0) {
      return;
    }
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.width / 2);

    let radian;
    if (weightOn === false) {
      radian = this.awardRotate;
    }
    let mysteryFontStyle;
    if (mysterySpin) {
      mysteryFontStyle = { ...fontStyle };
      mysteryFontStyle["size"] = 39;
    }
    for (let [i, prize] of this.prizes.entries()) {
      if (weightOn === true) {
        radian = this.awardRotate[i];
      }
      ctx.save();
      let bgColor = wheelColors[0];
      switch (i % wheelColors.length) {
        case 0:
          bgColor = wheelColors[0];
          break;
        case 1:
          bgColor = wheelColors[2];
          break;
        case 2:
          bgColor = wheelColors[1];
          break;
        case 3:
          bgColor = wheelColors[3];
          break;
        case 4:
          bgColor = wheelColors[4];
          break;
        case 5:
          bgColor = wheelColors[5];
          break;
        case 6:
          bgColor = wheelColors[6];
          break;
        case 7:
          bgColor = wheelColors[7];
          break;
      }
      ctx.beginPath();

      if (mysterySpin && !this.emptyInput) {
        this.drawBackColor(ctx, radian, bgColor);
        this.drawText(ctx, radian, bgColor, "?", mysteryFontStyle, i);
        ctx.restore();
        ctx.rotate(radian);
        continue;
      }
      if (this.props.isPW) {
        const isImage = isImageData(prize);
        if (!isImage) {
          this.drawBackColor(ctx, radian, bgColor);
          this.drawText(ctx, radian, bgColor, prize, fontStyle, i);
          ctx.restore();
          ctx.rotate(radian);
        } else {
          let image = await this.getWheelImage(prize);
          if (!image) {
            image = await this.getWheelImage(
              "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="
            );
          }
          this.drawBgAndImage(ctx, radian, image, bgColor);
          ctx.restore(); //have to restore because previous function turn the context to half
          this.drawBorder(ctx, radian, 1);
          // this.drawCircle(ctx, 2.5)
          ctx.restore();
          ctx.rotate(radian);
        }
      } else if (this.props.isRIG) {
        if (prize !== "YES" && prize !== "NO") {
          let image = await this.getWheelImage(prize);
          if (!image) {
            image = await this.getWheelImage(
              "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="
            );
          }
          this.drawBgAndImage(ctx, radian, image, bgColor);
        }
        ctx.restore(); //have to restore because previous function turn the context to half
        this.drawBorder(ctx, radian, 1);
        // this.drawCircle(ctx, 2.5) //removed this too thick
        ctx.restore();
        ctx.rotate(radian);
      } else {
        this.drawBackColor(ctx, radian, bgColor);
        this.drawText(ctx, radian, bgColor, prize, fontStyle, i);
        ctx.restore();
        ctx.rotate(radian);
      }
    }
    if (!this.props.isRIG) {
      const prizeLength = this.prizes.length;
      if (prizeLength % wheelColors.length === 1) {
        this.drawSameColorSeparator(ctx);
      }
    }
    ctx.closePath();
  };

  destroyContext() {
    window.cancelAnimationFrame(this.animateId);
    delete this.canvas;
    delete this.ctx;
  }

  compatibilityFrame() {
    window.requestAnimFrame = (() => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        ((callback) => window.setTimeout(callback, 1000 / 60))
      );
    })();
    window.cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  }

  componentWillMount() {
    if (this.props.prizes.length < 2)
      throw new Error(
        "options prizes It needs to be an array , Not less than two"
      );
  }

  componentWillUnmount() {
    this.destroyContext();
  }

  onStartRotate = () => {
    const { speed, duration, onStart, manualStop } = this.props;
    if (this.state.isRotate) return;
    if (onStart && !onStart()) return;

    if (this.props.soundOn) {
      const btnSound = new Audio(ButtonClick);
      btnSound.volume = 0.3;
      btnSound.play();
    }

    this.setState({ isRotate: true }, () => {
      this.lastFrameMs = window.performance.now();
      this.timeframeDelta = 0;
      this.rotateTime = 0;
      this.pastEaseValue = 0;
      const mathRandom = seedrandom();
      if (!manualStop) {
        this.rotateAllTime = duration > 1000 ? duration : 1500;
        this.rotateChange = speed / 2 + mathRandom(); // 4 * Math.random() produce 1 cycle randomness
        const timeStep = 1000 / 60;
        this.decelConst =
          duration < 15000
            ? 0
            : Math.pow(2, (-10 * timeStep) / (duration - 1000));
        this.currentSpinSpeed = 1;
      } else {
        this.autoStopTimer = null;
        this.decelConst = 0;
        this.setState({ alwaysSpinning: true });
        this.rotateAllTime = 6000;
        this.rotateChange = 16 / 2 + mathRandom(); // 4 * Math.random() produce 1 cycle randomness
      }

      this.rotateTurntable();
    });
  };

  stopRotate = () => {
    this.setState({ isRotate: false });
    window.cancelAnimationFrame(this.animateId);
    this.noticePrize();
  };

  initTurntable = () => {
    const { width, height, prizes, tempPrizes, angle, weightOn, weights } =
      this.props;

    let finalWeights = [];
    if (prizes.length === 0) {
      this.emptyInput = true;
      finalWeights = [1, 1, 1, 1, 1, 1, 1, 1];
    } else {
      this.emptyInput = false;
      this.prizes = prizes;
      finalWeights = weights;
    }

    let totalWeight = this.prizes.length;
    if (weightOn) {
      totalWeight = finalWeights.reduce((a, b) => a + b, 0);
    }

    this.startRotate = angle || 0;
    this.rotateTime = 0;
    this.rotateAllTime = 0;
    this.rotateChange = 0;
    this.pastEaseValue = 0;

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = width; //actual width of canvas
    this.canvas.style.height = height;

    if (weightOn === false) {
      this.awardRotate = (Math.PI * 2) / this.prizes.length; // each portion angle
    } else {
      this.awardRotate = [];
      for (let i = 0; i < this.prizes.length; i++) {
        this.awardRotate[i] = (finalWeights[i] * (Math.PI * 2)) / totalWeight;
      }
    }

    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.R = this.canvas.width / 2 - 10;
    this.TEXT_R = this.R - 20;
    this.INSERT_R = 0;

    if (weightOn === false) {
      if (prizes.length > 2) {
        this.heightPie = Math.floor(
          Math.tan(this.awardRotate / 2) * (this.TEXT_R - 45) * 2
        );
      } else {
        this.heightPie = 800;
      }
    } else {
      this.heightPie = [];
      for (let i = 0; i < this.prizes.length; i++) {
        if (this.awardRotate[i] < Math.PI) {
          this.heightPie[i] = Math.floor(
            Math.tan(this.awardRotate[i] / 2) * (this.TEXT_R - 45) * 2
          );
        } else {
          this.heightPie[i] = 800;
        }
      }
    }

    this.pwImage = null;
    this.pastPosition = this.getCurrentPosition();
    this.drawPickerWheel();
  };

  getTurntable = () => {
    if (this.props.getTurntable) {
      this.props.getTurntable({
        start: this.onStartRotate,
        stop: this.stopRotate,
      });
    }
  };

  componentDidMount() {
    this.compatibilityFrame();
    this.initTurntable();
    this.getTurntable();
  }
}
