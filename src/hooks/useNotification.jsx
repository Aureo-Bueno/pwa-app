import { useEffect } from "react";

const useNotification = () => {
  const requestNotificationPermission = async () => { 
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') { 
      alert('You need to grant permission to receive notifications');
    }
  };

  useEffect(() => { 
    requestNotificationPermission();
  }, []);
  return {};
};

export default useNotification;
