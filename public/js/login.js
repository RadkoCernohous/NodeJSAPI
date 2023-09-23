
const login=function(email,password){
    alert(email,password)
}


document.querySelector('.form__group').addEventListener('submit', function(e){
    e.preventDefault();
    const email=document.getElementById('email').value
    const password=document.getElementById('password').value
    login(email, password)
})