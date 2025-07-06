import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EventRegistrationForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    childrenCount: 0,
    childrenNames: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Загружаем информацию о событии
    axios.get(`http://localhost:5000/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event:', error);
        setError('Ошибка загрузки события');
        setLoading(false);
      });
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'childrenCount') {
      const count = parseInt(value) || 0;
      setFormData({
        ...formData,
        childrenCount: count,
        childrenNames: new Array(count).fill('')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleChildNameChange = (index, value) => {
    const newChildrenNames = [...formData.childrenNames];
    newChildrenNames[index] = value;
    setFormData({
      ...formData,
      childrenNames: newChildrenNames
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!formData.firstName || !formData.lastName || !formData.patronymic || !formData.phone) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Проверка имен детей
    if (formData.childrenCount > 0) {
      const filledChildrenNames = formData.childrenNames.filter(name => name.trim() !== '');
      if (filledChildrenNames.length !== formData.childrenCount) {
        setError('Пожалуйста, укажите имена всех детей');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/registrations/register', {
        eventId,
        ...formData
      });

      if (response.data.message === 'Registration submitted successfully') {
        setSuccess(true);
        // Очищаем форму
        setFormData({
          firstName: '',
          lastName: '',
          patronymic: '',
          phone: '',
          childrenCount: 0,
          childrenNames: []
        });
        
        // Перенаправляем на главную через 3 секунды
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || 'Ошибка при регистрации');
    }
  };

  if (loading) {
    return <div className="container mt-5">Загрузка...</div>;
  }

  if (!event) {
    return <div className="container mt-5">Событие не найдено</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Запись на мероприятие: {event.name}</h2>
      <p className="mb-4">
        <strong>Дата:</strong> {new Date(event.date).toLocaleDateString('ru-RU')}
        <br />
        <strong>Описание:</strong> {event.description}
      </p>

      {success ? (
        <div className="alert alert-success">
          <h4>Спасибо за вашу заявку!</h4>
          <p>Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время для подтверждения.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Фамилия *</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="col-md-4 mb-3">
              <label className="form-label">Имя *</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="col-md-4 mb-3">
              <label className="form-label">Отчество *</label>
              <input
                type="text"
                className="form-control"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Телефон *</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>
            
            <div className="col-md-6 mb-3">
              <label className="form-label">Количество детей</label>
              <input
                type="number"
                className="form-control"
                name="childrenCount"
                value={formData.childrenCount}
                onChange={handleInputChange}
                min="0"
                max="10"
              />
            </div>
          </div>

          {formData.childrenCount > 0 && (
            <div className="mb-3">
              <label className="form-label">Имена детей</label>
              {[...Array(formData.childrenCount)].map((_, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Имя ${index + 1}-го ребенка`}
                    value={formData.childrenNames[index] || ''}
                    onChange={(e) => handleChildNameChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
          )}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Отправить заявку
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EventRegistrationForm;
