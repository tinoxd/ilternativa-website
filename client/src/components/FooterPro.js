import React from 'react';
import { Link } from 'react-router-dom';

const FooterPro = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'О проекте', path: '/about' },
      { label: 'Команда', path: '/team' },
      { label: 'Партнеры', path: '/partners' },
      { label: 'Отзывы', path: '/reviews' },
    ],
    education: [
      { label: 'Программы', path: '/programs' },
      { label: 'Мастер-классы', path: '/events' },
      { label: 'Онлайн курсы', path: '/courses' },
      { label: 'Расписание', path: '/schedule' },
    ],
    resources: [
      { label: 'Блог', path: '/blog' },
      { label: 'YouTube', href: 'https://www.youtube.com/channel/UCIKW8S2eErFK8U1YNIvKd1g' },
      { label: 'Материалы', path: '/materials' },
      { label: 'FAQ', path: '/faq' },
    ],
    contacts: [
      { label: '+7 (999) 123-45-67', icon: 'fa-phone' },
      { label: 'info@ilternativa.com', icon: 'fa-envelope' },
      { label: 'г. Москва, ул. Примерная, 123', icon: 'fa-map-marker-alt' },
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-youtube', href: 'https://www.youtube.com/channel/UCIKW8S2eErFK8U1YNIvKd1g', color: '#FF0000' },
    { icon: 'fab fa-telegram', href: 'https://t.me/ilternativa', color: '#0088cc' },
    { icon: 'fab fa-vk', href: 'https://vk.com/ilternativa', color: '#4680C2' },
    { icon: 'fab fa-instagram', href: 'https://instagram.com/ilternativa', color: '#E4405F' },
  ];

  return (
    <footer className="footer-pro">
      <div className="container-pro">
        {/* Main Footer Content */}
        <div className="footer-pro-grid">
          {/* Brand Column */}
          <div>
            <Link to="/" className="d-inline-block mb-4 text-decoration-none">
              <h3 style={{ color: 'var(--text-inverse)', fontWeight: 'var(--font-black)' }}>
                <span style={{ color: 'var(--accent)' }}>IL</span>TERNATIVA
              </h3>
            </Link>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: 'var(--space-xl)' }}>
              Музыкальный проект нового поколения. Создаем будущее музыкального образования вместе.
            </p>
            
            {/* Social Links */}
            <div className="d-flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all var(--transition-base)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = social.color;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="footer-pro-title">О компании</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.company.map((link, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to={link.path} className="footer-pro-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Education Links */}
          <div>
            <h5 className="footer-pro-title">Обучение</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.education.map((link, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-sm)' }}>
                  <Link to={link.path} className="footer-pro-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h5 className="footer-pro-title">Ресурсы</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.resources.map((link, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-sm)' }}>
                  {link.href ? (
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="footer-pro-link"
                    >
                      {link.label}
                      <i className="fas fa-external-link-alt ms-1" style={{ fontSize: '12px' }}></i>
                    </a>
                  ) : (
                    <Link to={link.path} className="footer-pro-link">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="footer-pro-title">Контакты</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.contacts.map((contact, index) => (
                <li key={index} style={{ marginBottom: 'var(--space-md)' }}>
                  <div className="d-flex align-items-center">
                    <i 
                      className={`fas ${contact.icon}`} 
                      style={{ 
                        color: 'var(--accent)', 
                        marginRight: 'var(--space-sm)',
                        width: '20px'
                      }}
                    ></i>
                    <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {contact.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div 
          className="mt-5 p-4 rounded"
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="row align-items-center">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h4 style={{ color: 'var(--text-inverse)', marginBottom: 'var(--space-sm)' }}>
                Подпишитесь на новости
              </h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: 0 }}>
                Получайте информацию о новых мастер-классах и мероприятиях
              </p>
            </div>
            <div className="col-lg-6">
              <form className="d-flex gap-2">
                <input
                  type="email"
                  className="form-input-pro"
                  placeholder="Ваш email"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                />
                <button type="submit" className="btn-pro btn-pro-accent">
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-pro-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                © {currentYear} ILTERNATIVA. Все права защищены.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <Link to="/privacy" className="footer-pro-link me-3">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="footer-pro-link">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPro;
