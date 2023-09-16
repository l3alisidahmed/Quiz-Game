const loginBtn = document.querySelector('.login');

loginBtn.addEventListener('click', () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.pass').value;

    fetch(`http://localhost:3000/connexion/${email}/${password}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data._id) {
            localStorage.setItem('userId', data._id);
            location.href = '../category/index.html';
        }
    })
    .catch(err => console.log(err.message));
});