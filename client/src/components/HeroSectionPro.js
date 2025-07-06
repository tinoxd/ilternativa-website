import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSectionPro = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Simulate video loading
    setTimeout(() => setVideoLoaded(true), 1000);
  }, []);

  return (
    <section className="hero-pro">
      {/* Background Video/Image */}
      <div className="hero-pro-bg">
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            opacity: 0.95,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            transform: videoLoaded ? 'scale(1)' : 'scale(1.1)',
            transition: 'transform 20s ease-out',
          }}
        />
        
        {/* Animated particles */}
        <div className="particles" style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'rgba(255, 51, 51, 0.5)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 20}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container-pro">
        <div className="hero-pro-content animate-fadeIn">
          {/* Badge */}
          <div
            className="mb-4"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 24px',
              background: 'rgba(255, 51, 51, 0.1)',
              border: '1px solid rgba(255, 51, 51, 0.3)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-semibold)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <i className="fas fa-graduation-cap me-2"></i>
            Образовательный проект с 2021 года
          </div>

          {/* Title */}
          <h1 className="hero-pro-title" style={{ color: 'white' }}>
            Добро пожаловать в
            <br />
            <span style={{ color: 'var(--accent)' }}>ИЛЬТЕРНАТИВУ</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-pro-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Проект по альтернативному образованию для детей.
            <br />
            Познавательные выезды, научные квесты, практические занятия.
          </p>

          {/* CTA Buttons */}
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link to="/events" className="btn-pro btn-pro-accent btn-pro-lg">
              <i className="fas fa-bus me-2"></i>
              Записаться на выезд
            </Link>
            <Link to="/videos" className="btn-pro btn-pro-outline btn-pro-lg" style={{ borderColor: 'white', color: 'white' }}>
              <i className="fas fa-photo-video me-2"></i>
              Фото и видео
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-5 d-flex flex-wrap gap-5 justify-content-center">
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent)' }}>
                4+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'var(--text-sm)' }}>
                Года работы
              </div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent)' }}>
                100+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'var(--text-sm)' }}>
                Мероприятий
              </div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--accent)' }}>
                500+
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'var(--text-sm)' }}>
                Детей участников
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="position-absolute"
            style={{
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite',
            }}
          >
            <i
              className="fas fa-chevron-down"
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            ></i>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(30px);
          }
          66% {
            transform: translateY(30px) translateX(-30px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSectionPro;
