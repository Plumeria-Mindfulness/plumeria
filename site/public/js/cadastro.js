// Função para verificação de senha | Presente na página de Login e de Cadastro
function verificarSenha() {
    if (in_senha.type == "password") {
        in_senha.type = "text";
        img_olhoSenha.src = "assets/eye.png";
    } else {
        in_senha.type = "password";
        img_olhoSenha.src = "assets/hidden.png";
    }
}

function verificarSenhaConfirmacao() {
    if (in_confirmacaoSenha.type == "password") {
        in_confirmacaoSenha.type = "text";
        img_olhoConfirm.src = "assets/eye.png";
    } else {
        in_confirmacaoSenha.type = "password";
        img_olhoConfirm.src = "assets/hidden.png";
    }
}