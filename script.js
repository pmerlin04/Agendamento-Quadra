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

const API_URL_HORARIOS_DISPONIVEIS = 'https://localhost:7138/api/Agendamentos/HorariosDisponíveis?data=2026-09-30&id=1';

//Busca as horas no banco
async function buscarHorariosLivres(data){
    try{

    const horariosAPI = await fetch("https://localhost:7138/api/Agendamentos/HorariosDisponíveis?data="+data+"&id=1", {
        method: 'GET',
        //body: JSON.stringify()
    })

    if(!horariosAPI.ok){
        throw new Error(`Erro ao mostrar horarios`);
    }
    }catch(error){
        console.log("Erro na requisição: ", error);
    }



    caixaHorarios.innerHTML = "";

    if(horariosAPI.length === 0){
        caixaHorarios.innerHTML = "<p>Nenhum horário disponível para esse dia. </p>";
        return;
    }

    //o loop para desenhar os botões dos horários
    horariosAPI.forEach(hora =>{
        const botao = document.createElement('button');
        botao.innerText = hora; //escreve a hora, ex:08:00
        botao.className = 'btn-horario';

        botao.onclick = () => {
            alert(`Você escolheu o dia ${data} às ${hora}!`);
        };

        caixaHorarios.appendChild(botao);
    });
    
}




