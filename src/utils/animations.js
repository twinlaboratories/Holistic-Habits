// Animation utility for scroll-based animations

// Check if element is in viewport
export function isElementInViewport(el, offset = 100) {
  if (!el) return false;
  
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0
  );
}

// Handle scroll animations
export function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-up, .headline-animated');
  
  elements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('visible');
    }
  });
}

// Initialize animations on scroll
export function initScrollAnimations() {
  if (typeof window !== 'undefined') {
    // Run once on initial load
    handleScrollAnimations();
    
    // Add scroll listener
    window.addEventListener('scroll', () => {
      handleScrollAnimations();
    }, { passive: true });
    
    // Add resize listener to recalculate
    window.addEventListener('resize', () => {
      handleScrollAnimations();
    }, { passive: true });
  }
}

// Handle hover effects for review cards
export function handleReviewCardInteractions() {
  const cards = document.querySelectorAll('.review-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      // Apply subtle 3D rotation
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Initialize all animations
export function initAllAnimations() {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      initScrollAnimations();
      handleReviewCardInteractions();
    }, 100);
  }
} 