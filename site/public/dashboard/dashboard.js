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

// Função para habilitar drop down do Dashboard
// function mostrarTemporizador() {
//     var styleId = document.getElementById("subMenuDashboard")
//     var styleAtualLista = styleId.style.display  
    
//     console.log(styleAtualLista);

//     if (styleAtualLista == "none") {
//         subMenuDashboard.style.display = "flex";
//     } else {
//         subMenuDashboard.style.display = "none";
//     }
// }


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

var tempo = 1000; // quantidade em milisegundos
var cronometro;

function iniciarCronometro() {
    cronometro = setInterval(timer, tempo);
}

function pausarCronometro() {
    clearInterval(cronometro)

    hora = 0;
    minuto = 0;
    segundo = 0;

    document.getElementById('counter_Cronometro').innerHTML = `00 : 00 : 00`;  
    
    // ENVIAR VALOR DO CRONÔMETRO PARA O BANCO DE DADOS
    // ABRIR TELA PARA MENSAGEM/AVALIAÇÃO
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


// Função para criar navbar dropdown
var subMenu = document.getElementById("subMenu")

function alternarMenu() {
    subMenu.classList.toggle("open-menu")
}

b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;


let proximaAtualizacao;
    
// window.onload = obterDadosGrafico(1);

// verificar_autenticacao();