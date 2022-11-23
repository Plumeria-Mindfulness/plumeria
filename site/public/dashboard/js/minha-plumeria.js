// Função para habilitar drop down da LISTA DE APOIO
function mostrarListaApoio() {
    var styleId = document.getElementById("drop_subMenuLista")
    var styleAtualLista = styleId.style.display  
    
    console.log(styleAtualLista);

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


// Função para TEMPORIZADOR



//  Função para CRÔNOMETRO
var hora = 0;
var minuto = 0;
var segundo = 0;

var tempo = 10; // quantidade em milisegundos
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

var totMinFinal = 0;
var dataString = '';

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

    //  Não sei se as variáveis desse objeto estão corretas, se vão puxar os valores da variável pausarCronometro()
    var corpo = {
        totMinFinal: totMinFinal,
        dataString: dataString
    }

    fetch(`/minhasPlumerias/publicarDuracaoData/${idUsuario}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(corpo)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Os dados da sua sessão foram armazenados com sucesso pelo usuario de ID: " + idUsuario + "!");
            window.location = "/dashboard/mural.html";
            limparFormulario();
            finalizarAguardar();
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;

}


// Função para criar navbar dropdown
var subMenu = document.getElementById("subMenu")

function alternarMenu() {
    subMenu.classList.toggle("open-menu")
}

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;


// let proximaAtualizacao;
    
// verificar_autenticacao();