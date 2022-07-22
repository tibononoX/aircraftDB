const models = require("../models");

class CommentController {
  static browseByAircraft = async (req, res) => {
    const aircraftId = parseInt(req.query.aircraft, 10);
    if (!aircraftId) {
      return res.status(400).send("Provide an aircraft ID");
    }

    try {
      const [comments] = await models.comment.findByAircraft(aircraftId);
      if (!comments.length) {
        return res.status(200).send([]);
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

    if (!comment.text || !comment.aircraft_id) {
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

  static vote = async (req, res) => {
    const { commentId } = req.body;
    try {
      const [checkVoted] = await models.comment.checkAlreadyVoted({
        commentId,
        userId: req.userId,
      });
      if (checkVoted.length) {
        await models.comment.deleteVote({
          commentId,
          userId: req.userId,
        });
        return res.status(200).send("deleted vote");
      }
      await models.comment.addVote({
        commentId,
        userId: req.userId,
      });
      return res.status(201).send("added vote");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static browseVote = async (req, res) => {
    const commentId = parseInt(req.params.ideaId, 10);
    try {
      const [vote] = await models.comment.browseVote(commentId);
      return res.status(200).send(vote);
    } catch (err) {
      return res.status(500).send(err.message);
    }
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
