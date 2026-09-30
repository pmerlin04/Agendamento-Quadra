function obterHeaders(){
    return{
        'Content-Type': 'application/json'
    }
}

//SECTIONS DA PÁGINA
const mostrarPrincipal = document.getElementById('principal');
const mostrarCalendario = document.getElementById('agendamento');

//pega os valores da data que o usuario escolhe e os horários disponíveis
const inputData = document.getElementById('input-data');
const caixaHorarios = document.getElementById('caixa-horarios');

const inputDataPendente = document.getElementById('input-data-pendente');
const caixaHorariosPendentes = document.getElementById('caixa-horarios-pendentes');


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
                alert(`Você escolheu o dia ${data} às ${hora}!`);
                reservarHorario(hora);
            };

            caixaHorarios.appendChild(botao);
        });

    }catch(error){
        console.log("Erro na requisição: ", error);
    }
    
}


//Busca as horas no banco
async function buscarHorariosPendentes(data){
const API_URL_HORARIOS_PENDENTES = `https://localhost:7138/api/Agendamentos/HorariosPendentes?data=${data}&id=1`;

    try{

        const response = await fetch(API_URL_HORARIOS_PENDENTES, {
            method: 'GET',
            //'Content-Type': 'application/json'
            //body: JSON.stringify()
        });

        if(!response.ok){
            throw new Error(`Erro ao mostrar horarios`);
        }

        const horariosPendentes = await response.json();//PEGA O RESULTADO DO FETCH

        caixaHorariosPendentes.innerHTML = "";

        if(horariosPendentes.length === 0){
            console.log(data);
            console.log(horariosPendentes);
            caixaHorarios.innerHTML = "<p>Nenhum horário disponível para esse dia. </p>";
            return;
        }

        //o loop para desenhar os botões dos horários
        horariosPendentes.forEach(hora =>{

            const horaFormatada = formatarHorario(hora); 

            const botao = document.createElement('button');

            botao.innerText = horaFormatada; //escreve a hora, ex:08:00
            botao.className = 'btn-horario';

            botao.onclick = () => {
                alert(`Você escolheu o dia ${data} às ${hora}!`);
                //reservarHorario(hora);
            };

            caixaHorarios.appendChild(botao);
        });

    }catch(error){
        console.log("Erro na requisição: ", error);
    }
    
}


async function reservarHorario(dataReserva){
    const URL_API_RESERVAR_HORARIO = `https://localhost:7138/api/Agendamentos/ReservarAgendamento?data=${dataReserva}&id=1`;

    const valueDataReserva = inputData.value;

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




