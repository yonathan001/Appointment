import axios from 'axios';
import { Notification } from '../types';
import { getAuthHeader } from './auth.service';

const API_URL = 'http://localhost:8000/api/notifications/';

class NotificationService {
  async getNotifications() {
    try {
      const response = await axios.get(API_URL, { headers: getAuthHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  async getUnreadCount() {
    try {
      const response = await axios.get(`${API_URL}unread-count/`, { headers: getAuthHeader() });
      return response.data.count;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: number) {
    try {
      const response = await axios.patch(
        `${API_URL}${notificationId}/read/`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async markAllAsRead() {
    try {
      const response = await axios.patch(
        `${API_URL}mark-all-read/`,
        {},
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  async deleteNotification(notificationId: number) {
    try {
      const response = await axios.delete(
        `${API_URL}${notificationId}/`,
        { headers: getAuthHeader() }
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }
}

export default new NotificationService();
