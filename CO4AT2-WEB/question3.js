/**
 * Question 3: Employee Controller & Service Layer Implementation
 * Student: ALUKA PARDHU | Saveetha University
 */

// 1. DATA LAYER (MODEL PERSISTENCE REPOSITORY)
class ModelRepository {
    constructor() {
        this.database = [];
    }

    findByID(id) {
        return this.database.find(item => item.employeeID.toUpperCase() === id.trim().toUpperCase());
    }

    save(employeeRecord) {
        this.database.push({
            ...employeeRecord,
            savedAt: new Date().toLocaleTimeString()
        });
        return true;
    }

    getAll() {
        return this.database;
    }
}

// 2. SERVICE LAYER (BUSINESS LOGIC & VALIDATION)
class EmployeeService {
    constructor(repository) {
        this.repo = repository;
    }

    /**
     * Validates employee information & checks ID uniqueness
     * @param {Object} data Raw data from Controller
     * @returns {Object} { success: boolean, errors: Array<string>, record: Object|null }
     */
    processRegistration(data) {
        const errors = [];

        // Rule 1: Check Required Inputs
        if (!data.employeeID || !data.employeeID.trim()) {
            errors.push("Employee ID is required.");
        }
        if (!data.employeeName || !data.employeeName.trim()) {
            errors.push("Employee Name is required.");
        }
        if (!data.department) {
            errors.push("Department selection is required.");
        }
        if (!data.positionCategory) {
            errors.push("Position Category is required.");
        }
        if (!data.positionDescription || !data.positionDescription.trim()) {
            errors.push("Position Description is required.");
        } else if (data.positionDescription.trim().length < 8) {
            errors.push("Position Description must be at least 8 characters long.");
        }
        if (!data.priority) {
            errors.push("Priority level selection is required.");
        }

        // Return early if basic fields missing
        if (errors.length > 0) {
            return { success: false, errors: errors, record: null };
        }

        // Rule 2: Uniqueness Check for Employee ID
        const normalizedID = data.employeeID.trim().toUpperCase();
        const existing = this.repo.findByID(normalizedID);
        if (existing) {
            return {
                success: false,
                errors: [`Duplicate Entry: Employee ID '${normalizedID}' already exists in service storage!`],
                record: null
            };
        }

        // Format valid employee object
        const cleanRecord = {
            employeeID: normalizedID,
            employeeName: data.employeeName.trim(),
            department: data.department,
            positionCategory: data.positionCategory,
            positionDescription: data.positionDescription.trim(),
            priority: data.priority
        };

        // Save via repository
        this.repo.save(cleanRecord);

        return {
            success: true,
            errors: [],
            record: cleanRecord
        };
    }
}

// 3. CONTROLLER LAYER (FORM EVENT HANDLING & ORCHESTRATION)
class EmployeeController {
    constructor(service, viewHandler) {
        this.service = service;
        this.view = viewHandler;
    }

    async handleFormSubmit(formDataRaw) {
        // Step 1: Intercept View DOM Event
        this.view.updateStep(1, 'active');
        this.view.log('ctrl', 'EmployeeController.handleFormSubmit() triggered by DOM submit event.');

        await this.delay(300);

        // Step 2: Controller Dispatch
        this.view.updateStep(1, 'success');
        this.view.updateStep(2, 'active');
        this.view.log('ctrl', 'Dispatching data payload from Controller to Service Layer...');

        await this.delay(300);

        // Step 3: Call Service Layer Validation & Processing
        this.view.updateStep(2, 'success');
        this.view.updateStep(3, 'active');
        this.view.log('svc', 'EmployeeService.processRegistration() executing validation rules & uniqueness check...');

        const result = this.service.processRegistration(formDataRaw);

        await this.delay(300);

        if (!result.success) {
            // Pipeline Halt on Error
            this.view.updateStep(3, 'error');
            this.view.updateStep(4, 'error');
            this.view.updateStep(5, 'error');

            result.errors.forEach(err => this.view.log('err', `[SERVICE ERROR] ${err}`));
            this.view.showResponse(false, 'Validation / Uniqueness Check Failed', result.errors.join(' | '));
            return;
        }

        // Step 4: Model Persistence
        this.view.updateStep(3, 'success');
        this.view.updateStep(4, 'active');
        this.view.log('ok', `[PERSISTENCE SUCCESS] Record saved to Model Repository with ID: ${result.record.employeeID}`);

        await this.delay(300);

        // Step 5: Render Result View
        this.view.updateStep(4, 'success');
        this.view.updateStep(5, 'success');
        this.view.log('ok', 'Controller sending success response to View renderer.');
        
        this.view.showResponse(true, 'Employee Registration Processed!', `ID: ${result.record.employeeID} | Name: ${result.record.employeeName} (${result.record.department})`);
        this.view.renderTable(this.service.repo.getAll());
        this.view.resetForm();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 4. VIEW RENDERER HANDLER
class EmployeeView {
    constructor() {
        this.logConsole = document.getElementById('logConsole');
        this.resBanner = document.getElementById('responseBanner');
        this.resIcon = document.getElementById('resIcon');
        this.resTitle = document.getElementById('resTitle');
        this.resSub = document.getElementById('resSub');
        this.svcTableBody = document.getElementById('svcTableBody');
        this.form = document.getElementById('controllerForm');
    }

    log(type, text) {
        const time = new Date().toLocaleTimeString();
        const div = document.createElement('div');
        div.className = `log-line ${type}`;
        div.textContent = `[${time}] ${text}`;
        this.logConsole.appendChild(div);
        this.logConsole.scrollTop = this.logConsole.scrollHeight;
    }

    updateStep(stepNum, state) {
        const el = document.getElementById(`step-${stepNum}`);
        if (el) {
            el.className = `step-card ${state}`;
        }
    }

    resetStepStates() {
        for (let i = 1; i <= 5; i++) {
            const el = document.getElementById(`step-${i}`);
            if (el) el.className = 'step-card';
        }
    }

    showResponse(isSuccess, title, message) {
        this.resBanner.className = `response-banner ${isSuccess ? 'success' : 'error'}`;
        this.resIcon.textContent = isSuccess ? '✅' : '⚠️';
        this.resTitle.textContent = title;
        this.resSub.textContent = message;
    }

    renderTable(records) {
        if (records.length === 0) {
            this.svcTableBody.innerHTML = `<tr class="empty-tr"><td colspan="5">No records processed yet.</td></tr>`;
            return;
        }

        this.svcTableBody.innerHTML = records.map(r => `
            <tr>
                <td><strong style="color:var(--blue-accent); font-family:var(--font-code);">${r.employeeID}</strong></td>
                <td>${r.employeeName}</td>
                <td>${r.department}</td>
                <td>${r.positionCategory}</td>
                <td><span style="color:#6ee7b7; font-weight:600;">ACTIVE</span></td>
            </tr>
        `).join('');
    }

    resetForm() {
        this.form.reset();
    }
}

// INITIALIZE MVC STACK ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
    const repository = new ModelRepository();
    const service = new EmployeeService(repository);
    const view = new EmployeeView();
    const controller = new EmployeeController(service, view);

    const form = document.getElementById('controllerForm');
    const btnReset = document.getElementById('btnReset');
    const btnClearLog = document.getElementById('btnClearLog');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        view.resetStepStates();

        const formData = new FormData(form);
        const dataRaw = {
            employeeID: formData.get('employeeID') || '',
            employeeName: formData.get('employeeName') || '',
            department: formData.get('department') || '',
            positionCategory: formData.get('positionCategory') || '',
            positionDescription: formData.get('positionDescription') || '',
            priority: formData.get('priority') || ''
        };

        controller.handleFormSubmit(dataRaw);
    });

    btnReset.addEventListener('click', () => {
        view.resetForm();
        view.resetStepStates();
    });

    btnClearLog.addEventListener('click', () => {
        view.logConsole.innerHTML = `<div class="log-line sys">[LOG CLEARED]</div>`;
    });
});
