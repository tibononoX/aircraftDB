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
    a.year FROM ${this.table} a LEFT JOIN manufacturer m ON m.id = a.manufacturer_id LEFT JOIN type t ON t.id = a.type_id`);
  }

  findAllManufacturers() {
    return this.connection.query(`SELECT * FROM manufacturer`);
  }

  findAllTypes() {
    return this.connection.query(`SELECT * FROM type`);
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
}

module.exports = AircraftManager;
