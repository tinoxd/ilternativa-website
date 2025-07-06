import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarPro = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Главная', icon: 'fa-home' },
    { path: '/schedule', label: 'Расписание', icon: 'fa-calendar-alt' },
    { path: '/gallery', label: 'Фотогалерея', icon: 'fa-images' },
    { path: '/about', label: 'О проекте', icon: 'fa-info-circle' },
    { path: '/contact', label: 'Контакты', icon: 'fa-phone' },
  ];

  return (
    <nav className={`navbar-pro ${scrolled ? 'navbar-pro-scrolled' : ''}`}>
      <div className="container-pro">
        <div className="navbar-pro-inner">
          {/* Logo */}
          <Link to="/" className="navbar-pro-brand">
            <span style={{ color: 'var(--accent)' }}>ИЛЬ</span>ТЕРНАТИВА
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar-pro-menu hide-mobile">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar-pro-link ${isActive(link.path) ? 'navbar-pro-link-active' : ''}`}
                >
                  <i className={`fas ${link.icon} me-2`} style={{ fontSize: '14px' }}></i>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="btn-pro btn-pro-accent btn-pro-sm">
                <i className="fas fa-user-shield me-2"></i>
                Админ
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="btn-pro btn-pro-ghost hide-desktop"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '8px 12px' }}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '20px' }}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu-pro ${mobileMenuOpen ? 'mobile-menu-pro-open' : ''}`}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-primary)',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: mobileMenuOpen ? '400px' : '0',
            overflow: 'hidden',
            transition: 'max-height var(--transition-slow)',
          }}
        >
          <div style={{ padding: 'var(--space-lg)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="d-block py-3 text-decoration-none"
                style={{
                  color: isActive(link.path) ? 'var(--accent)' : 'var(--text-primary)',
                  fontWeight: 'var(--font-medium)',
                  borderBottom: '1px solid var(--border-light)',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={`fas ${link.icon} me-3`} style={{ width: '20px' }}></i>
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="btn-pro btn-pro-accent btn-pro-sm w-100 mt-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <i className="fas fa-user-shield me-2"></i>
              Админ панель
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPro;
