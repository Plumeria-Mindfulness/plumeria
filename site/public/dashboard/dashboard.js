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