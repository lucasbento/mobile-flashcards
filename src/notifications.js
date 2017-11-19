import { Permissions, Notifications } from 'expo';
import startOfTomorrow from 'date-fns/start_of_tomorrow';
import addHours from 'date-fns/add_hours';

export const requestNotificationPermission = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.NOTIFICATIONS,
  );

  return status === 'granted';
};

export const scheduleLocalNotification = () =>
  Notifications.scheduleLocalNotificationAsync({
    title: 'Reminder',
    body: 'Remember to study today.',
  }, {
    time: addHours(startOfTomorrow(), 17),
    repeat: 'day',
  });

export const clearLocalNotifications = () =>
  Notifications.cancelAllScheduledNotificationsAsync();
