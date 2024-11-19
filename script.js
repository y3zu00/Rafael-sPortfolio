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
  
  // Form handling
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    
    if (!validateForm(name, email, subject, message)) {
        return false;
    }
    
    // Show loading state
    submitBtn.classList.add('is-loading');

    // Prepare template parameters
    const templateParams = {
        to_name: 'Rafael',
        from_name: name,
        message: message,
        subject: subject,
        reply_to: email,
        from_email: email
    };

    // Send email using EmailJS with the correct template ID
    emailjs.send('service_yaq10h9', 'template_t9orpas', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            submitBtn.classList.remove('is-loading');
            submitBtn.classList.add('is-sent');
            form.reset();
            
            setTimeout(() => {
                submitBtn.classList.remove('is-sent');
            }, 2000);
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            submitBtn.classList.remove('is-loading');
            alert('Error sending message. Please try again later.');
        });

    return false;
  }
  
  function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Name validation
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        hideError('name');
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('email');
    }
    
    // Subject validation
    if (subject.length < 2) {
        showError('subject', 'Subject is required');
        isValid = false;
    } else {
        hideError('subject');
    }
    
    // Message validation
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        hideError('message');
    }
    
    return isValid;
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function showError(fieldName, message) {
    const errorDiv = document.querySelector(`#${fieldName}`).nextElementSibling.nextElementSibling;
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
  
  function hideError(fieldName) {
    const errorDiv = document.querySelector(`#${fieldName}`).nextElementSibling.nextElementSibling;
    errorDiv.style.display = 'none';
  }
  
  // Add this to your JavaScript
  function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 }); // Triggers when 10% of element is visible

    elements.forEach(element => {
        observer.observe(element);
    });
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', handleScrollAnimation);

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('skillsCanvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.skills-container');
    const nodes = document.querySelectorAll('.skill-node');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Position nodes in a circle
    function positionNodes() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.3;

        nodes.forEach((node, index) => {
            const angle = (index * 2 * Math.PI) / nodes.length;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            node.style.left = `${x - node.offsetWidth / 2}px`;
            node.style.top = `${y - node.offsetHeight / 2}px`;
        });
    }
    positionNodes();

    // Draw connections
    function drawConnections(mouseX, mouseY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw lines between nodes
        nodes.forEach((node, i) => {
            const rect1 = node.getBoundingClientRect();
            const x1 = rect1.left + rect1.width / 2 - container.getBoundingClientRect().left;
            const y1 = rect1.top + rect1.height / 2 - container.getBoundingClientRect().top;

            // Draw line to center
            const centerRect = document.querySelector('.center-node').getBoundingClientRect();
            const centerX = centerRect.left + centerRect.width / 2 - container.getBoundingClientRect().left;
            const centerY = centerRect.top + centerRect.height / 2 - container.getBoundingClientRect().top;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(centerX, centerY);
            ctx.strokeStyle = 'rgba(138, 43, 226, 0.4)'; // Purple lines
            ctx.lineWidth = 3;
            ctx.stroke();

            // React to mouse with white lines
            if (mouseX && mouseY) {
                const dist = Math.hypot(mouseX - x1, mouseY - y1);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // White interactive lines
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
        });
    }

    // Mouse interaction
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        drawConnections(mouseX, mouseY);
    });

    container.addEventListener('mouseleave', () => {
        drawConnections();
    });

    // Initial draw
    drawConnections();
  });

  // Add this to your existing JavaScript
  const skillDescriptions = {
    "Game Development": "Experienced in Python, Pygame, and 2D game mechanics. Creating over 15 games and learning new things every day.",
    "Web Development": "HTML, CSS, JavaScript, and responsive design. I've created multiple websites including an open source gaming website.",
    "Problem Solving": "CodeWars 6th kyu, algorithms, and doing competitive coding challenges looking to improve my skills.",
    "Prompt Engineering": "Currently learning about prompt engineering and how to use it to my advantage in both backend and frontend development.",
    "Time Management": "Excellent at prioritizing tasks, meeting deadlines, and balancing multiple projects simultaneously.",
    "Communication": "Strong interpersonal skills with experience in client relations and team collaboration."
  };

  // Get modal elements
  const modal = document.querySelector('.skill-modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalImage = document.getElementById('modalImage');
  const closeModal = document.querySelector('.close-modal');

  // Add click handlers to nodes
  document.querySelectorAll('.skill-node').forEach(node => {
    node.addEventListener('click', () => {
        const skill = node.getAttribute('data-skill');
        const imageUrl = node.getAttribute('data-image');
        
        modalTitle.textContent = skill;
        modalDescription.textContent = skillDescriptions[skill];
        modalImage.src = imageUrl;
        
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.7)';
        
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });
    });
  });

  // Close modal function
  function closeModalWithAnimation() {
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.7)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
  }

  // Close button click
  closeModal.addEventListener('click', closeModalWithAnimation);

  // Click outside modal to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalWithAnimation();
    }
  });

// ADD THIS AT THE END OF YOUR EXISTING script.js - DON'T REPLACE ANYTHING!
// Keep all your existing code above this

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const gameContainer = document.getElementById('gameContainer');
  const canvas = document.getElementById('pongCanvas');
  const gameOver = document.getElementById('gameOver');
  const ctx = canvas.getContext('2d');

  let gameLoop;
  let paddle = { width: 10, height: 100, y: 250 };
  let ball = { x: 400, y: 300, dx: 5, dy: 5, radius: 10 };
  let score = 0;
  let speedIncrease = 1.1;
  let speedIncreaseInterval = 5;

  function startGame() {
    // First show the container
    gameContainer.style.display = 'block';
    
    // Force a reflow
    gameContainer.offsetHeight;
    
    // Then add the active class for animation
    gameContainer.classList.add('active');
    
    // Initialize game
    canvas.width = gameContainer.offsetWidth;
    canvas.height = gameContainer.offsetHeight;
    paddle.y = canvas.height / 2 - paddle.height / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5;
    ball.dy = 5;
    score = 0;
    gameOver.style.display = 'none';
    gameLoop = requestAnimationFrame(update);
  }

  function update() {
      if (!gameContainer.classList.contains('active')) {
          return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.dy *= -1;
      }

      if (ball.x - ball.radius < 20 && 
          ball.y > paddle.y && 
          ball.y < paddle.y + paddle.height) {
          ball.dx *= -1;
          score++;
          
          if (score % speedIncreaseInterval === 0) {
              ball.dx *= speedIncrease;
              ball.dy *= speedIncrease;
          }
      }

      if (ball.x < 0) {
          endGame();
          return;
      }

      if (ball.x + ball.radius > canvas.width) {
          ball.dx *= -1;
      }

      ctx.fillStyle = '#8A2BE2';
      ctx.fillRect(10, paddle.y, paddle.width, paddle.height);

      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.font = '24px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText('Score: ' + score, 10, 30);

      gameLoop = requestAnimationFrame(update);
  }

  function endGame() {
      cancelAnimationFrame(gameLoop);
      document.getElementById('finalScore').textContent = score;
      gameOver.style.display = 'block';
  }

  function exitGame() {
      cancelAnimationFrame(gameLoop);
      gameContainer.classList.remove('active');
  }

  // Event Listeners
  if (playButton) {
      playButton.addEventListener('click', startGame);
  }
  
  if (document.getElementById('restartButton')) {
      document.getElementById('restartButton').addEventListener('click', startGame);
  }
  
  if (document.getElementById('exitButton')) {
      document.getElementById('exitButton').addEventListener('click', exitGame);
  }

  if (canvas) {
      canvas.addEventListener('mousemove', (e) => {
          let rect = canvas.getBoundingClientRect();
          let mouseY = e.clientY - rect.top;
          paddle.y = mouseY - paddle.height / 2;

          if (paddle.y < 0) paddle.y = 0;
          if (paddle.y + paddle.height > canvas.height) {
              paddle.y = canvas.height - paddle.height;
          }
      });
  }

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          exitGame();
      }
  });

  // New click handler for exiting the game
  document.addEventListener('click', function(e) {
      if (gameContainer.classList.contains('active')) {
          if (!gameOver.contains(e.target) && !playButton.contains(e.target)) {
              exitGame();
          }
      }
  });
});
function exitGame() {
  // Remove active class first for animation
  gameContainer.classList.remove('active');
  
  // Wait for animation to finish before hiding
  setTimeout(() => {
      cancelAnimationFrame(gameLoop);
      gameContainer.style.display = 'none';
  }, 300);
}