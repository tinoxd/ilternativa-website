const mongoose = require('mongoose');

const siteActivitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['page_view', 'event_view', 'registration', 'login', 'api_call']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false
  },
  path: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  },
  ipAddress: {
    type: String,
    required: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Индексы для быстрых запросов
siteActivitySchema.index({ createdAt: -1 });
siteActivitySchema.index({ type: 1, createdAt: -1 });
siteActivitySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('SiteActivity', siteActivitySchema);
