const form = document.querySelector('form');
const firstField = form.querySelector('input'); //selects first input element in form

//specific elements that have conditionals based on other inputs/form states
const otherJobRoleInput = document.querySelector('#other-job-role');
const colorSelectInput = document.querySelector('#color');
const defaultPayment = document.querySelector('option[value="credit-card"]');
const ccDiv = document.querySelector('#credit-card');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');

//node lists of elements to loop through
const selectInputs = document.querySelectorAll('select');
const selectOptions = document.querySelectorAll('option');
const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const checkboxInputs = document.querySelectorAll('label > input[type="checkbox"]');
const ccInputs = ccDiv.querySelectorAll('input, select');

//validation helper functions!
function validateText(element) {
    let isValidText = false;
    const text = element.value;
    const elementLabel = element.parentNode;
    const elementHint = element.nextElementSibling;

    if (element.type === 'email') {
        isValidText = /^[a-z0-9]+([.+_][a-z0-9]+)*@[a-z]+\.[a-z][a-z]+$/i.test(text);
        console.log(`Email valid: ${isValidText}`); //Remove before submission
    } else if (element.id === 'name') {
        isValidText = /^([a-z]+)( [a-z]+)?( [a-z]+)?$/i.test(text);
        console.log(`Name valid: ${isValidText}`); //Remove before submission
    } else if (element.id === 'cc-num') {
        isValidText = /^[0-9]{13,16}$/.test(text);
        console.log(`CC Num valid: ${isValidText}`); //Remove before submission
    } else if (element.id === 'zip') {
        isValidText = /^[0-9]{5}$/.test(text);
        console.log(`Zip valid: ${isValidText}`); //Remove before submission
    } else if (element.id === 'cvv') {
        isValidText = /^[0-9]{3}$/.test(text);
        console.log(`CVV valid: ${isValidText}`); //Remove before submission
    }
    
    //TODO:? turn the validator into a reusable funciton....?
    if (!isValidText) {
        addNotValid(elementLabel);
        showHint(elementHint);
    } else {
        addValid(elementLabel);
        hideHint(elementHint);
    }
}

function validatePaymentInfo(element) {
    let isValidPaymentInfo = false;

    if (element.tagName === 'SELECT') {
        isValidPaymentInfo = !element.firstElementChild.selected;
    }
}

//handle conditional inputs
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
        const paymentMethod = element.value;

        if (paymentMethod === 'credit-card') {
            paypalInfo.hidden = true;
            bitcoinInfo.hidden = true;
            ccDiv.hidden = false;
        } else if (paymentMethod === 'paypal') {
            paypalInfo.hidden = false;
            bitcoinInfo.hidden = true;
            ccDiv.hidden = true;
            resetPaymentInfo();
        } else if (paymentMethod === 'bitcoin') {
            paypalInfo.hidden = true;
            bitcoinInfo.hidden = false;
            ccDiv.hidden = true;
            resetPaymentInfo();
        }
    }
}

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

//handle validation classes
function addValid(label) {
    label.classList.add('valid');
    label.classList.remove('not-valid');
}

function hideHint(hint) {
    hint.removeAttribute('style');
}

function addNotValid(label) {
    label.classList.add('not-valid');
    label.classList.remove('valid');
}

function showHint(hint) {
    hint.style.display = 'block';
}

function removeValidClasses(label) {
    label.classList.remove('valid', 'not-valid');
}

//sets the initial state of form fields that are dependent on specific selections
document.addEventListener('DOMContentLoaded', () => {
    otherJobRoleInput.hidden = true;
    colorSelectInput.disabled = true;
    paypalInfo.hidden = true;
    bitcoinInfo.hidden = true;
    defaultPayment.selected = true;
    firstField.focus();
});

//event listener for text inputs or any field tabbed to
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

//event listener for select inputs and checkboxes
form.addEventListener('change', (e) => {
    const targetElement = e.target;
    if (targetElement.tagName === 'SELECT') {
        handleConditionals(targetElement);
        //validateSelection
        console.log(`select`);
    } else if (targetElement.type === 'checkbox') {
        //validateActivities
        console.log(`checkbox`);
    }
});

//event listener for all form inputs when they lose focus - doesn't bubble, will need to loop through inputs and add blur event


//event listener for submit event that validates all applicable form fields
form.addEventListener('submit', (e) => {
    e.preventDefault();
    for (const input of textInputs) {
        if (input.id !== 'other-job-role') {
            validateText(input);
        }
    }

    for (const input of ccInputs) {
        validatePaymentInfo(input);
    }
});

//what if I added a class 'js-optional' that I applied to any field that's optional. then I just have to validate anything that doesn't have that class instead of specifying the specific id for each optional element.