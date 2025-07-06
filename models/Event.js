
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  location: { type: String },
  photos: [{ type: String }], // URL-адреса фотографий
  videos: [{ type: String }], // URL-адреса видео или YouTube ID
  isAnnouncement: { type: Boolean, default: true }, // Показывать как анонс на главной
  maxParticipants: { type: Number },
  ageGroup: { type: String }, // Возрастная группа
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
