import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationState } from '../types';
import NotificationService from '../services/notification.service';
import { useAuth } from './AuthContext';

// Create the context with a default value
const NotificationContext = createContext<{
  state: NotificationState;
  getNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
}>({
  state: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  },
  getNotifications: async () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  deleteNotification: async () => {}
});

// Custom hook to use the notification context
export const useNotifications = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  });

  // Fetch notifications when the user changes
  useEffect(() => {
    if (user) {
      getNotifications();
      
      // Set up polling for new notifications every minute
      const intervalId = setInterval(() => {
        getNotifications();
      }, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [user]);

  // Get all notifications
  const getNotifications = async () => {
    if (!user) return;
    
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await NotificationService.getNotifications();
      const unreadCount = await NotificationService.getUnreadCount();
      
      setState({
        notifications: response.results || [],
        unreadCount,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load notifications'
      }));
    }
  };

  // Mark a notification as read
  const markAsRead = async (id: number) => {
    try {
      await NotificationService.markAsRead(id);
      
      // Update local state
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification => 
          notification.id === id ? { ...notification, is_read: true } : notification
        ),
        unreadCount: Math.max(0, prev.unreadCount - 1)
      }));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      
      // Update local state
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.map(notification => ({ ...notification, is_read: true })),
        unreadCount: 0
      }));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id: number) => {
    try {
      await NotificationService.deleteNotification(id);
      
      // Update local state
      const deletedNotification = state.notifications.find(n => n.id === id);
      const wasUnread = deletedNotification && !deletedNotification.is_read;
      
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(notification => notification.id !== id),
        unreadCount: wasUnread ? Math.max(0, prev.unreadCount - 1) : prev.unreadCount
      }));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        state,
        getNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
