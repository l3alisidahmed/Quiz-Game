const btnLogin = document.querySelector('.siginup');

btnLogin.addEventListener('click', () => {
    const user_name = document.getElementById('user-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    console.log(user_name);
    console.log(email);
    console.log(password);
    const user = {
        user_name,
        email,
        password
    }

    console.log(user);
    
    fetch('http://localhost:3000/inscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        localStorage.setItem('userId', data.result._id);
        location.href = "../category/index.html";
    })
    .catch(err => console.log(err.message));
});


