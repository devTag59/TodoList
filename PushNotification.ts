import PushNotification, { PushNotificationObject } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class NotificationService {
  static scheduleNotification(arg0: string, arg1: string, date: Date) {
    throw new Error('Method not implemented.');
  }
  static localNotification(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  constructor() {
    this.configure();
  }

  configure() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  localNotification(title: string, message: string) {
    PushNotification.localNotification({
      title: title,
      message: message,
    });
  }

  scheduleNotification(title: string, message: string, date: Date) {
    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: date,
    });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default NotificationService;