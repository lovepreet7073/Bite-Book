// src/components/CustomToast.js
import { toast } from 'react-hot-toast';

const showCustomToast = (message, type = 'success') => {
  // Define the default options
  const toastOptions = {
    duration: 3000, // Default duration
    position: 'top-right', // Default position
    style: {
      background: '#28a745', // Default background (Green)
      color: '#fff', // Default text color
      borderRadius: '10px',
      padding: '13px',
      fontSize: '16px',
    },
    icon: '👏', // Default icon (Success)
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  if (type === 'error') {
    toastOptions.style.background = '#dc3545'; // Red for error
    toastOptions.icon = '❌';
  } else if (type === 'info') {
    toastOptions.style.background = '#17a2b8'; // Blue for info
    toastOptions.icon = 'ℹ️';
  } else if (type === 'warning') {
    toastOptions.style.background = '#ffc107'; // Yellow for warning
    toastOptions.icon = '⚠️';
  }

  // Show the toast
  toast(message, toastOptions);
};

export default showCustomToast;
