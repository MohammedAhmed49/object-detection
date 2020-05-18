const fs = require('fs')
const tf = require('@tensorflow/tfjs-node')
//const path = require('path')
const jpg = require('jpeg-js')

ImageName = '../VidUploads/imageUp-1589491328827.jpg'

const readImage = (path)=>{
    const buffer = fs.readFileSync(path)
    const pixels =tf.node.decodeImage(new Uint8Array(buffer),3)
    console.log(pixels)
    return pixels 
}

const readVideo = (path)=>{
  const buffer = fs.readFileSync(path)
  pixels = tf.node.decodeImage(new Uint8Array(buffer) , 3)
  tf.node.
  console.log(pixels)
  return pixels
}


// const image = readImage(ImageName)
// const input = imageToInput(image,3)

module.exports = {readImage,readVideo}