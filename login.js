const btnLogin = document.getElementById('logar');

const API_URL_SIGNIN = 'https://localhost:7138/api/Usuarios/signin';

const formLogin = document.getElementById('loginForm');

formLogin.addEventListener('submit', async function(e){
    e.preventDefault();

    const inputEmail = document.getElementById('email').value;
    const inputSenha = document.getElementById('senha').value;



    const login = {
        emailUsuario: inputEmail,
        senhaUsuario: inputSenha
    };
    

    try{
        const response = await fetch(API_URL_SIGNIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${localStorage.getItem('token')}`
            },

            body:JSON.stringify(login)
            
        });


        if(!response.ok){
            console.log(inputEmail);
            console.log(inputSenha);
            throw new Error(`Erro ao conectar com a conta`);
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('emailUsuario', JSON.stringify(login));
        console.log(localStorage.getItem('emailUsuario'));
        alert(`Bem vindo ${login.emailUsuario}`)




    }catch(erro){
        console.log("erro no catch " , erro.message)
    }
})