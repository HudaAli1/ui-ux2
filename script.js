let currentScreen = 1;
const totalScreens = 27; // Updated to include notifications screen (27)
let passwordResetSuccess = false;
let lastScreenNumber = 1;

// Track last device screen for Smart Charging navigation
let lastDeviceScreen = 5;

// Show specific screen
function showScreen(screenNumber) {
    if (screenNumber < 1 || screenNumber > totalScreens) return;
    
    // Track previous screen before switching
    lastScreenNumber = currentScreen;
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Track device screens for Smart Charging navigation
    if ([5, 19, 20, 21].includes(screenNumber)) {
        lastDeviceScreen = screenNumber;
    }
    
    // Show selected screen
    const targetScreen = document.getElementById(`screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenNumber;
        updateCurrentScreenDisplay();
        
        // Auto-navigate from loading screen (screen 12) to home (screen 13) after 3 seconds
        if (screenNumber === 12) {
            setTimeout(() => {
                showScreen(13);
            }, 3000);
        }
        
        // Auto-redirect from Forgot Password success screen (16) to Login (9) after 2.5 seconds
        // Only if coming from Forgot Password screen (14)
        if (screenNumber === 16 && lastScreenNumber === 14) {
            setTimeout(() => {
                goToLoginAfterPasswordReset();
            }, 2500);
        }
    }
}

// Navigate back to last device screen
function goBackToDevice() {
    showScreen(lastDeviceScreen);
}

// Navigate to previous screen
function previousScreen() {
    if (currentScreen > 1) {
        showScreen(currentScreen - 1);
    }
}

// Navigate to next screen
function nextScreen() {
    if (currentScreen < totalScreens) {
        showScreen(currentScreen + 1);
    }
}

// Update current screen display
function updateCurrentScreenDisplay() {
    const display = document.getElementById('current-screen');
    if (display) {
        display.textContent = currentScreen;
    }
}

// Initialize - show first screen on load
document.addEventListener('DOMContentLoaded', function() {
    showScreen(1);
    updateCurrentScreenDisplay();
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        previousScreen();
    } else if (event.key === 'ArrowRight') {
        nextScreen();
    }
});

// Update Profile function
function updateProfile() {
    const successMessage = document.getElementById('profile-success-message');
    if (successMessage) {
        successMessage.style.display = 'flex';
        successMessage.style.animation = 'slideInDown 0.3s ease-out';
        
        // Hide message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 300);
        }, 3000);
    }
}

// Update Password from Settings (stays on same page)
function updatePasswordFromSettings() {
    const successMessage = document.getElementById('change-password-success-message');
    if (successMessage) {
        successMessage.style.display = 'flex';
        successMessage.style.animation = 'slideInDown 0.3s ease-out';
        
        // Hide message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 300);
        }, 3000);
    }
}

// Go to Login after password reset (Forgot Password flow)
function goToLoginAfterPasswordReset() {
    passwordResetSuccess = true;
    showScreen(9);
    
    // Show success message on login screen
    setTimeout(() => {
        const loginSuccessMessage = document.getElementById('login-success-message');
        if (loginSuccessMessage) {
            loginSuccessMessage.style.display = 'flex';
            loginSuccessMessage.style.animation = 'slideInDown 0.3s ease-out';
            
            setTimeout(() => {
                loginSuccessMessage.style.animation = 'slideOutUp 0.3s ease-out';
                setTimeout(() => {
                    loginSuccessMessage.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }, 100);
}

// Logout function - returns to splash/login/register screen
function logout() {
    showScreen(1);
}

