import React, { useState } from 'react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Примеры фотографий для галереи
  const photos = [
    {
      id: 1,
      category: 'trips',
      title: 'Поездка в Пятигорск',
      description: 'Экскурсия к минеральным источникам',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      date: '15 марта 2024'
    },
    {
      id: 2,
      category: 'trips',
      title: 'Грозный - город будущего',
      description: 'Знакомство с современной архитектурой',
      thumbnail: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400',
      full: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200',
      date: '22 февраля 2024'
    },
    {
      id: 3,
      category: 'quest',
      title: 'Научный квест по физике',
      description: 'Эксперименты с электричеством',
      thumbnail: 'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=400',
      full: 'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=1200',
      date: '10 марта 2024'
    },
    {
      id: 4,
      category: 'production',
      title: 'Экскурсия на хлебозавод',
      description: 'Как делают хлеб - от зерна до буханки',
      thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      full: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
      date: '5 марта 2024'
    },
    {
      id: 5,
      category: 'workshop',
      title: 'Мастер-класс по робототехнике',
      description: 'Создаем первого робота',
      thumbnail: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400',
      full: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=1200',
      date: '28 февраля 2024'
    },
    {
      id: 6,
      category: 'trips',
      title: 'Нальчик - жемчужина Кавказа',
      description: 'Прогулка по парку и канатная дорога',
      thumbnail: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400',
      full: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200',
      date: '18 февраля 2024'
    },
    {
      id: 7,
      category: 'quest',
      title: 'Химические опыты',
      description: 'Безопасные эксперименты для детей',
      thumbnail: 'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?w=400',
      full: 'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?w=1200',
      date: '12 февраля 2024'
    },
    {
      id: 8,
      category: 'production',
      title: 'Аэропорт Владикавказа',
      description: 'За кулисами воздушных ворот',
      thumbnail: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=400',
      full: 'https://images.unsplash.com/photo-1529074963764-98f45c47344b?w=1200',
      date: '1 февраля 2024'
    },
    {
      id: 9,
      category: 'workshop',
      title: 'Юные археологи',
      description: 'Изучаем историю через раскопки',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      full: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
      date: '25 января 2024'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все фото', icon: 'fa-th' },
    { id: 'trips', name: 'Выезды', icon: 'fa-mountain' },
    { id: 'quest', name: 'Квесты', icon: 'fa-flask' },
    { id: 'production', name: 'Производства', icon: 'fa-industry' },
    { id: 'workshop', name: 'Мастер-классы', icon: 'fa-chalkboard-teacher' }
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="container-pro" style={{ paddingTop: '100px' }}>
      <h1 className="text-center mb-5" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
        Фотогалерея <span style={{ color: 'var(--accent)' }}>мероприятий</span>
      </h1>

      {/* Фильтры категорий */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
        {categories.map(category => (
          <button
            key={category.id}
            className={`btn-pro ${selectedCategory === category.id ? 'btn-pro-accent' : 'btn-pro-outline'}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <i className={`fas ${category.icon} me-2`}></i>
            {category.name}
          </button>
        ))}
      </div>

      {/* Галерея */}
      <div className="row g-4">
        {filteredPhotos.map((photo, index) => (
          <div key={photo.id} className="col-md-6 col-lg-4">
            <div 
              className="card-pro h-100" 
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
              }}
              onClick={() => setSelectedImage(photo)}
            >
              <div style={{ 
                height: '250px', 
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={photo.thumbnail} 
                  alt={photo.title}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem'
                }}>
                  {photo.date}
                </div>
              </div>
              <div className="card-pro-body">
                <h4>{photo.title}</h4>
                <p className="text-muted mb-0">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно для просмотра фото */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            padding: '20px'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={selectedImage.full} 
              alt={selectedImage.title}
              style={{ 
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain'
              }}
            />
            <button
              className="btn-pro btn-pro-ghost"
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                color: 'white',
                fontSize: '2rem'
              }}
              onClick={() => setSelectedImage(null)}
            >
              <i className="fas fa-times"></i>
            </button>
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              left: '0',
              right: '0',
              textAlign: 'center',
              color: 'white'
            }}>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <small>{selectedImage.date}</small>
            </div>
          </div>
        </div>
      )}

      {/* CTA секция */}
      <div className="text-center mt-5 py-5">
        <h3>Хотите увидеть больше?</h3>
        <p className="lead mb-4">
          Подписывайтесь на наш Instagram, чтобы не пропустить новые фото и видео с мероприятий
        </p>
        <a 
          href="https://www.instagram.com/iliya.ilternativa/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-pro btn-pro-accent btn-pro-lg"
        >
          <i className="fab fa-instagram me-2"></i>
          Перейти в Instagram
        </a>
      </div>
    </div>
  );
};

export default Gallery;
