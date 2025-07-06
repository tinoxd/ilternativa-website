import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { channelData } from '../data/ilternativaData';

const YouTubeChannelInfo = () => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/youtube/channel')
      .then(response => {
        setChannelInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching channel info:', error);
        // Используем централизованные данные канала ILTERNATIVA
        setChannelInfo(channelData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (!channelInfo) {
    return null;
  }

  return (
    <section className="py-5" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 mb-4 mb-lg-0">
            {channelInfo.snippet.thumbnails?.high && (
              <img 
                src={channelInfo.snippet.thumbnails.high.url}
                alt={channelInfo.snippet.title}
                className="img-fluid rounded-circle shadow-lg"
                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
              />
            )}
          </div>
          <div className="col-lg-8">
            <h2 className="display-4 fw-bold mb-3" style={{ color: 'var(--gray-900)' }}>
              {channelInfo.snippet.title}
            </h2>
            <p className="lead mb-4" style={{ color: 'var(--gray-700)' }}>
              {channelInfo.snippet.description}
            </p>
            
            <div className="row g-4">
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <i className="fas fa-users" style={{ color: 'var(--white)', fontSize: '24px' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--gray-900)' }}>
                      {parseInt(channelInfo.statistics.subscriberCount).toLocaleString('ru-RU')}
                    </div>
                    <div style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)' }}>
                      подписчиков
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <i className="fas fa-video" style={{ color: 'var(--white)', fontSize: '24px' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--gray-900)' }}>
                      {parseInt(channelInfo.statistics.videoCount).toLocaleString('ru-RU')}
                    </div>
                    <div style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)' }}>
                      видео
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <i className="fas fa-eye" style={{ color: 'var(--white)', fontSize: '24px' }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--gray-900)' }}>
                      {parseInt(channelInfo.statistics.viewCount).toLocaleString('ru-RU')}
                    </div>
                    <div style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)' }}>
                      просмотров
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <a 
                href={`https://www.youtube.com/channel/${channelInfo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg"
                style={{
                  background: '#FF0000',
                  color: 'white',
                  padding: 'var(--space-3) var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'all var(--transition-base)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#CC0000';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF0000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                <i className="fab fa-youtube me-2"></i>
                Перейти на YouTube канал
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeChannelInfo;
