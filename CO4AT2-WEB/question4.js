/**
 * Question 4: Result View Renderer & MVC Architecture Flow Controller
 * Student: ALUKA PARDHU | Saveetha University
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resultForm');
    const btnTestInvalid = document.getElementById('btnTestInvalid');

    const resPlaceholder = document.getElementById('resPlaceholder');
    const resSuccess = document.getElementById('resSuccess');
    const resError = document.getElementById('resError');
    const errorBullets = document.getElementById('errorBullets');

    // Model Store for Unique ID Verification
    const existingDatabaseIDs = ['EMP-4001', 'EMP-1001'];

    // Form Submit Handler (View -> Controller -> Model -> Result View)
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const payload = {
            employeeID: (formData.get('employeeID') || '').trim(),
            employeeName: (formData.get('employeeName') || '').trim(),
            department: formData.get('department') || '',
            positionCategory: formData.get('positionCategory') || '',
            positionDescription: (formData.get('positionDescription') || '').trim(),
            priority: formData.get('priority') || ''
        };

        // Animate Diagram Flow
        animateSvgFlow();

        // Perform Service / Controller Validation
        const validation = validatePayload(payload);

        if (validation.isValid) {
            renderSuccessResult(payload);
        } else {
            renderErrorResult(validation.errors);
        }
    });

    // Simulate Invalid Submission Trigger Button
    btnTestInvalid.addEventListener('click', () => {
        form.reset();
        animateSvgFlow();
        const dummyErrors = [
            "Validation Error: Employee ID field is required.",
            "Validation Error: Employee Name must be at least 2 characters.",
            "Validation Error: Department selection is missing.",
            "Validation Error: Position Category radio button was not selected.",
            "Validation Error: Position Description must be at least 8 characters."
        ];
        renderErrorResult(dummyErrors);
    });

    // Validation Logic Function
    function validatePayload(data) {
        const errors = [];

        // 1. Employee ID
        if (!data.employeeID) {
            errors.push("Employee ID is required.");
        } else if (data.employeeID.length < 3) {
            errors.push("Employee ID must be at least 3 characters long.");
        }

        // 2. Employee Name
        if (!data.employeeName) {
            errors.push("Employee Name is required.");
        } else if (data.employeeName.length < 2) {
            errors.push("Employee Name must be at least 2 characters.");
        }

        // 3. Department
        if (!data.department) {
            errors.push("Department choice is required.");
        }

        // 4. Position Category
        if (!data.positionCategory) {
            errors.push("Position Category radio button must be selected.");
        }

        // 5. Position Description
        if (!data.positionDescription) {
            errors.push("Position Description is required.");
        } else if (data.positionDescription.length < 8) {
            errors.push("Position Description must be at least 8 characters long.");
        }

        // 6. Priority
        if (!data.priority) {
            errors.push("Assignment Priority level must be selected.");
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Render Success Result View
    function renderSuccessResult(data) {
        resPlaceholder.classList.add('hidden');
        resError.classList.add('hidden');

        document.getElementById('outName').textContent = data.employeeName;
        document.getElementById('outID').textContent = data.employeeID.toUpperCase();
        document.getElementById('outDept').textContent = data.department;
        document.getElementById('outCategory').textContent = data.positionCategory;
        document.getElementById('outDesc').textContent = data.positionDescription;

        // Priority Badge styling
        const badge = document.getElementById('outPriority');
        badge.textContent = `${data.priority} Priority`;
        if (data.priority === 'Low') {
            badge.style.background = 'rgba(16, 185, 129, 0.2)';
            badge.style.border = '1px solid #10b981';
            badge.style.color = '#6ee7b7';
        } else if (data.priority === 'Medium') {
            badge.style.background = 'rgba(245, 158, 11, 0.2)';
            badge.style.border = '1px solid #f59e0b';
            badge.style.color = '#fde047';
        } else {
            badge.style.background = 'rgba(244, 63, 94, 0.2)';
            badge.style.border = '1px solid #f43f5e';
            badge.style.color = '#fca5a5';
        }

        const now = new Date();
        document.getElementById('outTime').textContent = `Processed at: ${now.toLocaleTimeString()}`;

        resSuccess.classList.remove('hidden');
    }

    // Render Error Result View
    function renderErrorResult(errors) {
        resPlaceholder.classList.add('hidden');
        resSuccess.classList.add('hidden');

        errorBullets.innerHTML = errors.map(err => `<li>⚠️ ${err}</li>`).join('');

        resError.classList.remove('hidden');
    }

    // SVG Node Highlight Animation Helper
    function animateSvgFlow() {
        const nodes = ['node-view', 'node-controller', 'node-model'];
        nodes.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.transition = 'all 0.3s ease';
                el.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    el.style.transform = 'scale(1)';
                }, 400);
            }
        });
    }
});
