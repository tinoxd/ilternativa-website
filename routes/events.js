
const router = require('express').Router();
let Event = require('../models/Event.js');
const { adminAuth } = require('../middleware/auth');
const activityTracker = require('../middleware/activityTracker');

// Публичный маршрут - все могут видеть события
router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Защищенный маршрут - только админ может добавлять события
router.route('/add').post(adminAuth, (req, res) => {
  const newEvent = new Event(req.body);

  newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Публичный маршрут - все могут видеть событие по ID
router.route('/:id').get(
  activityTracker('event_view'),
  (req, res) => {
    Event.findById(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(400).json('Error: ' + err));
  }
);

// Защищенный маршрут - только админ может удалять события
router.route('/:id').delete(adminAuth, (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Защищенный маршрут - только админ может обновлять события
router.route('/update/:id').post(adminAuth, (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.name = req.body.name;
      event.description = req.body.description;
      event.date = Date.parse(req.body.date);

      event.save()
        .then(() => res.json('Event updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
