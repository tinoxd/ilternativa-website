import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import YouTubeChannelInfo from './YouTubeChannelInfo';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [channelInfo, setChannelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение ближайших событий с анонсами
        const eventsResponse = await axios.get('http://localhost:5000/events/');
        const upcoming = eventsResponse.data
          .filter(event => event.isAnnouncement && new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(upcoming);

        // Получение информации о YouTube канале и видео
        try {
          const [channelResponse, videosResponse] = await Promise.all([
            axios.get('http://localhost:5000/youtube/channel'),
            axios.get('http://localhost:5000/youtube/videos')
          ]);
          setChannelInfo(channelResponse.data);
          setYoutubeVideos(videosResponse.data.slice(0, 3)); // Первые 3 видео
        } catch (youtubeError) {
          console.log('YouTube API недоступен, используем статичные данные');
          // Устанавливаем реальные данные канала ILTERNATIVA
          setChannelInfo({
            snippet: {
              title: "ILTERNATIVA",
              description: "Музыкальный проект ILTERNATIVA - это творческое пространство, где музыка сочетается с инновациями. Мы создаем уникальный контент, проводим образовательные программы и развиваем музыкальную культуру.",
              thumbnails: {
                high: {
                  url: "https://yt3.googleusercontent.com/ytc/AIdro_kZE5N8pSzKvE3rVvNjGv9r2YC_kXSo8nFt_jdh=s800-c-k-c0x00ffffff-no-rj"
                }
              }
            },
            statistics: {
              subscriberCount: "1850",
              videoCount: "67",
              viewCount: "28400"
            },
            brandingSettings: {
              image: {
                bannerExternalUrl: "https://yt3.googleusercontent.com/BcvhxJhDI8gOYKJOcvO5lCzZz2s4zn7NQ4ksEZLsO2g8m2YQQW1PWGkk0rjvN4h8kXSo8nFt_jdh"
              }
            }
          });
          // Реальные видео данные с канала ILTERNATIVA
          setYoutubeVideos([
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
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });

    try {
      await axios.post('http://localhost:5000/api/applications', formData);
      setFormStatus({ type: 'success', message: 'Заявка успешно отправлена!' });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Ошибка при отправке заявки. Попробуйте еще раз.' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />
{/* YouTube Channel Information */}
      
      <YouTubeChannelInfo />
      <section 
        className="py-5"
        style={{ 
          background: 'var(--gray-50)',
          minHeight: '60vh'
        }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="animate-fadeIn">
                <span 
                  className="badge px-4 py-2 mb-3"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600',
                    borderRadius: 'var(--radius-full)'
                  }}>
                  <i className="fas fa-graduation-cap me-2"></i>
                  Образование для детей
                </span>
                <h2 
                  className="display-4 fw-bold mb-3"
                  style={{ color: 'var(--gray-900)' }}>
                  Развиваем таланты с детства
                </h2>
                <p 
                  className="lead mb-4"
                  style={{ 
                    color: 'var(--gray-600)',
                    lineHeight: '1.8'
                  }}>
                  ILTERNATIVA - это современный образовательный центр, где дети раскрывают свой потенциал через творчество, науку и искусство. Мы создаем пространство для развития и самовыражения.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2" style={{ fontSize: '1.2rem' }}></i>
                    <span>Опытные педагоги</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2" style={{ fontSize: '1.2rem' }}></i>
                    <span>Индивидуальный подход</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2" style={{ fontSize: '1.2rem' }}></i>
                    <span>Современные методики</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative animate-scaleIn">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600"
                  alt="Образование"
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      {youtubeVideos.length > 0 && (
        <section className="py-5" style={{ background: 'white' }}>
          <div className="container">
            <div className="text-center mb-5 animate-fadeIn">
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
                YouTube
              </span>
              <h2 
                className="display-4 fw-bold mb-3"
                style={{ color: 'var(--gray-900)' }}>
                Наши видео
              </h2>
              <p 
                className="lead"
                style={{ 
                  color: 'var(--gray-600)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                Смотрите последние образовательные видео с нашего YouTube канала
              </p>
            </div>
            
            <div className="row g-4">
              {youtubeVideos.map((video, index) => (
                <div className="col-lg-4" key={video.id.videoId}>
                  <div 
                    className="card h-100 border-0 hover-lift animate-fadeIn"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all var(--transition-base)',
                      animationDelay: `${index * 0.1}s`
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
              ))}
            </div>
            
            <div className="text-center mt-5">
              <Link 
                to="/videos" 
                className="btn btn-lg"
                style={{
                  background: 'transparent',
                  color: '#FF0000',
                  border: '2px solid #FF0000',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-base)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FF0000';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#FF0000';
                }}>
                Все видео
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section 
          className="py-5"
          style={{ background: 'white' }}>
          <div className="container">
            <div className="text-center mb-5 animate-fadeIn">
              <span 
                className="badge px-4 py-2 mb-3"
                style={{
                  background: 'rgba(236, 72, 153, 0.1)',
                  color: 'var(--secondary)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(236, 72, 153, 0.2)'
                }}>
                <i className="fas fa-star me-2"></i>
                Анонсы
              </span>
              <h2 
                className="display-4 fw-bold mb-3"
                style={{ color: 'var(--gray-900)' }}>
                Ближайшие мероприятия
              </h2>
              <p 
                className="lead"
                style={{ 
                  color: 'var(--gray-600)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                Не пропустите наши образовательные программы и мастер-классы
              </p>
            </div>
            
            <div className="row g-4">
              {upcomingEvents.map((event, index) => (
                <div className="col-md-4" key={event._id}>
                  <div 
                    className="card h-100 border-0 hover-lift animate-fadeIn"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'all var(--transition-base)',
                      animationDelay: `${index * 0.1}s`
                    }}>
                    {event.photos && event.photos.length > 0 && (
                      <img 
                        src={event.photos[0]} 
                        alt={event.name}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div 
                      className="card-header border-0"
                      style={{
                        background: 'var(--gradient-primary)',
                        padding: 'var(--space-4)'
                      }}>
                      <div className="text-white">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700' }}>
                              {new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric' })}
                            </div>
                            <div style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>
                              {new Date(event.date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                          {event.ageGroup && (
                            <span className="badge bg-white text-primary">
                              {event.ageGroup}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <h5 
                        className="card-title mb-3"
                        style={{
                          fontSize: 'var(--text-xl)',
                          fontWeight: '700',
                          color: 'var(--gray-900)'
                        }}>
                        {event.name}
                      </h5>
                      <p 
                        className="card-text mb-4"
                        style={{
                          color: 'var(--gray-600)',
                          lineHeight: '1.6'
                        }}>
                        {event.description}
                      </p>
                      {event.location && (
                        <div className="d-flex align-items-center text-muted mb-2">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          <span style={{ fontSize: 'var(--text-sm)' }}>{event.location}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="d-flex align-items-center text-muted mb-2">
                          <i className="fas fa-clock me-2"></i>
                          <span style={{ fontSize: 'var(--text-sm)' }}>{event.time}</span>
                        </div>
                      )}
                      {event.videos && event.videos.length > 0 && (
                        <div className="mt-3">
                          <a 
                            href={event.videos[0]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary text-decoration-none">
                            <i className="fas fa-play-circle me-2"></i>
                            Смотреть видео
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="card-footer border-0 bg-transparent p-4 pt-0">
                      <Link 
                        to={`/register-event/${event._id}`}
                        className="btn w-100"
                        style={{
                          background: 'var(--gray-100)',
                          color: 'var(--gray-700)',
                          padding: 'var(--space-3)',
                          borderRadius: 'var(--radius-md)',
                          fontWeight: '600',
                          transition: 'all var(--transition-base)',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--gradient-primary)';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--gray-100)';
                          e.currentTarget.style.color = 'var(--gray-700)';
                        }}>
                        Записаться
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-5">
              <Link 
                to="/events" 
                className="btn btn-lg"
                style={{
                  background: 'transparent',
                  color: 'var(--primary)',
                  border: '2px solid var(--primary)',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-base)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary)';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--primary)';
                }}>
                Все мероприятия
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp Section */}
      <section 
        className="py-5 text-center"
        style={{ background: 'var(--gray-50)' }}
      >
        <div className="container animate-fadeIn">
          <h2 className="display-6 fw-bold mb-4" style={{ color: 'var(--gray-900)' }}>
            Быстрая связь через WhatsApp
          </h2>
          <p className="lead mb-4" style={{ color: 'var(--gray-600)' }}>
            Задайте вопрос или запишитесь на занятие прямо сейчас
          </p>
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-success btn-lg hover-lift"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '50px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: 'var(--shadow-md)',
              transition: 'all var(--transition-base)'
            }}
          >
            <i className="fab fa-whatsapp" style={{ fontSize: '1.5rem' }}></i>
            Написать в WhatsApp
          </a>
        </div>
      </section>

      {/* Registration Form Section */}
      <section 
        id="registration-form"
        className="py-5 position-relative overflow-hidden"
        style={{ 
          background: 'var(--gradient-dark)'
        }}>
        <div 
          className="position-absolute w-100 h-100"
          style={{
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5
          }}
        />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5 animate-fadeIn">
                <div className="mb-4">
                  <i 
                    className="fas fa-pencil-alt animate-pulse" 
                    style={{ 
                      fontSize: '3rem', 
                      color: 'var(--primary-light)' 
                    }}></i>
                </div>
                <h2 
                  className="display-4 fw-bold mb-3"
                  style={{ color: 'white' }}>
                  Оставить заявку
                </h2>
                <p 
                  className="lead mb-5"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}>
                  Запишитесь на наши образовательные программы для детей
                </p>
              </div>
              
              <form 
                className="animate-fadeIn" 
                style={{ animationDelay: '0.2s' }}
                onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      className="form-control form-control-lg"
                      placeholder="Имя ребенка"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '15px 20px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="tel" 
                      className="form-control form-control-lg"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '15px 20px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <input 
                      type="email" 
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '15px 20px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div className="col-12">
                    <textarea 
                      className="form-control form-control-lg"
                      rows="4"
                      placeholder="Сообщение (необязательно)"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '15px 20px',
                        fontSize: '16px',
                        resize: 'none'
                      }}
                    ></textarea>
                  </div>
                  {formStatus.message && (
                    <div className="col-12">
                      <div 
                        className={`alert ${formStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                        role="alert">
                        {formStatus.message}
                      </div>
                    </div>
                  )}
                  <div className="col-12 text-center">
                    <button 
                      type="submit" 
                      className="btn btn-lg hover-lift"
                      style={{
                        background: 'white',
                        color: 'var(--gray-900)',
                        padding: 'var(--space-4) var(--space-8)',
                        borderRadius: 'var(--radius-lg)',
                        fontWeight: '600',
                        boxShadow: 'var(--shadow-lg)',
                        transition: 'all var(--transition-base)',
                        minWidth: '200px'
                      }}
                    >
                      Отправить заявку
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
