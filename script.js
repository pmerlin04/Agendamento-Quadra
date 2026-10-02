//SECTIONS DA PÁGINA
const sectionPrincipal = document.getElementById('principal');
const sectionCalendario = document.getElementById('agendamento');
const sectionAgendamentosPendentes = document.getElementById('agendamentosPedentes');

//pega os valores da data que o usuario escolhe e os horários disponíveis
const inputData = document.getElementById('input-data');
const caixaHorarios = document.getElementById('caixa-horarios');

//pega os valores da data com horários pendentes para aprovação
const inputDataPendente = document.getElementById('input-data-pendente');
const caixaHorariosPendentes = document.getElementById('caixa-horarios-pendentes');
const btnBuscar = document.getElementById('btn-buscar-pendente');

function mostrarAgendamento(){
    sectionPrincipal.style.display = 'none';
    sectionCalendario.style.display = 'block';
    sectionAgendamentosPendentes.style.display = 'none';
}

function mostrarAgendamentosPendentes(){
    sectionCalendario.style.display = 'none';
    sectionAgendamentosPendentes.style.display = 'block';
    sectionPrincipal.style.display = 'none';
}



//function pra escolher a data com horarios disponiveis
inputData.addEventListener('change', (evento)=>{
    //pega o valor do inputData
    const dataEscolhida = evento.target.value;

    if(dataEscolhida){
        buscarHorariosLivres(dataEscolhida);
    }
});





//Busca as horas no banco
async function buscarHorariosLivres(data){
const API_URL_HORARIOS_DISPONIVEIS = `https://localhost:7138/api/Agendamentos/HorariosDisponiveis?data=${data}&id=1`;

    try{
        const response = await fetch(API_URL_HORARIOS_DISPONIVEIS, {
            method: 'GET',
            //'Content-Type': 'application/json'
            //body: JSON.stringify()
        });

        if(!response.ok){
            throw new Error(`Erro ao mostrar horarios`);
        }

        const horariosLivres = await response.json();//PEGA O RESULTADO DO FETCH

        caixaHorarios.innerHTML = "";

        if(horariosLivres.length === 0){
            console.log(data);
            console.log(horariosLivres);
            caixaHorarios.innerHTML = "<p>Nenhum horário disponível para esse dia. </p>";
            return;
        }

        //o loop para desenhar os botões dos horários
        horariosLivres.forEach(hora =>{

            const horaFormatada = formatarHorario(hora); 

            const botao = document.createElement('button');

            botao.innerText = horaFormatada; //escreve a hora, ex:08:00
            botao.className = 'btn-horario';

            botao.onclick = () => {
                alert(`Você escolheu o dia ${data} às ${hora}`);
                reservarHorario(hora);
            };

            caixaHorarios.appendChild(botao);
        });

    }catch(error){
        console.log("Erro na requisição: ", error);
    }
    
}


//Busca as horas no banco
async function buscarHorariosPendentes(){
    const API_URL_FINDALL = 'https://localhost:7138/api/Agendamentos';
    const lista = document.getElementById('container');
    lista.innerHTML = '';
    console.log(inputDataPendente.value)
    


    try{

        const response = await fetch(API_URL_FINDALL, {
            method: 'GET',
        });

        if(!response.ok){
            throw new Error(`Erro ao mostrar horarios`);
        }

        const horarios = await response.json();//PEGA O RESULTADO DO FETCH
        

        //caixaHorariosPendentes.innerHTML = "";

        if(horarios.length === 0){
            console.log(horarios);
            //caixaHorariosPendentes.innerHTML = "<p>Nenhum horário disponível para esse dia. </p>";
            return;
        }

        console.log(horarios[0].horarioInicio);

        //o loop para desenhar os botões dos horários
        horarios.forEach(hora =>{
            const itemHorarioPendente = document.createElement('div');
            itemHorarioPendente.classList.add('caixa-horarios-pendentes');
            //const horaFormatada = formatarHorario(hora); 
            
            const dataBanco = new Date(hora.horarioInicio);
            console.log(dataBanco.toISOString().split('T')[0]);

            //const dataFormatada = dataBanco.toString
            if(inputDataPendente.value === dataBanco.toISOString().split('T')[0] && hora.statusAgendamento === "Pendente"){

            itemHorarioPendente.innerHTML += `
                <div class="comeco-horario-pendente">
                    <p class="id-agendamento">${hora.idAgendamento}</p>
                    <p class="email-usuario">${hora.emailUsuario}</p>
                    <p class="id-quadra">${hora.idQuadra}</p>
                </div>

                <div class="meio-horario-pendente">
                    <p class="dia-semana">${hora.diaSemana}</p>
                    <p class="horario">${hora.horarioInicio} às ${hora.horarioFinal}</p>
                    <p class="status">${hora.statusAgendamento}</p>
                    <button class="btn-aprovar" onclick="aprovarHorario(${hora.idAgendamento})">Aprovar</button>
                </div>
            `;
            }else if(inputDataPendente.value < dataBanco.toISOString().split('T')[0]){
                itemHorarioPendente.style.display = 'none';
               //lista.innerHTML = "<p>Nenhum horário pendente para esse dia. </p>";
            }else{
                itemHorarioPendente.style.display = 'none';
                //lista.innerHTML = "<p>Nenhum horário pendente para esse dia. </p>";
            }



        

            /*
            itemHorarioPendente.onclick = () => {
                alert(`Você escolheu o dia ${dataPendente} às ${hora}!`);
                //reservarHorario(hora);
            };*/

            lista.appendChild(itemHorarioPendente);
        });

    }catch(error){
        console.log("Erro na requisição: ", error);
    }
    
}


async function reservarHorario(dataReserva){
    const URL_API_RESERVAR_HORARIO = `https://localhost:7138/api/Agendamentos/ReservarAgendamento?data=${dataReserva}&id=1`;

    const novoAgendamento = {
        emailUsuario: "pedromerlin2004@gmail.com",
        idQuadra: 1,
        diaSemana: "quarta",
        statusAgendamento: "Pendente"
    }

    try{
        const response = await fetch(URL_API_RESERVAR_HORARIO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(novoAgendamento)
        })

        if(!response.ok){
            throw new Error(`Erro ao mostrar horarios`);
        }

        const horaEscolhida = await response.json();//PEGA O RESULTADO DO FETCH
        alert(`Horario escolhido: ${horaEscolhida.horarioInicio}`)
    }
    catch(error){
        console.log("Erro ao reservar horário", error)
    }
}

async function aprovarHorario(idAgendamento){
    const URL_API_ATUALIZAR_AGENDAMENTO = `https://localhost:7138/api/Agendamentos/AtualizarAgendamento?id=${idAgendamento}`;

    const agendamentoAtualizado = {
        statusAgendamento: "Aprovado"
    }

    try{
        const response = await fetch(URL_API_ATUALIZAR_AGENDAMENTO, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendamentoAtualizado)
        });

        if(!response.ok){
            throw new Error(`Erro ao aprovar horário`);
        }

        const agendamentoAprovado = await response.json();
        alert(`Horário aprovado: ${agendamentoAprovado.horarioInicio}`);
    }
    catch(error){
        console.log("Erro ao aprovar horário", error)
    }
}





//formata a hora de 2026-09-30T12:00:00 para 12:00
function formatarHorario(dataIso){

    const dataInicio = new Date(dataIso);//pega o valor 2026-09-30T12:00:00

    //pega somente a hora de inicio: 12:00
    const horaInicioStr = dataInicio.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const datafim = new Date(dataInicio)//copia a dataInicio
    datafim.setHours(datafim.getHours() + 1);//adiciona 1 hora pra marcar o fim do agendamento

    //pega somente a hora do final: 13:00
    const horaFimStr = datafim.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });


    return `${horaInicioStr} às ${horaFimStr}`;
}




