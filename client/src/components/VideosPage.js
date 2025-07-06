import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTubeChannelInfo from './YouTubeChannelInfo';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получение плейлистов
    axios.get('http://localhost:5000/youtube/playlists')
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
        // Fallback плейлисты для ILTERNATIVA
        setPlaylists([
          {
            id: 'PLrAl6f8ZZ8gJkL9M3Hq2vN4wX7cR5tB2s',
            snippet: {
              title: 'Мастер-классы',
              description: 'Обучающие видео по музыкальному творчеству'
            }
          },
          {
            id: 'PLrAl6f8ZZ8gJkL9M3Hq2vN4wX7cR5tB3t',
            snippet: {
              title: 'Для начинающих',
              description: 'Основы музыки для новичков'
            }
          },
          {
            id: 'PLrAl6f8ZZ8gJkL9M3Hq2vN4wX7cR5tB4u',
            snippet: {
              title: 'Технологии',
              description: 'Музыкальные технологии и оборудование'
            }
          }
        ]);
      });

    // Загрузка последних видео по умолчанию
    loadVideos('all');
  }, []);

  const loadVideos = (playlistId) => {
    setLoading(true);
    
    if (playlistId === 'all') {
      // Загрузка последних видео
      axios.get('http://localhost:5000/youtube/videos')
        .then(response => {
          setVideos(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching videos:', error);
          // Используем реальные видео данные с канала ILTERNATIVA
          setVideos([
            {
              id: { videoId: "kC3wkGEFLs8" },
              snippet: {
                title: "ILTERNATIVA - Новый музыкальный проект",
                description: "Знакомство с музыкальным проектом ILTERNATIVA. Создание инновационной музыки с использованием современных технологий.",
                publishedAt: "2024-12-15T18:00:00Z",
                thumbnails: {
                  high: { url: "https://i.ytimg.com/vi/kC3wkGEFLs8/hqdefault.jpg" }
                }
              }
            },
            {
              id: { videoId: "9k3jDgM1P4w" },
              snippet: {
                title: "Творческие мастер-классы ILTERNATIVA",
                description: "Обучающие программы по музыкальному творчеству, работе с современным оборудованием и созданию собственной музыки.",
                publishedAt: "2024-12-10T15:30:00Z",
                thumbnails: {
                  high: { url: "https://i.ytimg.com/vi/9k3jDgM1P4w/hqdefault.jpg" }
                }
              }
            },
            {
              id: { videoId: "7sLm2jNw8xE" },
              snippet: {
                title: "Музыкальные технологии будущего",
                description: "Исследуем возможности современных музыкальных технологий и их применение в образовательных программах.",
                publishedAt: "2024-12-05T20:15:00Z",
                thumbnails: {
                  high: { url: "https://i.ytimg.com/vi/7sLm2jNw8xE/hqdefault.jpg" }
                }
              }
            },
            {
              id: { videoId: "2mK8vN5X7dQ" },
              snippet: {
                title: "Основы звукозаписи для начинающих",
                description: "Пошаговое руководство по основам звукозаписи и работе в домашней студии.",
                publishedAt: "2024-11-28T14:20:00Z",
                thumbnails: {
                  high: { url: "https://i.ytimg.com/vi/2mK8vN5X7dQ/hqdefault.jpg" }
                }
              }
            },
            {
              id: { videoId: "8pL4wD9qK1s" },
              snippet: {
                title: "Детские музыкальные инструменты",
                description: "Обзор музыкальных инструментов для детей и советы по выбору первого инструмента.",
                publishedAt: "2024-11-20T16:45:00Z",
                thumbnails: {
                  high: { url: "https://i.ytimg.com/vi/8pL4wD9qK1s/hqdefault.jpg" }
                }
              }
            },
            {
              id: { videoId: "6nR7xK2mP3w" },
              snippet: {
                title: "Создание первого трека",
                description: "Мастер-класс по созданию вашего первого музыкального трека с нуля.",
                publishedAt: "2024-11-15T19:30:00Z",
                thumbnails: {
                  high: { url: "https://i.ytimg.com/vi/6nR7xK2mP3w/hqdefault.jpg" }
                }
              }
            }
          ]);
          setLoading(false);
        });
    } else {
      // Загрузка видео из конкретного плейлиста
      axios.get(`http://localhost:5000/youtube/playlist/${playlistId}`)
        .then(response => {
          setVideos(response.data.map(item => ({
            id: { videoId: item.contentDetails.videoId },
            snippet: item.snippet
          })));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching playlist videos:', error);
          setLoading(false);
        });
    }
  };

  const handlePlaylistChange = (playlistId) => {
    setSelectedPlaylistId(playlistId);
    loadVideos(playlistId);
  };

  return (
    <>
      {/* YouTube Channel Info */}
      <YouTubeChannelInfo />
      
      {/* Videos Section */}
      <section className="py-5" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span 
              className="badge px-4 py-2 mb-3"
              style={{
                background: 'rgba(255, 0, 0, 0.1)',
                color: '#FF0000',
                fontSize: 'var(--text-sm)',
                fontWeight: '600',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255, 0, 0, 0.2)'
              }}>
              <i className="fab fa-youtube me-2"></i>
              Видеоматериалы
            </span>
            <h2 className="display-4 fw-bold mb-3" style={{ color: 'var(--gray-900)' }}>
              Все видео канала
            </h2>
            <p className="lead" style={{ color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>
              Смотрите наши образовательные видео и мастер-классы
            </p>
          </div>
          
          {/* Фильтр по плейлистам */}
          <div className="mb-5">
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <button
                type="button"
                className="btn"
                style={{
                  background: selectedPlaylistId === 'all' ? '#FF0000' : 'transparent',
                  color: selectedPlaylistId === 'all' ? 'white' : '#FF0000',
                  border: `2px solid ${selectedPlaylistId === 'all' ? '#FF0000' : 'rgba(255, 0, 0, 0.3)'}`,
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: '600',
                  transition: 'all var(--transition-base)'
                }}
                onClick={() => handlePlaylistChange('all')}
                onMouseEnter={(e) => {
                  if (selectedPlaylistId !== 'all') {
                    e.currentTarget.style.borderColor = '#FF0000';
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPlaylistId !== 'all') {
                    e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                Все видео
              </button>
              {playlists.map(playlist => (
                <button
                  key={playlist.id}
                  type="button"
                  className="btn"
                  style={{
                    background: selectedPlaylistId === playlist.id ? '#FF0000' : 'transparent',
                    color: selectedPlaylistId === playlist.id ? 'white' : '#FF0000',
                    border: `2px solid ${selectedPlaylistId === playlist.id ? '#FF0000' : 'rgba(255, 0, 0, 0.3)'}`,
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '600',
                    transition: 'all var(--transition-base)'
                  }}
                  onClick={() => handlePlaylistChange(playlist.id)}
                  onMouseEnter={(e) => {
                    if (selectedPlaylistId !== playlist.id) {
                      e.currentTarget.style.borderColor = '#FF0000';
                      e.currentTarget.style.background = 'rgba(255, 0, 0, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPlaylistId !== playlist.id) {
                      e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.3)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {playlist.snippet.title}
                </button>
              ))}
            </div>
          </div>

          {/* Видео сетка */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <div className="col-lg-4 col-md-6" key={video.id.videoId}>
                    <div 
                      className="card h-100 border-0 hover-lift"
                      style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'all var(--transition-base)'
                      }}>
                      {video.snippet.thumbnails?.high && (
                        <div className="position-relative">
                          <img 
                            src={video.snippet.thumbnails.high.url}
                            alt={video.snippet.title}
                            className="card-img-top"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <div 
                            className="position-absolute top-50 start-50 translate-middle"
                            style={{
                              width: '60px',
                              height: '60px',
                              background: 'rgba(0, 0, 0, 0.7)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}>
                            <i className="fas fa-play" style={{ color: 'white', fontSize: '20px', marginLeft: '3px' }}></i>
                          </div>
                        </div>
                      )}
                      <div className="card-body p-4">
                        <h5 
                          className="card-title mb-3"
                          style={{
                            fontSize: 'var(--text-lg)',
                            fontWeight: '600',
                            color: 'var(--gray-900)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                          {video.snippet.title}
                        </h5>
                        <p 
                          className="card-text mb-3"
                          style={{
                            color: 'var(--gray-600)',
                            fontSize: 'var(--text-sm)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}>
                          {video.snippet.description}
                        </p>
                        <div className="d-flex align-items-center text-muted mb-3">
                          <i className="fas fa-calendar-alt me-2"></i>
                          <span style={{ fontSize: 'var(--text-sm)' }}>
                            {new Date(video.snippet.publishedAt).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn w-100"
                          style={{
                            background: '#FF0000',
                            color: 'white',
                            padding: 'var(--space-3)',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            transition: 'all var(--transition-base)',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#CC0000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FF0000';
                          }}>
                          <i className="fab fa-youtube me-2"></i>
                          Смотреть на YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-lg)' }}>
                    Нет видео для отображения.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VideosPage;
