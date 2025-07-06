import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HeroSectionPro from './HeroSectionPro';
import { channelData, videosData } from '../data/ilternativaData';

const HomePro = () => {
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
        // Get events
        const eventsResponse = await axios.get('http://localhost:5000/events/');
        const upcoming = eventsResponse.data
          .filter(event => event.isAnnouncement && new Date(event.date) >= new Date())
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(upcoming);

        // Try to get YouTube data
        try {
          const [channelResponse, videosResponse] = await Promise.all([
            axios.get('http://localhost:5000/youtube/channel'),
            axios.get('http://localhost:5000/youtube/videos')
          ]);
          setChannelInfo(channelResponse.data);
          setYoutubeVideos(videosResponse.data.slice(0, 3));
        } catch (youtubeError) {
          // Use fallback data
          setChannelInfo(channelData);
          setYoutubeVideos(videosData.slice(0, 3));
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

  const features = [
    {
      icon: 'fa-mountain',
      title: 'Познавательные выезды',
      description: 'Образовательные путешествия по Северному Кавказу - Пятигорск, Грозный, Нальчик'
    },
    {
      icon: 'fa-flask',
      title: 'Научные квесты',
      description: 'Увлекательные практические занятия по физике, химии, биологии'
    },
    {
      icon: 'fa-industry',
      title: 'Посещение производств',
      description: 'Экскурсии на фабрики, заводы, аэропорт и другие предприятия'
    },
    {
      icon: 'fa-map-marked-alt',
      title: 'Экскурсии по РСО-Алании',
      description: 'Образовательные мероприятия во Владикавказе и окрестностях'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSectionPro />

      {/* Features Section */}
      <section className="section-pro" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-pro">
          <div className="text-center mb-5">
            <span className="badge" style={{
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              padding: '8px 24px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              marginBottom: 'var(--space-lg)',
              display: 'inline-block'
            }}>
              Что мы предлагаем
            </span>
            <h2 className="animate-fadeIn">Наши направления</h2>
            <p className="lead" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Комплексный подход к образованию через практические занятия и путешествия
            </p>
          </div>

          <div className="grid-pro grid-pro-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-pro animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-pro-icon">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="feature-pro-title">{feature.title}</h3>
                <p className="feature-pro-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      {youtubeVideos.length > 0 && (
        <section className="section-pro">
          <div className="container-pro">
            <div className="text-center mb-5">
              <span className="badge" style={{
                background: 'rgba(255, 0, 0, 0.1)',
                color: '#FF0000',
                padding: '8px 24px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                marginBottom: 'var(--space-lg)',
                display: 'inline-block',
                border: '1px solid rgba(255, 0, 0, 0.2)'
              }}>
                <i className="fab fa-youtube me-2"></i>
                Последние видео
              </span>
              <h2>Наши мероприятия в видео</h2>
              <p className="lead" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Смотрите как проходят наши образовательные выезды и занятия
              </p>
            </div>

            <div className="grid-pro grid-pro-3">
              {youtubeVideos.map((video, index) => (
                <div key={video.id.videoId} className="video-card-pro animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="video-card-pro-image">
                    <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
                    <div className="video-card-pro-play">
                      <i className="fas fa-play" style={{ marginLeft: '2px' }}></i>
                    </div>
                  </div>
                  <div className="video-card-pro-body">
                    <h4 className="video-card-pro-title">{video.snippet.title}</h4>
                    <div className="video-card-pro-meta">
                      <span>
                        <i className="fas fa-calendar-alt me-2"></i>
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
                      className="btn-pro btn-pro-accent btn-pro-sm w-100 mt-3"
                    >
                      <i className="fab fa-youtube me-2"></i>
                      Смотреть видео
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/videos" className="btn-pro btn-pro-outline btn-pro-lg">
                Все видео
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Channel Stats Section */}
      {channelInfo && (
        <section className="section-pro" style={{ background: 'var(--bg-dark)', color: 'var(--text-inverse)' }}>
          <div className="container-pro">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <span className="badge" style={{
                  background: 'rgba(255, 51, 51, 0.2)',
                  color: 'var(--accent)',
                  padding: '8px 24px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  marginBottom: 'var(--space-lg)',
                  display: 'inline-block'
                }}>
                  О проекте
                </span>
                <h2 style={{ color: 'var(--text-inverse)' }}>{channelInfo.snippet.title}</h2>
                <p className="lead" style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: 'var(--space-xl)' }}>
                  {channelInfo.snippet.description}
                </p>
                
                <div className="d-flex flex-wrap gap-4 mb-4">
                  <div>
                    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent)' }}>
                      {parseInt(channelInfo.statistics.subscriberCount).toLocaleString('ru-RU')}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Подписчиков</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent)' }}>
                      {parseInt(channelInfo.statistics.videoCount).toLocaleString('ru-RU')}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Видео</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent)' }}>
                      {parseInt(channelInfo.statistics.viewCount).toLocaleString('ru-RU')}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Просмотров</div>
                  </div>
                </div>

                <a 
                  href={`https://www.youtube.com/channel/${channelInfo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pro btn-pro-accent btn-pro-lg"
                >
                  <i className="fab fa-youtube me-2"></i>
                  Перейти на канал
                </a>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <img 
                    src={channelInfo.snippet.thumbnails.high.url}
                    alt={channelInfo.snippet.title}
                    className="rounded-circle mx-auto d-block"
                    style={{ 
                      width: '300px', 
                      height: '300px', 
                      objectFit: 'cover',
                      border: '4px solid var(--accent)',
                      boxShadow: '0 20px 40px rgba(255, 51, 51, 0.3)'
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '350px',
                      height: '350px',
                      border: '2px solid rgba(255, 51, 51, 0.3)',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="section-pro" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="container-pro">
            <div className="text-center mb-5">
              <span className="badge" style={{
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                padding: '8px 24px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-semibold)',
                marginBottom: 'var(--space-lg)',
                display: 'inline-block'
              }}>
                <i className="fas fa-calendar-alt me-2"></i>
                Ближайшие события
              </span>
              <h2>Мероприятия и мастер-классы</h2>
              <p className="lead" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Присоединяйтесь к нашим образовательным программам и творческим встречам
              </p>
            </div>

            <div className="grid-pro grid-pro-3">
              {upcomingEvents.map((event, index) => (
                <div key={event._id} className="card-pro animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-pro-body">
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'var(--accent-light)',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 'var(--space-md)'
                      }}>
                        <i className="fas fa-calendar" style={{ color: 'var(--accent)', fontSize: '24px' }}></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 'var(--font-semibold)', color: 'var(--accent)' }}>
                          {new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                          {event.time || 'Время уточняется'}
                        </div>
                      </div>
                    </div>
                    <h4>{event.name}</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
                    {event.location && (
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {event.location}
                      </p>
                    )}
                    <Link to={`/register-event/${event._id}`} className="btn-pro btn-pro-primary w-100 mt-3">
                      Записаться
                      <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/events" className="btn-pro btn-pro-outline btn-pro-lg">
                Все мероприятия
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="section-pro">
        <div className="container-pro">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h2>Хотите записать ребенка?</h2>
              <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                Оставьте заявку, и мы свяжемся с вами для записи на ближайшее мероприятие
              </p>
              
              <div className="mt-4">
                <div className="d-flex align-items-center mb-3">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent-light)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 'var(--space-md)'
                  }}>
                    <i className="fas fa-phone" style={{ color: 'var(--accent)' }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-semibold)' }}>Телефон / WhatsApp</div>
                    <div style={{ color: 'var(--text-secondary)' }}>По запросу</div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-3">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent-light)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 'var(--space-md)'
                  }}>
                    <i className="fas fa-envelope" style={{ color: 'var(--accent)' }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-semibold)' }}>Instagram</div>
                    <div style={{ color: 'var(--text-secondary)' }}>@iliya.ilternativa</div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent-light)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 'var(--space-md)'
                  }}>
                    <i className="fab fa-whatsapp" style={{ color: 'var(--accent)' }}></i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-semibold)' }}>Руководитель</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Кудзаева Илия Яковлевна</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="card-pro">
                <div className="card-pro-body">
                  <h3 className="mb-4">Оставить заявку</h3>
                  <form onSubmit={handleSubmit} className="form-pro">
                    <div className="form-group-pro">
                      <label className="form-label-pro">Ваше имя</label>
                      <input
                        type="text"
                        className="form-input-pro"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group-pro">
                      <label className="form-label-pro">Телефон</label>
                      <input
                        type="tel"
                        className="form-input-pro"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group-pro">
                      <label className="form-label-pro">Email</label>
                      <input
                        type="email"
                        className="form-input-pro"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group-pro">
                      <label className="form-label-pro">Сообщение (необязательно)</label>
                      <textarea
                        className="form-input-pro form-textarea-pro"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    
                    {formStatus.message && (
                      <div className={`alert alert-${formStatus.type === 'success' ? 'success' : 'danger'} mb-3`}>
                        {formStatus.message}
                      </div>
                    )}
                    
                    <button type="submit" className="btn-pro btn-pro-accent btn-pro-lg w-100">
                      Отправить заявку
                      <i className="fas fa-paper-plane ms-2"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default HomePro;
