const AbstractManager = require("./AbstractManager");

class FavoriteManager extends AbstractManager {
  static table = "favorite";

  browse(userId) {
    return this.connection.query(
      `SELECT a.id, a.name, m.name manufacturer, t.name type, a.desc, a.year FROM favorite fav LEFT JOIN aircraft a on a.id=fav.aircraft_id LEFT JOIN manufacturer m on m.id=a.manufacturer_id LEFT JOIN type t on t.id=a.type_id WHERE fav.user_id = ?`,
      [userId]
    );
  }

  checkAlreadyFaved({ aircraftId, userId }) {
    return this.connection.query(
      `SELECT * FROM favorite WHERE aircraft_id = ? AND user_id = ?`,
      [aircraftId, userId]
    );
  }

  deleteFav({ aircraftId, userId }) {
    return this.connection.query(
      `DELETE FROM favorite WHERE aircraft_id = ? AND user_id = ?`,
      [aircraftId, userId]
    );
  }

  addFav({ aircraftId, userId }) {
    return this.connection.query(
      `INSERT INTO favorite (aircraft_id, user_id) VALUES (?, ?)`,
      [aircraftId, userId]
    );
  }
}

module.exports = FavoriteManager;
