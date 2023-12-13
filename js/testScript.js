const form = document.querySelector('form');
const firstField = form.querySelector('input');

//specific elements that have conditionals based on other inputs/form states
const otherJobRoleInput = document.querySelector('#other-job-role');
const colorSelectInput = document.querySelector('#color');
const defaultPayment = document.querySelector('option[value="credit-card"]');
const ccDiv = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');
let totalCostInt = 0;

//node lists of elements to loop through
const selectInputs = document.querySelectorAll('select');
const selectOptions = document.querySelectorAll('option');
const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
const ccInputs = ccDiv.querySelectorAll('input, select');

/*
VALIDATION FUNCTIONS!
*/
/* validate text fields have correct format */
function validateText(element) {
    let isValidText = false;
    const text = element.value;
    const label = element.parentNode;
    const hint = element.nextElementSibling;

    if (element.type === 'email') {
        isValidText = /^[a-z0-9]+([.+_][a-z0-9]+)*@[a-z]+\.[a-z][a-z]+$/i.test(text);
    } else if (element.id === 'name') {
        isValidText = /^([a-z]+)( [a-z]+)?( [a-z]+)?$/i.test(text);
    } else if (element.id === 'cc-num') {
        isValidText = /^[0-9]{13,16}$/.test(text);
    } else if (element.id === 'zip') {
        isValidText = /^[0-9]{5}$/.test(text);
    } else if (element.id === 'cvv') {
        isValidText = /^[0-9]{3}$/.test(text);
    }
    
    if (!isValidText) {
        addNotValid(label);
        showHint(hint);
    } else {
        addValid(label);
        hideHint(hint);
    }
}

/* validate at least one activity is selected */
function validateActivitySelected() {
    const isActivitySelected = totalCostInt > 0;
    const activityFieldset = document.querySelector('#activities');
    const legend = activityFieldset.firstElementChild;
    const hint = activityFieldset.lastElementChild;

    if (!isActivitySelected) {
        addNotValid(legend);
        showHint(hint);
    } else {
        addValid(legend);
        hideHint(hint);
    }
}

/* validate expiration fields are filled in */
function validateExpDate(element) {
    let isValidPaymentInfo = !element.firstElementChild.selected;
    const label = element.previousElementSibling;

    if (!isValidPaymentInfo) {
        addNotValid(label);
    } else {
        addValid(label);
    }
}

/*
CONDITIONAL FUNCTIONS!
*/
/* handle conditional field display */
function handleConditionals(element) {
    if (element.id === 'title') {
        if (element.value === 'other') {
            otherJobRoleInput.hidden = false;
            otherJobRoleInput.focus();
        } else {
            otherJobRoleInput.hidden = true;
            otherJobRoleInput.value = '';
        }
    } else if (element.id === 'design') {
        const colorOptions = colorSelectInput.querySelectorAll('option');
        //if design is not disabled, reset to default text
        if (!element.disabled) {
            colorSelectInput.firstElementChild.selected = true;
        }
        //only show colors that apply to the selected design
        for (let option of colorOptions) {
            if (option.dataset.theme !== element.value) {
                option.hidden = true;
            } else {
                option.hidden = false;
            }
        }
        colorSelectInput.disabled = false;

    } else if (element.id === 'payment') {
        const selectedMethod = element.value;

        if (selectedMethod === 'credit-card') {
            paypalInfo.hidden = true;
            bitcoinInfo.hidden = true;
            ccDiv.hidden = false;
        } else if (selectedMethod === 'paypal') {
            paypalInfo.hidden = false;
            bitcoinInfo.hidden = true;
            ccDiv.hidden = true;
            resetPaymentInfo();
        } else if (selectedMethod === 'bitcoin') {
            paypalInfo.hidden = true;
            bitcoinInfo.hidden = false;
            ccDiv.hidden = true;
            resetPaymentInfo();
        }
    }
}

/* reset cc inputs when different payment method selected */
function resetPaymentInfo() {
    for (const input of ccInputs) {
        if (input.tagName === 'INPUT') {
            const label = input.parentNode;
            const hint = input.nextElementSibling;
            input.value = '';
            removeValidClasses(label);
            hideHint(hint);
        } else {
            const label = input.previousElementSibling;
            input.firstElementChild.selected = true;
            removeValidClasses(label);
        }
    }
}

/* update total cost when an activity is checked or unchecked */
function updateCost(element) {
    const activityCost = parseInt(element.dataset.cost);
    const costPara = document.querySelector('#activities-cost');
    if (element.checked) {
        totalCostInt += activityCost;
    } else {
        totalCostInt -= activityCost;
    }
    costPara.textContent = `Total: $${totalCostInt}`;
}

/* disable any conflicting activities when activity selected */
function disableConflicts(element) {
    const elementTime = element.dataset.dayAndTime; 
    for (const checkbox of checkboxInputs) {
        //only disable/enable checkboxes that weren't the event target
        if (element !== checkbox) {
            if (elementTime === checkbox.dataset.dayAndTime && element.checked) {
                checkbox.disabled = true;
                checkbox.parentNode.classList.add('disabled');
            } else if (elementTime === checkbox.dataset.dayAndTime && !element.checked) {
                checkbox.disabled = false;
                checkbox.parentNode.classList.remove('disabled');
            }
        }
    }
}

/* add valid class and remove not-valid */
function addValid(element) {
    element.classList.add('valid');
    element.classList.remove('not-valid');
}

function hideHint(element) {
    element.removeAttribute('style');
}
/* add not-valid class and remove valid */
function addNotValid(element) {
    element.classList.add('not-valid');
    element.classList.remove('valid');
}

function showHint(element) {
    element.style.display = 'block';
}
/* remove both valid and not-valid classes */
function removeValidClasses(element) {
    element.classList.remove('valid', 'not-valid');
}

/*
EVENT LISTENERS!
*/
/* sets the initial form state when content loads */
document.addEventListener('DOMContentLoaded', () => {
    otherJobRoleInput.hidden = true;
    colorSelectInput.disabled = true;
    paypalInfo.hidden = true;
    bitcoinInfo.hidden = true;
    defaultPayment.selected = true;
    firstField.focus();
});

/* when a user types in a required text field */
form.addEventListener('keyup', (e) => {
    const targetElement = e.target;
    if (targetElement.tagName === 'INPUT' && 
        targetElement.type !== 'checkbox' && 
        targetElement.id !== 'other-job-role') {
        //validate field when this event fires IF field is !empty and not hidden
        if (!targetElement.value || targetElement.hidden) {
            removeValidClasses(targetElement);
        } else {
            validateText(targetElement);
        }
    }    
});

/* do something when select inputs and checkboxes have a value change*/
form.addEventListener('change', (e) => {
    const targetElement = e.target;
    if (targetElement.tagName === 'SELECT') {
        handleConditionals(targetElement);
        if (targetElement.id === 'exp-month' || targetElement.id === 'exp-year') {
            validateExpDate(targetElement);
        }
    } else if (targetElement.type === 'checkbox') {
        updateCost(targetElement);
        validateActivitySelected();
        disableConflicts(targetElement);
    }
});

//event listener for all form inputs when they lose focus - doesn't bubble, will need to loop through inputs and add blur event


/* validate all applicable fields when user clicks submit */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    for (const input of textInputs) {
        if (input.id !== 'other-job-role') {
            validateText(input);
        }
    }
    for (const input of ccInputs) {
        if (input.tagName === 'SELECT') {
            validateExpDate(input);
        }
    }
    for (i = 0; i < checkboxInputs.length; i++) {
        validateActivitySelected();
    }
});