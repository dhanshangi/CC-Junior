// ================================================================= NavBar Start =================================================================

// document.addEventListener("DOMContentLoaded", () => {
//   const menuItems = document.querySelectorAll(".menu-item");
//   const images = document.querySelectorAll('.header-image');
//   const currentPage = window.location.pathname;

//   const originalImages = [
//     '/img/lessons.png',
//     '/img/practices.png',
//     '/img/skills.png'
//   ];

//   const alternateImages = [
//     '/img/lessons_selected.png',
//     '/img/practices_selected.png',
//     '/img/skills_selected.png'
//   ];

//   const isLessonPage = currentPage.includes("/Lessons/");
//   const isPracticePage = currentPage.includes("/Practice/");
//   const isSkillsPage = currentPage.includes("/Skills/");


//   menuItems.forEach((item, index) => {
//     const link = item.querySelector("a");

//     if (link) {
//       const itemHref = link.getAttribute("href");

//       if (
//         (isLessonPage && itemHref.includes("index.html")) ||
//         (isPracticePage && itemHref.includes("practice.html")) ||
//         (isSkillsPage && itemHref.includes("skills.html")) ||
//         currentPage === itemHref
//       ) {
//         images[index].src = alternateImages[index];
//       } else {
//         images[index].src = originalImages[index];
//       }
//     }
//   });

//   images.forEach((image, index) => {
//     image.addEventListener('click', () => {
//       const currentSrc = image.src.split('/').pop();

//       if (currentSrc === originalImages[index].split('/').pop()) {
//         image.src = alternateImages[index];
//       } else {
//         image.src = originalImages[index];
//       }

//       images.forEach((img, idx) => {
//         img.src = originalImages[idx];
//       });

//       image.src = currentSrc === originalImages[index].split('/').pop()
//         ? alternateImages[index]
//         : originalImages[index];
//     });
//   });
// });

// ================================================================= NavBar End =================================================================


// ================================================================= Bar Chart Start =================================================================

document.addEventListener("DOMContentLoaded", function () {
  // Skill levels configuration
  const LEVELS = {
    beginner: { max: 33, color: '#FC8342', name: 'Beginner' },
    intermediate: { max: 66, color: '#FCD25A', name: 'Intermediate' },
    advanced: { color: '#A47CE8', name: 'Advanced' }
  };

  // Bar heights defined in JavaScript
  const BAR_HEIGHTS = [33, 50, 66, 85, 100]; // [bar1, bar2, bar3, bar4, bar5]
  const bars = document.querySelectorAll('.bar');

  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'bar-tooltip';
  document.body.appendChild(tooltip);

  // Initialize all bars with JS-controlled heights
  function initializeBars() {
    bars.forEach((bar, index) => {
      const heightPercentage = BAR_HEIGHTS[index];
      const skillName = bar.querySelector('h3').textContent.replace(/\n/g, ' ').trim();

      // Set height via JavaScript
      bar.style.height = `${heightPercentage}%`;
      
      // Store percentage and skill name as data attributes
      bar.dataset.percentage = heightPercentage;
      bar.dataset.skillName = skillName;
      
      // Store skill level
      bar.dataset.skillLevel = getSkillLevel(heightPercentage);

      // Calculate and set gradient
      updateBarColor(bar, heightPercentage);

      // Add hover events
      bar.addEventListener('mouseenter', showTooltip);
      bar.addEventListener('mouseleave', hideTooltip);
      bar.addEventListener('mousemove', moveTooltip);
    });
  }

  // Determine skill level based on percentage
  function getSkillLevel(percentage) {
    if (percentage <= LEVELS.beginner.max) {
      return LEVELS.beginner.name;
    } else if (percentage <= LEVELS.intermediate.max) {
      return LEVELS.intermediate.name;
    } else {
      return LEVELS.advanced.name;
    }
  }

  // Tooltip functions
  function showTooltip(e) {
    const bar = e.currentTarget;
    const percentage = bar.dataset.percentage;
    const skillName = bar.dataset.skillName;
    const skillLevel = bar.dataset.skillLevel;
    
    tooltip.innerHTML = `
      <div class="tooltip-skill">${skillName}</div>
      <div class="tooltip-level">${skillLevel}</div>
      <div class="tooltip-percentage">${percentage}%</div>
    `;
    tooltip.style.opacity = '1';
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
  }

  function moveTooltip(e) {
    tooltip.style.left = `${e.clientX + 10}px`;
    tooltip.style.top = `${e.clientY - 30}px`;
  }

  // Update color for a single bar
  function updateBarColor(bar, heightPercentage) {
    let gradient;
    if (heightPercentage <= LEVELS.beginner.max) {
      gradient = LEVELS.beginner.color;
    } else if (heightPercentage <= LEVELS.intermediate.max) {
      const beginnerPortion = (LEVELS.beginner.max / heightPercentage) * 100;
      gradient = `linear-gradient(to top, 
        ${LEVELS.beginner.color} 0%, ${LEVELS.beginner.color} ${beginnerPortion}%, 
        ${LEVELS.intermediate.color} ${beginnerPortion}%, ${LEVELS.intermediate.color} 100%)`;
    } else {
      const beginnerPortion = (LEVELS.beginner.max / heightPercentage) * 100;
      const intermediatePortion = (LEVELS.intermediate.max / heightPercentage) * 100;
      gradient = `linear-gradient(to top, 
        ${LEVELS.beginner.color} 0%, ${LEVELS.beginner.color} ${beginnerPortion}%, 
        ${LEVELS.intermediate.color} ${beginnerPortion}%, ${LEVELS.intermediate.color} ${intermediatePortion}%, 
        ${LEVELS.advanced.color} ${intermediatePortion}%, ${LEVELS.advanced.color} 100%)`;
    }
    bar.style.background = gradient;
  }

  // Initialize all bars
  initializeBars();

  // Update on window resize
  window.addEventListener('resize', () => {
    bars.forEach(bar => {
      const currentHeight = parseFloat(bar.style.height);
      updateBarColor(bar, currentHeight);
    });
  });
});


// Practice Popup Start
const modal = document.getElementById("practicePopup");
const modalImg = document.getElementById("popupImage");
const thumbnails = document.querySelectorAll(".popup .inner img");
const closeBtn = document.querySelector(".practice-close");

// Show modal on image click
thumbnails.forEach(img => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Disable scroll

  });
});

// Close modal on close button
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal if clicked outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Practice Popup End


// ================================================================= Bar Chart End =================================================================
