b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;

// Função para criar navbar dropdown
var subMenu = document.getElementById("subMenu")

function alternarMenu() {
    subMenu.classList.toggle("open-menu")
}

// Função para habilitar drop down da LISTA DE APOIO
function mostrarListaApoio() {
    var styleId = document.getElementById("drop_subMenuLista")
    var styleAtualLista = styleId.style.display  

    if (styleAtualLista == "none") {
        drop_subMenuLista.style.display = "flex";
    } else {
        drop_subMenuLista.style.display = "none";
    }
}

// Função para habilitar drop down do TEMPORIZADOR
function mostrarTemporizador() {
    var styleId = document.getElementById("subMenuTemporizador")
    var styleAtualLista = styleId.style.display  
    
    console.log(styleAtualLista);

    if (styleAtualLista == "none") {
        subMenuTemporizador.style.display = "flex";
    } else {
        subMenuTemporizador.style.display = "none";
    }
}

// Funções para passar de relógios
function passarRelogioCronometro() {
    subMenuCronometro.style.display = "flex";
    subMenuTemporizador.style.display = "none";
}

function passarRelogioTemporizador() {
    subMenuCronometro.style.display = "none";
    subMenuTemporizador.style.display = "flex";
}

// Funções para passar Bubble e Lava Lamp
function passarBubbleLamp() {
    containerBubbles.style.display = "none";
    containerLavaLamp.style.display = "flex";
}

function passarLampBubble() {
    containerBubbles.style.display = "flex";
    containerLavaLamp.style.display = "none";
}

// Função para sortear cor para Lava Lamp
function sortearCorLavaLamp() {
    
    var cores = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D','#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC','#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399','#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933','#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    var blobLava = document.getElementsByClassName("blob");
    
    var corSorteada = cores[Math.floor(cores.length * Math.random())];

    for (var i = 0; i < blobLava.length; i++) {
        blobLava[i].style.backgroundColor = corSorteada;
    };
}

// Função para sortear cor para Bubble
function sortearCorBubble() {
    
    var cores = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D','#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC','#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399','#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933','#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

    var bubble =  document.querySelector(':root');

    var corSorteada = cores[Math.floor(cores.length * Math.random())];
    
    bubble.style.setProperty('--blob', corSorteada);
}


// Funções para TEMPORIZADOR
var soundStart = new Audio('../assets/audios/audio-start.mp3');
var soundEnd = new Audio('../assets/audios/audio-end.mp3');
var totMiliTemp = 0;
var totMinFinal = 0;
var dataString = '';


function iniciarTemporizador() {
    soundStart.play();

    var tempoInput = in_temporizador.value;
    console.log(`Tempo retirado do input: ${tempoInput}`);

    var tempoManipulado = tempoInput.split(':');

    console.log(`O tempo manipulado é: ${tempoManipulado}`);

    var horaTemp = tempoManipulado[0];
    console.log(`A hora é: ${horaTemp}`);

    var minutoTemp = tempoManipulado[1];
    console.log(`O minuto é: ${minutoTemp}`);

    // Convertendo a hora e minuto em milisegundos para facilitar a contagem 
    var horaParaMili = horaTemp * 3600000;
    var minutoParaMili = minutoTemp * 60000;

    totMiliTemp = horaParaMili + minutoParaMili;
    console.log(`O total que deseja em milisegundos é: ${totMiliTemp}`);

    // Capturando a data e horário atuais do usuário
    //  Depois, esse horário será somado aos milisegundos calculado acima, com isso, tendo o horário final que o cliente deseja para a sessão, tendo a deadline
    // Após isso, fazer a subtração da deadline com o horário atual
    var dataAtual = new Date();
    var horaAtual = dataAtual.getHours();
    var minutoAtual = dataAtual.getMinutes();

    console.log(horaAtual);
    console.log(minutoAtual);


    // Somando a deadline à somatória em milisegundos do que o usuário inseriu na input
    var deadline = new Date().getTime() + totMiliTemp;

    var intervaloTemp = setInterval(function () {

        var tempoAtualTemp = new Date().getTime();
        var tempoFinalTemp = deadline - tempoAtualTemp;
        var horasTemp = Math.floor((tempoFinalTemp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutosTemp = Math.floor((tempoFinalTemp % (1000 * 60 * 60)) / (1000 * 60));
        var segundosTemp = Math.floor((tempoFinalTemp % (1000 * 60)) / 1000);

        var formatHoraTemp = (horasTemp < 10 ? '0' + horasTemp : horasTemp);
        var formtMinutoTemp = (minutosTemp < 10 ? '0' + minutosTemp : minutosTemp);
        var formatSegundoTemp = (segundosTemp < 10 ? '0' + segundosTemp : segundosTemp);
    
        document.getElementById('horasTemp').innerHTML = formatHoraTemp;
        document.getElementById('minutosTemp').innerHTML = formtMinutoTemp;
        document.getElementById('segundosTemp').innerHTML = formatSegundoTemp;

        if (tempoFinalTemp < 0) {
            soundEnd.play();
            
            pausarTemporizador();

            clearInterval(intervaloTemp);

            document.getElementById("horasTemp").innerHTML = '00';
            document.getElementById("minutosTemp").innerHTML = '00';
            document.getElementById("segundosTemp").innerHTML = '00';
        }
    }, 1000);
}

function pausarTemporizador(totMinFinal, dataString) {
    soundEnd.play();
    
    var horaFinalTemp = document.getElementById('horasTemp').innerHTML;
    var minutoFinalTemp = document.getElementById('minutosTemp').innerHTML;
    var segundoFinalTemp = document.getElementById('segundosTemp').innerHTML;

    console.log(horaFinalTemp);
    console.log(minutoFinalTemp);
    console.log(segundoFinalTemp);

    var horaFinalMili = Number(horaFinalTemp) * 3600000;
    var minutoFinalMili = Number(minutoFinalTemp) * 60000;
    var segundoFinalMili = Number(minutoFinalTemp) * 1000;

    var totFinalMili = horaFinalMili + minutoFinalMili + segundoFinalMili;
    console.log(`Total final de mili é: ${totFinalMili}`);

    var restoMili = totMiliTemp - totFinalMili;
    totMinFinal = restoMili / 60000;
    console.log(`Resto em mili do quanto ficou na sessão: ${restoMili} \n Resto em minutos: ${totMinFinal}`);
    
    var dataSessao = new Date();
    dataString = new Date(dataSessao.getTime() - (dataSessao.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];    

    console.log(' | Dia da sessão é: ' + dataString);


    publicarDuracaoDataTemp(totMinFinal, dataString);
}

function publicarDuracaoDataTemp(totMinFinal, dataString) {
    var idUsuario = sessionStorage.ID_USUARIO;

    var corpo = {
        totMinFinal: totMinFinal,
        dataString: dataString
    }

    fetch(`/minhasPlumerias/publicarDuracaoDataTemp/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(corpo)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Os dados da sua sessão foram armazenados com sucesso!");
            window.location = "/dashboard/mural.html";
            limparFormulario();
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;

}

// Funções para CRÔNOMETRO
var hora = 0;
var minuto = 0;
var segundo = 0;

var tempo = 1000; // quantidade em milisegundos
var cronometro;

function iniciarCronometro() {
    cronometro = setInterval(timer, tempo);
}

function timer() {

    segundo++;

    if (segundo == 60) {
        segundo = 0;
        minuto++;
    
        if (minuto == 60) {
            minuto = 0;
            hora++;
        }
    }

    var format = (hora < 10 ? '0' + hora : hora) + ' : ' + (minuto < 10 ? '0' + minuto : minuto) + ' : ' +  (segundo < 10 ? '0' + segundo : segundo)

    document.getElementById('counter_Cronometro').innerHTML = format;
}

// var totMinFinal = 0;
// var dataString = '';

function pausarCronometro(totMinFinal, dataString) {
    // 1- Atribuindo elemento HTML do cronômentro à uma variável
    // 2- Pegando o valor que está nessa variável/tag HTML
    // 3- Utilizando '.split()' para separar e deixar num array o tempo final com três posições 0, 1, 2 (h, min, s) | Essa função retorna os dados num array que será acessado no próximo passo 
    var valorCounter = document.getElementById('counter_Cronometro');
    var tempoFinalTela = valorCounter.innerHTML;
    if (tempoFinalTela !== '00 : 00 : 00') {
        var tempoFinal = tempoFinalTela.split(':');
        
        // Capturando do array do tempo final e atribuindo à hora, minuto e segundo
        var horaFinal = Number(tempoFinal[0]);
        var minutoFinal = Number(tempoFinal[1]);
        var segundoFinal = Number(tempoFinal[2]);
        
        // 1 & 2- Fazendo a conversão de horas e segundos para minutos, pois o total enviado ao banco de dados e plotado nos gráficos será em minutos
        // 3- Fazendo a somatória em segundos
        var horaParaMin = horaFinal * 60;
        var segundoParaMin = segundoFinal / 60;
        totMinFinal = segundoParaMin + minutoFinal + horaParaMin;
        
        console.log(' | Hora Final é: ' + horaFinal + ' \n | Minuto Final é: ' + minutoFinal + ' \n | Segundo final é: ' + segundoFinal + ' \n | Total em minutos é: ' + totMinFinal);
    
        // 1- Capturando a data atual na máquina do cliente
        // 2- Transformando em string retirando os outro elementos como, por exemplo, dia da semana, horário, timezone   
        var dataSessao = new Date();
        dataString = new Date(dataSessao.getTime() - (dataSessao.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];    
    
        console.log(' | Dia da sessão é: ' + dataString);
        
        publicarDuracaoData(totMinFinal, dataString);
    
        // Abaixo, o intervalo do cronômentro, as variáveis de hora, minuto, segundo, bem como o valor dentro do elemento HTML são zerados
        clearInterval(cronometro);
    
        hora = 0;
        minuto = 0;
        segundo = 0;
    
        document.getElementById('counter_Cronometro').innerHTML = `00 : 00 : 00`;          
    }    
}

function publicarDuracaoData(totMinFinal, dataString) {
    var idUsuario = sessionStorage.ID_USUARIO;

    var corpo = {
        totMinFinal: totMinFinal,
        dataString: dataString
    }

    fetch(`/minhasPlumerias/publicarDuracaoData/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(corpo)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Os dados da sua sessão foram armazenados com sucesso!");
            window.location = "/dashboard/mural.html";
            limparFormulario();
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;

}