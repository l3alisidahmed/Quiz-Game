
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.Login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btn');


registerLink.addEventListener('click',()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
});
btnPopup.addEventListener('click',()=> {
    wrapper.classList.add('active-popup');
});
