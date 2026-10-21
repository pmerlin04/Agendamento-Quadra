const accessToken = localStorage.getItem('accessToken');
const email = localStorage.getItem('email');
console.log(accessToken);

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
        //console.log(meusAgendamentos);

        exibirMeusAgendamentos(meusAgendamentos);


    }catch(erro){
        console.log("Erro ao buscar os agendamentos", erro);
    }
}

function exibirMeusAgendamentos(meusAgendamentos){
    const lista = document.getElementById('meu-container');
    lista.innerHTML = '';
    console.log(email);


    meusAgendamentos.forEach(agendamento => {

        const dataBanco = new Date(agendamento.horarioInicio);
        const dataBancoFinal = new Date(agendamento.horarioFinal);
        //console.log(dataBanco.toISOString().split('T')[0]);
        const data = dataBanco.toISOString().split('T')[0]; //2026-10-09


        const horaSeparadaInicio = dataBanco.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        }); //12:00 

        const horaSeparadaFinal = dataBancoFinal.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        }); //13:00


        if(agendamento.emailUsuario == email){
            const caixaHorarios = document.createElement('div');
            caixaHorarios.classList.add('caixa-meus-horarios');

            caixaHorarios.innerHTML = `
                <div class="comeco-horario">
                    <p class="id-agendamento">ID - ${agendamento.idAgendamento}</p>
                    <p class="email-solicitante">${agendamento.emailUsuario}</p>
                </div>

                <div class="meio-horario">
                    <p class= "data">${data}</p>
                    <p class="horario">${horaSeparadaInicio} às ${horaSeparadaFinal}</p>
                <div>

                <div class="final-horario">
                    <p class="status">${agendamento.statusAgendamento}<p>
                <div>
                
            `;

        lista.appendChild(caixaHorarios);
        }

    });

}

carregarMeusAgendamentos();

