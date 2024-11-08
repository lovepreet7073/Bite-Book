// src/components/CustomToast.js
import { toast } from 'react-hot-toast';

const showCustomToast = (message, type = 'success') => {
  // Define default style and icon
  const toastOptions = {
    duration: 2000, // Default duration
    position: 'top-right', // Default position
    style: {
      background: 'white', // White background for a clean look
      color: '#333', // Default text color
      border: '2px solid', // Border for professional look
      borderColor: 'green', // Primary color for the border
      borderRadius: '8px',
      padding: '10px 15px',
      fontSize: '16px',
    },
    icon: '✔️', // Default icon (Success)
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };

  // Adjust styles based on toast type
  if (type === 'error') {
    toastOptions.style.borderColor = '#dc3545'; // Red for error
    toastOptions.icon = '❌';
    toastOptions.style.color = '#dc3545'; // Red text for error
  } else if (type === 'info') {
    toastOptions.style.borderColor = '#17a2b8'; // Blue for info
    toastOptions.icon = 'ℹ️';
  } else if (type === 'warning') {
    toastOptions.style.borderColor = '#ffc107'; // Yellow for warning
    toastOptions.icon = '⚠️';
  }

  // Show the toast
  toast(message, toastOptions);
};

export default showCustomToast;
