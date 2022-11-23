b_usuarioDropDown.innerHTML = sessionStorage.NOME_USUARIO;

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}

function publicar() {
    // Luiz => A variável abaixo pega o idUsuario do SessionStorage
    var idUsuario = sessionStorage.ID_USUARIO;

    var corpo = {
        titulo: form_postagem.titulo.value,
        descricao: form_postagem.descricao.value,
        avaliacao: form_postagem.avaliacao.value
        // Luiz => Aqui é um objeto JSON que pega o título e descricão lá dos inputs
    }

    // Luiz => O método 'fetch' busca informação de alguma rota, fazendo uma requisição a ela
    // Luiz => Ir no src/routes/avisos.js ; que está sendo utilizada dentro de app.js
    // Luiz => o caminho é: Função JS chama fetch -> app.js -> routes/avisos.js -> dentro do routes/avisos.js o 'router' chama função chamando outra função 'publicar' dentro do avisoController e que passará valores de 'req' e 'res' -> controllers/avisoController.js -> os valores da vaiável 'corpo' criada aqui, é passada pelo 'req' para a função 'publicar' dentro da controllers/avisoController.js, onde são criadas novas variáveis isoladas para cada valor que veio da 'req' -> Caso não estiver com nenhuma variável 'undefined', chamará a função publicar model/avisoModel.js, que é quando será passado os valores de 'titulo', 'descricao' e 'idUsuario' -> model/avisoModel.js -> dentro da model/avisoModel.js tem uma função publicar que fará um 'insert into' com os valores passados nos parâmetros da própria função -> ao final dessa função terá um 'return' executando a instrução dentro do 'database' e o valor dessa excucção do 'return' será armazenado no 'res' que será retornado para controller/avisoController.js -> dentro da controller/avisoController.js e após passar pelo 'avisoModel.publicar()' entrará no método '.then' que pegará o 'res' do return passado e caso der tudo certo eu vou chorar muito de alegria e aívio, senão irá cair no método '.catch' retornando o que houve de erro
    fetch(`/avisos/publicar/${idUsuario}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        // Luiz => aqui fala para passar os valores que estão no objeto JSON 'corpo', declarado acima, para a requisição
        body: JSON.stringify(corpo)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!");
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

function editar(idAviso) {
    sessionStorage.ID_POSTAGEM_EDITANDO = idAviso;

    console.log("cliquei em editar - " + idAviso);
    window.alert("Você será redirecionado(a) à página de edição do aviso de id número: " + idAviso);

    window.location = "/dashboard/edicao-mensagem.html"
}

function atualizarFeed() {
    var idUsuario = sessionStorage.ID_USUARIO;
    //aguardar();
    fetch(`/avisos/listar/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";

                for (let i = resposta.length - 1; i>= 0; i--) {
                    var publicacao = resposta[i];

                    // Deixar a primeira letra da avaliação, que veio do BD, maiúscula
                    var avaliacaoMaiuscula = publicacao.avaliacao.charAt(0).toUpperCase() + publicacao.avaliacao.slice(1)

                    // criando e manipulando elementos do HTML via JavaScript
                    var divPublicacao = document.createElement("div");

                    // Luiz => Achar uma forma de pegar a data da sessão
                    var dataAviso = document.createElement("span");
                    var spanTitulo = document.createElement("span");
                    var spanNome = document.createElement("span");
                    var divDescricao = document.createElement("div");
                    var spanAvaliacao = document.createElement("span");
                    var divButtons = document.createElement("div");
                    var btnEditar = document.createElement("button");

                    // Luiz => Achar uma forma de pegar a data da sessão
                    dataAviso.innerHTML = "Data: <b> 19/11/2022 </b>";
                    spanTitulo.innerHTML = "Título: <b>" + publicacao.titulo + "</b>";
                    spanNome.innerHTML = "Autor: <b>" + publicacao.nome + "</b>";
                    divDescricao.innerHTML = "Descrição: <b>" + publicacao.descricao + "</b>";
                    spanAvaliacao.innerHTML = "Avaliação: <b>" + avaliacaoMaiuscula + "</b>";
                    btnEditar.innerHTML = "Editar";

                    divPublicacao.className = "publicacao";
                    spanTitulo.id = "inputNumero" + publicacao.idAviso;
                    spanNome.className = "publicacao-nome";
                    spanTitulo.className = "publicacao-titulo";
                    divDescricao.className = "publicacao-descricao";

                    divButtons.className = "div-buttons";

                    btnEditar.className = "publicacao-btn-editar";
                    btnEditar.id = "btnEditar" + publicacao.idAviso;
                    btnEditar.setAttribute("onclick", `editar(${publicacao.idAviso})`);

                    // Luiz => Achar uma forma de pegar a data da sessão
                    divPublicacao.appendChild(dataAviso);
                    divPublicacao.appendChild(spanNome);
                    divPublicacao.appendChild(spanTitulo);
                    divPublicacao.appendChild(divDescricao);
                    divPublicacao.appendChild(spanAvaliacao);
                    divPublicacao.appendChild(divButtons);
                    divButtons.appendChild(btnEditar);
                    feed.appendChild(divPublicacao);
                }

                finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}

function testar() {
    aguardar();

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_postagem")));

    var divResultado = document.getElementById("div_feed");

    divResultado.appendChild(document.createTextNode(formulario.get("descricao")));
    divResultado.innerHTML = formulario.get("descricao");

    finalizarAguardar();

    return false;
}