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

function cadastrar() {
    aguardar();

    msg_email.style.display = "none";
    msg_senha.style.display = "none";
    msg_confirmacaoSenha.style.display = "none";

    // Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = in_nome.value;
    var sobrenomeVar = in_sobrenome.value;
    var dtNascimentoVar = in_dtNascimento.value;
    var emailVar = in_email.value;
    var senhaVar = in_senha.value;
    var confirmacaoSenhaVar = in_confirmacaoSenha.value;

    /* 
    Validação das regras para senha
    As duas variáveis abaixo servem para verificar se a string, respectivamente do e-mail e da senha contêm:
    caracteres antes e depois do '@' e depois um ponto final '.' que é precedido e sucedido por mais caracteres; 
    e ter no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 8 caracteres e no máximo 20
    */
    var emailCorreto = /\S+@\S+\.\S+/;
    var senhaCorreta = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

    // A função ".test()" serve para testar por um correspondência de caracteres da expressão supracitada para emailCorreto, deixando a = a "true"
    // A função ".match()" serve para pesquisar na string a expressão supracitada para senhaCorreta
    var emailErrado = emailCorreto.test(emailVar) == false;
    var senhaErrada = senhaVar.match(senhaCorreta) == null;

    // Variável para confirmar se a senha digitada é igual a senha de confirmação
    var confirmarSenhaErrada = senhaVar != confirmacaoSenhaVar;

    //  Variável booleana para saber se o campo ainda não foi preenchido/está vazio 
    var campoNaoPreenchido = nomeVar == "" || sobrenomeVar == "" || dtNascimentoVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "";

    if (emailErrado || senhaErrada || confirmarSenhaErrada || campoNaoPreenchido) {
        if (emailErrado) {
            msg_email.style.display = "block";
        }
        
        if (senhaErrada) {
            msg_senha.style.display = "block";
        }

        if (confirmarSenhaErrada) {
            msg_confirmacaoSenha.innerHTML = `Insira sua confirmação de senha corretamente. <br>As duas senhas têm que ser iguais!`;
            msg_confirmacaoSenha.style.display = "block";
        }
    
        if (campoNaoPreenchido) {
            if (nomeVar == "") {
                msg_nome.style.display = "block";
            } 
            
            if (sobrenomeVar == "") {
                msg_sobrenome.style.display = "block";
            } 
            
            if (dtNascimentoVar == "") {
                msg_dtNascimento.style.display = "block";
            }

            if (confirmacaoSenhaVar == "") {
                msg_confirmacaoSenha.style.display = "block";
            }
        
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Precisamos de todos os seus dados. <br><br> Tente novamente completando todo o formulário.";

            finalizarAguardar();
            return false;    
        }
        finalizarAguardar();
    } else {
        setInterval(sumirMensagem, 3000);
    
        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                sobrenomeServer: sobrenomeVar,
                dtNascimentoServer: dtNascimentoVar, 
                emailServer: emailVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000")
                
                limparFormulario();
                finalizarAguardar();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

        return false;
    }
}  

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}

function sumirMensagem() {
    cardErro.style.display = "none"
}