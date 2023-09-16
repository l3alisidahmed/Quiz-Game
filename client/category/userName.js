const profileName = document.querySelector('.profile-name');
console.log(profileName);

const userId = localStorage.getItem('userId');
console.log(userId);

fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        profileName.innerHTML = data.user_name;
    })