const createProportionalCanvas = (imageWidth, imageHeight, maxSide) => {
  let xScale = maxSide / imageWidth;
  let yScale = maxSide / imageHeight;
  let scale = Math.max(xScale, yScale);
  const canvas = document.createElement("canvas");
  canvas.width = imageWidth * scale;
  canvas.height = imageHeight * scale;
  return canvas;
};

const drawStretched = (canvas, image, filter) => {
  const context = canvas.getContext("2d");
  context.save();
  if (filter) context.filter = filter;
  // Draw image with full bleed to reduce edge artifacts.
  context.drawImage(image, -2, -2, canvas.width + 4, canvas.height + 4);
  context.restore();
};

const getOptimizedDataUrl = (canvas, originalDataUrl) => {
  let newDataUrl;
  if (topLeftIsTransparent(canvas.getContext("2d"))) {
    newDataUrl = canvas.toDataURL("image/png");
  } else {
    newDataUrl = canvas.toDataURL("image/jpeg", 0.5);
  }
  if (originalDataUrl && originalDataUrl.length < newDataUrl.length) {
    return originalDataUrl;
  } else {
    return newDataUrl;
  }
};

const topLeftIsTransparent = (context) => {
  let data = context.getImageData(0, 0, 1, 1).data;
  return data[3] < 5;
};

const hex = (d) => Number(d).toString(16).padStart(2, "0");

const meantToBeWhite = (r, g, b) => {
  // An edge effect and slight transparence probably made the
  // color slightly off-white.
  return r == g && r == b && r > 230;
};

const getHexColor = (r, g, b, a) => {
  return `#${hex(r)}${hex(g)}${hex(b)}${hex(a)}`;
};

const getTopLeftColor = (image) => {
  let context = document.createElement("canvas").getContext("2d");
  context.drawImage(image, 0, 0);
  let data = context.getImageData(0, 0, 1, 1).data;
  if (meantToBeWhite(data[0], data[1], data[2])) {
    return "#FFFFFFFF";
  } else {
    return getHexColor(data[0], data[1], data[2], data[3]);
  }
};

const isTransparent = (rgbaColor) => {
  let retVal = false;
  let match = rgbaColor.match(/#\w\w\w\w\w\w(\w\w)/);
  if (match) {
    retVal = match[1] == "00";
  }
  return retVal;
};

const boxFits = (a, r, b, w, h) => {
  let d =
    Math.sqrt(Math.pow(r, 2) - Math.pow(h / 2, 2)) -
    Math.max((h * Math.cos(a)) / (2 * Math.sin(a)), b);
  return d >= w;
};

const optimizeSliceImage = async (dataUrl, optimizedSize = 200) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = createProportionalCanvas(
        image.width,
        image.height,
        optimizedSize
      );
      drawStretched(canvas, image);
      resolve(getOptimizedDataUrl(canvas, dataUrl));
    };
    image.src = dataUrl;
  });
};

const createTempImage = (width, height) => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = width;
  tempCanvas.height = height;
  return tempCanvas;
};

export const isImageData = (str) => {
  if (typeof str !== "string") return false;
  return str.includes("data:image/") && str.includes(";base64");
};

export const isImageBlob = (str) => {
  if (typeof str !== "string") return false;
  return str.includes("blob:http");
};

export const convertBase64ToBlob = (str) => {
  const base64ImageData = str;
  const contentType = str.includes("image/jpeg") ? "image/jpeg" : "image/png";

  const byteCharacters = atob(
    base64ImageData.substr(`data:${contentType};base64,`.length)
  );
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });

  const blobUrl = URL.createObjectURL(blob);

  return blobUrl;
};

export const convertBlobUrlToBase64 = async (blobUrl) => {
  const blob = await fetch(blobUrl).then((r) => r.blob());
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

// export const extractImage = entry => {
//   let imageData = ''
//   if (entry) {
//     let match = entry.match(/<img>"(.*?)"/)
//     if (match) {
//       imageData = match[1]
//     }
//   }
//   return imageData
// }

export default {
  optimizeSliceImage,
  getTopLeftColor,
  isTransparent,
  boxFits,
  createTempImage,
};
