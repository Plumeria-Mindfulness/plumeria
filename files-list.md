Files list

- Caminho WEB-DATA-VIZ => C:\Users\luizn\OneDrive\Luiz\Documentos\Visual Studio 2022\web-data-viz
- Caminho Plumeria => C:\Users\luizn\OneDrive\Área de Trabalho\plumeria

Added 
- .gitignore
- package.json

Update 
- cadastro.html 
    - Nova estrutura HTML 
    - Colada script JS
    - Alterada atribuição de valores às variáveis
    - ⛔ Criada novas variáveis:
        - sobrenomeVar
        - dtNascimentoVar
    - ⛔ Adicionado CSS de:
        - .alerta_erro
        - .card_erro
        - #mensagem_erro
    - ⛔ Add:
        - /site/package.json
        - /site/app.js
        - /site/src/controllers
        - /site/src/models
        - /site/src/routes
        - /site/src/database/config.js
    - Inserir novas inputs no método fetch("/usuarios/cadastrar" ...
    -  ⛔ No usuarioCrontroller.js:
        - Add variáveis na função function cadastrar(req, res):
            - var sobrenome = req.body.sobrenomeServer;
            - var dtNascimento = req.body.dtNascimentoServer;
        - Add validações if undefined
            - else if (sobrenome == undefined) 
            - else if (dtNascimento == undefined) 
        - Passe os valores como parâmetro e vá para o arquivo usuarioModel.js | Add sobrenome e dtNascimento na ordem correta
            -  usuarioModel.cadastrar(nome, sobrenome, dtNascimento, email, senha)
    - No usuarioModel.js
        - Coloque os parâmetros sobrenome e dtNascimento na:     
            - function cadastrar(nome, sobrenome, dtNascimento, email, senha)
        - Insira exatamente a query do banco na:
            - var instrucao = `INSERT INTO usuario (nome, sobrenome, dtNascimento, email, senha) VALUES ('${nome}', ${sobrenome}, ${dtNascimento}, '${email}', '${senha}');`


- LOGIN
    - 