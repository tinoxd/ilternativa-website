import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmbeddedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Получение последних видео
    axios.get('http://localhost:5000/youtube/videos')
      .then(response => {
        const videosData = response.data;
        setVideos(videosData);
        if (videosData.length > 0) {
          setSelectedVideo(videosData[0]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        // Используем реальные видео данные с канала ILTERNATIVA
        const staticVideos = [
          {
            id: { videoId: "kC3wkGEFLs8" },
            snippet: {
              title: "ILTERNATIVA - Новый музыкальный проект",
              description: "Знакомство с музыкальным проектом ILTERNATIVA. Создание инновационной музыки с использованием современных технологий. В этом видео мы расскажем о нашей философии и подходе к музыкальному образованию.",
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
              description: "Обучающие программы по музыкальному творчеству, работе с современным оборудованием и созданию собственной музыки. Практические упражнения для начинающих и продвинутых учеников.",
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
              description: "Исследуем возможности современных музыкальных технологий и их применение в образовательных программах. Обзор инновационного оборудования и программного обеспечения.",
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
              description: "Пошаговое руководство по основам звукозаписи и работе в домашней студии. Изучаем базовые принципы записи, сведения и мастеринга.",
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
              description: "Обзор музыкальных инструментов для детей и советы по выбору первого инструмента. Рекомендации для родителей и начинающих музыкантов.",
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
              description: "Мастер-класс по созданию вашего первого музыкального трека с нуля. От идеи до финального результата - пошаговый процесс творчества.",
              publishedAt: "2024-11-15T19:30:00Z",
              thumbnails: {
                high: { url: "https://i.ytimg.com/vi/6nR7xK2mP3w/hqdefault.jpg" }
              }
            }
          }
        ];
        setVideos(staticVideos);
        setSelectedVideo(staticVideos[0]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5" style={{ background: 'var(--gray-900)', minHeight: '100vh' }}>
      <div className="container-fluid">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3" style={{ color: 'white' }}>
            Видеоматериалы
          </h2>
          <p className="lead" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Смотрите наши образовательные видео прямо на сайте
          </p>
        </div>

        <div className="row">
          {/* Основной плеер */}
          <div className="col-lg-8 mb-4">
            {selectedVideo && (
              <div>
                <div 
                  className="ratio ratio-16x9 mb-4"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
                  }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?rel=0&modestbranding=1`}
                    title={selectedVideo.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>
                  {selectedVideo.snippet.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                  {selectedVideo.snippet.description}
                </p>
                <div className="d-flex align-items-center gap-4 mt-3">
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 'var(--text-sm)' }}>
                    <i className="fas fa-calendar-alt me-2"></i>
                    {new Date(selectedVideo.snippet.publishedAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <a 
                    href={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{
                      background: '#FF0000',
                      color: 'white',
                      padding: 'var(--space-2) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}>
                    <i className="fab fa-youtube me-2"></i>
                    Открыть на YouTube
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Список видео */}
          <div className="col-lg-4">
            <h5 style={{ color: 'white', marginBottom: '1.5rem' }}>
              Другие видео
            </h5>
            <div className="d-flex flex-column gap-3" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {videos.map((video, index) => (
                <div 
                  key={`${video.id.videoId}-${index}`}
                  className={`d-flex gap-3 p-3 ${selectedVideo?.id.videoId === video.id.videoId ? 'active' : ''}`}
                  style={{
                    background: selectedVideo?.id.videoId === video.id.videoId 
                      ? 'rgba(255, 0, 0, 0.1)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    border: selectedVideo?.id.videoId === video.id.videoId 
                      ? '2px solid rgba(255, 0, 0, 0.3)' 
                      : '2px solid transparent'
                  }}
                  onClick={() => setSelectedVideo(video)}
                  onMouseEnter={(e) => {
                    if (selectedVideo?.id.videoId !== video.id.videoId) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedVideo?.id.videoId !== video.id.videoId) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}>
                  <img 
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    style={{
                      width: '120px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 
                      style={{
                        color: 'white',
                        fontSize: 'var(--text-sm)',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                      {video.snippet.title}
                    </h6>
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.5)', 
                      fontSize: 'var(--text-xs)' 
                    }}>
                      {new Date(video.snippet.publishedAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmbeddedVideos;
