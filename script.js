// Smooth section reveal
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // Scroll progress bar
  window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = `${(scrolled / scrollable) * 100}%`;
    scrollProgress.style.width = progress;
  });
  
  // Add this to your JavaScript
  document.getElementById('x').addEventListener('click', function(e) {
    e.preventDefault();  // Prevent default anchor behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // For smooth scrolling
    });
  });