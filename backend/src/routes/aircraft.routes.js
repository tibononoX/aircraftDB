const express = require("express");

const {
  AircraftController,
  AuthController,
  FileController,
} = require("../controllers");

const router = express.Router();

//  Aircraft CRUD routes
router.get("/", AircraftController.browse);
router.get("/manufacturers", AircraftController.getManufacturers);
router.get("/manufacturers/:id", AircraftController.getManufacturerById);
router.get("/types", AircraftController.getTypes);
router.get("/types/:id", AircraftController.getTypeById);
router.get("/:id", AircraftController.read);
router.post(
  "/",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  FileController.uploadAircraft,
  AircraftController.newAircraft
);

router.post(
  "/manufacturers",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.newManufacturer
);

router.post(
  "/types",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.newType
);

router.put(
  "/manufacturers/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.editManufacturer
);

router.delete(
  "/manufacturers/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.deleteManufacturer
);

router.delete(
  "/types/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.deleteType
);

router.put(
  "/types/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.editType
);

router.put(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  // FileController.uploadAircraft,
  AircraftController.edit
);

router.delete(
  "/:id",
  AuthController.isUserConnected,
  AuthController.isUserAdmin,
  AircraftController.delete
);

module.exports = router;
