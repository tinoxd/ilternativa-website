import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Закрываем dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Закрываем dropdown при навигации
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`} 
         style={{
           background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
           backdropFilter: scrolled ? 'blur(10px)' : 'none',
           WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
           boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
           transition: 'all var(--transition-base)',
           padding: 'var(--space-4) 0'
         }}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center" 
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: '800',
                color: scrolled ? 'var(--primary)' : 'var(--white)',
                textDecoration: 'none',
                transition: 'all var(--transition-base)'
              }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 'var(--space-3)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <i className="fas fa-graduation-cap" style={{ color: 'white', fontSize: '1.2rem' }}></i>
          </div>
          ILTERNATIVA
        </Link>
        
        <button 
          className="navbar-toggler custom-toggler" 
          type="button" 
          onClick={toggleMenu}
          style={{
            border: 'none',
            background: 'transparent',
            padding: 'var(--space-2)',
            outline: 'none'
          }}>
          <div style={{
            width: '30px',
            height: '24px',
            position: 'relative',
            transform: 'rotate(0deg)',
            transition: '.5s ease-in-out',
            cursor: 'pointer'
          }}>
            <span style={{
              display: 'block',
              position: 'absolute',
              height: '3px',
              width: '100%',
              background: scrolled ? 'var(--gray-700)' : 'var(--white)',
              borderRadius: '3px',
              opacity: 1,
              left: 0,
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: '.25s ease-in-out',
              top: isOpen ? '10px' : '0px'
            }}></span>
            <span style={{
              display: 'block',
              position: 'absolute',
              height: '3px',
              width: '100%',
              background: scrolled ? 'var(--gray-700)' : 'var(--white)',
              borderRadius: '3px',
              opacity: isOpen ? 0 : 1,
              left: 0,
              transform: 'rotate(0deg)',
              transition: '.25s ease-in-out',
              top: '10px'
            }}></span>
            <span style={{
              display: 'block',
              position: 'absolute',
              height: '3px',
              width: '100%',
              background: scrolled ? 'var(--gray-700)' : 'var(--white)',
              borderRadius: '3px',
              opacity: 1,
              left: 0,
              transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
              transition: '.25s ease-in-out',
              top: isOpen ? '10px' : '20px'
            }}></span>
          </div>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/')}`}
                style={{
                  color: scrolled ? 'var(--gray-700)' : 'var(--white)',
                  fontWeight: '500',
                  padding: 'var(--space-2) var(--space-4)',
                  margin: '0 var(--space-1)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  textDecoration: 'none',
                  background: isActive('/') ? 'rgba(124, 58, 237, 0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/')) {
                    e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                    e.target.style.color = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = scrolled ? 'var(--gray-700)' : 'var(--white)';
                  }
                }}>
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/events" 
                className={`nav-link ${isActive('/events')}`}
                style={{
                  color: scrolled ? 'var(--gray-700)' : 'var(--white)',
                  fontWeight: '500',
                  padding: 'var(--space-2) var(--space-4)',
                  margin: '0 var(--space-1)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  textDecoration: 'none',
                  background: isActive('/events') ? 'rgba(124, 58, 237, 0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/events')) {
                    e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                    e.target.style.color = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/events')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = scrolled ? 'var(--gray-700)' : 'var(--white)';
                  }
                }}>
                События
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about')}`}
                style={{
                  color: scrolled ? 'var(--gray-700)' : 'var(--white)',
                  fontWeight: '500',
                  padding: 'var(--space-2) var(--space-4)',
                  margin: '0 var(--space-1)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  textDecoration: 'none',
                  background: isActive('/about') ? 'rgba(124, 58, 237, 0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/about')) {
                    e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                    e.target.style.color = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/about')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = scrolled ? 'var(--gray-700)' : 'var(--white)';
                  }
                }}>
                О нас
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/videos" 
                className={`nav-link ${isActive('/videos')}`}
                style={{
                  color: scrolled ? 'var(--gray-700)' : 'var(--white)',
                  fontWeight: '500',
                  padding: 'var(--space-2) var(--space-4)',
                  margin: '0 var(--space-1)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  textDecoration: 'none',
                  background: isActive('/videos') ? 'rgba(255, 0, 0, 0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/videos')) {
                    e.target.style.background = 'rgba(255, 0, 0, 0.05)';
                    e.target.style.color = '#FF0000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/videos')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = scrolled ? 'var(--gray-700)' : 'var(--white)';
                  }
                }}>
                <i className="fab fa-youtube me-2"></i>
                Видео
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact')}`}
                style={{
                  color: scrolled ? 'var(--gray-700)' : 'var(--white)',
                  fontWeight: '500',
                  padding: 'var(--space-2) var(--space-4)',
                  margin: '0 var(--space-1)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-base)',
                  textDecoration: 'none',
                  background: isActive('/contact') ? 'rgba(124, 58, 237, 0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive('/contact')) {
                    e.target.style.background = 'rgba(124, 58, 237, 0.05)';
                    e.target.style.color = 'var(--primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive('/contact')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = scrolled ? 'var(--gray-700)' : 'var(--white)';
                  }
                }}>
                Контакты
              </Link>
            </li>
            
            <li className="nav-item ms-lg-4">
              {user ? (
                <div className="d-flex align-items-center">
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="btn"
                      style={{
                        background: 'transparent',
                        border: `2px solid ${scrolled ? 'var(--primary)' : 'var(--white)'}`,
                        color: scrolled ? 'var(--primary)' : 'var(--white)',
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        transition: 'all var(--transition-base)',
                        textDecoration: 'none',
                        marginRight: 'var(--space-3)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = scrolled ? 'var(--primary)' : 'var(--white)';
                        e.target.style.color = scrolled ? 'var(--white)' : 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = scrolled ? 'var(--primary)' : 'var(--white)';
                      }}>
                      <i className="fas fa-cog me-2"></i>
                      Админ
                    </Link>
                  )}
                  
                  <div className="dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
                    <button 
                      className="btn"
                      type="button"
                      onClick={toggleDropdown}
                      style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        border: 'none',
                        padding: 'var(--space-2) var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'all var(--transition-base)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}>
                      <i className="fas fa-user"></i>
                      {user.username}
                      <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '0.8rem' }}></i>
                    </button>
                    
                    {dropdownOpen && (
                      <div 
                        className="dropdown-menu show"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          marginTop: 'var(--space-2)',
                          background: 'white',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-xl)',
                          border: '1px solid var(--gray-200)',
                          minWidth: '150px',
                          zIndex: 1000,
                          overflow: 'hidden'
                        }}>
                        <button 
                          className="dropdown-item" 
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          style={{
                            padding: 'var(--space-3) var(--space-4)',
                            transition: 'all var(--transition-base)',
                            background: 'transparent',
                            border: 'none',
                            width: '100%',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--gray-700)',
                            fontSize: 'var(--text-sm)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'var(--gray-100)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                          }}>
                          <i className="fas fa-sign-out-alt"></i>
                          Выйти
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="btn"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    padding: 'var(--space-2) var(--space-5)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '600',
                    border: 'none',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all var(--transition-base)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'var(--shadow-md)';
                  }}>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Вход
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
