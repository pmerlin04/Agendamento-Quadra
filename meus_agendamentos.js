const accessToken = localStorage('accessToken');

if(!accessToken){
    window.location.href = "login.html";
}

function logout(){
    localStorage.removeItem('accessToken');
    window.location.href = "jogin.html";
}

function mostrarAgendamentosPendentes(){
    window.location.href = "inicial.html#agendamento";
}

