//SECTIONS DA PÁGINA
const mostrarPrincipal = document.getElementById('principal');
const mostrarCalendario = document.getElementById('agendamento');

//pega os valores da data que o usuario escolhe e os horários disponíveis
const inputData = document.getElementById('input-data');
const caixaHorarios = document.getElementById('caixa-horarios');


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
            formatarHorario(hora);
            const botao = document.createElement('button');
            botao.innerText = hora; //escreve a hora, ex:08:00
            botao.className = 'btn-horario';

            botao.onclick = () => {
                alert(`Você escolheu o dia ${data} às ${hora}!`);
            };

            caixaHorarios.appendChild(botao);
        });

    }catch(error){
        console.log("Erro na requisição: ", error);
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


    return `${horaInicioStr} às ${horaFimStr};`
}




