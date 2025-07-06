import React from 'react';

const About = () => {
  return (
    <div className="container-pro" style={{ paddingTop: '100px' }}>
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="text-center mb-5" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            О проекте <span style={{ color: 'var(--accent)' }}>ИЛЬТЕРНАТИВА</span>
          </h1>
          
          <div className="card-pro mb-4">
            <div className="card-pro-body">
              <h2 className="mb-4">Моя биография</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Меня зовут <strong>Кудзаева Илия Яковлевна</strong> - я руководитель проекта по альтернативному образованию ИЛЬТЕРНАТИВА.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                Я верю, что образование должно быть увлекательным и практичным. Дети лучше усваивают знания, когда 
                могут их увидеть, потрогать, исследовать самостоятельно.
              </p>
              <div className="mt-4">
                <a href="https://www.instagram.com/iliya.ilternativa/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="btn-pro btn-pro-accent">
                  <i className="fab fa-instagram me-2"></i>
                  Instagram: @iliya.ilternativa
                </a>
              </div>
            </div>
          </div>

          <div className="card-pro mb-4">
            <div className="card-pro-body">
              <h2 className="mb-4">История проекта</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                <strong>Проект ИЛЬТЕРНАТИВА существует с 10 ноября 2021 года.</strong>
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                За эти 4 года мы организовали более 100 образовательных мероприятий, в которых приняли участие 
                более 500 детей. Начиная с небольших экскурсий по Владикавказу, мы расширили географию 
                наших путешествий до всего Северного Кавказа.
              </p>
            </div>
          </div>

          <div className="card-pro mb-4">
            <div className="card-pro-body">
              <h2 className="mb-4">Наши направления</h2>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="fas fa-mountain text-accent me-3" style={{ fontSize: '2rem' }}></i>
                    <div>
                      <h4>Познавательные выезды по Северному Кавказу</h4>
                      <p>Пятигорск, Грозный, Нальчик</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="fas fa-map-marked-alt text-accent me-3" style={{ fontSize: '2rem' }}></i>
                    <div>
                      <h4>Образовательные выезды по РСО-Алании</h4>
                      <p>Изучение родного края</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="fas fa-flask text-accent me-3" style={{ fontSize: '2rem' }}></i>
                    <div>
                      <h4>Практические занятия во Владикавказе</h4>
                      <p>Научные квесты, эксперименты, мастер-классы</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="fas fa-industry text-accent me-3" style={{ fontSize: '2rem' }}></i>
                    <div>
                      <h4>Посещения производств и аэропорта</h4>
                      <p>Знакомство с профессиями</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <h3>Как записаться?</h3>
            <p className="lead mb-4">
              Для того, чтобы записать ребенка/детей, пришлите <strong>ФИО и возраст</strong> через Instagram или форму на сайте.
            </p>
            <div className="mt-3">
              <a href="https://www.instagram.com/iliya.ilternativa/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="btn-pro btn-pro-accent btn-pro-lg">
                <i className="fab fa-instagram me-2"></i>
                Присоединяйтесь в Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
