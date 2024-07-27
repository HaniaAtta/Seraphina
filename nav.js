


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})

/*=============== SIGNUP ===============*/
const signup = document.getElementById('signup'),
      signupBtn = document.getElementById('signup-btn'),
      signupClose = document.getElementById('signup-close')

/* Signup show */
signupBtn.addEventListener('click', () =>{
   signup.classList.add('show-signup')
})

/* Signup hidden */
signupClose.addEventListener('click', () =>{
   signup.classList.remove('show-signup')
})


signupBtn.addEventListener('click', () =>{
   signup.classList.add('show-signup');
   const loginLink = document.getElementById('login-link');
   loginLink.addEventListener('click', () =>{
      signup.classList.remove('show-signup');
      login.classList.add('show-login');
   });
})



const loginButton = document.querySelector('.login__button');
const signupButton = document.querySelector('.signup__button');

loginButton.addEventListener('click', () => {
  popupMessage("Yay! You're logged in!", "success");
});

signupButton.addEventListener('click', () => {
  popupMessage("Woohoo! You're signed up!", "success");
});

function popupMessage(message, type) {
  const popup = document.createElement("div");
  popup.className = `popup ${type}`;
  popup.innerHTML = `<i class="ri-${type}-line"></i> ${message}`;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 3000); 
}