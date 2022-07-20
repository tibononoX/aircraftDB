const jwt = require("jsonwebtoken");

const models = require("../models");

class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send("You must provide an email and a password");
    }

    try {
      const user = await models.user.findByEmail(email);
      if (!user[0]) {
        return res.status(404).send(`User with email "${email}" not found`);
      }

      //  Checks password and create accessToken
      if (await models.user.passwordCheck(email, password)) {
        const token = jwt.sign(
          {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            role: user[0].role,
          },
          process.env.ACCESS_JWT_SECRET,
          { expiresIn: process.env.ACCESS_JWT_EXPIRESIN }
        );
        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json(user[0]);
      }
      return res.status(403).send("Invalid creditentials");
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  // Checks if the user is logged in, if yes, removes the accessToken, if not, a user trying to disconnect while not being connected is a teapot
  static logout = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(418).send("You are not logged in, teapot");
    }
    return res.clearCookie("accessToken").sendStatus(200);
  };

  // Checks if user is connected by verifying an accessToken is here, if not, reject the request
  static isUserConnected = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).send("You are not logged in");
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.userId = decoded.id;
      req.userName = decoded.username;
      req.userEmail = decoded.email;
      req.userRole = decoded.role;
      return next();
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  // Checks if user role is ADMIN, if it's not, reject the request
  static isUserAdmin = (req, res, next) => {
    if (!req.userId || !req.userRole) {
      return res.status(404).send("Connected user role and ID required");
    }
    if (req.userRole === "Admin") {
      return next();
    }
    return res.status(403).send("This account does not have admin rights");
  };

  //  Checks if user role is ADMIN or SUPER_ADMIN, or if the user ID is the same as the parameter ID, if none is true then sends an error
  static isUserAllowedToGet = (req, res, next) => {
    if (
      req.userRole === "ADMIN" ||
      parseInt(req.params.id, 10) === req.userId
    ) {
      return next();
    }
    return res
      .status(403)
      .send("You do not have the right to read other accounts than yours!");
  };

  // Checks if the account to modify exists, then go next() if the user is super-admin, if not, check if the account to modify has admin or super-admin rights, then restrict admins to be unable to modify other admin accounts if they're not super-admin. Admins can only modify non-admin accounts while super-admin can modify all accounts
  static isUserAllowedToModifyUser = async (req, res, next) => {
    if (!req.userRole || !req.userId) {
      return res.status(404).send("Connected user role and ID required");
    }
    try {
      const accountExists = await models.user.accountExistCheck(
        parseInt(req.params.id, 10)
      );
      if (!accountExists) {
        return res
          .status(404)
          .send(
            `Can not modify user ${req.params.id}, because it does not exists`
          );
      }
      if (req.userRole === "SUPER_ADMIN") {
        return next();
      }
      if (req.userId !== parseInt(req.params.id, 10)) {
        const isAdmin = await models.user.accountAdminCheck(
          parseInt(req.params.id, 10),
          false
        );
        const isSuperAdmin = await models.user.accountAdminCheck(
          parseInt(req.params.id, 10),
          true
        );
        if (isAdmin && req.userRole !== "SUPER_ADMIN") {
          return res
            .status(403)
            .send("You need to be super-admin to modify another admin account");
        }
        if (isSuperAdmin && req.userRole !== "SUPER_ADMIN") {
          return res
            .status(403)
            .send("Super-admin account can only be modified by himself");
        }
        if (req.body.role === "ADMIN" && req.userRole !== "SUPER_ADMIN") {
          return res
            .status(403)
            .send("You need to be super-admin to upgrade an adherent to admin");
        }
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return next();
  };
}

module.exports = AuthController;
