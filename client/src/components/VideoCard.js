import React, { useState } from 'react';

const VideoCard = ({ video, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M просмотров';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K просмотров';
    }
    return count + ' просмотров';
  };

  const formatPublishedDate = (date) => {
    const published = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - published);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Сегодня';
    if (diffDays === 1) return 'Вчера';
    if (diffDays < 7) return `${diffDays} дней назад`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} недель назад`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} месяцев назад`;
    return `${Math.floor(diffDays / 365)} лет назад`;
  };

  return (
    <div 
      className="video-card animate-fadeIn"
      style={{
        animationDelay: `${index * 0.1}s`,
        height: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      
      <div 
        className="card border-0 h-100 hover-lift"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'var(--white)',
          boxShadow: isHovered ? 'var(--shadow-xl)' : 'var(--shadow-md)',
          transition: 'all var(--transition-base)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)'
        }}>
        
        {/* Video Thumbnail */}
        <div className="position-relative" style={{ paddingTop: '56.25%' }}>
          <div 
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: `url(${video.snippet.thumbnails.high.url}) center/cover`,
              transition: 'transform var(--transition-base)'
            }}>
            
            {/* Play Button Overlay */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                background: isHovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
                opacity: isHovered ? 1 : 0,
                transition: 'all var(--transition-base)'
              }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--white)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                  transition: 'transform var(--transition-base)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                <i 
                  className="fas fa-play" 
                  style={{ 
                    color: 'var(--primary)', 
                    fontSize: '24px',
                    marginLeft: '4px'
                  }}
                ></i>
              </div>
            </div>
            
            {/* Duration Badge */}
            {video.contentDetails?.duration && (
              <div 
                className="position-absolute"
                style={{
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600'
                }}>
                {formatDuration(video.contentDetails.duration)}
              </div>
            )}
          </div>
        </div>
        
        {/* Video Info */}
        <div className="card-body p-4">
          <h5 
            className="card-title mb-2"
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: '600',
              color: 'var(--gray-900)',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.4'
            }}>
            {video.snippet.title}
          </h5>
          
          <p 
            className="card-text mb-3"
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--gray-600)',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.6'
            }}>
            {video.snippet.description || 'Нет описания'}
          </p>
          
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              {video.statistics?.viewCount && (
                <span 
                  className="d-flex align-items-center"
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--gray-500)' 
                  }}>
                  <i className="fas fa-eye me-1"></i>
                  {formatViewCount(parseInt(video.statistics.viewCount))}
                </span>
              )}
              
              {video.statistics?.likeCount && (
                <span 
                  className="d-flex align-items-center"
                  style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--gray-500)' 
                  }}>
                  <i className="fas fa-heart me-1" style={{ color: 'var(--danger)' }}></i>
                  {parseInt(video.statistics.likeCount).toLocaleString()}
                </span>
              )}
            </div>
            
            <span 
              style={{ 
                fontSize: 'var(--text-xs)', 
                color: 'var(--gray-500)' 
              }}>
              {formatPublishedDate(video.snippet.publishedAt)}
            </span>
          </div>
        </div>
        
        {/* Watch Button */}
        <div className="card-footer border-0 bg-transparent p-4 pt-0">
          <a 
            href={`https://www.youtube.com/watch?v=${video.id.videoId || video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-100"
            style={{
              background: isHovered ? 'var(--gradient-primary)' : 'var(--gray-100)',
              color: isHovered ? 'white' : 'var(--gray-700)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              transition: 'all var(--transition-base)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)'
            }}>
            <i className="fab fa-youtube"></i>
            Смотреть на YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
