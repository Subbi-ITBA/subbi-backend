const express = require("express");
const router = express.Router();
const auth = require("../firebase/authorization");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mv = require('mv');
const Photo = require('../db/queries/photo');

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .send(err)
    .end();
};

const upload = multer({
  dest: "/tmp"
});

const photoDir = path.join(__dirname, "../uploads/");

const deleteTmp = (file, callback) => {
  fs.unlink(file, (err) => {        
    callback(err);
  });
};

router.get("/:id", express.static(path.join(__dirname, "../uploads/")));

router.post("/", auth.checkAuth, upload.single("image"), (req, res) => {
    const tempPath = req.file.path;

    if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
      Photo.addPhoto().then((id) => {
        id = id[0];        
        const targetPath = photoDir + id + ".jpg";
        mv(tempPath, targetPath, err => { 
          if (err)
          {
            Photo.deletePhoto(id);
            deleteTmp(tempPath, (e) => {
              return handleError(e ? e : err, res);
            });
          }
          else
          res.status(201).send({id: id});
        });
      }, (err) => {
        console.log(err);
        deleteTmp(tempPath, (e) => {
          return handleError(e ? e : err, res);
        });
      });
    } else {
      deleteTmp(tempPath, (e) => {
        if (e)
          return handleError(e, res);
        else
          res.status(403).end("Only .jpg files are allowed!");
      });
    }
  }
);

router.delete("/:id", auth.checkAuth, (req, res) => {
  const id = req.params.id;
  const path = photoDir + id + ".jpg";
  fs.unlink(path, (err) => {
    if(err)
      handleError(err, res);
    else
      Photo.deletePhoto(id).then(() => {
        res.status(201).end();
      });
  });
});

module.exports = router;
