import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {

  return (
    <section 
      className="hero-section position-relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-dark)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px'
      }}>
      
      {/* Animated Background */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
          zIndex: 1
        }}
      />
      
      {/* Floating Elements */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 1 }}>
        <div 
          className="position-absolute animate-float"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '10%',
            left: '-150px',
            filter: 'blur(40px)'
          }}
        />
        <div 
          className="position-absolute animate-float"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            bottom: '10%',
            right: '-200px',
            filter: 'blur(60px)',
            animationDelay: '2s'
          }}
        />
      </div>
      
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center">
          <div className="col-lg-7 animate-fadeIn">
            <div className="mb-4">
              <span 
                className="badge px-4 py-2 mb-3 d-inline-block"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--white)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}>
                <i className="fab fa-youtube me-2"></i>
                YouTube Канал
              </span>
            </div>
            
            <h1 
              className="display-1 fw-bold mb-4"
              style={{
                color: 'var(--white)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}>
              ILTERNATIVA
            </h1>
            
            <p 
              className="lead mb-5"
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 'var(--text-xl)',
                maxWidth: '600px'
              }}>
              Откройте мир знаний и творчества для вашего ребенка. Современные образовательные программы для всестороннего развития
            </p>
            
            <div className="d-flex flex-wrap gap-4 mb-5">
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <i className="fas fa-child" style={{ color: 'var(--white)' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'var(--white)', fontSize: 'var(--text-2xl)', fontWeight: '700' }}>
                      500+
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)' }}>
                      счастливых учеников
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <i className="fas fa-award" style={{ color: 'var(--white)' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'var(--white)', fontSize: 'var(--text-2xl)', fontWeight: '700' }}>
                      15+
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)' }}>
                      направлений обучения
                    </div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div 
                    className="me-3"
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <i className="fas fa-star" style={{ color: 'var(--white)' }}></i>
                  </div>
                  <div>
                    <div style={{ color: 'var(--white)', fontSize: 'var(--text-2xl)', fontWeight: '700' }}>
                      10+
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)' }}>
                      лет опыта
                    </div>
                  </div>
                </div>
              </div>
            
            <div className="d-flex flex-wrap gap-3">
              <a 
                href="#registration-form" 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#registration-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-lg hover-lift"
                style={{
                  background: 'var(--white)',
                  color: 'var(--gray-900)',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-lg)',
                  transition: 'all var(--transition-base)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}>
                <i className="fas fa-pencil-alt me-2"></i>
                Оставить заявку
              </a>
              
              <Link 
                to="/videos" 
                className="btn btn-lg hover-glow"
                style={{
                  background: '#FF0000',
                  color: 'var(--white)',
                  border: '2px solid #FF0000',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(255, 0, 0, 0.3)',
                  transition: 'all var(--transition-base)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#CC0000';
                  e.currentTarget.style.borderColor = '#CC0000';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(255, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FF0000';
                  e.currentTarget.style.borderColor = '#FF0000';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 0, 0, 0.3)';
                }}>
                <i className="fab fa-youtube me-2"></i>
                Смотреть видео
              </Link>
            </div>
          </div>
          
          <div className="col-lg-5 text-center animate-scaleIn">
              <div className="position-relative d-inline-block">
                <div 
                  className="position-absolute"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'var(--gradient-primary)',
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    opacity: 0.5,
                    transform: 'scale(0.8)'
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400"
                  alt="ILTERNATIVA Education"
                  className="position-relative"
                  style={{ 
                    width: '400px', 
                    height: '400px', 
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="position-absolute animate-pulse"
          style={{
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
            Прокрутите вниз
          </div>
          <i 
            className="fas fa-chevron-down" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: 'var(--text-xl)',
              animation: 'float 2s ease-in-out infinite'
            }}
          ></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
