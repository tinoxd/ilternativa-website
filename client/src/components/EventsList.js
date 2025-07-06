
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Event = props => (
  <tr>
    <td>{props.event.name}</td>
    <td>{props.event.description}</td>
    <td>{new Date(props.event.date).toLocaleDateString('ru-RU')}</td>
    <td>
      <Link to={"/register-event/"+props.event._id} className="btn btn-sm btn-primary me-2">
        <i className="fas fa-calendar-plus"></i> Записаться
      </Link>
      {props.isAdmin && (
        <>
          <Link to={"/edit/"+props.event._id} className="btn btn-sm btn-warning me-2">
            <i className="fas fa-edit"></i> Редактировать
          </Link>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => { props.deleteEvent(props.event._id) }}
          >
            <i className="fas fa-trash"></i> Удалить
          </button>
        </>
      )}
    </td>
  </tr>
)

export default class EventsList extends Component {
  constructor(props) {
    super(props);

    this.deleteEvent = this.deleteEvent.bind(this)

    this.state = {
      events: [],
      isAdmin: false
    };
  }

  componentDidMount() {
    // Проверяем, авторизован ли пользователь
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.setState({ isAdmin: userData.role === 'admin' });
    }

    axios.get('http://localhost:5000/events/')
      .then(response => {
        this.setState({ events: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEvent(id) {
    axios.delete('http://localhost:5000/events/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      events: this.state.events.filter(el => el._id !== id)
    })
  }

  eventList() {
    return this.state.events.map(currentevent => {
      return <Event event={currentevent} deleteEvent={this.deleteEvent} isAdmin={this.state.isAdmin} key={currentevent._id}/>;
    })
  }

  render() {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">События и мероприятия</h2>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            { this.eventList() }
          </tbody>
        </table>
        {this.state.events.length === 0 && (
          <p className="text-center text-muted">Нет запланированных событий</p>
        )}
      </div>
    )
  }
}
