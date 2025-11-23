/**
 * Dynamic Year Module
 * Automatically updates year in footer copyright
 */

export function updateYear() {
  const currentYear = new Date().getFullYear();
  const yearElements = document.querySelectorAll('[data-year]');
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateYear);
} else {
  updateYear();
}
