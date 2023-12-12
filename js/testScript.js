const form = document.querySelector('form');
const firstField = form.querySelector('input'); //selects first input element in form

//node lists of elements to loop through
const selectInputs = document.querySelectorAll('select');
const selectOptions = document.querySelectorAll('option');
const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const checkboxInputs = document.querySelectorAll('label > input[type="checkbox"]');

//specific elements that have conditionals based on other inputs/form states
const otherJobRoleInput = document.querySelector('#other-job-role');
const colorSelectInput = document.querySelector('#color');
const defaultPayment = document.querySelector('option[value="credit-card"]');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');

//validation helper functions!

function validateText(element) {
    let isValidText = false;
    const text = element.value;
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
    //return isValidText;
    if (!isValidText) {
        addNotValid(element);
        console.log(element);
    } else {
        addValid(element);
    }
}

//handle validation classes
function addValid(element) {
   if (element.tagName === 'INPUT') {
        element.parentNode.classList.add('valid');
        element.parentNode.classList.remove('not-valid');
        element.nextElementSibling.removeAttribute('style');
   } 
}

function addNotValid(element) {
    if (element.tagName === 'INPUT') {
        element.parentNode.classList.add('not-valid');
        element.nextElementSibling.style.display = 'block';
        element.parentNode.classList.remove('valid');
   } 
}

function removeValidClasses(element) {
    if (element.tagName === 'INPUT') {
        element.parentNode.classList.remove('valid', 'not-valid');
        element.nextElementSibling.removeAttribute('style');
    }
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
    if (targetElement.tagName === 'INPUT' && targetElement.type !== 'checkbox') {
        //validate field when this event fires IF field is !empty
        if (!targetElement.value) {
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
        //validateSelection
        console.log(`select`);
    } else if (targetElement.type === 'checkbox') {
        //validateActivities
        console.log(`checkbox`);
    }
});

//event listener for all form inputs when they lose focus
form.addEventListener('blur', (e) => {
    
});

//event listener for submit event that validates all applicable form fields
form.addEventListener('submit', (e) => {

});