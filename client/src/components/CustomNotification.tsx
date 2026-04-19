/**
 * Custom Notification System
 * Athlynx Corporation
 */

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
}

interface NotificationProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const NotificationItem = ({ notification, onClose }: NotificationProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-gradient-to-r from-green-900/90 to-green-800/90 border-green-500';
      case 'error':
        return 'bg-gradient-to-r from-red-900/90 to-red-800/90 border-red-500';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-900/90 to-yellow-800/90 border-yellow-500';
      case 'info':
      default:
        return 'bg-gradient-to-r from-blue-900/90 to-blue-800/90 border-blue-500';
    }
  };

  return (
    <div
      className={`
        ${getStyles()}
        border-l-4 rounded-lg shadow-2xl p-4 mb-3 backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
        hover:scale-105 cursor-pointer
      `}
      onClick={handleClose}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm mb-1">
            {notification.title}
          </h4>
          <p className="text-gray-300 text-xs leading-relaxed">
            {notification.message}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface NotificationContainerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

export const NotificationContainer = ({ notifications, onClose }: NotificationContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-[9999] w-full max-w-sm pointer-events-none">
      <div className="pointer-events-auto">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    type: NotificationType,
    title: string,
    message: string,
    duration: number = 5000
  ) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      id,
      type,
      title,
      message,
      duration,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const success = (title: string, message: string, duration?: number) => {
    addNotification('success', title, message, duration);
  };

  const error = (title: string, message: string, duration?: number) => {
    addNotification('error', title, message, duration);
  };

  const info = (title: string, message: string, duration?: number) => {
    addNotification('info', title, message, duration);
  };

  const warning = (title: string, message: string, duration?: number) => {
    addNotification('warning', title, message, duration);
  };

  return {
    notifications,
    removeNotification,
    success,
    error,
    info,
    warning,
  };
};
