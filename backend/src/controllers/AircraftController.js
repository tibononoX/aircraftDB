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

class AircraftController {
  static browse = async (req, res) => {
    try {
      const aircrafts = await models.aircraft
        .findAll()
        .then(([aircraftList]) => aircraftList);

      res.status(200).send(aircrafts);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };

  static read = (req, res) => {
    models.aircraft
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const aircraft = req.body;

    // TODO validations (length, format...)

    aircraft.id = parseInt(req.params.id, 10);

    models.aircraft
      .update(aircraft)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static newAircraft = async (req, res) => {
    const aircraft = JSON.parse(JSON.stringify(req.body));
    const { files } = req;
    const imageName = files
      ? files.map((file) => {
          return file.filename;
        })
      : null;

    try {
      const [newAircraft] = await models.aircraft.insert(aircraft);
      if (!newAircraft) {
        if (imageName) {
          await imageName.forEach((image) =>
            deleteImage(
              path.join(__dirname, `../../public/assets/images/${image}`)
            )
          );
        }
        return res.status(400).send("Error while creating aircraft");
      }

      const images =
        req.query.file === "aircraft"
          ? files.map((file) => {
              return {
                aircraft_id: newAircraft.insertId,
                imgLink: file.filename,
              };
            })
          : null;
      if (images) {
        await images.forEach(async (image) => {
          await models.image.insert(image);
        });
      }
      return res.status(201).send("Aircraft created");
    } catch (err) {
      // if (err) {
      //   await imageName.forEach((image) =>
      //     deleteImage(
      //       path.join(__dirname, `../../public/assets/images/${image}`)
      //     )
      //   );
      // }
      return res.sendStatus(500);
    }
  };

  static delete = (req, res) => {
    models.aircraft
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = AircraftController;
