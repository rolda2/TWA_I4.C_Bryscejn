import { isValidInput } from './validation.js';

const fields = [
    { name: '1', dataType: 'text', maxLength: 10, minLength: 5 },
    { name: '2', dataType: 'string', maxLength: 10, minLength: 5 },
    { name: '3', dataType: 'text', maxLength: 10, minLength: 5 },
    { name: '4', dataType: 'text', maxLength: 10, minLength: 5 },
    { name: '5', dataType: 'string', maxLength: 10, minLength: 5 },
]

let formHTML = '<form>';

fields.forEach(field => {
    formHTML += `<label for="field-${field.name}">${field.name}</label>`;
    formHTML += `<input type="${field.dataType}" id="field-${field.name}" name="${field.name}" maxLength="${field.maxLength}" minLength="${field.minLength}" required />`;
    formHTML += `<br />`;
});

formHTML += '</form>';

document.body.innerHTML = formHTML;

fields.forEach(field => {
    const input = document.querySelector(`#field-${field.name}`);

    input.addEventListener('input', function() {
        const value = this.value;

        if (isValidInput(value, field)) {
            this.style.backgroundColor = 'green';
        } else {
            this.style.backgroundColor = 'red';
        }
    });
});