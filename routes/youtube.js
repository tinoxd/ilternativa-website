
const router = require('express').Router();
const axios = require('axios');

const channelId = process.env.YOUTUBE_CHANNEL_ID;
const apiKey = process.env.YOUTUBE_API_KEY;

// Маршрут для получения последних видео (существующий)
router.route('/videos').get((req, res) => {
  axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`)
    .then(response => {
      res.json(response.data.items);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Маршрут для получения информации о канале
router.route('/channel').get((req, res) => {
  axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id=${channelId}&key=${apiKey}`)
    .then(response => {
      res.json(response.data.items[0]);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Маршрут для получения плейлистов канала
router.route('/playlists').get((req, res) => {
  axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&key=${apiKey}&maxResults=50`)
    .then(response => {
      res.json(response.data.items);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Маршрут для получения видео из конкретного плейлиста
router.route('/playlist/:playlistId').get((req, res) => {
  const playlistId = req.params.playlistId;
  axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${apiKey}&maxResults=50`)
    .then(response => {
      res.json(response.data.items);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
