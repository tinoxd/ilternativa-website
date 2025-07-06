
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeVideos = ({ playlistId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (playlistId) {
      axios.get(`/youtube/playlist/${playlistId}`)
        .then(response => {
          // YouTube API для playlistItems возвращает немного другую структуру
          // video.id.videoId становится video.contentDetails.videoId
          setVideos(response.data.map(item => ({
            id: { videoId: item.contentDetails.videoId },
            snippet: item.snippet
          })));
        })
        .catch(error => {
          console.error('Error fetching playlist videos:', error);
        });
    } else {
      // Если playlistId не передан, загружаем последние видео канала
      axios.get('/youtube/videos')
        .then(response => {
          setVideos(response.data);
        })
        .catch(error => {
          console.error('Error fetching latest videos:', error);
        });
    }
  }, [playlistId]); // Зависимость от playlistId, чтобы перезагружать видео при смене плейлиста

  return (
    <div className="container mt-4">
      <h2>Видео</h2>
      <div className="row">
        {videos.length > 0 ? (
          videos.map(video => (
            <div className="col-md-4 mb-4" key={video.id.videoId}>
              <div className="card">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.snippet.title}
                ></iframe>
                <div className="card-body">
                  <h5 className="card-title">{video.snippet.title}</h5>
                  <p className="card-text">{video.snippet.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Загрузка видео или нет видео в этом плейлисте.</p>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideos;
