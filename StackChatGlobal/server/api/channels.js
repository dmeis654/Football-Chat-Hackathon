const router = require('express').Router();
const { Channel, Message } = require('../db/models');

module.exports = router;

// GET api/channels
router.get('/', function (req, res, next) {
  Channel.findAll()
    .then(channels => res.json(channels))
    .catch(next);
});

// GET /api/channels/:channelId
router.get('/:channelId', function (req, res, next) {
  Channel.findById(req.params.channelId)
    .then(channel => res.json(channel))
    .catch(next);
});

// GET /api/channels/:channelId/messages
router.get('/:channelId/messages', function (req, res, next) {
  const channelId = req.params.channelId;

  Message.findAll({ where: { channelId } })
    .then(messages => res.json(messages))
    .catch(next);
});

// POST /api/channels
router.post('/', function (req, res, next) {
  Channel.create(req.body)
    .then(channel => res.json(channel))
    .catch(next);
});

// DELETE /api/channels
router.delete('/:channelId', function (req, res, next) {
  const id = req.params.channelId;

  Channel.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
