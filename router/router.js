const express = require("express");
const VideoUpload = require("../configs/Uploads");
const DataBase = require("../models/Database");
const model = require("../configs/objectDetection").model;
const { extractFrames, GetVideoLength } = require("../configs/extractFrames");
const { readImage, readVideo } = require("../configs/ReadImage");
const Detect = require("../configs/DetectObjectsInVideo");
const FilterPredictions = require("../functions/FilterPredictions");
const url = require("url");
const router = express();
router.set("views");
router.set("view engine", "ejs");

router.get("/", (req, res) => {
  let path = __dirname;
  path = path.replace("router", "views/updatedIndex.html");

  res.sendFile(path);
});

router.post("/", VideoUpload, async (req, res) => {
  
 console.log(req.body)
  const obj = {
    VideoName: req.files.VideoUp[0].filename,
    ImageName: req.files.imageUp ? req.files.imageUp[0].filename : null,
    objects: req.body.objects ? [...req.body.objects] : null,
    skipRate: Math.abs(req.body.skipRate)
  };

  

  try {
    const doc = await DataBase.create(obj);
    console.log(doc)
    return res.render("animation", { id: doc._id.toString()});

  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get('/result', async (req, res) => {
  console.log("request was made")
  console.log(req.query);
  const id = req.query.id
  if (id== 0) {
    return res.redirect("/");
  } else {
    try {
      const doc = await DataBase.findById(id).exec();
      if (doc == null) {
        return res.redirect("/");
      } else {
        let objects = [];

        if (doc.ImageName) {
          let path = __dirname;
          path = path.replace("router", "VidUploads");
          path = path + "/" + doc.ImageName;

          const image = readImage(path);
          let input = [image];
          let prediction = await model(input);
          while (prediction === 0) {
            console.log("model Failed to load....");
            console.log("please wait for reload attempt...");
            prediction = await model(input);
          }
          // console.log("prediction : " ,prediction)

          prediction[0].forEach((Element) => {
            objects.push(Element.class);
          });
          console.log(objects);
        } 
        if (doc.objects){
          doc.objects.forEach((ele)=>{
              objects.push(ele.toString())
          })
          console.log(objects)
        }
        let videoPath = __dirname;
        videoPath = videoPath.replace("router", "VidUploads");
        videoPath = videoPath + "/" + doc.VideoName;

        const { width, height } = await GetVideoLength(videoPath);
        let frames = await readVideo(videoPath, width, height);
        console.log("frames length", frames.length);
        console.log("i am here sending results");
        res.send({ ready: "0" });
      }
    } catch (err) {
      console.log(err);
      return res.redirect("/");
    }
  }
});

module.exports = router;
