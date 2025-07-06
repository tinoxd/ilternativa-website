import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: 'fab fa-youtube', url: 'https://www.youtube.com/channel/UCIKW8S2eErFK8U1YNIvKd1g', label: 'YouTube' },
    { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
    { icon: 'fab fa-twitter', url: '#', label: 'Twitter' },
    { icon: 'fab fa-spotify', url: '#', label: 'Spotify' },
  ];

  const quickLinks = [
    { path: '/', label: 'Главная' },
    { path: '/videos', label: 'Видео' },
    { path: '/events', label: 'События' },
    { path: '/about', label: 'О нас' },
    { path: '/contact', label: 'Контакты' },
  ];

  return (
    <footer 
      className="mt-auto"
      style={{
        background: 'var(--gradient-dark)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      {/* Background Pattern */}
      <div 
        className="position-absolute w-100 h-100"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5
        }}
      />
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Main Footer Content */}
        <div className="py-5">
          <div className="row g-5">
            {/* Brand Section */}
            <div className="col-lg-4">
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--gradient-primary)',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 'var(--space-3)',
                      boxShadow: 'var(--shadow-md)'
                    }}>
                    <i className="fas fa-music" style={{ fontSize: '1.5rem' }}></i>
                  </div>
                  <h3 
                    className="mb-0"
                    style={{
                      fontSize: 'var(--text-2xl)',
                      fontWeight: '800',
                      letterSpacing: '-0.02em'
                    }}>
                    Ilternativa
                  </h3>
                </div>
                <p 
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    maxWidth: '300px'
                  }}>
                  Музыкальный проект, объединяющий альтернативное звучание, 
                  творческую свободу и инновационный подход к искусству
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <h5 
                  className="mb-3"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                  Следите за нами
                </h5>
                <div className="d-flex gap-2">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-lift"
                      style={{
                        width: '45px',
                        height: '45px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all var(--transition-base)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--gradient-primary)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      aria-label={link.label}>
                      <i className={link.icon} style={{ fontSize: '1.2rem' }}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="col-lg-2 col-md-4">
              <h5 
                className="mb-4"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: '700'
                }}>
                Быстрые ссылки
              </h5>
              <ul className="list-unstyled">
                {quickLinks.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link 
                      to={link.path}
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        transition: 'all var(--transition-base)',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'white';
                        e.target.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                        e.target.style.transform = 'translateX(0)';
                      }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className="col-lg-3 col-md-4">
              <h5 
                className="mb-4"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: '700'
                }}>
                Контакты
              </h5>
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <i 
                    className="fas fa-envelope me-3" 
                    style={{ 
                      color: 'var(--primary-light)',
                      width: '20px'
                    }}></i>
                  <a 
                    href="mailto:info@ilternativa.com"
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-base)'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'white'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}>
                    info@ilternativa.com
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <i 
                    className="fas fa-phone me-3" 
                    style={{ 
                      color: 'var(--primary-light)',
                      width: '20px'
                    }}></i>
                  <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    +7 (XXX) XXX-XX-XX
                  </span>
                </div>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="col-lg-3 col-md-4">
              <h5 
                className="mb-4"
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: '700'
                }}>
                Подписка на новости
              </h5>
              <p 
                className="mb-3"
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: 'var(--text-sm)'
                }}>
                Получайте последние новости и обновления
              </p>
              <form className="d-flex">
                <input 
                  type="email" 
                  className="form-control"
                  placeholder="Ваш email"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
                    padding: 'var(--space-3)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
                <button 
                  type="submit" 
                  className="btn"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    padding: '0 var(--space-4)',
                    fontWeight: '600',
                    transition: 'transform var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div 
          className="py-4"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p 
                className="mb-0"
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: 'var(--text-sm)'
                }}>
                &copy; {new Date().getFullYear()} Ilternativa. Все права защищены.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-inline-flex gap-3">
                <a 
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}>
                  Политика конфиденциальности
                </a>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
                <a 
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                    transition: 'color var(--transition-base)'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}>
                  Условия использования
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
