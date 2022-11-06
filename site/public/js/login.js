function verificarSenha() {
    if (in_senha.type == "password") {
        in_senha.type = "text";
        img_olho.src = "assets/eye.png";
    } else {
        in_senha.type = "password";
        img_olho.src = "assets/hidden.png";
    }
}