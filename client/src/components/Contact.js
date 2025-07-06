import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    childName: '',
    childAge: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: '', message: '' });
    
    try {
      await axios.post('http://localhost:5000/api/applications', {
        ...formData,
        message: `Ребенок: ${formData.childName}, Возраст: ${formData.childAge}. ${formData.message}`
      });
      setFormStatus({ type: 'success', message: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.' });
      setFormData({
        name: '',
        phone: '',
        email: '',
        childName: '',
        childAge: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Ошибка при отправке заявки. Попробуйте еще раз.' });
    }
  };

  // Функция для генерации WhatsApp ссылки
  const generateWhatsAppLink = () => {
    const message = `Здравствуйте! Я хочу записать ребенка на мероприятие ИЛЬТЕРНАТИВА.`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="container-pro" style={{ paddingTop: '100px' }}>
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="text-center mb-5" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            Свяжитесь с <span style={{ color: 'var(--accent)' }}>нами</span>
          </h1>
          
          <div className="row">
            {/* Контактная информация */}
            <div className="col-lg-4 mb-4">
              <div className="card-pro h-100">
                <div className="card-pro-body">
                  <h3 className="mb-4">Контакты</h3>
                  
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-user text-accent me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <strong>Руководитель проекта</strong><br/>
                        Кудзаева Илия Яковлевна
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <i className="fab fa-instagram text-accent me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <a href="https://www.instagram.com/iliya.ilternativa/" target="_blank" rel="noopener noreferrer">
                          @iliya.ilternativa
                        </a>
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-map-marker-alt text-accent me-3" style={{ fontSize: '1.5rem' }}></i>
                      <div>
                        <strong>Место</strong><br/>
                        Владикавказ, РСО-Алания
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <a 
                      href={generateWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pro btn-pro-accent"
                    >
                      <i className="fab fa-whatsapp me-2"></i>
                      Написать в WhatsApp
                    </a>
                    
                    <a 
                      href="https://www.instagram.com/iliya.ilternativa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pro btn-pro-outline"
                    >
                      <i className="fab fa-instagram me-2"></i>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Форма заявки */}
            <div className="col-lg-8 mb-4">
              <div className="card-pro">
                <div className="card-pro-body">
                  <h3 className="mb-4">Записать ребенка</h3>
                  <form onSubmit={handleSubmit} className="form-pro">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group-pro">
                          <label className="form-label-pro">Ваше имя *</label>
                          <input
                            type="text"
                            className="form-input-pro"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group-pro">
                          <label className="form-label-pro">Телефон *</label>
                          <input
                            type="tel"
                            className="form-input-pro"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group-pro">
                          <label className="form-label-pro">Email</label>
                          <input
                            type="email"
                            className="form-input-pro"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group-pro">
                          <label className="form-label-pro">ФИО ребенка *</label>
                          <input
                            type="text"
                            className="form-input-pro"
                            name="childName"
                            value={formData.childName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group-pro">
                          <label className="form-label-pro">Возраст ребенка *</label>
                          <input
                            type="text"
                            className="form-input-pro"
                            name="childAge"
                            value={formData.childAge}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group-pro">
                      <label className="form-label-pro">Дополнительная информация</label>
                      <textarea
                        className="form-input-pro form-textarea-pro"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Интересующее мероприятие, особые пожелания..."
                      />
                    </div>
                    
                    {formStatus.message && (
                      <div className={`alert alert-${formStatus.type === 'success' ? 'success' : 'danger'} mb-3`}>
                        {formStatus.message}
                      </div>
                    )}
                    
                    <button type="submit" className="btn-pro btn-pro-accent btn-pro-lg w-100">
                      Отправить заявку
                      <i className="fas fa-paper-plane ms-2"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          {/* Дополнительная информация */}
          <div className="card-pro mt-5">
            <div className="card-pro-body text-center">
              <h3 className="mb-4">Как происходит запись?</h3>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="d-flex flex-column align-items-center">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--accent-light)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <i className="fas fa-paper-plane" style={{ color: 'var(--accent)', fontSize: '24px' }}></i>
                    </div>
                    <h5>1. Отправьте заявку</h5>
                    <p className="text-muted">Заполните форму или напишите нам в WhatsApp/Instagram</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="d-flex flex-column align-items-center">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--accent-light)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <i className="fas fa-phone" style={{ color: 'var(--accent)', fontSize: '24px' }}></i>
                    </div>
                    <h5>2. Мы свяжемся с вами</h5>
                    <p className="text-muted">Уточним детали и расскажем о ближайших мероприятиях</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="d-flex flex-column align-items-center">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--accent-light)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <i className="fas fa-check" style={{ color: 'var(--accent)', fontSize: '24px' }}></i>
                    </div>
                    <h5>3. Добро пожаловать!</h5>
                    <p className="text-muted">Вы добавлены в группу и получите всю информацию</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
