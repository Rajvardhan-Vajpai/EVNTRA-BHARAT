
document.addEventListener("DOMContentLoaded", () => {
    const bharatWords = ["Bharat", "भारत", "பாரதம்", "ভারত", "India"];
    let currentIndex = 0;
    const elements = document.querySelectorAll(".dynamic-bharat");
    if(elements.length > 0) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % bharatWords.length;
        elements.forEach(el => {
          el.classList.add("fade-out");
          setTimeout(() => {
            el.textContent = bharatWords[currentIndex];
            el.classList.remove("fade-out");
          }, 400);
        });
      }, 3000);
    }
});
