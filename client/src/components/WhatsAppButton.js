import React from 'react';

const WhatsAppButton = () => {
  const whatsappLink = 'https://wa.me/?text=' + encodeURIComponent('Здравствуйте! Я хочу записать ребенка на мероприятие ИЛЬТЕРНАТИВА.');

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        transition: 'transform 0.3s',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <i className="fab fa-whatsapp" style={{ color: 'white', fontSize: '30px' }}></i>
    </a>
  );
};

export default WhatsAppButton;
