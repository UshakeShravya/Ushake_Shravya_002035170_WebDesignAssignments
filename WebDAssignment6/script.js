$(document).ready(function () {
    // Login Page Validations
    function validateForm() {
        let email = $('#email').val()?.trim() || "";
        let username = $('#username').val()?.trim() || "";
        let password = $('#password').val()?.trim() || "";
        let confirmPassword = $('#confirmPassword').val()?.trim() || "";
        
        let emailValid = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);
        let usernameValid = /^[A-Za-z]+$/.test(username);
        let passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
        let passwordsMatch = password === confirmPassword;
    
        // Null checks: Show "This field is required" if empty
        $('#emailError').text(email.length === 0 ? "This field is required." : (emailValid ? "" : "Invalid Northeastern email"));
        $('#usernameError').text(username.length === 0 ? "This field is required." : (usernameValid ? "" : "Only letters are allowed."));
        $('#passwordError').text(password.length === 0 ? "This field is required." : (passwordValid ? "" : "Password must have at least 6 characters, one uppercase letter, one number, and one special character."));
        $('#confirmPasswordError').text(confirmPassword.length === 0 ? "This field is required." : (passwordsMatch ? "" : "Passwords do not match."));
    
        $('#loginBtn').prop('disabled', !(emailValid && usernameValid && passwordValid && passwordsMatch));
    }
    
    // Ensure validation runs only if elements exist
    if ($('#email').length) {
        $('#email, #username, #password, #confirmPassword').on('input', validateForm);
        validateForm();
    }
    
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        if (!$('#loginBtn').prop('disabled')) {
            localStorage.setItem('username', $('#username').val());
            window.location.href = 'calculator.html';
        }
    });
    

    // Calculator Logic
    if (window.location.pathname.includes('calculator.html')) {
        $('#loggedUser').text(localStorage.getItem('username'));

        $('.operation-btn').on('click', function () {
            let num1 = parseFloat($('#num1').val());
            let num2 = parseFloat($('#num2').val());
            let operation = $(this).data('op');
            let result;

            if (isNaN(num1) || isNaN(num2)) {
                $('#result').val('Invalid input');
                return;
            }

            result = operation === '+' ? num1 + num2 :
                     operation === '-' ? num1 - num2 :
                     operation === '*' ? num1 * num2 :
                     operation === '/' ? (num2 !== 0 ? num1 / num2 : 'Infinity') : 'Infinity';

            $('#result').val(result);
        });
    }

    // Stopwatch Logic
    if (window.location.pathname.includes('stopwatch.html')) {
        let interval;
        let seconds = 0;

        // Function that returns a Promise to handle stopwatch timing
        function startStopwatch() {
            return new Promise((resolve) => {
                interval = setInterval(() => {
                    seconds++;
                    updateTime();
                }, 1000);
                resolve();
            });
        }

        // Function to update time
        function updateTime() {
            let time = new Date(seconds * 1000).toISOString().substr(11, 8);
            $('#timer').text(time);
        }

        // Async function to handle stopwatch start
        async function startTimer() {
            if (!interval) {
                await startStopwatch(); // Waits for the promise to start the stopwatch
            }
        }

        // Stop the stopwatch using async function
        async function stopTimer() {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }

        // Reset the stopwatch using async function
        async function resetTimer() {
            await stopTimer(); // Ensures the timer is stopped before resetting
            seconds = 0;
            updateTime();
        }

        // Bind button clicks using jQuery
        $('#startBtn').click(() => startTimer());
        $('#stopBtn').click(() => stopTimer());
        $('#resetBtn').click(() => resetTimer());

        // Prevent manual input in date picker using jQuery
        $('#datePicker').on('keydown', (e) => e.preventDefault()).on('change', function () {
            $(this).prop('readonly', true);
        });
    }
});

