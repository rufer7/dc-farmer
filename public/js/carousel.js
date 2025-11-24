/**
 * Carousel Interaction Module
 * Implements keyboard navigation (arrows, Home/End) for accessible carousels
 */

export class Carousel {
  constructor(element) {
    this.carousel = element;
    this.container = element.querySelector('.carousel-container');
    
    if (!this.container) {
      console.warn('Carousel container not found');
      return;
    }
    
    this.items = Array.from(this.container.querySelectorAll('.carousel-item'));
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    // Make container focusable
    if (!this.container.hasAttribute('tabindex')) {
      this.container.setAttribute('tabindex', '0');
    }
    
    // Set ARIA label
    if (!this.container.hasAttribute('aria-label')) {
      this.container.setAttribute('aria-label', 'Scrollable carousel - use arrow keys to navigate');
    }
    
    // Add keyboard event listeners
    this.container.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Track scroll position
    this.container.addEventListener('scroll', this.updateCurrentIndex.bind(this));
  }
  
  handleKeyDown(event) {
    // Ignore if modifier keys are pressed (except Shift for accessibility)
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.scrollToPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.scrollToNext();
        break;
      case 'Home':
        event.preventDefault();
        this.scrollToFirst();
        break;
      case 'End':
        event.preventDefault();
        this.scrollToLast();
        break;
    }
  }
  
  scrollToNext() {
    if (this.currentIndex < this.items.length - 1) {
      this.scrollToIndex(this.currentIndex + 1);
    }
  }
  
  scrollToPrevious() {
    if (this.currentIndex > 0) {
      this.scrollToIndex(this.currentIndex - 1);
    }
  }
  
  scrollToFirst() {
    this.scrollToIndex(0);
  }
  
  scrollToLast() {
    this.scrollToIndex(this.items.length - 1);
  }
  
  scrollToIndex(index) {
    if (index >= 0 && index < this.items.length) {
      const item = this.items[index];
      if (item) {
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
        this.currentIndex = index;
      }
    }
  }
  
  updateCurrentIndex() {
    // Determine which item is most visible
    const containerRect = this.container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    this.items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    this.currentIndex = closestIndex;
  }
}

/**
 * Initialize all carousels on the page
 */
export function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  const instances = [];
  
  carousels.forEach(element => {
    instances.push(new Carousel(element));
  });
  
  return instances;
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousels);
} else {
  initCarousels();
}
