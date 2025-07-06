import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ActivityChart = () => {
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [groupBy, setGroupBy] = useState('day');

  useEffect(() => {
    fetchActivityData();
  }, [dateRange, groupBy]);

  const fetchActivityData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/statistics/activity', {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          groupBy
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setActivityData(response.data);
      setError('');
    } catch (err) {
      setError('Ошибка при загрузке статистики');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      switch (groupBy) {
        case 'hour':
          return format(date, 'dd MMM HH:mm', { locale: ru });
        case 'day':
          return format(date, 'dd MMM', { locale: ru });
        case 'month':
          return format(date, 'MMM yyyy', { locale: ru });
        default:
          return format(date, 'dd MMM', { locale: ru });
      }
    } catch {
      return dateString;
    }
  };

  const activityTypeNames = {
    page_view: 'Просмотры страниц',
    event_view: 'Просмотры событий',
    registration: 'Регистрации',
    login: 'Входы в систему',
    api_call: 'API вызовы'
  };

  if (loading) return <div className="text-center p-5">Загрузка статистики...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!activityData) return null;

  const timelineData = activityData.activityByTime.map(item => ({
    date: formatDate(item._id),
    'Всего действий': item.count,
    'Уникальных пользователей': item.uniqueUsers
  }));

  const typeData = activityData.activityByType.map(item => ({
    name: activityTypeNames[item._id] || item._id,
    value: item.count
  }));

  return (
    <div className="activity-charts">
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Начальная дата:</label>
          <input
            type="date"
            className="form-control"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label>Конечная дата:</label>
          <input
            type="date"
            className="form-control"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label>Группировка:</label>
          <select
            className="form-control"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="hour">По часам</option>
            <option value="day">По дням</option>
            <option value="month">По месяцам</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-4">
          <h4>Активность по времени</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Всего действий" stroke="#8884d8" />
              <Line type="monotone" dataKey="Уникальных пользователей" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h4>Типы активности</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6 mb-4">
          <h4>Популярные события</h4>
          {activityData.popularEvents.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData.popularEvents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="eventName" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted">Нет данных о просмотрах событий</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
