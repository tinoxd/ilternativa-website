import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, requireAdmin = true }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
          setLoading(false);
          return;
        }
        
        // Проверяем действительность токена
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('http://localhost:5000/auth/me');
        
        if (response.data) {
          setIsAuthenticated(true);
          setIsAdmin(response.data.role === 'admin');
        }
      } catch (error) {
        // Токен недействителен, очищаем данные
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4><i className="fas fa-exclamation-triangle"></i> Доступ запрещен</h4>
          <p>У вас нет прав администратора для доступа к этой странице.</p>
          <a href="/" className="btn btn-primary">Вернуться на главную</a>
        </div>
      </div>
    );
  }
  
  return children;
};

export default PrivateRoute;
