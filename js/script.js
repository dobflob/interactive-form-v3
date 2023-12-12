const form = document.querySelector('form');
//form is not valid when page loads
let isValid = false;

const nameInput = document.querySelector('#name');
const nameHint = document.querySelector('#name-hint');
//focus name input when page loads
nameInput.focus();

const emailInput = document.querySelector('#email');
const emailHint = document.querySelector('#email-hint');

const jobRoleInput = document.querySelector('#title');
const jobRoleOptions = document.querySelectorAll('#title option');
const otherJobRoleInput = document.querySelector('#other-job-role');
//hide other job role field when page loads
otherJobRoleInput.hidden = true;

const tShirtSizeInput = document.querySelector('#size');
const tShirtDesignInput = document.querySelector('#design');
const tShirtDesignOptions = document.querySelectorAll('#design option');
const tShirtColorInput = document.querySelector('#color');
const tShirtColorOptions = document.querySelectorAll('#color option');
//disable color input when page loads or when the shirt color input is disabled
tShirtColorInput.disabled = true

const activityFieldSet = document.querySelector('#activities');
const activityHint = document.querySelector('#activities-hint');
const activityLegend = document.querySelector('#activities legend');
const activityOptions = document.querySelectorAll('#activities input[type="checkbox"]');
const totalCostDisplay = document.querySelector('#activities-cost');
//set cost to 0 when page loads
let totalCostInt = 0;

const paymentMethodInput = document.querySelector('#payment');
const paymentOptions = document.querySelectorAll('#payment option');
const creditCardInfo = document.querySelector('#credit-card');
const ccExpMonth = document.querySelector('#exp-month');
const ccExpYear = document.querySelector('#exp-year');
const ccNumber = document.querySelector('#cc-num');
const ccHint = document.querySelector('#cc-hint');
const ccZip = document.querySelector('#zip');
const zipHint = document.querySelector('#zip-hint');
const ccCvv = document.querySelector('#cvv');
const cvvHint = document.querySelector('#cvv-hint');
const payPalInfo = document.querySelector('#paypal');
const bitCoinInfo = document.querySelector('#bitcoin');
const defaultPaymentMethod = document.querySelector('option[value="credit-card"]');
//select default payment in payment input
defaultPaymentMethod.selected = true;
let selectedPaymentMethod = defaultPaymentMethod;
//hide paypal info when page loads
payPalInfo.hidden = true;
//hide bitcoin info when page loads
bitCoinInfo.hidden = true;

//event listeners for when users make drop down selections that change other form elements
jobRoleInput.addEventListener('change', (e) => {
    const selectedJobRole = e.target.value;
    for (let option of jobRoleOptions) {
       if (option.value === selectedJobRole) {
        otherJobRoleInput.hidden = false;
        otherJobRoleInput.focus();
       } else {
        otherJobRoleInput.hidden = true;
       }
    }
});

tShirtDesignInput.addEventListener('change', (e) => {
    const selectedDesign = e.target.value;

    if (!tShirtColorInput.disabled) {
        tShirtColorInput.firstElementChild.selected = true;
    }

    for (option of tShirtColorOptions) {
       if (option.dataset.theme === selectedDesign) {
        option.hidden = false;
       } else {
        option.hidden = true;
       }
    }
    tShirtColorInput.disabled = false;
});

activityFieldSet.addEventListener('change', (e) => {
    const clickedActivity = e.target;
    const clickedActivityCost = parseInt(clickedActivity.dataset.cost);

    if (clickedActivity.checked) {
        totalCostInt += clickedActivityCost;
    } else {
        totalCostInt -= clickedActivityCost;
    }

    if (!validateActivitySelection()) {
        activityLegend.classList.add('not-valid');
        activityLegend.classList.remove('valid');
        activityHint.style.display = 'block';
    } else {
        activityLegend.classList.remove('not-valid');
        activityLegend.classList.add('valid');
        activityHint.remove('style');
    }

    totalCostDisplay.textContent = `Total: $${totalCostInt}`;
    
});

for (let option of activityOptions) {
    option.addEventListener('focus', () => {
        option.parentNode.classList.add('focus');
    });

    option.addEventListener('blur', () => {
        option.parentNode.classList.remove('focus');
    });
}

paymentMethodInput.addEventListener('change', (e) => {
    selectedPaymentMethod = e.target.value;

    if (selectedPaymentMethod === 'paypal') {
        creditCardInfo.hidden = true;
        payPalInfo.hidden = false;
        bitCoinInfo.hidden = true;
    }

    if (selectedPaymentMethod === 'bitcoin') {
        creditCardInfo.hidden = true;
        payPalInfo.hidden = true;
        bitCoinInfo.hidden = false;
    }

    if (selectedPaymentMethod === 'credit-card') {
        creditCardInfo.hidden = false;
        payPalInfo.hidden = true;
        bitCoinInfo.hidden = true;
    }
});

//form validation helper functions
function validateName(name) {
   const nameHint = document.querySelector('#name-hint'); 
   const validName = /^([a-z]+)( [a-z]+)?( [a-z]+)?$/i.test(name);
   console.log(`Name valid: ${validName}`);
   return validName;
}

function validateEmail(email) {
    const emailHint = document.querySelector('#email-hint'); 
    const validEmail = /^[a-z0-9]+([.+_][a-z0-9]+)*@[a-z]+\.[a-z]+$/i.test(email);
    console.log(`Email valid: ${validEmail}`);
    return validEmail;
 }

 function validateActivitySelection() {
    const validActivitySelection = totalCostInt > 0;
    console.log(`Activity Selection valid: ${validActivitySelection}`);
    return validActivitySelection;
 }

 function validateExpMonth() {
    const validExpMonth = !ccExpMonth.firstElementChild.selected;
    console.log(`Expiration Month valid: ${validExpMonth}`);
    return validExpMonth;
 }

 function validateExpYear() {
    const validExpYear = !ccExpYear.firstElementChild.selected;
    console.log(`Expiration Year valid: ${validExpYear}`);
    return validExpYear;
 }

 function validateCardNum(cardNum) {
    const validCardNum = /^[0-9]{13,16}$/.test(cardNum);
    console.log(`CC Num valid: ${validCardNum}`);
    return validCardNum;
 }

 function validateZip(zip) {
    const validZip = /^[0-9]{5}$/.test(zip);
    console.log(`CC Zip valid: ${validZip}`);
    return validZip;
 }

 function validateCvv(cvv) {
    const validCvv = /^[0-9]{3}$/.test(cvv);
    console.log(`CC CVV valid: ${validCvv}`);
    return validCvv;
 }

 function addNotValidStyle(element) {
    if (element.tagName === 'SELECT') {
        element.previousElementSibling.classList.add('not-valid');
        element.previousElementSibling.classList.remove('valid');
    } else {
        element.parentNode.classList.add('not-valid');
        element.parentNode.classList.remove('valid');
    }
 }

 function removeNotValidStyle(element) {
    console.log(element.tagName);
    if (element.tagName === 'SELECT') {
        element.previousElementSibling.classList.add('valid');
        element.previousElementSibling.classList.remove('not-valid');
        element.classList.add('error-border');
    } else {
        element.parentNode.classList.add('valid');
        element.parentNode.classList.remove('not-valid');
    }
 }

//event listeners to respond to validity of input as user fills out text inputs
nameInput.addEventListener('blur', (e) => {
    if (!validateName(e.target.value)) {
        addNotValidStyle(e.target);
        nameHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        nameHint.remove('style');
    }
})

nameInput.addEventListener('keyup', (e) => {
    if (!validateName(e.target.value)) {
        addNotValidStyle(e.target);
        nameHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        nameHint.remove('style');
    }
});

emailInput.addEventListener('keyup', (e) => {
    ///validateEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
        addNotValidStyle(e.target);
        emailHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        emailHint.remove('style');
    }
});

emailInput.addEventListener('blur', (e) => {
    ///validateEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
        addNotValidStyle(e.target);
        emailHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        emailHint.remove('style');
    }
});

ccExpMonth.addEventListener('blur', (e) => {
    if (!validateExpMonth()) {
        addNotValidStyle(e.target);
    } else {
        removeNotValidStyle(e.target);
    }
})

ccExpYear.addEventListener('blur', (e) => {
    if (!validateExpYear()) {
        addNotValidStyle(e.target);
    } else {
        removeNotValidStyle(e.target);
    }
})

ccNumber.addEventListener('keyup', (e) => {
    if (!validateCardNum(e.target.value)) {
        addNotValidStyle(e.target);
        ccHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        ccHint.remove('style');
    }
});

ccNumber.addEventListener('blur', (e) => {
    if (!validateCardNum(e.target.value)) {
        addNotValidStyle(e.target);
        ccHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        ccHint.remove('style');
    }
});

ccZip.addEventListener('keyup', (e) => {
    if (!validateZip(e.target.value)) {
        addNotValidStyle(e.target);
        zipHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        zipHint.remove('style');
    }
});

ccZip.addEventListener('blur', (e) => {
    if (!validateZip(e.target.value)) {
        addNotValidStyle(e.target);
        zipHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        zipHint.remove('style');
    }
});

ccCvv.addEventListener('keyup', (e) => {
    if (!validateCvv(e.target.value)) {
        addNotValidStyle(e.target);
        cvvHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        cvvHint.remove('style');
    }
});

ccCvv.addEventListener('blur', (e) => {
    if (!validateCvv(e.target.value)) {
        addNotValidStyle(e.target);
        cvvHint.style.display = 'block';
    } else {
        removeNotValidStyle(e.target);
        cvvHint.remove('style');
    }
});

//submit event listner
 form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateName(nameInput.value)) {
        addNotValidStyle(nameInput);
        nameHint.style.display = 'block';
    } else {
        removeNotValidStyle(nameInput);
        nameHint.remove('style');
    }
    if (!validateEmail(emailInput.value)) {
        addNotValidStyle(emailInput);
        emailHint.style.display = 'block';
    } else {
        removeNotValidStyle(nameInput);
        emailHint.remove('style');
    }
    
    if (!validateActivitySelection()) {
        activityLegend.classList.add('not-valid');
        activityLegend.classList.remove('valid');
        activityHint.style.display = 'block';
    } else {
        activityLegend.classList.remove('not-valid');
        activityLegend.classList.add('valid');
        activityHint.remove('style');
    }

    if (defaultPaymentMethod.selected || selectedPaymentMethod === 'credit-card') {
        
        if (!validateExpMonth()) {
            addNotValidStyle(ccExpMonth);
        } else {
            removeNotValidStyle(ccExpMonth);
        }

        if (!validateExpYear()) {
            addNotValidStyle(ccExpYear);
        } else {
            removeNotValidStyle(ccExpYear);
        }
        
        if (!validateCardNum(ccNumber.value)) {
            addNotValidStyle(ccNumber);
            ccHint.style.display = 'block';
        } else {
            removeNotValidStyle(ccNumber);
            ccHint.remove('style');
        }
        
        if (!validateZip(ccZip.value)) {
            addNotValidStyle(ccZip);
            zipHint.style.display = 'block';
        } else {
            removeNotValidStyle(ccZip);
            zipHint.remove('style');
        }

        if (!validateCvv(ccCvv.value)) {
            addNotValidStyle(ccCvv);
            cvvHint.style.display = 'block';
        } else {
            removeNotValidStyle(ccCvv);
            cvvHint.remove('style');
        }
    }
});