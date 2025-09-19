// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeCharts();
    initializeStudyTracker();
    initializeProfilePictureUpload();
    initializeContactForm();
});

// Profile Picture Upload Functionality
function initializeProfilePictureUpload() {
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const uploadForm = document.getElementById('uploadForm');
    const profileImage = document.getElementById('profileImage');
    const uploadStatus = document.getElementById('uploadStatus');
    const pfpContainer = document.querySelector('.pfp-container');
    const loadingOverlay = document.getElementById('loadingOverlay');

    let originalImageSrc = profileImage.src;
    let selectedFile = null;

    // Click on container or select button to choose file
    pfpContainer.addEventListener('click', () => fileInput.click());
    selectFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showUploadStatus('Please select a valid image file.', 'error');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showUploadStatus('File size must be less than 5MB.', 'error');
                return;
            }

            selectedFile = file;
            
            // Preview the selected image
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                showUploadStatus('New photo selected. Click "Upload Photo" to save.', 'info');
                
                // Show upload and cancel buttons
                selectFileBtn.style.display = 'none';
                uploadBtn.style.display = 'inline-flex';
                cancelBtn.style.display = 'inline-flex';
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedFile) {
            showUploadStatus('Please select a file first.', 'error');
            return;
        }

        // Show loading
        showLoading(true);
        
        // Simulate upload process (replace with actual upload logic)
        setTimeout(() => {
            try {
                // Store the image in localStorage for persistence
                const reader = new FileReader();
                reader.onload = function(e) {
                    localStorage.setItem('userProfileImage', e.target.result);
                    
                    // Success
                    showLoading(false);
                    showUploadStatus('Profile picture updated successfully!', 'success');
                    resetUploadButtons();
                    selectedFile = null;
                    
                    // Update original image source
                    originalImageSrc = profileImage.src;
                };
                reader.readAsDataURL(selectedFile);
                
            } catch (error) {
                showLoading(false);
                showUploadStatus('Failed to upload image. Please try again.', 'error');
                cancelUpload();
            }
        }, 2000); // Simulate 2 second upload time
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        cancelUpload();
    });

    function cancelUpload() {
        // Restore original image
        profileImage.src = originalImageSrc;
        selectedFile = null;
        fileInput.value = '';
        resetUploadButtons();
        hideUploadStatus();
    }

    function resetUploadButtons() {
        selectFileBtn.style.display = 'inline-flex';
        uploadBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
    }

    function showUploadStatus(message, type) {
        uploadStatus.textContent = message;
        uploadStatus.className = `upload-status ${type}`;
        
        // Auto-hide success messages after 3 seconds
        if (type === 'success') {
            setTimeout(hideUploadStatus, 3000);
        }
    }

    function hideUploadStatus() {
        uploadStatus.style.opacity = '0';
        setTimeout(() => {
            uploadStatus.className = 'upload-status';
        }, 300);
    }

    function showLoading(show) {
        if (show) {
            loadingOverlay.classList.add('show');
        } else {
            loadingOverlay.classList.remove('show');
        }
    }

    // Load saved profile picture on page load
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
        profileImage.src = savedImage;
        originalImageSrc = savedImage;
    }
}

// Contact Form Validation and Submission
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');
    const emailInput = document.getElementById('userEmail');

    // Load saved form data
    loadFormData();

    // Add real-time validation
    nameInput.addEventListener('input', () => validateField(nameInput, validateName));
    phoneInput.addEventListener('input', () => validateField(phoneInput, validatePhone));
    emailInput.addEventListener('input', () => validateField(emailInput, validateEmail));

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, validateName);
        const isPhoneValid = validateField(phoneInput, validatePhone);
        const isEmailValid = validateField(emailInput, validateEmail);

        if (isNameValid && isPhoneValid && isEmailValid) {
            // Save form data
            saveFormData();
            
            // Show success message
            showFormSuccess();
        } else {
            // Show error message
            showFormError();
        }
    });

    function validateField(input, validator) {
        const isValid = validator(input.value);
        
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
        
        return isValid;
    }

    function validateName(name) {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
    }

    function validatePhone(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 14;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function saveFormData() {
        const formData = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('userFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('userFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            nameInput.value = data.name || '';
            phoneInput.value = data.phone || '';
            emailInput.value = data.email || '';
        }
    }

    function showFormSuccess() {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-check"></i> Saved Successfully!';
        button.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }

    function showFormError() {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-times"></i> Please fix errors';
        button.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }
}

// Enhanced Study Tracker Implementation
function initializeStudyTracker() {
    generateStudyHeatmap();
}

function generateStudyHeatmap() {
    const daysGrid = document.getElementById('daysGrid');
    const monthsLabels = document.getElementById('monthsLabels');
    const tooltip = document.getElementById('tooltip');
    const currentStreakElement = document.getElementById('currentStreak');
    const longestStreakElement = document.getElementById('longestStreak');

    // Check if elements exist
    if (!daysGrid || !monthsLabels || !tooltip) {
        console.error('Study tracker elements not found');
        return;
    }

    // Generate sample data for the last 120 days
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 119);

    // Sample study data with realistic patterns
    const studyData = {};
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (let i = 0; i < 120; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.getDay();
        
        // Create realistic study patterns
        let hours;
        const randomFactor = Math.random();
        
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekends
            hours = randomFactor > 0.4 ? Math.floor(randomFactor * 4) + 1 : 0;
        } else { // Weekdays
            hours = randomFactor > 0.25 ? Math.floor(randomFactor * 4) + 1 : 0;
        }
        
        // Add streak patterns
        if (i > 0) {
            const prevDate = new Date(startDate);
            prevDate.setDate(prevDate.getDate() + i - 1);
            const prevDateStr = prevDate.toISOString().split('T')[0];
            
            if (studyData[prevDateStr] > 0 && Math.random() > 0.3) {
                hours = Math.max(1, hours);
            }
        }
        
        studyData[dateStr] = hours;
        
        // Calculate streaks
        if (hours > 0) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 0;
        }
    }

    // Calculate current streak from today backwards
    for (let i = 119; i >= 0; i--) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        if (studyData[dateStr] > 0) {
            currentStreak++;
        } else {
            break;
        }
    }

    // Update streak displays
    if (currentStreakElement) {
        currentStreakElement.textContent = `${currentStreak} days`;
    }
    if (longestStreakElement) {
        longestStreakElement.textContent = `${longestStreak} days`;
    }

    // Generate month labels
    const months = [];
    let currentMonth = new Date(startDate);
    while (currentMonth <= today) {
        const monthStr = currentMonth.toLocaleDateString('en', { month: 'short' });
        if (!months.includes(monthStr)) {
            months.push(monthStr);
        }
        currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    monthsLabels.innerHTML = '';
    months.slice(-4).forEach(month => {
        const span = document.createElement('span');
        span.textContent = month;
        monthsLabels.appendChild(span);
    });

    // Generate day cells
    daysGrid.innerHTML = '';
    
    // Start from Monday of the week containing startDate
    const gridStartDate = new Date(startDate);
    const dayOfWeek = gridStartDate.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    gridStartDate.setDate(gridStartDate.getDate() - daysToSubtract);

    // Calculate number of weeks needed
    const endDate = new Date(today);
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
    const weeksNeeded = Math.ceil((endDate - gridStartDate) / millisecondsPerWeek) + 1;

    for (let week = 0; week < weeksNeeded; week++) {
        for (let day = 0; day < 7; day++) {
            const cellDate = new Date(gridStartDate);
            cellDate.setDate(cellDate.getDate() + (week * 7) + day);
            
            const cell = document.createElement('div');
            cell.className = 'day-cell';
            
            const dateStr = cellDate.toISOString().split('T')[0];
            const studyHours = studyData[dateStr] || 0;
            
            // Determine level based on study hours
            let level = 0;
            if (studyHours > 0) level = 1;
            if (studyHours > 1) level = 2;
            if (studyHours > 2) level = 3;
            if (studyHours > 3) level = 4;
            
            cell.classList.add(`level-${level}`);
            
            // Only show interactive cells for dates within our range
            if (cellDate >= startDate && cellDate <= today) {
                // Add tooltip functionality
                cell.addEventListener('mouseenter', (e) => {
                    const rect = e.target.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                    
                    tooltip.innerHTML = `<strong>${cellDate.toLocaleDateString('en', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    })}</strong><br>${studyHours} hours studied`;
                    
                    tooltip.style.left = (rect.left + scrollLeft + rect.width / 2) + 'px';
                    tooltip.style.top = (rect.top + scrollTop - 10) + 'px';
                    tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
                    tooltip.classList.add('show');
                });

                cell.addEventListener('mouseleave', () => {
                    tooltip.classList.remove('show');
                });
            } else {
                cell.style.opacity = '0.3';
            }
            
            daysGrid.appendChild(cell);
        }
    }
}

// Initialize Charts
function initializeCharts() {
    // Chart 1 - Bar Chart
    const ctx = document.getElementById('myChart');
    if (ctx) {
        const myChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['JavaScript', 'Python', 'HTML/CSS', 'DSA', 'Node.js'],
                datasets: [{
                    label: 'Questions Resolved',
                    data: [43, 22, 121, 63, 7],
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                    borderRadius: 10,
                    barThickness: 40,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: 'white' }
                    },
                    y: {
                        ticks: { color: 'white' }
                    }
                }
            }
        });
    }

    // Chart 2 - Pie Chart
    const ctx1 = document.getElementById('myChart1');
    if (ctx1) {
        const labels = ['Java', 'Php', 'Laravel', 'DSA', 'MySql', 'Python'];
        const bgColors = [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(210, 190, 204)'
        ];

        const myChart1 = new Chart(ctx1.getContext('2d'), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Study Time Distribution',
                    data: [5, 3, 4, 6, 1, 2],
                    backgroundColor: bgColors,
                    hoverOffset: 4,
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw} days`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        color: 'white',
                        font: { size: 16 },
                        text: 'Study Streak Chart'
                    },
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close loading overlay
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay && loadingOverlay.classList.contains('show')) {
            loadingOverlay.classList.remove('show');
        }
        
        // Hide tooltip
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }
});