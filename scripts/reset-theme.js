// This script can be executed in the browser console to reset the theme to light mode
// Just copy and paste this into your browser console

// Clear any existing theme preference
localStorage.removeItem('theme');

// Set light mode
localStorage.setItem('theme', 'light');

// Reload the page
window.location.reload();

// Alternatively, you can run this directly in your browser console:
// localStorage.setItem('theme', 'light'); window.location.reload();
