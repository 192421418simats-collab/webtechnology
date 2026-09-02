// Question 1 - View Controller & UI Handler Script
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');
    const resetBtn = document.getElementById('resetBtn');
    const descTextarea = document.getElementById('positionDescription');
    const charCounter = document.getElementById('charCounter');
    
    const emptyState = document.getElementById('emptyState');
    const viewOutput = document.getElementById('viewOutput');

    // Live Character Counter for Description
    if (descTextarea && charCounter) {
        descTextarea.addEventListener('input', () => {
            const count = descTextarea.value.length;
            charCounter.textContent = `${count} / 250`;
            if (count >= 240) {
                charCounter.style.color = '#ef4444';
            } else if (count >= 200) {
                charCounter.style.color = '#f59e0b';
            } else {
                charCounter.style.color = '#64748b';
            }
        });
    }

    // Helper: Clear Error Messages
    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    }

    // Helper: Set Field Error
    function setError(id, message) {
        const errorEl = document.getElementById(`err-${id}`);
        const fieldEl = document.getElementById(id);
        if (errorEl) errorEl.textContent = message;
        if (fieldEl) fieldEl.classList.add('is-invalid');
    }

    // Input Validation Logic
    function validateForm(formData) {
        let isValid = true;
        clearErrors();

        // 1. Employee ID
        if (!formData.employeeID.trim()) {
            setError('employeeID', 'Employee ID is required.');
            isValid = false;
        } else if (formData.employeeID.trim().length < 3) {
            setError('employeeID', 'Employee ID must be at least 3 characters.');
            isValid = false;
        }

        // 2. Employee Name
        if (!formData.employeeName.trim()) {
            setError('employeeName', 'Employee Name is required.');
            isValid = false;
        } else if (formData.employeeName.trim().length < 2) {
            setError('employeeName', 'Employee Name must be at least 2 characters.');
            isValid = false;
        }

        // 3. Department
        if (!formData.department) {
            setError('department', 'Please select a department.');
            isValid = false;
        }

        // 4. Position Category
        if (!formData.positionCategory) {
            const errEl = document.getElementById('err-positionCategory');
            if (errEl) errEl.textContent = 'Please select a position category.';
            isValid = false;
        }

        // 5. Position Description
        if (!formData.positionDescription.trim()) {
            setError('positionDescription', 'Position description is required.');
            isValid = false;
        } else if (formData.positionDescription.trim().length < 10) {
            setError('positionDescription', 'Description must be at least 10 characters long.');
            isValid = false;
        }

        // 6. Priority
        if (!formData.priority) {
            const errEl = document.getElementById('err-priority');
            if (errEl) errEl.textContent = 'Please select an assignment priority.';
            isValid = false;
        }

        return isValid;
    }

    // Render View Function
    function renderView(data) {
        document.getElementById('outputName').textContent = data.employeeName;
        document.getElementById('outputID').textContent = data.employeeID.toUpperCase();
        document.getElementById('outputDept').textContent = data.department;
        document.getElementById('outputCategory').textContent = data.positionCategory;
        document.getElementById('outputDesc').textContent = data.positionDescription;

        // Initials Avatar
        const names = data.employeeName.trim().split(' ');
        const initials = names.length > 1 
            ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
            : names[0].substring(0, 2).toUpperCase();
        document.getElementById('outputAvatar').textContent = initials;

        // Priority Badge Class
        const prioBadge = document.getElementById('outputPriority');
        prioBadge.textContent = `${data.priority} Priority`;
        prioBadge.className = `priority-badge ${data.priority}`;

        // Timestamp
        const now = new Date();
        document.getElementById('timestamp').textContent = `Rendered at: ${now.toLocaleTimeString()}`;

        // Toggle visibility
        emptyState.classList.add('hidden');
        viewOutput.classList.remove('hidden');
    }

    // Form Reset Handler
    resetBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
        if (charCounter) charCounter.textContent = '0 / 250';
        viewOutput.classList.add('hidden');
        emptyState.classList.remove('hidden');
    });

    // Form Submit Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extract Form Data
        const formDataObj = new FormData(form);
        const data = {
            employeeID: formDataObj.get('employeeID') || '',
            employeeName: formDataObj.get('employeeName') || '',
            department: formDataObj.get('department') || '',
            positionCategory: formDataObj.get('positionCategory') || '',
            positionDescription: formDataObj.get('positionDescription') || '',
            priority: formDataObj.get('priority') || ''
        };

        if (validateForm(data)) {
            renderView(data);
        }
    });
});
