// Função para passar de relógios
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

var tempo = 1000; // quantidade de milisegundos
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
    
    // Função para habilitar drop down da Lista de apoio 
    var subMenuLista = document.getElementById("drop-subMenuLista")
    
    function mostrarListaApoio() {
        subMenuLista.style.display = "block";
    }

    // Função para habilitar drop down do Cronômetro
    var subMenuTemporizador = document.getElementById("subMenuTemporizador")
    
    function mostrarTemporizador() {
        subMenuTemporizador.classLista.toggle("open-menu-lista")
    }


    
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;
    
    
    let proximaAtualizacao;
        
    // window.onload = obterDadosGrafico(1);

    // verificar_autenticacao();