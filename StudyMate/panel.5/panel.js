
let popup = document.getElementById("popup");

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

// CALENDAR 
document.addEventListener('DOMContentLoaded', function () {
    const monthYear = document.getElementById('Month-Year');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    
    let currentDate = new Date(); // Used for navigating calendar
    let today = new Date();       

    // Main function to draw the calendar
    function renderCalendar(date) {
        const year = date.getFullYear();         
        const month = date.getMonth();           // Current month (0–11)
        const firstDay = new Date(year, month, 1).getDay(); // Day of week for 1st (0 = Sunday)
        const lastDate = new Date(year, month + 1, 0).getDate(); // Total days in current month
        const prevMonthLastDate = new Date(year, month, 0).getDate(); // Last date of previous month

        // Update calendar title: e.g. "June 2025"
        monthYear.textContent = `${months[month]} ${year}`;

        // Clear old days from calendar
        daysContainer.innerHTML = '';

        // --- Add faded days from previous month ---
        // Example: if 1st is Wednesday (3), we add Sun (0), Mon (1), Tue (2)
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDate - i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }

        // --- Add actual days of the current month ---
        for (let i = 1; i <= lastDate; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;

            // Highlight today
            if (
                i === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {
                dayDiv.classList.add('today');
            }

            daysContainer.appendChild(dayDiv);
        }

        // --- Add faded next month days to fill last row ---
        const totalCells = firstDay + lastDate;
        const remainingCells = (7 - (totalCells % 7)) % 7;

        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    // Change to previous month
    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // Change to next month
    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Show initial calendar
    renderCalendar(currentDate);
});


//TO-DO LIST
let addToDoButton = document.getElementById('addToDo');
let ToDos = document.getElementById('ToDos');
let input = document.getElementById('input');

addToDoButton.addEventListener('click', function () {
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');

    paragraph.innerText = input.value;
    ToDos.appendChild(paragraph);
    input.value = "";
    paragraph.addEventListener('click', function () {
        paragraph.style.textDecoration = "line-through";
    });
    paragraph.addEventListener('dblclick', function () {
        ToDos.removeChild(paragraph);
    });
});

//CALCULATOR
let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById('cal').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('cal').value = `${previousInput} ${currentOperation}`;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById('cal').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('cal').value = '';
}

//time-display

let time = document.querySelector('.time');

function getCurrentTime() {
    let date = new Date()
    return date.toLocaleTimeString();
}

setInterval(() => {
    time.innerHTML = getCurrentTime()
}, 1000);


//files-upload

    const folderFiles = {
      0: [],
      1: []
    };

    function triggerUpload(folderIndex) {
      document.getElementById(`fileInput${folderIndex}`).click();
    }

    function handleFiles(event, folderIndex) {
      const files = Array.from(event.target.files);
      folderFiles[folderIndex].push(...files);
      renderFileList(folderIndex);
    }

    function renderFileList(folderIndex) {
      const list = document.getElementById(`fileList${folderIndex}`);
      list.innerHTML = `<h5>Folder ${folderIndex + 1} Files:</h5>`;
      folderFiles[folderIndex].forEach((file, idx) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.textContent = `${idx + 1}. ${file.name}`;
        list.appendChild(fileItem);
      });
    }

    //plant
    let growthStage = 0;
const stages = ["🌱", "🌿", "🌳"];
const plantEmoji = document.getElementById("plantEmoji");

function growPlant() {
  if (growthStage < stages.length - 1) {
    growthStage++;
    plantEmoji.textContent = stages[growthStage];
  } else {
    alert("Your plant is fully grown! 🎉");
  }
}

//wheel
const focusTasks = [
  "📚 Revise an HTML quiz",
  "🧘‍♀️ Stretch for 5 mins",
  "🧠 Try a memory game",
  "📓 Write a journal entry",
  "💧 Drink a glass of water",
  "🧼 Clean your desk",
  "🎧 Listen to a focus track",
  "📴 Take a 5-minute screen break",
  "🌞 Look outside and breathe deeply"
];

function spinWheel() {
  const randomIndex = Math.floor(Math.random() * focusTasks.length);
  const selectedTask = focusTasks[randomIndex];

  const resultElement = document.getElementById("wheelResult");
  resultElement.classList.remove("d-none");
  resultElement.innerHTML = `🌀 <strong>Your Focus Task:</strong> ${selectedTask}`;
}

