const AbstractManager = require("./AbstractManager");

class AircraftManager extends AbstractManager {
  static table = "aircraft";

  find(id) {
    return this.connection.query(
      `SELECT a.id, a.name, m.name manufacturer, a.manufacturer_id, t.name type, a.type_id, a.desc, a.year FROM ${this.table} a LEFT JOIN manufacturer m ON m.id = a.manufacturer_id LEFT JOIN type t ON t.id = a.type_id WHERE a.id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection
      .query(`SELECT a.id, a.name, m.name manufacturer, a.manufacturer_id, t.name type, a.type_id, a.desc,
    a.year, i.imgLink FROM ${this.table} a LEFT JOIN manufacturer m ON m.id = a.manufacturer_id LEFT JOIN type t ON t.id = a.type_id LEFT JOIN image i ON i.aircraft_id = a.id`);
  }

  findAllManufacturers() {
    return this.connection.query(`SELECT * FROM manufacturer`);
  }

  findManufacturerById(id) {
    return this.connection.query(`SELECT * FROM manufacturer WHERE id = ?`, [
      id,
    ]);
  }

  findAllTypes() {
    return this.connection.query(`SELECT * FROM type`);
  }

  findTypeById(id) {
    return this.connection.query(`SELECT * FROM type WHERE id = ?`, [id]);
  }

  insert(aircraft) {
    return this.connection.query(`INSERT INTO ${AircraftManager.table} SET ?`, [
      aircraft,
    ]);
  }

  update(aircraft) {
    return this.connection.query(
      `UPDATE ${AircraftManager.table} SET ? where id = ?`,
      [aircraft, aircraft.id]
    );
  }

  updateManufacturer(manufacturer) {
    return this.connection.query(`UPDATE manufacturer SET ? where id = ?`, [
      manufacturer,
      manufacturer.id,
    ]);
  }

  updateType(type) {
    return this.connection.query(`UPDATE type SET ? where id = ?`, [
      type,
      type.id,
    ]);
  }

  addManufacturer(manufacturer) {
    return this.connection.query("INSERT INTO manufacturer SET ?", [
      manufacturer,
    ]);
  }

  addType(type) {
    return this.connection.query("INSERT INTO type SET ?", [type]);
  }

  deleteManufacturer(id) {
    return this.connection.query(`DELETE FROM manufacturer where id = ?`, [id]);
  }

  deleteType(id) {
    return this.connection.query(`DELETE FROM type where id = ?`, [id]);
  }
}

module.exports = AircraftManager;
