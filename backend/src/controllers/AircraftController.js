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

      return res.status(200).send(aircrafts);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  static getManufacturers = async (req, res) => {
    try {
      const manufacturers = await models.aircraft
        .findAllManufacturers()
        .then(([manufacturersList]) => manufacturersList);

      return res.status(200).send(manufacturers);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  static getManufacturerById = async (req, res) => {
    const { id } = req.params;
    try {
      const manufacturerById = await models.aircraft
        .findManufacturerById(id)
        .then(([manufacturer]) => manufacturer);
      if (!manufacturerById) {
        return res.sendStatus(404);
      }

      return res.status(200).send(manufacturerById[0]);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  static getTypes = async (req, res) => {
    try {
      const types = await models.aircraft
        .findAllTypes()
        .then(([typesList]) => typesList);

      return res.status(200).send(types);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  static getTypeById = async (req, res) => {
    const { id } = req.params;
    try {
      const typeById = await models.aircraft
        .findTypeById(id)
        .then(([type]) => type);
      if (!typeById) {
        return res.sendStatus(404);
      }

      return res.status(200).send(typeById[0]);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
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

  static newManufacturer = async (req, res) => {
    const newManufacturer = req.body;

    try {
      const add = await models.aircraft
        .addManufacturer(newManufacturer)
        .then((result) => result);
      if (add.affectedRows === 0) {
        return res.sendStatus(400);
      }
      return res.status(201).send(newManufacturer);
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static newType = async (req, res) => {
    const newType = req.body;

    try {
      const add = await models.aircraft
        .addType(newType)
        .then((result) => result);
      if (add.affectedRows === 0) {
        return res.sendStatus(400);
      }
      return res.status(201).send(newType);
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static editType = (req, res) => {
    const type = req.body;

    // TODO validations (length, format...)

    type.id = parseInt(req.params.id, 10);

    models.aircraft
      .updateType(type)
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

  static editManufacturer = (req, res) => {
    const manufacturer = req.body;

    // TODO validations (length, format...)

    manufacturer.id = parseInt(req.params.id, 10);

    models.aircraft
      .updateManufacturer(manufacturer)
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
    const aircraft = req.body;
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

      const images = files
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
      if (imageName) {
        await imageName.forEach((image) =>
          deleteImage(
            path.join(__dirname, `../../public/assets/images/projects/${image}`)
          )
        );
      }
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

  static deleteManufacturer = (req, res) => {
    const { id } = req.params;
    models.aircraft
      .deleteManufacturer(id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static deleteType = (req, res) => {
    const { id } = req.params;
    models.aircraft
      .deleteType(id)
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
