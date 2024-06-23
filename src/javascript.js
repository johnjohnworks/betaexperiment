const body = document.body;

// Get the current date
const currentDate = new Date();
const currentMonth = currentDate.getMonth();

const displayDate = currentDate.toISOString().slice(0, 10);
const displayDateTimeLocal = currentDate.toISOString().slice(0, 16);
const displayMonth = currentDate.toISOString().slice(0, 7);
const displayTime = currentDate.toTimeString().slice(0, 5);

// Get the ISO week number for the current date
const weekNumber = getISOWeek(currentDate);

// Format the ISO week number to fit the input[type=week] format (YYYY-W##)
const displayWeek = `${currentDate.getFullYear()}-W${weekNumber
  .toString()
  .padStart(2, "0")}`;

function changeTheme() {
  body.classList.toggle("dark");
  body.classList.toggle("light");
}

function openSettings() {
  let modal = document.getElementById("settingsModal1");
  let template = modal.content.cloneNode(true);
  document.body.appendChild(template);
}

function closeModal() {
  let modal = document.querySelector(".modalOpacity");
  if (modal) {
    // Apply transition for smooth animation
    modal.style.transition = "opacity 1s cubic-bezier(0.4, 0, 0.2, 1)";

    // Set opacity to 0 to animate the modal fading out
    modal.style.opacity = 0;

    // After the animation finishes, remove the modal from the DOM
    modal.addEventListener("transitionend", function () {
      modal.remove();
    });
  }
}

function changeFontSize(radioButton) {
  let selectedFontSize = radioButton.value;

  // Remove all font size classes from the body element
  document.body.classList.remove(
    "fontSizeSmall",
    "fontSizeMedium",
    "fontSizeLarge"
  );

  // Add the appropriate font size class to the body element
  if (selectedFontSize === "fontSizeSmall") {
    document.body.classList.add("fontSizeSmall");
  } else if (selectedFontSize === "fontSizeMedium") {
    document.body.classList.add("fontSizeMedium");
  } else if (selectedFontSize === "fontSizeLarge") {
    document.body.classList.add("fontSizeLarge");
  }
}

// Function to get ISO week number
function getISOWeek(date) {
  const day = date.getDay() || 7; // Get current day of week (1-7), Sunday is 7 not 0
  const firstThursday = new Date(
    date.getFullYear(),
    date.getMonth(),
    1 + (4 - day)
  ); // First Thursday of the current month
  return Math.ceil(
    ((date - firstThursday) / 86400000 + 1 + firstThursday.getDay()) / 7
  );
}
