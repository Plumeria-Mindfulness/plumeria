function alternarMenu() {
    subMenu.classList.toggle("open-menu")
}

function eventoNaoEditar() {
    alert(`Este campo não pode ser editado.`)
}

function editar() {
    fetch(`/avisos/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            descricao: textarea_descricao.value,
            avaliacao: avaliacao.value
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Post atualizado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            window.location = "/dashboard/apenas-mural.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}