require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = process.env.YOUTUBE_CHANNEL_ID;

async function getChannelInfo() {
  try {
    console.log('Получение информации с канала:', channelId);
    
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id=${channelId}&key=${apiKey}`);
    
    if (response.data.items && response.data.items.length > 0) {
      const channel = response.data.items[0];
      
      console.log('\n=== ИНФОРМАЦИЯ О КАНАЛЕ ===');
      console.log('Название:', channel.snippet.title);
      console.log('Описание:', channel.snippet.description);
      console.log('Подписчики:', channel.statistics.subscriberCount);
      console.log('Всего видео:', channel.statistics.videoCount);
      console.log('Всего просмотров:', channel.statistics.viewCount);
      console.log('Дата создания:', channel.snippet.publishedAt);
      
      if (channel.snippet.thumbnails && channel.snippet.thumbnails.high) {
        console.log('Логотип канала:', channel.snippet.thumbnails.high.url);
      }
      
      if (channel.brandingSettings && channel.brandingSettings.image) {
        console.log('Баннер канала:', channel.brandingSettings.image.bannerExternalUrl);
      }
      
      // Получим последние видео
      const videosResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5&type=video`);
      
      console.log('\n=== ПОСЛЕДНИЕ ВИДЕО ===');
      videosResponse.data.items.forEach((video, index) => {
        console.log(`${index + 1}. ${video.snippet.title}`);
        console.log(`   Дата: ${video.snippet.publishedAt}`);
        console.log(`   ID: ${video.id.videoId}`);
        console.log(`   Миниатюра: ${video.snippet.thumbnails.high.url}`);
        console.log('');
      });
      
    } else {
      console.log('Канал не найден');
    }
    
  } catch (error) {
    console.error('Ошибка:', error.response ? error.response.data : error.message);
  }
}

getChannelInfo();
