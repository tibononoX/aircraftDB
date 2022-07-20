const multer = require("multer");
const fs = require("fs");
const path = require("path");
const models = require("../models");

const deleteImage = (pathImage) => {
  try {
    fs.unlinkSync(pathImage);
  } catch (err) {
    console.error(err);
  }
};

let fileName = "";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, `../../public/assets/images/${fileName}`));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.floor(Math.random() * (9999 - 0 + 1)) + 0}-${
        file.originalname
      }`
    );
  },
});

const uploadSingle = multer({ storage }).single("file");
const uploadMultiple = multer({ storage }).array("file");

class FileController {
  static uploadUser = (req, res, next) => {
    fileName = "users";
    if (req.query.file === "users") {
      return uploadSingle(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        req.pictureData = {
          imgLink: req.file.filename,
        };
        req.body = { ...req.pictureData, ...req.body };
        return next();
      });
    }
    return next();
  };

  static uploadAircraft = (req, res, next) => {
    fileName = "aircraft";
    if (req.query.file === "aircraft") {
      return uploadMultiple(req, res, (err) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        return next();
      });
    }
    return next();
  };

  static delete = async (req, res) => {
    const imageId = parseInt(req.params.id, 10);
    try {
      const [image] = await models.image.findImageById(imageId);
      if (!image) {
        return res.status(404).send(`Image with id : ${imageId} not found`);
      }
      const deletedImg = await models.image.deleteImage(imageId);
      if (deletedImg.affectedRows === 0) {
        return res.status(404).send("error in deleting the image");
      }
      deleteImage(
        path.join(
          __dirname,
          `../../public/assets/images/${req.query.file}/${image.imgLink}`
        )
      );
      return res.status(204).send("image deleted successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = FileController;
