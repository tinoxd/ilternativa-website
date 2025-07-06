import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events/');
      const sortedEvents = response.data
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventsByMonth = () => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === selectedMonth && 
             eventDate.getFullYear() === selectedYear;
    });
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const eventTypes = {
    'trip': { icon: 'fa-mountain', color: '#4CAF50', label: 'Выезд' },
    'quest': { icon: 'fa-flask', color: '#2196F3', label: 'Научный квест' },
    'production': { icon: 'fa-industry', color: '#FF9800', label: 'Экскурсия на производство' },
    'workshop': { icon: 'fa-chalkboard-teacher', color: '#9C27B0', label: 'Мастер-класс' },
    'default': { icon: 'fa-calendar', color: '#607D8B', label: 'Мероприятие' }
  };

  const getEventType = (event) => {
    if (event.name.toLowerCase().includes('выезд') || event.name.toLowerCase().includes('путешествие')) {
      return eventTypes.trip;
    } else if (event.name.toLowerCase().includes('квест') || event.name.toLowerCase().includes('научн')) {
      return eventTypes.quest;
    } else if (event.name.toLowerCase().includes('производств') || event.name.toLowerCase().includes('завод')) {
      return eventTypes.production;
    } else if (event.name.toLowerCase().includes('мастер') || event.name.toLowerCase().includes('занятие')) {
      return eventTypes.workshop;
    }
    return eventTypes.default;
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  if (loading) {
    return (
      <div className="container-pro" style={{ paddingTop: '100px' }}>
        <div className="text-center">
          <div className="spinner-border text-accent" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  const monthEvents = getEventsByMonth();

  return (
    <div className="container-pro" style={{ paddingTop: '100px' }}>
      <h1 className="text-center mb-5" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
        Расписание <span style={{ color: 'var(--accent)' }}>мероприятий</span>
      </h1>

      {/* Календарная навигация */}
      <div className="card-pro mb-5">
        <div className="card-pro-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button 
              className="btn-pro btn-pro-ghost"
              onClick={handlePrevMonth}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <h2 className="mb-0">
              {monthNames[selectedMonth]} {selectedYear}
            </h2>
            <button 
              className="btn-pro btn-pro-ghost"
              onClick={handleNextMonth}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          {/* Легенда */}
          <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
            {Object.entries(eventTypes).filter(([key]) => key !== 'default').map(([key, type]) => (
              <div key={key} className="d-flex align-items-center">
                <i 
                  className={`fas ${type.icon} me-2`} 
                  style={{ color: type.color, fontSize: '1.2rem' }}
                ></i>
                <span style={{ fontSize: '0.9rem' }}>{type.label}</span>
              </div>
            ))}
          </div>

          {monthEvents.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-calendar-times" style={{ fontSize: '3rem', color: '#ccc' }}></i>
              <p className="mt-3 text-muted">В этом месяце мероприятий не запланировано</p>
            </div>
          ) : (
            <div className="row">
              {monthEvents.map(event => {
                const eventType = getEventType(event);
                const eventDate = new Date(event.date);
                return (
                  <div key={event._id} className="col-md-6 mb-4">
                    <div className="card-pro h-100" style={{ 
                      borderLeft: `4px solid ${eventType.color}`,
                      transition: 'transform 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div className="card-pro-body">
                        <div className="d-flex align-items-start mb-3">
                          <div style={{
                            width: '50px',
                            height: '50px',
                            background: eventType.color + '20',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 'var(--space-md)'
                          }}>
                            <i className={`fas ${eventType.icon}`} style={{ 
                              color: eventType.color, 
                              fontSize: '20px' 
                            }}></i>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h4 className="mb-1">{event.name}</h4>
                                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                  <i className="fas fa-calendar-day me-2"></i>
                                  {eventDate.toLocaleDateString('ru-RU', { 
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long'
                                  })}
                                </p>
                                {event.time && (
                                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                    <i className="fas fa-clock me-2"></i>
                                    {event.time}
                                  </p>
                                )}
                              </div>
                              <span className="badge" style={{
                                background: eventType.color + '20',
                                color: eventType.color,
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.75rem',
                                fontWeight: 'var(--font-semibold)'
                              }}>
                                {eventType.label}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="mb-3">{event.description}</p>
                        
                        {event.location && (
                          <p className="mb-3" style={{ fontSize: '0.9rem' }}>
                            <i className="fas fa-map-marker-alt me-2 text-accent"></i>
                            {event.location}
                          </p>
                        )}

                        {event.price && (
                          <p className="mb-3" style={{ fontSize: '0.9rem' }}>
                            <i className="fas fa-ruble-sign me-2 text-accent"></i>
                            {event.price} руб.
                          </p>
                        )}

                        <Link 
                          to={`/register-event/${event._id}`} 
                          className="btn-pro btn-pro-primary w-100"
                        >
                          Записаться
                          <i className="fas fa-arrow-right ms-2"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Все предстоящие мероприятия */}
      <div className="card-pro">
        <div className="card-pro-body">
          <h3 className="mb-4">Все предстоящие мероприятия</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Мероприятие</th>
                  <th>Тип</th>
                  <th>Место</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => {
                  const eventType = getEventType(event);
                  return (
                    <tr key={event._id}>
                      <td>
                        {new Date(event.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        <strong>{event.name}</strong>
                        <br />
                        <small className="text-muted">{event.description.substring(0, 50)}...</small>
                      </td>
                      <td>
                        <span className="badge" style={{
                          background: eventType.color + '20',
                          color: eventType.color,
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem'
                        }}>
                          <i className={`fas ${eventType.icon} me-1`}></i>
                          {eventType.label}
                        </span>
                      </td>
                      <td>{event.location || '—'}</td>
                      <td>
                        <Link 
                          to={`/register-event/${event._id}`} 
                          className="btn-pro btn-pro-accent btn-pro-sm"
                        >
                          Записаться
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
