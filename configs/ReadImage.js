const { Transform } = require("stream")

class ExtractFrames extends Transform {
  constructor(delimiter) {
    super({ readableObjectMode: true })
    this.delimiter = Buffer.from(delimiter, "hex")
    this.buffer = Buffer.alloc(0)
  }

  _transform(data, enc, cb) {
    // Add new data to buffer
    this.buffer = Buffer.concat([this.buffer, data])
    while (true) {
      const start = this.buffer.indexOf(this.delimiter)
      if (start < 0) break // there's no frame data at all
      const end = this.buffer.indexOf(
        this.delimiter,
        start + this.delimiter.length,
      )
      if (end < 0) break // we haven't got the whole frame yet
      this.push(this.buffer.slice(start, end)) // emit a frame
      this.buffer = this.buffer.slice(end) // remove frame data from buffer
      if (start > 0) console.error(`Discarded ${start} bytes of invalid data`)
    }
    cb()
  }
}

const fs = require('fs')
const tf = require('@tensorflow/tfjs-node')
const jpg = require('jpeg-js')

ImageName = '../VidUploads/imageUp-1589491328827.jpg'

const readImage = (path)=>{
    const buffer = fs.readFileSync(path)
    try { 
      const pixels =tf.node.decodeImage(new Uint8Array(buffer),3)
      console.log(`image shape ${pixels.shape}`)
      return pixels 
    }catch(err){
      console.log(`something went wrong while converting the image to tensor`)
      return -1 
    }
   
   
}

const readVideo =async(path,width,height)=>{
  const HW = height.toString()+'x'+width.toString()
  const logStream = fs.createWriteStream('./logFile.log');
  
  console.log(`height and width : ${HW}`)
  const spawnProcess = require('child_process').spawn
    ffmpeg = spawnProcess('ffmpeg', [
        '-i', path,
        '-vcodec', 'mjpeg',
        '-f','rawvideo',
        '-s', HW, // size of one frame
        'pipe:1'
    ]);
     
    // ffmpeg.stderr.setEncoding('utf8'); 
    ffmpeg.stderr.pipe(logStream);
    
    let frames = []

    ffmpeg.stdout.pipe(new ExtractFrames("FFD8FF")).on('data', (data) => {
        frames.push(data)
        
    
  })
    return new Promise((resolve)=>{
      ffmpeg.on('close', function (code) {

        resolve(frames)
      
        console.log('child process exited with code ' + code);
    })
  });
  
}



// const image = readImage(ImageName)
// const input = imageToInput(image,3)

module.exports = {readImage,readVideo}