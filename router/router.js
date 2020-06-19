const express = require("express");
const VideoUpload = require("../configs/Uploads");
const DataBase = require("../models/Database");
const {
  imagePrediction,
  getPredications,
} = require("../configs/objectDetection");
const { GetVideoLength } = require("../configs/extractFrames");
const { readImage, readVideo } = require("../configs/ReadImage");
const FilterPredictions = require("../functions/FilterPredictions");
const loadModel = require("../functions/loadModel");

const router = express();

router.set("views");
router.set("view engine", "ejs");

router.get("/", (req, res) => {
  let path = __dirname;
  path = path.replace("router", "views/updatedIndex.html");

  res.sendFile(path);
});

router.post("/", VideoUpload, async (req, res) => {
  let objects = [];
  if (req.body.objects) {
    if (typeof req.body.objects == "object") {
      objects = [...req.body.objects];
    } else {
      objects = [req.body.objects];
    }
  }
  const obj = {
    VideoName: req.files.VideoUp[0].filename,
    ImageName: req.files.imageUp ? req.files.imageUp[0].filename : null,
    objects: objects,
    skipRate: Math.abs(req.body.skipRate),
  };

  try {
    const doc = await DataBase.create(obj);
    console.log(doc);
    return res.render("animation", { id: doc._id.toString() });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/result", async (req, res) => {
  console.log(req.query);
  const id = req.query.id;
  if (id == 0) {
    return res.redirect("/");
  } else {
    try {
      const doc = await DataBase.findById(id).exec();
      if (doc == null) {
        return res.redirect("/");
      } else {
        let model = await loadModel();
        while (model == 0) {
          console.log("trying to load the model...")
          model = await loadModel();
          
        }
        console.log("model loaded successfully");
        let objects = [];

        if (doc.ImageName) {
          console.log("detecting objects in image...")
          let path = __dirname;
          path = path.replace("router", "views/VidUploads");
          path = path + "/" + doc.ImageName;

          const image = readImage(path);
          const prediction = await imagePrediction(model, image);

         

          prediction.forEach((Element) => {
            objects.push(Element.class);
          });
          console.log(objects);
        }
        if (doc.objects) {
          doc.objects.forEach((ele) => {
            if (!objects.includes(ele)) {
              objects.push(ele.toString());
            }
          });
          console.log(objects);
        }
        let videoPath = __dirname;
        videoPath = videoPath.replace("router", "views/VidUploads");
        videoPath = videoPath + "/" + doc.VideoName;

        const { width, height } = await GetVideoLength(videoPath);
        console.log("reading video...")
        let frames = await readVideo(videoPath, width, height);
        console.log("frames length", frames.length);
        console.log("getting predictions....")
        const predictions = await getPredications(model, frames);
        console.log(predictions.map(D => {return D.class}));
        const predictionsObj = FilterPredictions(predictions, objects);
        console.log("got predictions and sending object....");
        const FinalObject = {
          
            videoName: doc.VideoName,
            results:predictionsObj
          
        }
        //console.log(` final object ${JSON.stringify(FinalObject)}`);
        res.send(FinalObject);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  }
});

module.exports = router;
