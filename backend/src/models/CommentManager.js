const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  static table = "comment";

  insert(comment) {
    return this.connection.query(
      `INSERT INTO ${CommentManager.table} (text, aircraft_id, user_id) VALUES (?, ?, ?)`,
      [comment.text, comment.aircraft_id, comment.user_id]
    );
  }

  find(id) {
    return this.connection.query(
      `SELECT c.id, u.username postedBy, a.name onAircraft, c.text, c.postedDate, c.editDate FROM ${CommentManager.table} c LEFT JOIN user u ON u.id = c.user_id LEFT JOIN aircraft a ON a.id = c.aircraft_id WHERE c.id = ?`,
      [id]
    );
  }

  findByAircraft(aircraftId) {
    return this.connection.query(
      `SELECT c.id, u.username postedBy, a.name onAircraft, c.text, c.postedDate, c.editDate FROM ${CommentManager.table} c LEFT JOIN user u ON u.id = c.user_id LEFT JOIN aircraft a ON a.id = c.aircraft_id WHERE aircraft_id = ?`,
      [aircraftId]
    );
  }

  update(comment) {
    return this.connection.query(
      `UPDATE ${CommentManager.table} SET ? WHERE id = ?`,
      [comment, comment.id]
    );
  }

  checkAlreadyVoted({ commentId, userId }) {
    return this.connection.query(
      `SELECT * FROM user_vote WHERE comment_id = ? AND user_id = ?`,
      [commentId, userId]
    );
  }

  deleteVote({ commentId, userId }) {
    return this.connection.query(
      `DELETE FROM user_vote WHERE comment_id = ? AND user_id = ?`,
      [commentId, userId]
    );
  }

  addVote({ commentId, userId }) {
    return this.connection.query(
      `INSERT INTO user_vote (comment_id, user_id) VALUES (?, ?)`,
      [commentId, userId]
    );
  }

  browseVote(commentId) {
    return this.connection.query(
      `SELECT * FROM user_vote WHERE comment_id = ?`,
      [commentId]
    );
  }
}

module.exports = CommentManager;
