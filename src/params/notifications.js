import {NotificationContainer, NotificationManager} from 'react-notifications';

createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 2000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 2000, () => {
            alert('callback');
          });
          break;
      }
    };
  };