const models = require("../models");

class CommentController {
  static browseByIdea = async (req, res) => {
    const aircraftId = parseInt(req.query.aircraft, 10);
    if (!aircraftId) {
      return res.status(400).send("Provide an aircraft ID");
    }

    try {
      const [comments] = await models.comment.findByAircraft(aircraftId);
      if (!comments.length) {
        return res
          .status(404)
          .send(
            "Aircraft ID not found or there is not comments for this aircraft"
          );
      }

      return res.json(comments);
    } catch (err) {
      return res.sendStatus(500);
    }
  };

  static read = (req, res) => {
    models.comment
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

  static edit = (req, res) => {
    const comment = req.body;

    // TODO validations (length, format...)

    comment.id = parseInt(req.params.id, 10);

    models.comment
      .update(comment)
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

  static newComment = (req, res) => {
    const comment = req.body;

    if (!comment.text || !comment.idea_id) {
      return res.sendStatus(400);
    }
    models.comment
      .insert({ ...comment, user_id: req.userId })
      .then(([result]) => {
        return res.status(201).send({ ...comment, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
    return null;
  };

  static delete = (req, res) => {
    models.comment
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

module.exports = CommentController;
