// ========================================
// VALENTINE'S WEBSITE - MOVING NO BUTTON
// NO button runs away when you try to click it!
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ===== GET ELEMENTS =====
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const questionSection = document.getElementById("question-section");
  const successSection = document.getElementById("success-section");
  const attemptMessage = document.getElementById("attemptMessage");
  const introPhoto = document.getElementById("introPhoto");

  // ===== HANDLE INTRO PHOTO ERROR =====
  if (introPhoto) {
    introPhoto.addEventListener("error", function () {
      console.log("⚠️ Intro photo not found: pop1.jpg");
      this.style.background = "linear-gradient(135deg, #ff8fab, #ffc3d5)";
      this.alt = "Add pop1.jpg";
    });

    introPhoto.addEventListener("load", function () {
      console.log("✅ Intro photo loaded: pop1.jpg");
    });
  }

  // ===== HANDLE DECORATION IMAGES/GIFS ERRORS =====
  const decorations = document.querySelectorAll(".decoration");
  decorations.forEach(function (dec) {
    dec.addEventListener("error", function () {
      console.log("⚠️ Decoration not found:", this.src);
      this.style.display = "none"; // Hide if not found
    });
  });

  // ===== TRACKING VARIABLES =====
  let noClickAttempts = 0;
  const messages = [
    "lahh ayaw mo?? 🥺",
    "plsss dont click no babyyyy💔",
    "pag isipan mo munang mabuti😢",
    "prettyy pleaseee jennnn???",
    "tigas ulo mo ha",
    "you'll never gonna catch meeee HAHAHA",
    "tatalon ako building bala ka",
    "di yan papahabol sayo bala ka",
    "di mo na ba akoo loveeee?!!!!!!!!!!!!",
    "AYAN WALA KA NG CHOICEEEE",
  ];

  // ===== YES BUTTON CLICK =====
  yesBtn.addEventListener("click", function () {
    // Hide question section
    questionSection.classList.remove("active");
    questionSection.classList.add("hidden");

    // Show success section
    successSection.classList.remove("hidden");
    successSection.classList.add("active");

    console.log("🎉 SHE SAID YES! 🎉");
  });

  // ===== NO BUTTON HOVER - MOVE AWAY =====
  noBtn.addEventListener("mouseenter", function () {
    moveNoButton();
  });

  // ===== NO BUTTON CLICK - MOVE AWAY =====
  noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    moveNoButton();
  });

  // ===== TOUCH SUPPORT FOR MOBILE =====
  noBtn.addEventListener("touchstart", function (e) {
    e.preventDefault();
    moveNoButton();
  });

  // ===== FUNCTION TO MOVE NO BUTTON =====
  function moveNoButton() {
    noClickAttempts++;

    // Update message
    const messageIndex = Math.min(noClickAttempts - 1, messages.length - 1);
    attemptMessage.textContent = messages[messageIndex];
    attemptMessage.style.animation = "none";
    setTimeout(() => {
      attemptMessage.style.animation = "fadeInScale 0.5s ease";
    }, 10);

    // Get button positions
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();

    // Calculate safe movement boundaries
    const maxX = containerRect.width / 2 - 100;
    const maxY = containerRect.height / 2 - 50;

    let newX, newY;
    let attempts = 0;
    const maxAttempts = 20;

    // Keep trying until we find a position that doesn't overlap with YES button
    do {
      // Generate random position
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.min(100 + noClickAttempts * 15, 250);

      newX = Math.cos(angle) * distance;
      newY = Math.sin(angle) * distance;

      // Keep within bounds
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      // Calculate where NO button would be with this transform
      const potentialLeft = noBtnRect.left - containerRect.left + newX;
      const potentialTop = noBtnRect.top - containerRect.top + newY;

      // Check if it overlaps with YES button (with extra margin)
      const yesLeft = yesBtnRect.left - containerRect.left;
      const yesTop = yesBtnRect.top - containerRect.top;
      const margin = 150; // Safe distance from YES button

      const overlaps =
        potentialLeft < yesLeft + yesBtnRect.width + margin &&
        potentialLeft + noBtnRect.width > yesLeft - margin &&
        potentialTop < yesTop + yesBtnRect.height + margin &&
        potentialTop + noBtnRect.height > yesTop - margin;

      if (!overlaps) {
        break; // Found a good position!
      }

      attempts++;
    } while (attempts < maxAttempts);

    // Apply transform
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;

    // Grow YES button slightly each time NO is attempted
    const yesScale = 1 + noClickAttempts * 0.05;
    yesBtn.style.transform = `scale(${yesScale})`;

    // After 10 attempts, make NO button tiny and YES button huge
    if (noClickAttempts >= 10) {
      noBtn.style.fontSize = "0.8rem";
      noBtn.style.padding = "10px 20px";
      yesBtn.style.fontSize = "2.5rem";
      attemptMessage.textContent = "Okay okay, you win! Just click YES! 💖";
    }

    console.log(`NO button avoided ${noClickAttempts} times!`);
  }

  // ===== RESET NO BUTTON POSITION ON WINDOW RESIZE =====
  window.addEventListener("resize", function () {
    noBtn.style.transform = "translate(0, 0)";
    noClickAttempts = 0;
    attemptMessage.textContent = "";
    yesBtn.style.transform = "scale(1)";
    noBtn.style.fontSize = "1.8rem";
    noBtn.style.padding = "20px 60px";
    yesBtn.style.fontSize = "1.8rem";
  });

  // ===== KEYBOARD SUPPORT - ENTER FOR YES =====
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !questionSection.classList.contains("hidden")) {
      yesBtn.click();
    }
  });

  // ===== PREVENT NO BUTTON FROM BEING SELECTED =====
  noBtn.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });

  // ===== EASTER EGG: DOUBLE CLICK YES BUTTON =====
  let yesClickCount = 0;
  yesBtn.addEventListener("click", function () {
    yesClickCount++;
    if (yesClickCount > 1) {
      console.log("❤️ Someone really loves this! ❤️");
    }
  });

  // ===== CONSOLE MESSAGES =====
  console.log(
    "%c💕 Happy Valentine's Day! 💕",
    "font-size: 24px; color: #ff1744; font-weight: bold;",
  );
  console.log(
    "%cTry clicking NO... I dare you! 😏",
    "font-size: 16px; color: #ff69b4;",
  );
  console.log("%cMade with love ❤️", "font-size: 14px; color: #666;");

  // ===== INITIAL ANIMATION =====
  console.log("✅ Valentine's website loaded!");
  console.log("🎯 Try to click the NO button... if you can catch it! 😜");
});

// ===== UTILITY FUNCTION - RANDOM NUMBER =====
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// ===== END OF SCRIPT =====
