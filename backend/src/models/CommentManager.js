const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  static table = "comment";

  insert(comment) {
    return this.connection.query(
      `INSERT INTO ${CommentManager.table} (text, aircraft_id, user_id) VALUES (?, ?, ?)`,
      [comment.text, comment.aircraft_id, comment.user_id]
    );
  }

  findByAircraft(aircraftId) {
    return this.connection.query(
      `SELECT c.id, c.text, c.postedDate, c.editDate, c.user_id, c.aircraft_id, c.vote, u.username FROM ${CommentManager.table} c INNER JOIN user u ON c.user_id = u.id WHERE aircraft_id = ?`,
      [aircraftId]
    );
  }

  update(comment) {
    return this.connection.query(
      `UPDATE ${CommentManager.table} SET ? WHERE id = ?`,
      [comment, comment.id]
    );
  }
}

module.exports = CommentManager;
