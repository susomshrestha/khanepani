import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';


export const showNotification = (type: NotificationType, message: string, description: string, placement: NotificationPlacement = 'bottomRight') => {
  notification[type]({
    message,
    description,
    placement,
    duration: 2
  });
};