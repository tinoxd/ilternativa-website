import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ActivityChart from './ActivityChart';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [error, setError] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      navigate('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        setError('Доступ запрещен. Только для администраторов.');
        setTimeout(() => {
          navigate('/');
        }, 2000);
        return;
      }
    } catch (e) {
      navigate('/login');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Загружаем события
    axios.get('http://localhost:5000/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(err => {
        setError('Ошибка загрузки событий');
      });

    // Загружаем все регистрации
    axios.get('http://localhost:5000/registrations/all')
      .then(response => {
        setRegistrations(response.data);
      })
      .catch(err => {
        console.error('Ошибка загрузки регистраций:', err);
      });
  }, [navigate]);

  const deleteEvent = (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить это событие?')) {
      return;
    }
    axios.delete(`http://localhost:5000/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(err => {
        setError('Ошибка при удалении события');
      });
  };

  const updateRegistrationStatus = (id, status) => {
    axios.patch(`http://localhost:5000/registrations/${id}/status`, { status })
      .then(() => {
        setRegistrations(registrations.map(reg => 
          reg._id === id ? { ...reg, status } : reg
        ));
      })
      .catch(err => {
        setError('Ошибка при обновлении статуса');
      });
  };

  const exportRegistrations = async () => {
    try {
      setExportLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/statistics/export/registrations', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Ошибка при экспорте данных');
    } finally {
      setExportLoading(false);
    }
  };

  const exportParticipants = async () => {
    try {
      setExportLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/statistics/export/participants', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `participants_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Ошибка при экспорте участников');
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Админ-панель</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            События
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            Заявки на события ({registrations.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Статистика
          </button>
        </li>
      </ul>

      {activeTab === 'events' && (
        <>
          <Link to="/create" className="btn btn-primary mb-3">
            Создать новое событие
          </Link>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/edit/${event._id}`} className="btn btn-sm btn-info me-2">
                      Редактировать
                    </Link>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteEvent(event._id)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === 'registrations' && (
        <>
          <div className="mb-3">
            <button 
              className="btn btn-success me-2" 
              onClick={exportRegistrations}
              disabled={exportLoading}
            >
              {exportLoading ? 'Экспорт...' : 'Экспорт регистраций в Excel'}
            </button>
            <button 
              className="btn btn-success" 
              onClick={exportParticipants}
              disabled={exportLoading}
            >
              {exportLoading ? 'Экспорт...' : 'Экспорт всех участников в Excel'}
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Событие</th>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Кол-во детей</th>
                <th>Имена детей</th>
                <th>Дата заявки</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(reg => (
                <tr key={reg._id}>
                  <td>{reg.event?.name || 'Неизвестное событие'}</td>
                  <td>{`${reg.lastName} ${reg.firstName} ${reg.patronymic}`}</td>
                  <td>{reg.phone}</td>
                  <td>{reg.childrenCount}</td>
                  <td>{reg.childrenNames.join(', ') || '-'}</td>
                  <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge bg-${
                      reg.status === 'approved' ? 'success' : 
                      reg.status === 'rejected' ? 'danger' : 'warning'
                    }`}>
                      {reg.status === 'approved' ? 'Одобрено' : 
                       reg.status === 'rejected' ? 'Отклонено' : 'Ожидает'}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="form-select form-select-sm"
                      value={reg.status}
                      onChange={(e) => updateRegistrationStatus(reg._id, e.target.value)}
                    >
                      <option value="pending">Ожидает</option>
                      <option value="approved">Одобрить</option>
                      <option value="rejected">Отклонить</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {registrations.length === 0 && (
              <p className="text-center text-muted">Нет заявок на события</p>
            )}
          </div>
        </>
      )}
      
      {activeTab === 'statistics' && (
        <div className="mt-3">
          <h3>График активности сайта</h3>
          <ActivityChart />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

