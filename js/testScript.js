const form = document.querySelector('form');
const firstField = form.querySelector('input'); //selects first input element in form

const selectInputs = document.querySelectorAll('select');
const selectOptions = document.querySelectorAll('option');
const textInputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const checkboxInputs = document.querySelectorAll('label > input[type="checkbox"]');

const otherJobRoleInput = document.querySelector('#other-job-role');
const colorSelectInput = document.querySelector('#color');
const defaultPayment = document.querySelector('option[value="credit-card"]');
const paypalInfo = document.querySelector('#paypal');
const bitcoinInfo = document.querySelector('#bitcoin');

//validation helper functions!

function validateTextInput(element) {
    if (element.type === 'email') {
        const validEmail = /^[a-z0-9]+([.+_][a-z0-9]+)*@[a-z]+\.[a-z][a-z]+$/i.test(element.value);
        console.log(`Email valid: ${validEmail}`); //Remove before submission
        return validEmail;
    } 

    if (element.id === 'name') {
        const validName = /^([a-z]+)( [a-z]+)?( [a-z]+)?$/i.test(element.value);
        console.log(`Name valid: ${validName}`); //Remove before submission
        return validName;
    }

    if (element.id === 'cc-num') {
        const validccNum =  /^[0-9]{13,16}$/.test(element.value);
        console.log(`CC Num valid: ${validccNum}`); //Remove before submission
        return validccNum;
    }

    if (element.id === 'zip') {
        const validZip =  /^[0-9]{5}$/.test(element.value);
        console.log(`Zip valid: ${validZip}`); //Remove before submission
        return validZip;
    }

    if (element.id === 'cvv') {
        const validCvv = /^[0-9]{3}$/.test(element.value);
        console.log(`CVV valid: ${validCvv}`); //Remove before submission
        return validCvv;
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
    
    //validate field when this event fires IF field is !empty && target is a text input
    if (targetElement.value !== '' && 
        targetElement.tagName === 'INPUT' && 
        targetElement.type !== 'checkbox') {
            validateTextInput(targetElement);
        }
});

//event listener for select inputs and checkboxes
form.addEventListener('change', (e) => {
    
});

//event listener for all form inputs when they lose focus
form.addEventListener('blur', (e) => {
    
});

//event listener for submit event that validates all applicable form fields
form.addEventListener('submit', (e) => {

});