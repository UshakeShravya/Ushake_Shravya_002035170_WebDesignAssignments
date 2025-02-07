document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    const submitButton = document.getElementById("submitBtn");
    const selectList = document.getElementById("options");
    const checkboxContainer = document.createElement("div");
    selectList.insertAdjacentElement("afterend", checkboxContainer);

    submitButton.disabled = true; // Ensure submit button starts disabled

    function validateField(input, regex = /.+/, minLength = 0, maxLength = Infinity, errorMsg = "Invalid input") {
        if (!input) return false;
        let value = input.value.trim();
        let isValid = value !== "" && value.length >= minLength && value.length <= maxLength && regex.test(value);
        showError(input, isValid, errorMsg);
        return isValid;
    }

    function showError(input, isValid, message) {
        let errorSpan = document.getElementById(input.id + "Error");
        if (!errorSpan) return;
        errorSpan.textContent = isValid ? "" : message;
        errorSpan.style.color = "red";
    }

    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, "").substring(0, 10);
        let formatted = value;
        if (value.length > 6) {
            formatted = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length > 3) {
            formatted = `(${value.substring(0, 3)}) ${value.substring(3)}`;
        } else if (value.length > 0) {
            formatted = `(${value}`;
        }
        input.value = formatted;
    }

    document.getElementById("phoneNumber").addEventListener("input", function () {
        formatPhoneNumber(this);
        checkFormValidity();
    });

    function checkFormValidity() {
        const firstNameValid = validateField(document.getElementById("firstName"), /^[a-zA-Z]+$/, 2, 30, "First name must be 2-30 letters");
        const lastNameValid = validateField(document.getElementById("lastName"), /^[a-zA-Z]+$/, 2, 30, "Last name must be 2-30 letters");
        const emailValid = validateField(document.getElementById("emailId"), /^[^\s@]+@northeastern\.edu$/, 0, 100, "Email must be @northeastern.edu");
        const phoneValid = validateField(document.getElementById("phoneNumber"), /^\(\d{3}\) \d{3}-\d{4}$/, 0, 14, "Phone must be (XXX) XXX-XXXX");
        const zipValid = validateField(document.getElementById("zipcode"), /^\d{5,6}$/, 5, 6, "Zip code must be 5 or 6 digits");
        const commentsValid = validateField(document.getElementById("comments"), /.+/, 10, 500, "Comments must be between 10-500 characters");

        submitButton.disabled = !(firstNameValid && lastNameValid && emailValid && phoneValid && zipValid && commentsValid);
    }

    selectList.addEventListener("change", function () {
        checkboxContainer.innerHTML = "";
        if (selectList.value) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "dynamicCheckbox";
            
            const label = document.createElement("label");
            label.htmlFor = "dynamicCheckbox";
            label.textContent = ` Select Toppings for ${selectList.options[selectList.selectedIndex].text}`;
            
            const textField = document.createElement("input");
            textField.type = "text";
            textField.id = "extraField";
            textField.placeholder = "Enter extra details";
            textField.style.display = "none";
            
            checkbox.addEventListener("change", function () {
                textField.style.display = checkbox.checked ? "block" : "none";
            });
            
            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);
            checkboxContainer.appendChild(textField);
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const table = document.getElementById("resultsTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.insertCell(0).innerText = document.getElementById("firstName").value;
        newRow.insertCell(1).innerText = document.getElementById("lastName").value;
        newRow.insertCell(2).innerText = document.getElementById("emailId").value;
        newRow.insertCell(3).innerText = document.getElementById("phoneNumber").value;
        newRow.insertCell(4).innerText = document.getElementById("zipcode").value;
        newRow.insertCell(5).innerText = document.getElementById("options").value;
        newRow.insertCell(6).innerText = document.getElementById("address2").value || "";
        newRow.insertCell(7).innerText = document.getElementById("comments").value;
        newRow.insertCell(8).innerText = document.getElementById("extraField") ? document.getElementById("extraField").value : "";

        form.reset();
        submitButton.disabled = true;
    });

    document.querySelectorAll("input, textarea, select").forEach(input => {
        input.addEventListener("input", checkFormValidity);
    });

    checkFormValidity();
});
