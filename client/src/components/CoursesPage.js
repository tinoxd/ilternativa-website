import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'Все курсы', icon: 'fa-th' },
    { id: 'music', name: 'Музыка', icon: 'fa-music' },
    { id: 'steam', name: 'STEAM', icon: 'fa-flask' },
    { id: 'languages', name: 'Языки', icon: 'fa-language' },
    { id: 'creative', name: 'Творчество', icon: 'fa-palette' },
    { id: 'softskills', name: 'Soft Skills', icon: 'fa-brain' }
  ];

  const ageGroups = [
    { id: 'all', name: 'Все возрасты' },
    { id: '3-6', name: '3-6 лет' },
    { id: '7-10', name: '7-10 лет' },
    { id: '11-14', name: '11-14 лет' },
    { id: '15-17', name: '15-17 лет' }
  ];

  // Демо-данные курсов
  const demoCourses = [
    {
      id: 1,
      title: 'Первые шаги в музыке',
      category: 'music',
      ageGroup: '3-6',
      description: 'Знакомство с миром звуков, ритмов и мелодий через игру',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400',
      duration: '3 месяца',
      price: 'Бесплатно',
      rating: 4.9,
      students: 234,
      level: 'Начальный'
    },
    {
      id: 2,
      title: 'Юный программист',
      category: 'steam',
      ageGroup: '7-10',
      description: 'Основы программирования через создание игр в Scratch',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
      duration: '4 месяца',
      price: '5000 ₽/мес',
      rating: 4.8,
      students: 156,
      level: 'Начальный'
    },
    {
      id: 3,
      title: 'Английский через песни',
      category: 'languages',
      ageGroup: '7-10',
      description: 'Изучаем английский язык через популярные детские песни',
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400',
      duration: '6 месяцев',
      price: '4000 ₽/мес',
      rating: 4.7,
      students: 312,
      level: 'Начальный'
    },
    {
      id: 4,
      title: 'Цифровое рисование',
      category: 'creative',
      ageGroup: '11-14',
      description: 'Создаем цифровые иллюстрации и анимацию',
      image: 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?w=400',
      duration: '3 месяца',
      price: '6000 ₽/мес',
      rating: 4.9,
      students: 89,
      level: 'Средний'
    },
    {
      id: 5,
      title: 'Робототехника для начинающих',
      category: 'steam',
      ageGroup: '11-14',
      description: 'Конструируем и программируем роботов',
      image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400',
      duration: '5 месяцев',
      price: '8000 ₽/мес',
      rating: 5.0,
      students: 67,
      level: 'Средний'
    },
    {
      id: 6,
      title: 'Публичные выступления',
      category: 'softskills',
      ageGroup: '15-17',
      description: 'Учимся уверенно выступать перед аудиторией',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
      duration: '2 месяца',
      price: '5500 ₽/мес',
      rating: 4.8,
      students: 145,
      level: 'Продвинутый'
    }
  ];

  useEffect(() => {
    // Имитируем загрузку данных
    setTimeout(() => {
      setCourses(demoCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const ageMatch = selectedAge === 'all' || course.ageGroup === selectedAge;
    return categoryMatch && ageMatch;
  });

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--gray-50)' }}>
      {/* Hero Section */}
      <section 
        className="py-5"
        style={{
          background: 'var(--gradient-primary)',
          color: 'white'
        }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">
                Образовательные курсы для детей
              </h1>
              <p className="lead mb-4">
                Откройте мир знаний и творчества для вашего ребенка. 
                Более 50 курсов по различным направлениям.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center">
                  <i className="fas fa-check-circle me-2" style={{ fontSize: '1.2rem' }}></i>
                  <span>Сертификаты по окончании</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check-circle me-2" style={{ fontSize: '1.2rem' }}></i>
                  <span>Опытные преподаватели</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check-circle me-2" style={{ fontSize: '1.2rem' }}></i>
                  <span>Интерактивные занятия</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
                alt="Образование"
                className="img-fluid rounded-4"
                style={{ maxHeight: '300px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 bg-white shadow-sm sticky-top" style={{ top: '70px', zIndex: 10 }}>
        <div className="container">
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="d-flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{
                      borderRadius: 'var(--radius-full)',
                      padding: 'var(--space-2) var(--space-4)',
                      fontWeight: '500'
                    }}>
                    <i className={`fas ${category.icon} me-2`}></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <select 
                className="form-select"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-3)'
                }}>
                {ageGroups.map(age => (
                  <option key={age.id} value={age.id}>{age.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-5">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="h4">
                  Найдено курсов: <span className="text-primary">{filteredCourses.length}</span>
                </h2>
              </div>
              
              <div className="row g-4">
                {filteredCourses.map((course, index) => (
                  <div className="col-lg-4 col-md-6" key={course.id}>
                    <div 
                      className="card h-100 border-0 hover-lift animate-fadeIn"
                      style={{
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'all var(--transition-base)',
                        animationDelay: `${index * 0.1}s`
                      }}>
                      <div className="position-relative">
                        <img 
                          src={course.image}
                          alt={course.title}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div 
                          className="position-absolute top-0 end-0 m-3"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 'var(--radius-md)',
                            padding: 'var(--space-2) var(--space-3)'
                          }}>
                          <span className="fw-bold text-primary">{course.price}</span>
                        </div>
                      </div>
                      
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <span 
                            className="badge me-2"
                            style={{
                              background: 'var(--primary-light)',
                              color: 'var(--primary)',
                              padding: 'var(--space-1) var(--space-2)',
                              borderRadius: 'var(--radius-sm)'
                            }}>
                            {course.ageGroup} лет
                          </span>
                          <span 
                            className="badge"
                            style={{
                              background: 'var(--gray-100)',
                              color: 'var(--gray-700)',
                              padding: 'var(--space-1) var(--space-2)',
                              borderRadius: 'var(--radius-sm)'
                            }}>
                            {course.level}
                          </span>
                        </div>
                        
                        <h5 className="card-title mb-2" style={{ fontWeight: '600' }}>
                          {course.title}
                        </h5>
                        
                        <p className="card-text text-muted mb-3" style={{ fontSize: 'var(--text-sm)' }}>
                          {course.description}
                        </p>
                        
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-auto">
                            <i className="fas fa-star text-warning me-1"></i>
                            <span className="fw-bold">{course.rating}</span>
                            <span className="text-muted ms-2">({course.students} учеников)</span>
                          </div>
                          <div className="text-muted">
                            <i className="far fa-clock me-1"></i>
                            {course.duration}
                          </div>
                        </div>
                        
                        <Link 
                          to={`/course/${course.id}`}
                          className="btn btn-primary w-100"
                          style={{
                            borderRadius: 'var(--radius-md)',
                            padding: 'var(--space-3)',
                            fontWeight: '600'
                          }}>
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h3 className="text-muted">Курсы не найдены</h3>
                  <p className="text-muted">Попробуйте изменить фильтры поиска</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">Не нашли подходящий курс?</h2>
          <p className="lead text-muted mb-4">
            Оставьте заявку, и мы подберем программу индивидуально для вашего ребенка
          </p>
          <a 
            href="#registration-form"
            className="btn btn-lg"
            style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              padding: 'var(--space-4) var(--space-6)',
              borderRadius: 'var(--radius-lg)',
              fontWeight: '600',
              boxShadow: 'var(--shadow-lg)'
            }}>
            <i className="fas fa-pencil-alt me-2"></i>
            Оставить заявку
          </a>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
