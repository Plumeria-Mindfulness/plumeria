function verificarSenha() {
    if (in_redefineSenha.type == "password") {
        in_redefineSenha.type = "text";
        img_olhoRedefineSenha.src = "assets/eye.png";
    } else {
        in_redefineSenha.type = "password";
        img_olhoRedefineSenha.src = "assets/hidden.png";
    }
}

function verificarSenhaConfirmacao() {
    if (in_redefineConfirmSenha.type == "password") {
        in_redefineConfirmSenha.type = "text";
        img_redefineConfirmSenha.src = "assets/eye.png";
    } else {
        in_redefineConfirmSenha.type = "password";
        img_redefineConfirmSenha.src = "assets/hidden.png";
    }
}    

var emailRedefinicao
var antigaSenha
var novaSenha 
var novaConfirmSenha

function redefinirSenha() {
    var idUsuario = sessionStorage.ID_USUARIO;

    validarRedefinicao();

    setInterval(sumirMensagem, 3000);

    var corpo = {
        emailRedefinicao: emailRedefinicao,
        novaSenha: novaSenha
    }

    fetch(`/redefinicaoSenha/redefinirSenha/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(corpo)
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Sua senha foi redefinida com sucesso!");
            window.location = "login.html";
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

function validarRedefinicao() {
    msg_email.style.display = "none";
    msg_senha.style.display = "none";
    msg_confirmacaoSenha.style.display = "none";

    emailRedefinicao = in_emailRedefineSenha.value;
    novaSenha = in_redefineSenha.value;
    novaConfirmSenha = in_redefineConfirmSenha.value;

    var novaSenhaCorreta = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    var novaSenhaErrada = novaSenha.match(novaSenhaCorreta) == null;

    var confirmarNovaSenhaErrada = novaSenha != novaConfirmSenha;
    var campoNaoPreenchido = emailRedefinicao == "" || novaSenha == '' || novaConfirmSenha == ''

    if (novaSenhaErrada || confirmarNovaSenhaErrada || campoNaoPreenchido || novaSenhaErrada || confirmarNovaSenhaErrada) {
        if (campoNaoPreenchido) {

            if (emailRedefinicao == "") {
                msg_email.style.display = "block";
            }

            if (antigaSenha == "") {
                msg_antigaSenha.style.display = "block";
            }

            if (novaConfirmSenha == "") {
                msg_confirmacaoSenha.style.display = "block";
            }
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Preencha todos os campos para redefinir sua senha. <br><br> Tente novamente.";

            finalizarAguardar();
        }
        
        if (novaSenhaErrada) {
            msg_senha.style.display = "block";
        }

        if (confirmarNovaSenhaErrada) {
            msg_confirmacaoSenha.innerHTML = `Insira sua confirmação de senha corretamente. <br> As duas senhas têm que ser iguais!`;
            msg_confirmacaoSenha.style.display = "block";
        }

        finalizarAguardar();
    }
}

function sumirMensagem() {
    cardErro.style.display = "none"
}