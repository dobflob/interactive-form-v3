# interactive-form-v3
Treehouse Tech Degree Project 3: Interactive Form

## About my project...
This project is to learn and get comfortable with form validation, to include: using RegEx for validation, traversing the DOM, meeting/incorporating accessbitility standards, and conditionals

## Input Validation:    
Fields are validated when the user clicks submit (all checked at once) and additionally in real time when:

### A user types into a text field. Text fields include:
- Name
- Email Address
- Credit Card Number
- Zip
- CVV

### A user tabs through the select or text input fields
Fields with an asterisk are required and will be validated unless hidden.

- If the field is visible and blank:
    - the label/legend text will turn red
    - the border of the input/fieldset will turn red
    - hint text will appear indicating to the user that the field is required
- Fields checked include:
    - Name
    - Email Address
    - Activity Field Set (at least one activity must be selected)
    - Exp Date, Year, Card Number, Zip, and CVV (if payment method is Credit Card)

*This does not happen with checkboxes*
*I'd rather have the field validate on blur, but that is a problem for another day*

### Fields that must have a specific format are validated:
- If the field is formatted incorrectly:
    - the label text will turn red
    - the border of the input will turn red
    - hint text will appear indicating to the user that the field must be formatted correctly
- Fields checked include:
    - Name (must be a letter a-z, case insensitive without leading or trailing spaces)
    - Email Address (must have at least one letter followed by an @ symbol followed by at least one letter followed by a . character and at least 2 more letters)
    - Credit Card must have 13-16 numbers with no spaces or special characters
    - Zip must have 5 numbers with no spaces or special characters
    - CVV must have 3 numbers with no spaces or special characters

## Conditional Fields/Behavior:
Some fields have a different state or are hidden based on previous form selections.

### Other Job Role field:
- hidden on page load
- shows if user selects 'Other' option for Job Role field

### Tshirt Color Field: 
- disabled on page load
- enables when user selects a Tshirt 'Design'
- color options change based on the theme chosen:
    - if JS Puns: 
        - Cornflower Blue
        - Dark Slate Grey
        - Gold
    - if I heart JS:
        - Tomato
        - Steel Blue
        - Dim Grey

### Activity Options:
- if a user has selected an activity, an other activity with a conflicting day/time becomes disabled
- if a user de-selects an activity, any conflicting activities will enable

### Payment Info:
- if Payment Method is Credit Card (default selection)
    - Bitcoin info is hidden
    - Paypal info is hidden
- if Payment Method is PayPal
    - Bitcoin info is hidden
    - Credit Card fields are hidden
- if Payment Method is Bitcoin
    - Paypal info is hidden
    - Credit Card fields are hidden

## Built with
Vanilla JavaScript (and love)!

## Getting Started
Download the project files and open your local copy of index.html in Chrome or visit [Register for Full Stack Conference](https://dobflob.github.io/interactive-form-v3)