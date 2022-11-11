    // Função para criar navbar dropdown
    var subMenu = document.getElementById("subMenu")
    
    function alternarMenu() {
        subMenu.classList.toggle("open-menu")
    }
    
    var subMenuLista = document.getElementById("subMenuLista")
    
    function mostrarListaApoio() {
        subMenuLista.classLista.toggle("open-menu-lista")
    }
    
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;
    
    
    let proximaAtualizacao;
        
    window.onload = obterDadosGrafico(1);

    verificar_autenticacao();