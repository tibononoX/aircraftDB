const models = require("../models");

class FavoriteController {
  static fav = async (req, res) => {
    const { aircraftId } = req.body;
    try {
      const [checkVoted] = await models.favorite.checkAlreadyFaved({
        aircraftId,
        userId: req.userId,
      });
      if (checkVoted.length) {
        await models.favorite.deleteFav({
          aircraftId,
          userId: req.userId,
        });
        return res.status(200).send("deleted vote");
      }
      await models.favorite.addFav({
        aircraftId,
        userId: req.userId,
      });
      return res.status(201).send("added vote");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static browseFav = async (req, res) => {
    try {
      const [favorites] = await models.favorite.browse(req.userId);
      return res.status(200).send(favorites);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = (req, res) => {
    models.favorite
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

module.exports = FavoriteController;
