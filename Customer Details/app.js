let inputs = {};
let body = document.querySelector('body');
let form = body.querySelector('form');

const objectOfElements = {
    "firstName": document.querySelector('#firstName'),
    "lastName": document.querySelector('#lastName'),
    "streetAddress": document.querySelector('#streetAddress'),
    "addLine2": document.querySelector('#addLine2'),
    "city": document.querySelector('#city'),
    "state": document.querySelector('#state'),
    "zipCode": document.querySelector('#zipCode'),
    "phoneNumber": document.querySelector('#phoneNumber'),
    "email": document.querySelector('#email'),
    "selectOption": document.querySelector('#selectOption'),
    "otherValue": document.querySelector('#otherValue'),
    "feedback": document.querySelector('#feedback'),
    "suggestions": document.querySelector('#suggestions'),
    "checkboxElement1": document.querySelector('#checkboxElement1'),
    "checkboxElement2": document.querySelector('#checkboxElement2'),
    "checkboxElement3": document.querySelector('#checkboxElement3'),
    "nameTab1": document.querySelector('#nameTab1'),
    "addressTab1": document.querySelector('#addressTab1'),
    "numberTab1": document.querySelector('#numberTab1'),
    "nameTab2": document.querySelector('#nameTab2'),
    "addressTab2": document.querySelector('#addressTab2'),
    "numberTab2": document.querySelector('#numberTab2'),
}

const objectOfFlags = {
    "firstName": false,
    "lastName": false,
    "streetAddress": false,
    "addLine2": false,
    "city": false,
    "state": false,
    "zipCode": false,
    "phoneNumber": false,
    "email": false,
    "selectOption": false,
    "otherValue": false
}

function scrollToError() {
    for (let element of Object.keys(objectOfFlags)) {
        if (!objectOfFlags[element]) {
            objectOfElements[element].focus();
            if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                changeBgColorRed(objectOfElements[element]);
            break;
        }
    }
}
// objectOfElements['phoneNumber'].addEventListener('focus', (evt) => {
//     let number = evt.target.value;
//     evt.target.value = ('' + number).replace(/\D/g, '');
// });
function validNumber(input) {
    if (!(input.value.trim())) {
        return false;
    } else if (input.value.includes(')') && input.value.includes('(') && input.value.includes('-')) {
        return true;
    }
    // validate phoneNumber format
    if (!(/^\d{10}$/.test(input.value.trim()))) {
        return false;
    }
    return true;
}

function createErrorMsg(input, txt) {
    let li = input.closest('li');
    let section = document.createElement('section');
    let img = document.createElement('img');
    let small = document.createElement('small');
    img.src = 'https://cdn.jotfor.ms/images/exclamation-octagon.png';
    img.style.width = '11px';
    small.innerText = txt;
    section.classList.add('errorMessage');
    section.appendChild(img);
    section.appendChild(small);
    li.appendChild(section);
    li.style.backgroundColor = 'rgb(255, 237, 237)';
}

//change the bg color to light red ERROR
function changeBgColorRed(input) {
    let txt = '';
    if (input == objectOfElements['email']) {
        txt = ' Enter a valid e-mail address';
    }
    else if (input == objectOfElements['firstName'] || input == objectOfElements['lastName']) {
        if (/\s/g.test(input.value) && /\d/.test(input.value)) {
            txt = ` ${input.id == 'firstName' ? "First Name" : "Last Name"} can't contain spaces and numbers.`;
        } else if (/\s/g.test(input.value)) {
            txt = ` ${input.id == 'firstName' ? "First Name" : "Last Name"} can't contain spaces.`;
        } else if (/\d/.test(input.value)) {
            txt = ` ${input.id == 'firstName' ? "First Name" : "Last Name"} can't contain numbers.`;
        } else {
            txt = ' This field is required.';
        }
    } else if (input == objectOfElements['phoneNumber']) {
        if (/\s/g.test(input.value) && /[a-zA-Z]/.test(input.value) && input.value != '') {
            txt = " Phone number can't contain spaces and characters.";
        } else if (/\s/g.test(input.value)) {
            txt = " Phone number can't contain spaces.";
        } else if (/[a-zA-Z]/.test(input.value) && input.value != '') {
            txt = " Phone number can't contain characters.";
        } else if (/\d/.test(input.value) && input.value != 10) {
            txt = " Phone number length must equal 10";
        } else {
            txt = ' This field is required.';
        }
    } else {
        txt = ' This field is required.';
    }
    createErrorMsg(input, txt);
}

function changeBorderColor(input) {
    input.style.border = '1px solid rgb(242, 58, 60)';
}

function rmvBorderColor(input) {
    input.style.border = '1px solid rgb(195, 202, 216)';
}

// let selectOption = objectOfElements['selectOption'];
// selectOption.addEventListener('input', (evt) => {
//     if (selectOption.value == "Other") {
//         document.querySelector('#other').style.display = 'block';
//     } else {
//         document.querySelector('#other').style.display = 'none';
//     }
// });

// let p = objectOfElements['phoneNumber']
// p.addEventListener('focus', (evt) => {
//     let number = p.value;
//     objectOfElements['phoneNumber'].value = ('' + number).replace(/\D/g, '');

//     if (li.lastChild.tagName == "SECTION") {
//         objectOfElements['phoneNumber'].closest('li').removeChild(li.lastChild);
//     }
// });

function success(input, msg = '') {
    let li = input.closest('li');
    li.style.backgroundColor = 'rgb(241, 245, 255)';
    if (msg == 'fullName') {
        rmvBorderColor(objectOfElements['firstName']);
        rmvBorderColor(objectOfElements['lastName']);
        if (li.lastChild.tagName == "SECTION") {
            li.removeChild(li.lastChild);
        }
    } else if (msg == 'address') {
        rmvBorderColor(objectOfElements['streetAddress']);
        rmvBorderColor(objectOfElements['addLine2']);
        rmvBorderColor(objectOfElements['city']);
        rmvBorderColor(objectOfElements['state']);
        rmvBorderColor(objectOfElements['zipCode']);
        if (li.lastChild.tagName == "SECTION") {
            li.removeChild(li.lastChild);
        }
    } else {
        rmvBorderColor(input);
        if (li.lastChild.tagName == "SECTION") {
            li.removeChild(li.lastChild);
        }
    }
}

//checking if ther is an error message and remove it
function rmvErrorMsg() {
    for (let element of Object.values(objectOfElements)) {
        // element.addEventListener('blur', (evt) => {
        //     let li = evt.target.closest('li');
        //     if (li.lastChild.tagName == "SECTION") {
        //         li.removeChild(li.lastChild);
        //     }
        // });
        // element.addEventListener('focus', (evt) => {
        //     let li = evt.target.closest('li');
        //     if (li.lastChild.tagName == "SECTION") {
        //         li.removeChild(li.lastChild);
        //     }
        // });
        // if the element is one of a checkboxes
        if (element == objectOfElements['checkboxElement1']
            || element == objectOfElements['checkboxElement2']
            || element == objectOfElements['checkboxElement3']) {
            element.addEventListener('click', (evt) => {
                if (evt.target.checked == true) {
                    objectOfElements['checkboxElement1'].checked = false;
                    objectOfElements['checkboxElement2'].checked = false;
                    objectOfElements['checkboxElement3'].checked = false;
                    evt.target.checked = true;
                }
            });
        }
    }
}

form.addEventListener('submit', (event) => {
    checkValidation();
    scrollToError();
    successModal();
    // rmvErrorMsg();
    event.preventDefault();
});

function checkValidation() {
    // check first && last Name
    for (let element of Object.keys(objectOfElements)) {
        if (objectOfElements[element] == objectOfElements['firstName']
            || objectOfElements[element] == objectOfElements['lastName']) {
            if (/^[a-zA-Z]+$/.test(objectOfElements[element].value.trim()) || !objectOfElements[element].value.trim() === "") {
                inputs[element] = objectOfElements[element].value;
                objectOfFlags[element] = true;
                if (objectOfFlags['firstName'] && objectOfFlags['lastName'])
                    success(objectOfElements[element], 'fullName');
            } else {
                objectOfFlags[element] = false;
                changeBorderColor(objectOfElements[element]);
                if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                    changeBgColorRed(objectOfElements[element]);
            }
            //  check Address
        } else if (objectOfElements[element] == objectOfElements['streetAddress']
            || objectOfElements[element] == objectOfElements['addLine2']
            || objectOfElements[element] == objectOfElements['city']
            || objectOfElements[element] == objectOfElements['state']
            || objectOfElements[element] == objectOfElements['zipCode']) {
            if (objectOfElements[element].value.trim()) {
                inputs[element] = objectOfElements[element].value;
                objectOfFlags[element] = true;
                if (objectOfFlags['streetAddress'] && objectOfFlags['addLine2'] && objectOfFlags['city'] && objectOfFlags['state'] && objectOfFlags['zipCode'])
                    success(objectOfElements[element], 'address');
            } else {
                objectOfFlags[element] = false;
                changeBorderColor(objectOfElements[element]);
                if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                    changeBgColorRed(objectOfElements[element]);
            }
            // check email
        } else if (objectOfElements[element] == objectOfElements['email']) {
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const email = objectOfElements[element].value.trim();
            if (emailRegex.test(email)) {
                inputs[element] = objectOfElements[element].value;
                objectOfFlags[element] = true;
                if (email != '') {
                    success(objectOfElements[element]);
                }
            } else if (!emailRegex.test(email) && email != '') {
                objectOfFlags[element] = false;
                changeBorderColor(objectOfElements[element]);
                if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                    changeBgColorRed(objectOfElements[element]);
            } else if (email == '') {
                inputs[element] = objectOfElements[element].value;
                objectOfFlags[element] = true;
                objectOfElements[element].closest('li').style.backgroundColor = '';
                rmvBorderColor(objectOfElements[element]);
            }
            // check Phone Number
        } else if (objectOfElements[element] == objectOfElements['phoneNumber']) {
            if (validNumber(objectOfElements[element])) {
                inputs[element] = objectOfElements[element].value.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                objectOfElements[element].value = inputs[element];
                objectOfFlags[element] = true;
                success(objectOfElements[element]);
            } else {
                objectOfFlags[element] = false;
                changeBorderColor(objectOfElements[element]);
                if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                    changeBgColorRed(objectOfElements[element]);
            }
            // check Select Option
        } else if (objectOfElements[element] == objectOfElements['selectOption']
            || objectOfElements[element] == objectOfElements['otherValue']) {
            if (objectOfElements[element].value
                && objectOfElements[element].value != "Other") {
                inputs[element] = objectOfElements[element].value;
                success(objectOfElements[element]);
                objectOfFlags[element] = true;
                objectOfFlags['otherValue'] = true;
            } else if (objectOfElements[element].value == "Other") {
                document.querySelector('#other').style.display = 'block';
                if (objectOfElements['otherValue'].value) {
                    inputs[element] = objectOfElements[element].value;
                    success(objectOfElements['selectOption']);
                    success(objectOfElements[element]);
                    objectOfFlags[element] = true;
                    objectOfFlags['selectOption'] = true;
                } else {
                    objectOfFlags[element] = false;
                    changeBorderColor(objectOfElements[element]);
                    if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                        changeBgColorRed(objectOfElements[element]);
                    if (document.querySelector('li:nth-of-type(5)').lastElementChild.classList[0] == "errorMessage" || document.querySelector('li:nth-of-type(5)').style.backgroundColor == 'rgb(255, 237, 237)') {
                        document.querySelector('li:nth-of-type(5)').lastElementChild.style.display = 'none';
                        document.querySelector('li:nth-of-type(5)').style.backgroundColor = '';
                        rmvBorderColor(objectOfElements['selectOption']);
                    }
                }
            } else if (objectOfElements[element] == objectOfElements['otherValue']) {
                objectOfFlags['selectOption'] = true;
                objectOfFlags[element] = false;
                changeBorderColor(objectOfElements[element]);
                if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                    changeBgColorRed(objectOfElements[element]);
            } else {
                objectOfFlags[element] = false;
                objectOfFlags['otherValue'] = true;
                changeBorderColor(objectOfElements[element]);
                if (!(objectOfElements[element].closest('li').lastChild.tagName == "SECTION"))
                    changeBgColorRed(objectOfElements[element]);
            }
            // optional inputs
        } else if (objectOfElements[element] == objectOfElements['feedback']) {
            if (objectOfElements[element].value) {
                success(objectOfElements[element]);
                inputs[element] = objectOfElements[element].value;
            } else {
                inputs[element] = objectOfElements[element].value;
            }
        } else if (objectOfElements[element] == objectOfElements['suggestions']) {
            if (objectOfElements[element].value) {
                success(objectOfElements[element]);
                inputs[element] = objectOfElements[element].value;
            } else {
                inputs[element] = objectOfElements[element].value;
            }
        } else if (objectOfElements[element] == objectOfElements['checkboxElement1']
            || objectOfElements[element] == objectOfElements['checkboxElement2']
            || objectOfElements[element] == objectOfElements['checkboxElement3']) {
            if (objectOfElements[element].checked) {
                success(objectOfElements[element]);
                inputs[element] = objectOfElements[element].value;
            } else if (objectOfElements[element].checked) {
                success(objectOfElements[element]);
                inputs[element] = objectOfElements[element].value;
            } else if (objectOfElements[element].checked) {
                success(objectOfElements[element]);
                inputs[element] = objectOfElements[element].value;
            }
        } else if ((objectOfElements['nameTab1'].value
            && objectOfElements['addressTab1'.value]
            && objectOfElements['numberTab1'.value])
            || (objectOfElements['nameTab2'].value
                && objectOfElements['addressTab2'.value]
                && objectOfElements['numberTab2'.value])) {
            success(objectOfElements['nameTab1']);
        }
        inputs['nameTab1'] = objectOfElements['nameTab1'].value;
        inputs['addressTab1'] = objectOfElements['addressTab1'].value;
        inputs['numberTab1'] = objectOfElements['numberTab1'].value;
        inputs['nameTab2'] = objectOfElements['nameTab2'].value;
        inputs['addressTab2'] = objectOfElements['addressTab2'].value;
        inputs['numberTab2'] = objectOfElements['numberTab2'].value;
    }
}

function printOnConsole() {
    console.log('Customer Details:\n\n');
    console.log(`Full name: ${inputs['firstName']} ${inputs['lastName']}\n\n`);
    console.log('Address:');
    console.log(`Street Address: ${inputs['streetAddress']}`);
    console.log(`Street Address Line 2: ${inputs['addLine2']}`);
    console.log(`City: ${inputs['city']}`);
    console.log(`State / Province: ${inputs['state']}`);
    console.log(`Postal / Zip Code: ${inputs['zipCode']}\n\n`);
    console.log(`Phone Numbe: ${inputs['phoneNumber']}\n\n`);
    console.log(`E-mail: ${!inputs['email'] ? "NO EMAIL" : inputs['email']}\n\n`);
    console.log(`How did you hear about us?: ${inputs['selectOption'] == 'Other' ? inputs['otherValue'] : inputs['selectOption']}\n\n`);
    console.log(`Feedback about us: ${!inputs['feedback'] ? "NO FEEDBACK" : inputs['feedback']}\n\n`);
    console.log(`Suggestions if any for further improvement: ${!inputs['suggestions'] ? "NO SUGGESTIONS" : inputs['suggestions']}\n\n`);
    console.log(`Will you be willing to recommend us?: ${'checkboxElement1' in inputs ? inputs['checkboxElement1'] : ('checkboxElement2' in inputs ? inputs['checkboxElement2'] : ('checkboxElement3' in inputs ? inputs['checkboxElement3'] : ("NOT INTERSTING")))}\n\n`);
    console.log('Give reference of any two people whom you feel:\n\n');
    console.log('First person:');
    console.log(`Full Name: ${!inputs['nameTab1'] ? "NO NAME" : inputs['nameTab1']},  Address: ${!inputs['addressTab1'] ? "NO ADDRESS" : inputs['addressTab1']}, Contact Number: ${!inputs['numberTab1'] ? "NO NUMBER" : inputs['numberTab1']}`)
    console.log('\n\nSecond person:');
    console.log(`Full Name: ${!inputs['nameTab2'] ? "NO NAME" : inputs['nameTab2']},  Address: ${!inputs['addressTab2'] ? "NO ADDRESS" : inputs['addressTab2']}, Contact Number: ${!inputs['numberTab2'] ? "NO NUMBER" : inputs['numberTab2']}`)
}

function successModal() {
    if (Array.from(Object.values(objectOfFlags)).every((value) => value == true)) {
        printOnConsole();
        let containerSection = document.createElement('section');
        let div = document.createElement('div');
        let img = document.createElement('img');
        let h1 = document.createElement('h1');
        let h4 = document.createElement('h4');
        h1.innerText = "Thank You!";
        h4.innerText = "Your submossion has been received.";
        img.src = "https://img.icons8.com/pastel-glyph/64/26e07f/checked--v1.png";
        div.appendChild(img);
        div.appendChild(h1);
        div.appendChild(h4);
        div.style.backgroundColor = 'white';
        div.style.borderRadius = '7px';
        div.style.height = '268px';
        div.style.left = '38%';
        div.style.paddingTop = '50px';
        div.style.position = 'relative';
        div.style.textAlign = 'center';
        div.style.top = '38%';
        div.style.width = '438px';
        containerSection.appendChild(div);
        containerSection.style.backgroundColor = 'rgb(0 0 0 / 90%)'
        containerSection.style.height = '100%';
        containerSection.style.left = '0';
        containerSection.style.position = 'fixed';
        containerSection.style.top = '0';
        containerSection.style.width = '100%';
        body.appendChild(containerSection);
        Array.from(Object.values(objectOfElements)).forEach(input => {
            if (input.id == 'checkboxElement1' || input.id == 'checkboxElement2' || input.id == 'checkboxElement3') {
                input.checked = false;
            }
            else if (input.id == 'otherValue') {
                document.querySelector('#other').style.display = 'none';
            }
            input.value = '';
            input.closest('li').style.background = '';
        });
        setTimeout(() => {
            containerSection.style.display = 'none';
        }, 1500);
        containerSection.addEventListener('click', () => containerSection.style.display = 'none');
        setTimeout(() => {
            if (body.lastChild.tagName == 'SECTION') {
                body.removeChild(document.querySelector('body').lastChild);
            }
        }, 5000);
    }
}