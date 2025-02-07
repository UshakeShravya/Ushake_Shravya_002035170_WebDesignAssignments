document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");
    const submitButton = document.getElementById("submitButton");
    const dynamicList = document.getElementById("dynamicList");
    const dynamicCheckboxContainer = document.getElementById("dynamicCheckboxContainer");
    const streetAddress2 = document.getElementById("streetAddress2");
    const streetAddress2Counter = document.getElementById("streetAddress2Counter");
    const resultsTable = document.getElementById("resultsTable");
  
    // Initialize the table with headers if it doesn't exist
    if (!resultsTable.innerHTML.trim()) {
      resultsTable.innerHTML = `
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Zip Code</th>
              <th>Source</th>
              <th>Comments</th>
              <th>Street Address 1</th>
              <th>Street Address 2</th>
              <th>Flavour</th>
              <th>Toppings</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      `;
    }
  
    // Function to show error messages
    function showError(input, errorElement, message) {
      errorElement.textContent = message;
      input.classList.add("error-border");
    }
  
    // Function to clear error messages
    function clearError(input, errorElement) {
      errorElement.textContent = "";
      input.classList.remove("error-border");
    }
  
    // Function to validate all fields
    function validateForm() {
      let isValid = true;
  
      // First Name Validation
      const firstName = document.getElementById("firstName");
      const firstNameError = document.getElementById("firstNameError");
      if (firstName.value.trim() === "") {
        showError(firstName, firstNameError, "First Name is required.");
        isValid = false;
      } else if (!/^[a-zA-Z]+$/.test(firstName.value)) {
        showError(firstName, firstNameError, "First Name should only contain letters.");
        isValid = false;
      } else if (firstName.value.length < 2 || firstName.value.length > 30) {
        showError(firstName, firstNameError, "First Name must be between 2 and 30 characters.");
        isValid = false;
      } else {
        clearError(firstName, firstNameError);
      }
  
      // Last Name Validation
      const lastName = document.getElementById("lastName");
      const lastNameError = document.getElementById("lastNameError");
      if (lastName.value.trim() === "") {
        showError(lastName, lastNameError, "Last Name is required.");
        isValid = false;
      } else if (!/^[a-zA-Z]+$/.test(lastName.value)) {
        showError(lastName, lastNameError, "Last Name should only contain letters.");
        isValid = false;
      } else if (lastName.value.length < 2 || lastName.value.length > 30) {
        showError(lastName, lastNameError, "Last Name must be between 2 and 30 characters.");
        isValid = false;
      } else {
        clearError(lastName, lastNameError);
      }
  
      // Email Validation
      const emailId = document.getElementById("emailId");
      const emailIdError = document.getElementById("emailIdError");
      if (emailId.value.trim() === "") {
        showError(emailId, emailIdError, "Email is required.");
        isValid = false;
      } else if (!/^[^\s@]+@northeastern\.edu$/.test(emailId.value)) {
        showError(emailId, emailIdError, "Enter a valid northeastern.edu email address.");
        isValid = false;
      } else {
        clearError(emailId, emailIdError);
      }
  
      // Phone Number Validation
      const phoneNumber = document.getElementById("phoneNumber");
      const phoneNumberError = document.getElementById("phoneNumberError");
      if (phoneNumber.value.trim() === "") {
        showError(phoneNumber, phoneNumberError, "Phone Number is required.");
        isValid = false;
      } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber.value)) {
        showError(phoneNumber, phoneNumberError, "Phone Number must be in (XXX) XXX-XXXX format.");
        isValid = false;
      } else {
        clearError(phoneNumber, phoneNumberError);
      }
  
      // Zip Code Validation
      const zipcode = document.getElementById("zipcode");
      const zipcodeError = document.getElementById("zipcodeError");
      if (zipcode.value.trim() === "") {
        showError(zipcode, zipcodeError, "Zip Code is required.");
        isValid = false;
      } else if (!/^\d{5,6}$/.test(zipcode.value)) {
        showError(zipcode, zipcodeError, "Zip Code must be 5 or 6 digits.");
        isValid = false;
      } else {
        clearError(zipcode, zipcodeError);
      }
  
      // Source Validation (at least one checkbox must be selected)
      const sourceCheckboxes = document.querySelectorAll('input[name="source"]:checked');
      const sourceError = document.getElementById("sourceError");
      if (sourceCheckboxes.length === 0) {
        showError(sourceCheckboxes[0], sourceError, "Please select at least one source.");
        isValid = false;
      } else {
        clearError(sourceCheckboxes[0], sourceError);
      }
  
      // Comments Validation
      const comments = document.getElementById("comments");
      const commentsError = document.getElementById("commentsError");
      if (comments.value.trim() === "") {
        showError(comments, commentsError, "Comments are required.");
        isValid = false;
      } else if (comments.value.length < 10 || comments.value.length > 500) {
        showError(comments, commentsError, "Comments must be between 10 and 500 characters.");
        isValid = false;
      } else {
        clearError(comments, commentsError);
      }
  
      // Street Address 1 Validation
      const streetAddress1 = document.getElementById("streetAddress1");
      const streetAddress1Error = document.getElementById("streetAddress1Error");
      if (streetAddress1.value.trim() === "") {
        showError(streetAddress1, streetAddress1Error, "Street Address 1 is required.");
        isValid = false;
      } else {
        clearError(streetAddress1, streetAddress1Error);
      }
  
      // Dynamic Checkbox Text Field Validation
      const dynamicCheckbox = document.getElementById("dynamicCheckbox");
      const dynamicTextField = document.getElementById("dynamicTextField");
      if (dynamicCheckbox && dynamicCheckbox.checked && (!dynamicTextField || dynamicTextField.value.trim() === "")) {
        showError(dynamicTextField, document.getElementById("dynamicTextFieldError"), "Toppings are required.");
        isValid = false;
      } else if (dynamicTextField) {
        clearError(dynamicTextField, document.getElementById("dynamicTextFieldError"));
      }
  
      // Enable/Disable Submit Button
      submitButton.disabled = !isValid;
      return isValid;
    }
  
    // Input Masking for Phone Number
    phoneNumber.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 10) value = value.slice(0, 10);
      if (value.length > 6) value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      else if (value.length > 3) value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      else if (value.length > 0) value = `(${value}`;
      e.target.value = value;
    });
  
    // Live Character Counter for Street Address 2
    streetAddress2.addEventListener("input", function () {
      const length = streetAddress2.value.length;
      streetAddress2Counter.textContent = `${length}/50 characters used`;
    });
  
    // Dynamic Checkbox and Text Field Creation
    dynamicList.addEventListener("change", function () {
      const selectedOption = dynamicList.value;
      dynamicCheckboxContainer.innerHTML = `
        <input type="checkbox" id="dynamicCheckbox" name="dynamicCheckbox"> Toppings
        <div id="dynamicTextFieldContainer" style="display: none;">
          <input type="text" id="dynamicTextField" name="dynamicTextField" placeholder="Enter toppings">
          <span class="error" id="dynamicTextFieldError"></span>
        </div>
      `;
  
      const dynamicCheckbox = document.getElementById("dynamicCheckbox");
      const dynamicTextFieldContainer = document.getElementById("dynamicTextFieldContainer");
  
      dynamicCheckbox.addEventListener("change", function () {
        if (dynamicCheckbox.checked) {
          dynamicTextFieldContainer.style.display = "block";
        } else {
          dynamicTextFieldContainer.style.display = "none";
        }
        validateForm();
      });
  
      const dynamicTextField = document.getElementById("dynamicTextField");
      if (dynamicTextField) {
        dynamicTextField.addEventListener("input", validateForm);
      }
    });
  
    // Form Submission
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        const formData = new FormData(form);
        const tbody = resultsTable.querySelector("tbody");
  
        // Get selected sources (Facebook, Google, Yelp)
        const sources = Array.from(document.querySelectorAll('input[name="source"]:checked'))
          .map(checkbox => checkbox.value)
          .join(", ");
  
        // Get selected flavour and toppings
        const flavour = dynamicList.value;
        const toppings = document.getElementById("dynamicTextField")?.value || "";
  
        // Create a new row for the submission
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${formData.get("title") || ""}</td>
          <td>${formData.get("firstName") || ""}</td>
          <td>${formData.get("lastName") || ""}</td>
          <td>${formData.get("emailId") || ""}</td>
          <td>${formData.get("phoneNumber") || ""}</td>
          <td>${formData.get("zipcode") || ""}</td>
          <td>${sources || ""}</td>
          <td>${formData.get("text") || ""}</td>
          <td>${formData.get("streetAddress1") || ""}</td>
          <td>${formData.get("streetAddress2") || ""}</td>
          <td>${flavour || ""}</td>
          <td>${toppings || ""}</td>
        `;
        tbody.appendChild(newRow);
  
        // Reset the form after submission
        form.reset();
        submitButton.disabled = true;
  
        // Clear dynamic checkbox and text field
        dynamicCheckboxContainer.innerHTML = "";
      }
    });
  
    // Validate form on keyup events
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("keyup", validateForm);
    });
  });