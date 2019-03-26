const queryForm = document.getElementById('queryForm');
const queryInput = queryForm.querySelector('input');
const queryAnswerField = document.getElementById('queryAnswer');

queryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: queryInput.value})
    }).then(r => r.json())
        .then(data => {
            queryAnswerField.innerHTML = JSON.stringify(data, '', 3);
        });
});

const mutationForm = document.getElementById('mutationForm');
const mutationInput = mutationForm.querySelector('input');
const mutationField = document.getElementById('mutationAnswer');

mutationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: 'mutation ' + mutationInput.value})
    }).then(r => r.json())
        .then(data => {
            mutationField.innerHTML = JSON.stringify(data, '', 3);
        });
});

const loginForm = document.getElementById('login');
const nameInput = loginForm.querySelector('input[name="username"]');
const passwordInput = loginForm.querySelector('input[name="password"]');
const responseField = loginForm.querySelector('.response');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: nameInput.value,
            password: passwordInput.value
        })
    }).then(res => {
        console.log(res);
        responseField.innerText = JSON.stringify(res, '', 2);
    }).catch(error => {
        console.log(error);
        responseField.innerText = JSON.stringify(error, '', 2);
    });
})
