/* eslint-disable class-methods-use-this */
const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  hashPassword(userPassword) {
    return argon2.hash(userPassword);
  }

  verifyPassword(userPassword, hashedPassword) {
    return argon2.verify(hashedPassword, userPassword);
  }

  async findByEmail(email) {
    const user = await this.connection.query(
      `SELECT id, username, email, role, creationDate FROM ${UserManager.table} WHERE email = ?`,
      [email]
    );
    return user[0];
  }

  async findById(id) {
    const user = await this.connection.query(
      `SELECT id, username, email, role, creationDate FROM ${UserManager.table} WHERE id = ?`,
      [id]
    );
    return user[0];
  }

  async accountExistCheck(id) {
    const account = await this.connection
      .query(`SELECT id FROM ${this.table} WHERE id = ?`, [id])
      .then((accountId) => accountId[0][0]);
    if (!account) {
      return false;
    }
    return true;
  }

  async accountAdminCheck(id, superAdmin) {
    if (!superAdmin) {
      const isAdmin = await this.connection
        .query(`SELECT role FROM user WHERE id = ?`, [id])
        .then((role) => role[0][0]);
      if (isAdmin.role === "SUPER_ADMIN" || isAdmin.role === "ADMIN") {
        return true;
      }
      return false;
    }
    if (superAdmin) {
      const isSuperAdmin = await this.connection
        .query(`SELECT role FROM user WHERE id = ?`, [id])
        .then((role) => role[0][0]);
      if (isSuperAdmin.role === "SUPER_ADMIN") {
        return true;
      }
      return false;
    }
    return null;
  }

  async passwordCheck(email, userPassword) {
    const password = await this.connection.query(
      `SELECT password FROM ${UserManager.table} WHERE email = ?`,
      [email]
    );
    return this.verifyPassword(userPassword, password[0][0].password);
  }

  find(id) {
    return this.connection.query(
      `SELECT id, username, email, role, creationDate FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT id, username, email, role, creationDate FROM ${this.table}`
    );
  }

  insert(user) {
    const { username, email, password } = user;

    return this.connection.query(
      `INSERT INTO ${UserManager.table} (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );
  }

  updateUser(data, userId) {
    return this.connection.query(
      `UPDATE ${UserManager.table} SET ? WHERE id = ? `,
      [data, userId]
    );
  }

  emailAlreadyExist(email) {
    return this.connection
      .query(`SELECT id FROM ${UserManager.table} WHERE email = ?`, [email])
      .then(([result]) => result.length);
  }

  findImgToDelete(userId) {
    return this.connection
      .query(`SELECT imgLink FROM ${UserManager.table} WHERE id = ?`, [userId])
      .then(([result]) => result[0]);
  }
}

module.exports = UserManager;
