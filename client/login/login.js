document.addEventListener('DOMContentLoaded', () => {
    const btnLog = document.querySelector('.login');

    btnLog.addEventListener('click', () => {
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.pass').value;
        console.log(email);
        console.log(password);
        
        fetch(`http://localhost:3000/connexion/${email}/${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);
            if (data.message === 'User not found') {
                console.log('User not found');
            } else if (data.message === 'Invalid password') {
                console.log('Invalid password');
            } else {
                // Assuming successful login, data contains user information
                localStorage.setItem('userId', data._id);
                location.href = "../category/index.html";
                console.log('success');
            }
        })
        .catch(err => console.log(err.message));
    });
});