// Dynamic Logo Language Rotation
document.addEventListener("DOMContentLoaded", () => {
  const bharatWords = [
    "Bharat",      // English/Hindi hybrid
    "भारत",        // Hindi
    "இந்தியா",     // Tamil
    "ভারত",        // Bengali
    "India"        // English
  ];
  let currentIndex = 0;
  const elements = document.querySelectorAll(".dynamic-bharat");

  setInterval(() => {
    currentIndex = (currentIndex + 1) % bharatWords.length;
    
    elements.forEach(el => {
      // Start fade out
      el.classList.add("fade-out");
      
      setTimeout(() => {
        // Change text and prep for fade in
        el.textContent = bharatWords[currentIndex];
        el.classList.remove("fade-out");
        el.classList.add("fade-in");
        
        // Small delay to allow browser to apply the fade-in transform class
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.classList.remove("fade-in");
          });
        });
      }, 500); // Wait for fade-out to finish
    });
  }, 3000); // Change every 3 seconds
});
