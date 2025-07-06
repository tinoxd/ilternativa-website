import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin exists
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/me');
      if (response.data) {
        setIsInitialized(true);
      }
    } catch (error) {
      // Admin might not exist, check with init endpoint
      setIsInitialized(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      
      // Сохраняем токен
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Устанавливаем токен для всех последующих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Перенаправляем в админ-панель
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const initializeAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/init-admin');
      setError('Администратор создан! Используйте логин: admin, пароль: admin123');
      setIsInitialized(true);
    } catch (error) {
      if (error.response?.data?.error === 'Admin already exists') {
        setIsInitialized(true);
      } else {
        setError('Ошибка при создании администратора');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="login-card">
              <div className="login-header">
                <div className="login-logo">
                  <i className="fas fa-music"></i>
                </div>
                <h2 className="login-title">Ilternativa</h2>
                <p className="login-subtitle">Административная панель</p>
              </div>
              
              {error && (
                <div className={`alert ${error.includes('создан') ? 'alert-success' : 'alert-danger'} alert-modern`} role="alert">
                  <i className={`fas ${error.includes('создан') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                  {error}
                </div>
              )}
              
              {!isInitialized ? (
                <div className="text-center">
                  <p className="mb-4">Администратор еще не создан. Нажмите кнопку ниже для инициализации.</p>
                  <button 
                    className="btn btn-primary btn-modern"
                    onClick={initializeAdmin}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Создать администратора
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      id="username"
                      name="username"
                      placeholder="Имя пользователя"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      autoFocus
                    />
                    <label htmlFor="username">
                      <i className="fas fa-user me-2"></i>
                      Имя пользователя
                    </label>
                  </div>
                  
                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control form-control-modern"
                      id="password"
                      name="password"
                      placeholder="Пароль"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="password">
                      <i className="fas fa-lock me-2"></i>
                      Пароль
                    </label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-modern w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Вход...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Войти в систему
                      </>
                    )}
                  </button>
                </form>
              )}
              
              <div className="login-footer">
                <p className="text-muted small text-center mb-0">
                  <i className="fas fa-shield-alt me-1"></i>
                  Защищенная область администратора
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
