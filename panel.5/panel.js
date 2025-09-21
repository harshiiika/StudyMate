
// let popup = document.getElementById("popup");

// function openPopup() {
//     popup.classList.add("open-popup");
// }

// function closePopup() {
//     popup.classList.remove("open-popup");
// }

// // CALENDAR 
// document.addEventListener('DOMContentLoaded', function () {
//     const monthYear = document.getElementById('Month-Year');
//     const daysContainer = document.getElementById('days');
//     const prevButton = document.getElementById('prev');
//     const nextButton = document.getElementById('next');

//     const months = [
//         'January', 'February', 'March', 'April', 'May', 'June',
//         'July', 'August', 'September', 'October', 'November', 'December'
//     ];

    
//     let currentDate = new Date(); // Used for navigating calendar
//     let today = new Date();       

//     // Main function to draw the calendar
//     function renderCalendar(date) {
//         const year = date.getFullYear();         
//         const month = date.getMonth();           // Current month (0–11)
//         const firstDay = new Date(year, month, 1).getDay(); // Day of week for 1st (0 = Sunday)
//         const lastDate = new Date(year, month + 1, 0).getDate(); // Total days in current month
//         const prevMonthLastDate = new Date(year, month, 0).getDate(); // Last date of previous month

//         // Update calendar title: e.g. "June 2025"
//         monthYear.textContent = `${months[month]} ${year}`;

//         // Clear old days from calendar
//         daysContainer.innerHTML = '';

//         // --- Add faded days from previous month ---
//         // Example: if 1st is Wednesday (3), we add Sun (0), Mon (1), Tue (2)
//         for (let i = firstDay - 1; i >= 0; i--) {
//             const dayDiv = document.createElement('div');
//             dayDiv.textContent = prevMonthLastDate - i;
//             dayDiv.classList.add('fade');
//             daysContainer.appendChild(dayDiv);
//         }

//         // --- Add actual days of the current month ---
//         for (let i = 1; i <= lastDate; i++) {
//             const dayDiv = document.createElement('div');
//             dayDiv.textContent = i;

//             // Highlight today
//             if (
//                 i === today.getDate() &&
//                 month === today.getMonth() &&
//                 year === today.getFullYear()
//             ) {
//                 dayDiv.classList.add('today');
//             }

//             daysContainer.appendChild(dayDiv);
//         }

//         // --- Add faded next month days to fill last row ---
//         const totalCells = firstDay + lastDate;
//         const remainingCells = (7 - (totalCells % 7)) % 7;

//         for (let i = 1; i <= remainingCells; i++) {
//             const dayDiv = document.createElement('div');
//             dayDiv.textContent = i;
//             dayDiv.classList.add('fade');
//             daysContainer.appendChild(dayDiv);
//         }
//     }

//     // Change to previous month
//     prevButton.addEventListener('click', function () {
//         currentDate.setMonth(currentDate.getMonth() - 1);
//         renderCalendar(currentDate);
//     });

//     // Change to next month
//     nextButton.addEventListener('click', function () {
//         currentDate.setMonth(currentDate.getMonth() + 1);
//         renderCalendar(currentDate);
//     });

//     // Show initial calendar
//     renderCalendar(currentDate);
// });


// //TO-DO LIST
// let addToDoButton = document.getElementById('addToDo');
// let ToDos = document.getElementById('ToDos');
// let input = document.getElementById('input');

// addToDoButton.addEventListener('click', function () {
//     var paragraph = document.createElement('p');
//     paragraph.classList.add('paragraph-styling');

//     paragraph.innerText = input.value;
//     ToDos.appendChild(paragraph);
//     input.value = "";
//     paragraph.addEventListener('click', function () {
//         paragraph.style.textDecoration = "line-through";
//     });
//     paragraph.addEventListener('dblclick', function () {
//         ToDos.removeChild(paragraph);
//     });
// });

// //CALCULATOR
// let currentInput = '';
// let currentOperation = '';
// let previousInput = '';

// function appendNumber(number) {
//     currentInput += number;
//     document.getElementById('cal').value = `${previousInput} ${currentOperation} ${currentInput}`;
// }

// function appendOperation(operation) {
//     if (currentInput === '') return;
//     if (previousInput !== '') {
//         calculate();
//     }
//     currentOperation = operation;
//     previousInput = currentInput;
//     currentInput = '';
//     document.getElementById('cal').value = `${previousInput} ${currentOperation}`;
// }

// function calculate() {
//     if (previousInput === '' || currentInput === '') return;
//     let result;
//     let prev = parseFloat(previousInput);
//     let current = parseFloat(currentInput);

//     switch (currentOperation) {
//         case '+':
//             result = prev + current;
//             break;
//         case '-':
//             result = prev - current;
//             break;
//         case '*':
//             result = prev * current;
//             break;
//         case '/':
//             if (current === 0) {
//                 alert("Cannot divide by zero");
//                 return;
//             }
//             result = prev / current;
//             break;
//         default:
//             return;
//     }

//     currentInput = result.toString();
//     currentOperation = '';
//     previousInput = '';
//     document.getElementById('cal').value = currentInput;
// }

// function clearDisplay() {
//     currentInput = '';
//     previousInput = '';
//     currentOperation = '';
//     document.getElementById('cal').value = '';
// }

// //time-display

// let time = document.querySelector('.time');

// function getCurrentTime() {
//     let date = new Date()
//     return date.toLocaleTimeString();
// }

// setInterval(() => {
//     time.innerHTML = getCurrentTime()
// }, 1000);


// //files-upload

//     const folderFiles = {
//       0: [],
//       1: []
//     };

//     function triggerUpload(folderIndex) {
//       document.getElementById(`fileInput${folderIndex}`).click();
//     }

//     function handleFiles(event, folderIndex) {
//       const files = Array.from(event.target.files);
//       folderFiles[folderIndex].push(...files);
//       renderFileList(folderIndex);
//     }

//     function renderFileList(folderIndex) {
//       const list = document.getElementById(`fileList${folderIndex}`);
//       list.innerHTML = `<h5>Folder ${folderIndex + 1} Files:</h5>`;
//       folderFiles[folderIndex].forEach((file, idx) => {
//         const fileItem = document.createElement('div');
//         fileItem.className = 'file-item';
//         fileItem.textContent = `${idx + 1}. ${file.name}`;
//         list.appendChild(fileItem);
//       });
//     }

//     //plant
//     let growthStage = 0;
// const stages = ["🌱", "🌿", "🌳"];
// const plantEmoji = document.getElementById("plantEmoji");

// function growPlant() {
//   if (growthStage < stages.length - 1) {
//     growthStage++;
//     plantEmoji.textContent = stages[growthStage];
//   } else {
//     alert("Your plant is fully grown! 🎉");
//   }
// }

// //wheel
// const focusTasks = [
//   "📚 Revise an HTML quiz",
//   "🧘‍♀️ Stretch for 5 mins",
//   "🧠 Try a memory game",
//   "📓 Write a journal entry",
//   "💧 Drink a glass of water",
//   "🧼 Clean your desk",
//   "🎧 Listen to a focus track",
//   "📴 Take a 5-minute screen break",
//   "🌞 Look outside and breathe deeply"
// ];

// function spinWheel() {
//   const randomIndex = Math.floor(Math.random() * focusTasks.length);
//   const selectedTask = focusTasks[randomIndex];

//   const resultElement = document.getElementById("wheelResult");
//   resultElement.classList.remove("d-none");
//   resultElement.innerHTML = `🌀 <strong>Your Focus Task:</strong> ${selectedTask}`;
// }

     let score = 1337;
        let completedTasks = 0;
        let currentDate = new Date();
        let selectedDate = null;
        const tasksData = {}; // Store tasks by date

        // Calendar functionality
        const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
            "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

        function renderCalendar() {
            const calendarGrid = document.getElementById('calendarGrid');
            const calendarMonth = document.getElementById('calendarMonth');
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            calendarMonth.textContent = `${monthNames[month]} ${year}`;
            
            // Clear previous calendar
            calendarGrid.innerHTML = '';
            
            // Add day headers
            const dayHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day';
                dayHeader.textContent = day;
                dayHeader.style.fontWeight = 'bold';
                dayHeader.style.cursor = 'default';
                calendarGrid.appendChild(dayHeader);
            });
            
            // Get first day of month and number of days
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            // Generate calendar days
            const today = new Date();
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = date.getDate();
                
                // Add classes based on conditions
                if (date.getMonth() !== month) {
                    dayElement.classList.add('other-month');
                } else {
                    dayElement.onclick = () => selectDate(date);
                }
                
                if (date.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
                    dayElement.classList.add('selected');
                }
                
                // Check if date has tasks
                const dateKey = date.toDateString();
                if (tasksData[dateKey] && tasksData[dateKey].length > 0) {
                    dayElement.classList.add('has-tasks');
                }
                
                calendarGrid.appendChild(dayElement);
            }
        }

        function selectDate(date) {
            selectedDate = date;
            renderCalendar();
            showAchievement(`DATE SELECTED: ${date.toDateString()}`);
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        }

        function addTodo() {
            const input = document.getElementById('todoInput');
            const todoList = document.getElementById('todoList');
            
            if (input.value.trim()) {
                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item';
                todoItem.innerHTML = `
                    <span>${input.value.toUpperCase()}</span>
                    <button onclick="completeTodo(this)">✓</button>
                `;
                todoList.appendChild(todoItem);
                
                // Add task to selected date or today
                const taskDate = selectedDate || new Date();
                const dateKey = taskDate.toDateString();
                if (!tasksData[dateKey]) {
                    tasksData[dateKey] = [];
                }
                tasksData[dateKey].push(input.value.toUpperCase());
                
                input.value = '';
                renderCalendar(); // Refresh to show task indicator
                showAchievement('NEW QUEST ADDED! +25 EXP');
                score += 25;
                document.querySelector('.score').textContent = `SCORE: ${score}`;
            }
        }

        function completeTodo(button) {
            completedTasks++;
            score += 50;
            document.querySelector('.score').textContent = `SCORE: ${score}`;
            
            // Remove task from data
            const taskText = button.previousElementSibling.textContent;
            const taskDate = selectedDate || new Date();
            const dateKey = taskDate.toDateString();
            if (tasksData[dateKey]) {
                const index = tasksData[dateKey].indexOf(taskText);
                if (index > -1) {
                    tasksData[dateKey].splice(index, 1);
                }
            }
            
            button.parentElement.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                button.parentElement.remove();
                renderCalendar(); // Refresh calendar
                if (completedTasks % 3 === 0) {
                    showAchievement('COMBO MULTIPLIER! LEVEL UP!');
                } else {
                    showAchievement('QUEST COMPLETED! +50 EXP');
                }
            }, 500);
        }

        function showAchievement(message = '🎉 ACHIEVEMENT UNLOCKED!\nStudy Streak Master!') {
            const achievement = document.getElementById('achievement');
            achievement.innerHTML = `<div>${message.split('\n')[0]}</div>` + 
                                  (message.split('\n')[1] ? `<div>${message.split('\n')[1]}</div>` : '');
            achievement.classList.add('show');
            setTimeout(() => {
                achievement.classList.remove('show');
            }, 3000);
        }

        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        // Add some sample tasks for demo
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        tasksData[today.toDateString()] = ['MATH BOSS FIGHT', 'PHYSICS PUZZLE', 'CHEMISTRY LAB'];
        tasksData[tomorrow.toDateString()] = ['HISTORY QUEST', 'ENGLISH MISSION'];

        // Add some CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: translateX(100px) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize calendar when page loads
        renderCalendar();

        