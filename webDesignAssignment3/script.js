let studentCount = 1;

document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("myTable");
    const submitButton = document.getElementById("submitButton");
    const addButton = document.getElementById("addButton");

    // Create a popup container
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.classList.add("hidden");
    document.body.appendChild(popup);

    popup.innerHTML = `
        <div id="popupContent">
            <h2 id="popupTitle"></h2>
            <div id="popupBody"></div>
            <div id="popupButtons">
                <button id="updateButton">Update</button>
                <button id="cancelButton">Cancel</button>
            </div>
        </div>
    `;

    const popupTitle = document.getElementById("popupTitle");
    const popupBody = document.getElementById("popupBody");
    const updateButton = document.getElementById("updateButton");
    const cancelButton = document.getElementById("cancelButton");

    // Toggle row details
    table.addEventListener("click", (event) => {
        if (event.target.classList.contains("toggle-row")) {
            const detailsRow = event.target.closest("tr").nextElementSibling;
            detailsRow.classList.toggle("hidden");
        }
    });

    // Checkbox select
    table.addEventListener("change", (event) => {
        if (event.target.type === "checkbox") {
            const row = event.target.closest("tr");
            const isChecked = event.target.checked;

            row.style.backgroundColor = isChecked ? "yellow" : "white";

            // Show or hide delete and edit buttons
            const deleteCell = row.querySelector("td:nth-last-child(2)");
            const editCell = row.querySelector("td:last-child");

            if (isChecked) {
                deleteCell.innerHTML = `<button class="delete">Delete</button>`;
                editCell.innerHTML = `<img class="edit" src="pencil.png" alt="Edit" title="Edit" style="cursor: pointer; width: 20px;" />`;
            } else {
                deleteCell.innerHTML = "";
                editCell.innerHTML = "";
            }

            // Enable or disable submit button
            const anyChecked = [...table.querySelectorAll("input[type='checkbox']")].some(
                (checkbox) => checkbox.checked
            );
            submitButton.disabled = !anyChecked;
            submitButton.classList.toggle("enabled", anyChecked);
        }
    });

    // Delete row
    table.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete")) {
            const row = event.target.closest("tr");
            const studentName = row.children[1].innerText;
            row.nextElementSibling.remove(); // Remove details row
            row.remove(); // Remove main row
            alert(`${studentName} record deleted successfully!`);
        }
    });

    // Edit row
    table.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit")) {
            const row = event.target.closest("tr");
            const studentName = row.children[1].innerText;

            // Populate popup with student details
            popupTitle.textContent = `Edit details of ${studentName}`;
            popupBody.innerHTML = `
                <p><strong>Student:</strong> ${row.children[1].innerText}</p>
                <p><strong>Advisor:</strong> ${row.children[2].innerText}</p>
                <p><strong>Award Status:</strong> ${row.children[3].innerText}</p>
                <p><strong>Semester:</strong> ${row.children[4].innerText}</p>
                <p><strong>Type:</strong> ${row.children[5].innerText}</p>
                <p><strong>Budget #:</strong> ${row.children[6].innerText}</p>
                <p><strong>Percentage:</strong> ${row.children[7].innerText}</p>
            `;

            // Show popup
            popup.classList.remove("hidden");

            // Update button behavior
            updateButton.onclick = () => {
                alert(`${studentName} data updated successfully!`);
                popup.classList.add("hidden");
            };

            // Cancel button behavior
            cancelButton.onclick = () => {
                popup.classList.add("hidden");
            };
        }
    });

    // Add new student
    addButton.addEventListener("click", () => {
        studentCount++;

        //Generate a new Budget # based on a custom pattern
        let budgetNumber = 12345 + (studentCount - 1) * 11111;

        const newRow = `
            <tr>
                <td>
                    <input type="checkbox" /><br /><br />
                    <img class="toggle-row" src="down.png" width="25px" />
                </td>
                <td>Student ${studentCount}</td>
                <td>Teacher ${studentCount}</td>
                <td>Approved</td>
                <td>Fall</td>
                <td>TA</td>
                <td>${budgetNumber}</td>
                <td>100%</td>
                <td></td>
                <td></td>
            </tr>
            <tr class="dropDownTextArea hidden">
                <td colspan="10">
                    Advisor:<br /><br />
                    Award Details<br />
                    Summer 1-2014(TA)<br />
                    Budget Number:<br />
                    Tuition Number:<br />
                    Comments:<br /><br />
                    Award Status:<br /><br />
                </td>
            </tr>
        `;
        table.insertAdjacentHTML("beforeend", newRow);
        alert(`Student ${studentCount} record added successfully!`);
    });
});
