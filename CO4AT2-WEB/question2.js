/**
 * Question 2: Employee Model & Validation Architecture
 * Student: ALUKA PARDHU | Saveetha University
 */

// 1. Employee Model Class Definition
class EmployeeModel {
    constructor(data = {}) {
        this.employeeID = data.employeeID || '';
        this.employeeName = data.employeeName || '';
        this.department = data.department || '';
        this.positionCategory = data.positionCategory || '';
        this.positionDescription = data.positionDescription || '';
        this.priority = data.priority || '';
        this.createdAt = new Date().toISOString();
    }

    /**
     * Validates the Employee Model Instance
     * @param {Array<EmployeeModel>} existingRecords Current repository data for uniqueness check
     * @returns {Object} { isValid: boolean, errors: Array<string> }
     */
    validate(existingRecords = []) {
        const errors = [];

        // Field 1: employeeID Validation
        if (!this.employeeID || !this.employeeID.trim()) {
            errors.push("validation error: 'employeeID' is required.");
        } else {
            const trimmedID = this.employeeID.trim().toUpperCase();
            if (trimmedID.length < 3) {
                errors.push("validation error: 'employeeID' must be at least 3 characters.");
            }
            // Unique ID check against repository
            const isDuplicate = existingRecords.some(emp => emp.employeeID.toUpperCase() === trimmedID);
            if (isDuplicate) {
                errors.push(`uniqueness error: Employee ID '${trimmedID}' already exists in Model repository.`);
            }
        }

        // Field 2: employeeName Validation
        if (!this.employeeName || !this.employeeName.trim()) {
            errors.push("validation error: 'employeeName' is required.");
        } else if (this.employeeName.trim().length < 2) {
            errors.push("validation error: 'employeeName' must be at least 2 characters.");
        }

        // Field 3: department Validation
        if (!this.department || !this.department.trim()) {
            errors.push("validation error: 'department' selection is required.");
        }

        // Field 4: positionCategory Validation
        const validCategories = ['Research', 'Software', 'Hardware', 'Management', 'Others'];
        if (!this.positionCategory) {
            errors.push("validation error: 'positionCategory' must be selected.");
        } else if (!validCategories.includes(this.positionCategory)) {
            errors.push(`validation error: Invalid category '${this.positionCategory}'. Must be one of [${validCategories.join(', ')}].`);
        }

        // Field 5: positionDescription Validation
        if (!this.positionDescription || !this.positionDescription.trim()) {
            errors.push("validation error: 'positionDescription' is required.");
        } else if (this.positionDescription.trim().length < 8) {
            errors.push("validation error: 'positionDescription' must be at least 8 characters long.");
        }

        // Field 6: priority Validation
        const validPriorities = ['Low', 'Medium', 'High'];
        if (!this.priority) {
            errors.push("validation error: 'priority' level must be selected.");
        } else if (!validPriorities.includes(this.priority)) {
            errors.push(`validation error: Invalid priority level '${this.priority}'.`);
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// 2. In-Memory Repository Model Handler
class EmployeeRepository {
    constructor() {
        this.records = [];
    }

    add(employeeModel) {
        this.records.push(employeeModel);
    }

    getAll() {
        return this.records;
    }

    clear() {
        this.records = [];
    }

    isIDExists(id) {
        return this.records.some(r => r.employeeID.toUpperCase() === id.trim().toUpperCase());
    }
}

// Instantiate Repository
const repo = new EmployeeRepository();

// UI Interactivity & Event Handlers
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('modelForm');
    const btnSeed = document.getElementById('btnSeed');
    const btnReset = document.getElementById('btnReset');
    const btnClearDB = document.getElementById('btnClearDB');
    
    const statusIndicator = document.getElementById('statusIndicator');
    const errorList = document.getElementById('errorList');
    const jsonDisplay = document.getElementById('jsonDisplay');
    const recordCount = document.getElementById('recordCount');
    const tableBody = document.getElementById('tableBody');

    // Render Table View
    function renderTable() {
        const records = repo.getAll();
        recordCount.textContent = records.length;

        if (records.length === 0) {
            tableBody.innerHTML = `<tr class="empty-row"><td colspan="5">No Model instances created yet in Model Repository.</td></tr>`;
            return;
        }

        tableBody.innerHTML = records.map(emp => `
            <tr>
                <td><strong style="color: var(--cyan); font-family: var(--font-mono);">${emp.employeeID.toUpperCase()}</strong></td>
                <td>${emp.employeeName}</td>
                <td>${emp.department}</td>
                <td>${emp.positionCategory}</td>
                <td><span style="font-weight:600; color:${emp.priority === 'High' ? '#fca5a5' : emp.priority === 'Medium' ? '#fde047' : '#6ee7b7'};">${emp.priority}</span></td>
            </tr>
        `).join('');
    }

    // Helper: Update Console Output
    function updateConsole(isValid, errors) {
        errorList.innerHTML = '';
        if (isValid) {
            statusIndicator.textContent = 'PASSED (MODEL VALID)';
            statusIndicator.className = 'status-valid';
            errorList.innerHTML = `<li class="log-item success">✔ Model instance validated successfully with zero errors.</li>
                                   <li class="log-item success">✔ Unique ID check passed. Record appended to repository.</li>`;
        } else {
            statusIndicator.textContent = 'FAILED (VALIDATION ERROR)';
            statusIndicator.className = 'status-invalid';
            errors.forEach(err => {
                const li = document.createElement('li');
                li.className = 'log-item error';
                li.textContent = `✖ ${err}`;
                errorList.appendChild(li);
            });
        }
    }

    // Form Submission Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const rawData = {
            employeeID: formData.get('employeeID') || '',
            employeeName: formData.get('employeeName') || '',
            department: formData.get('department') || '',
            positionCategory: formData.get('positionCategory') || '',
            positionDescription: formData.get('positionDescription') || '',
            priority: formData.get('priority') || ''
        };

        // Create Model Instance
        const empModel = new EmployeeModel(rawData);

        // Display JSON inspect payload
        jsonDisplay.textContent = JSON.stringify(empModel, null, 2);

        // Execute Model Validation
        const validationResult = empModel.validate(repo.getAll());

        updateConsole(validationResult.isValid, validationResult.errors);

        if (validationResult.isValid) {
            repo.add(empModel);
            renderTable();
            form.reset();
        }
    });

    // Seed Sample Data Handler
    btnSeed.addEventListener('click', () => {
        const seed1 = new EmployeeModel({
            employeeID: 'EMP-2001',
            employeeName: 'Dr. Sarah Connor',
            department: 'Research & Development',
            positionCategory: 'Research',
            positionDescription: 'Lead AI ethics researcher conducting safety audits.',
            priority: 'High'
        });

        const seed2 = new EmployeeModel({
            employeeID: 'EMP-2002',
            employeeName: 'Marcus Wright',
            department: 'Software Systems',
            positionCategory: 'Software',
            positionDescription: 'Senior full-stack backend engineer building scalable APIs.',
            priority: 'Medium'
        });

        if (!repo.isIDExists(seed1.employeeID)) repo.add(seed1);
        if (!repo.isIDExists(seed2.employeeID)) repo.add(seed2);

        renderTable();

        statusIndicator.textContent = 'SEEDED';
        statusIndicator.className = 'status-ready';
        errorList.innerHTML = `<li class="log-item info">ℹ Sample models EMP-2001 and EMP-2002 added to repository. Try entering "EMP-2001" to test uniqueness validation error!</li>`;
    });

    // Clear Form
    btnReset.addEventListener('click', () => {
        form.reset();
        jsonDisplay.textContent = '// Form cleared.';
        statusIndicator.textContent = 'READY';
        statusIndicator.className = 'status-ready';
        errorList.innerHTML = `<li class="log-item info">Fill out the model fields to test verification algorithms.</li>`;
    });

    // Purge DB
    btnClearDB.addEventListener('click', () => {
        repo.clear();
        renderTable();
        statusIndicator.textContent = 'PURGED';
        statusIndicator.className = 'status-ready';
        errorList.innerHTML = `<li class="log-item info">ℹ In-memory repository purged.</li>`;
    });
});
