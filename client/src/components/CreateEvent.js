
import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePhotos = this.onChangePhotos.bind(this);
    this.onChangeVideos = this.onChangeVideos.bind(this);
    this.onChangeAgeGroup = this.onChangeAgeGroup.bind(this);
    this.onChangeMaxParticipants = this.onChangeMaxParticipants.bind(this);
    this.onChangeIsAnnouncement = this.onChangeIsAnnouncement.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      date: new Date(),
      time: '',
      location: '',
      photos: '',
      videos: '',
      ageGroup: '',
      maxParticipants: '',
      isAnnouncement: true
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value
    })
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangePhotos(e) {
    this.setState({
      photos: e.target.value
    })
  }

  onChangeVideos(e) {
    this.setState({
      videos: e.target.value
    })
  }

  onChangeAgeGroup(e) {
    this.setState({
      ageGroup: e.target.value
    })
  }

  onChangeMaxParticipants(e) {
    this.setState({
      maxParticipants: e.target.value
    })
  }

  onChangeIsAnnouncement(e) {
    this.setState({
      isAnnouncement: e.target.checked
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const event = {
      name: this.state.name,
      description: this.state.description,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      photos: this.state.photos ? this.state.photos.split(',').map(p => p.trim()) : [],
      videos: this.state.videos ? this.state.videos.split(',').map(v => v.trim()) : [],
      ageGroup: this.state.ageGroup,
      maxParticipants: this.state.maxParticipants ? parseInt(this.state.maxParticipants) : null,
      isAnnouncement: this.state.isAnnouncement
    }

    console.log(event);

    axios.post('http://localhost:5000/events/add', event)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg" style={{ borderRadius: 'var(--radius-lg)' }}>
            <div className="card-header" style={{
              background: 'var(--gradient-primary)',
              color: 'white',
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
            }}>
              <h3 className="mb-0">
                <i className="fas fa-calendar-plus me-2"></i>
                Создать новое мероприятие
              </h3>
            </div>
            <div className="card-body p-5">
              <form onSubmit={this.onSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Название мероприятия *</label>
                    <input 
                      type="text"
                      required
                      className="form-control form-control-lg"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      placeholder="Например: Мастер-класс по рисованию"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Дата *</label>
                    <DatePicker
                      selected={this.state.date}
                      onChange={this.onChangeDate}
                      className="form-control form-control-lg"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Время</label>
                    <input 
                      type="text"
                      className="form-control form-control-lg"
                      value={this.state.time}
                      onChange={this.onChangeTime}
                      placeholder="Например: 15:00"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Место проведения</label>
                    <input 
                      type="text"
                      className="form-control form-control-lg"
                      value={this.state.location}
                      onChange={this.onChangeLocation}
                      placeholder="Адрес или кабинет"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">Описание *</label>
                    <textarea 
                      required
                      className="form-control form-control-lg"
                      rows="4"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      placeholder="Подробное описание мероприятия"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Возрастная группа</label>
                    <input 
                      type="text"
                      className="form-control form-control-lg"
                      value={this.state.ageGroup}
                      onChange={this.onChangeAgeGroup}
                      placeholder="Например: 7-10 лет"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Макс. количество участников</label>
                    <input 
                      type="number"
                      className="form-control form-control-lg"
                      value={this.state.maxParticipants}
                      onChange={this.onChangeMaxParticipants}
                      placeholder="Например: 15"
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">
                      <i className="fas fa-image me-2"></i>
                      Ссылки на фото
                    </label>
                    <input 
                      type="text"
                      className="form-control form-control-lg"
                      value={this.state.photos}
                      onChange={this.onChangePhotos}
                      placeholder="URL фотографий через запятую"
                    />
                    <small className="text-muted">Можно указать несколько URL через запятую</small>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold">
                      <i className="fas fa-video me-2"></i>
                      Ссылки на видео
                    </label>
                    <input 
                      type="text"
                      className="form-control form-control-lg"
                      value={this.state.videos}
                      onChange={this.onChangeVideos}
                      placeholder="YouTube URL или другие ссылки через запятую"
                    />
                    <small className="text-muted">Можно указать несколько URL через запятую</small>
                  </div>

                  <div className="col-12">
                    <div className="form-check form-switch">
                      <input 
                        className="form-check-input"
                        type="checkbox"
                        id="isAnnouncement"
                        checked={this.state.isAnnouncement}
                        onChange={this.onChangeIsAnnouncement}
                      />
                      <label className="form-check-label fw-bold" htmlFor="isAnnouncement">
                        Показывать как анонс на главной странице
                      </label>
                    </div>
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-lg"
                      style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        padding: 'var(--space-3) var(--space-6)',
                        borderRadius: 'var(--radius-lg)',
                        fontWeight: '600',
                        boxShadow: 'var(--shadow-md)',
                        transition: 'all var(--transition-base)',
                        minWidth: '200px'
                      }}
                    >
                      <i className="fas fa-save me-2"></i>
                      Создать мероприятие
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
