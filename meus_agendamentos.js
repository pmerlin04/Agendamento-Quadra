const accessToken = localStorage('accessToken');
const email = localStorage('email');
console.log("oi", email);

if(!accessToken){
    window.location.href = "index.html";
}

function logout(){
    localStorage.removeItem('accessToken');
    window.location.href = "index.html";
}

function mostrarAgendamentosPendentes(){
    window.location.href = "inicial.html?agendamentosPedentes";

}

const API_URL_FINDALL = 'https://localhost:7138/api/Agendamentos';
async function carregarMeusAgendamentos(){

    try{
        const response = await fetch (API_URL_FINDALL, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        });

        if(response == 401){
            alert("Sessão expirada. Faça o login novamente.");
            logout();
            return;
        }

        if(!response.ok){
            throw new Error(`Erro na requisição ${response.status}`)
        }

        const meusAgendamentos = await response.json();
        console.log(meusAgendamentos);

        exibirMeusAgendamentos(meusAgendamentos);


    }catch(erro){
        console.log("Erro ao buscar os agendamentos");
    }
}

async function exibirMeusAgendamentos(meusAgendamentos){
    const lista = document.getElementById('container');
    lista.innerHTML = '';

    meusAgendamentos.forEach(agendamento => {
        if(meusAgendamentos.emailUsuario == email){
            
        }
    });

}

carregarMeusAgendamentos();

