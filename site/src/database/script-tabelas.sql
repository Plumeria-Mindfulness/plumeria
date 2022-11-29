-- Criação de banco de dados
create database Plumeria;

-- Selecionar o banco de dados 'Plumeria'
use Plumeria;

-- Mostrar tabelas 
show tables;

-- Criação de tabelas 
create table usuario (
    idUsuario int primary key auto_increment,
    nome varchar(45) not null,
    sobrenome varchar(45),
    dtNascimento date not null,
    email varchar(50) not null, 
        constraint chkEmail check (email like '%@%.%' and email not like '@%' and email not like '%.'), 
    senha varchar(256) not null
);

create table sessao (
    idSessao int auto_increment,
    dtSessao date not null,
    duracao int not null,
    fkUsuario int not null, constraint fkUsuarioSessao foreign key (fkUsuario) 
        references usuario(idUsuario),
	primary key (idSessao, fkUsuario)
);

create table mensagem (
    idMensagem int,
    titulo varchar(100),
    descricao varchar(1200),
    avaliacao varchar(10) not null, 
		constraint chkAvaliacao check (avaliacao = 'excelente' or avaliacao = 'muito bom' or avaliacao ='bom' or avaliacao ='ruim' or avaliacao ='muito ruim'),
    fkSessao int not null, constraint fkSessaoMensagem foreign key (fkSessao) 
		references sessao(idSessao),
	fkUsuario int not null, constraint fkUsuarioMensagem foreign key (fkUsuario)
		references usuario(idUsuario),
        primary key (idMensagem, fkSessao, fkUsuario)
);

-- Exibir a descrição dos atributos de cada entidade
desc usuario;
desc sessao;
desc mensagem;

-- Inserção de dados testes nas tabelas 
insert into usuario values 
	(null, 'Luiz Nison', 'Filler', '1999-08-18', 'luiznison.ac@gmail.com', '@Sptech2022'),
	(null, 'Giulia', null, '1998-01-15', 'giulia@hotmail.com', '123abcDEF@!');

insert into sessao values
	(1, '2022-10-31', 30, 1),
	(2, '2022-11-01', 40, 1),
	(3, '2022-11-01', 60, 1),
	(4, '2022-11-01', 65, 1),
	(5, '2022-11-02', 20, 1),
	(6, '2022-11-02', 35, 1),
	(7, '2022-11-03', 42, 1),
	(8, '2022-11-03', 15, 1),
	(9, '2022-11-04', 22, 1),
	(10, '2022-11-05', 75, 1),
	(1, '2022-10-30', 20, 2),
	(2, '2022-10-31', 40, 2),
	(3, '2022-11-01', 30, 2);

insert into mensagem values 
	(1, 'Um titulo 1', 'Sessão bem intensa, mas com certeza me ajudou bastante a digerir algumas coisas que já estavam há muito tempo por aqui.', 'muito bom', 1, 1),
	(2, 'Dois titulos 2', 'Hoje a sessão foi curta, mas bem profeitosa.', 'bom', 2, 1),
	(3, 'Três titulo 3', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'ruim', 3, 1),
	(4, 'Quatro titulo 4', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'muito ruim', 4, 1),
	(5, 'Um titulo 5', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'bom', 5, 1),
	(6, 'Titulo 6', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'excelente', 6, 1),
	(7, 'Titulo 7', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'muito bom', 7, 1),
	(8, 'Titulo 8', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'excelente', 8, 1),
	(9, 'Qualquer título 9', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'muito bom', 9, 1),
	(10, 'Titulo 10', 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'excelente', 10, 1),
	(1, '1 Titulo Giulia', 'Espaço muito bom que consegui criar hoje para refletir sobre uma dificuldade no trabalho.', 'muito bom', 1, 2),
	(2, '2 Titulo Giulia', 'Foi um pouco difícil de controlar a ansiedade hoje. Preciso conversa e levar isso à terapia.', 'muito ruim', 2, 2),
	(3, '3 Titulo Giulia', 'Ai... que momento bom e que experiência autocompassiva!', 'excelente', 3, 2);

-- Selecionar as tabelas isoladamente
select * from usuario;
select * from sessao;
select * from mensagem;

-- Selecionar todos os dados dos usuários e todas as sessões que eles realizaram
-- Foi utilizada a função COALESCE para retornar o primeiro valor que não é NULL no CONCAT realizado com nome e sobrenome
select concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
		u.dtNascimento as 'Data de Nascimento',
        u.email,
        u.senha,
        s.dtSessao as 'Data da sessão',
        s.duracao as 'Duração da sessão (em minutos)'
        from usuario as u
			join sessao as s on s.fkUsuario = u.idUsuario;

-- Selecionar os dados de um usuário específico junto aos dados de suas sessões e mensagens estando em ordem decrescente de acordo com a data da sessão
-- Foi utilizado a função UPPER e LOWER para, respectivamente, deixar a primeira letra maiúscula e as demais minúsculas utilizando a SUBSTRING para indicar que apenas a primeira letra da primeira palavra ficará maiúculas e a segunda palavra ficará totalmente minúscula.
select concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
		u.dtNascimento as 'Data de Nascimento',
        u.email,
        s.dtSessao as 'Data da sessão',
        s.duracao as 'Duração da sessão (em minutos)',
        m.descricao as 'Descrição da sessão',
        concat(upper(substring(m.avaliacao ,1,1)), lower(substring(m.avaliacao , 2))) as 'Avalição da sessão'
        from usuario as u
			join sessao as s on s.fkUsuario = u.idUsuario
				join mensagem as m on m.fkSessao = s.idSessao and m.fkUsuario = u.idUsuario
					where u.idUsuario = 1
						order by dtSessao desc;
                    
-- Selecionar o nome, idade, os dados das sessões e os dados das mensagens daquelas que apenas foram avaliadas como 'muito ruim'
select u.nome,
		timestampdiff(year, u.dtNascimento, curdate()) as idade,
        s.dtSessao,
        s.duracao,
        m.descricao,
        m.avaliacao
			from usuario as u
				join sessao as s on s.fkUsuario = u.idUsuario
					join mensagem as m on m.fkSessao = s.idSessao and m.fkUsuario = u.idUsuario
						where m.avaliacao = 'muito ruim';
                        
-- Somar a quantidade de sessões que um usuário realizou no geral
select u.nome,
		count(idSessao) as "Total de sessões"
			from usuario as u
				join sessao on fkUsuario = u.idUsuario
					group by u.nome;
                    
-- Indicar quais foram a duração máxima e mínima de sessões de um cliente específico e todos seus dados
select max(duracao) as 'Duração máxima (em minutos)',
		min(duracao) as 'Duração mínima  (em minutos)',
		s.dtSessao as 'Data da sessão',
        concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
        u.email as 'E-mail'
			from sessao as s 
				join usuario as u on s.fkUsuario = u.idUsuario
					group by u.nome;

-- Somar a duração de todas as sessões realizadas por cada cliente
select sum(duracao) as 'Soma da duração das sessões (em minutos)',
		s.dtSessao as 'Data da sessão',
        concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
        u.email
			from usuario as u
				join sessao as s on s.fkUsuario = u.idUsuario and idSessao
					group by nome;
                    
-- Fazer a média da duração de todas as sessões realizadas por todos os clientes
select round(avg(duracao), 2) as 'Média da duração das sessões (em minutos)',
		s.dtSessao as 'Data da sessão',
        concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
        u.email
			from usuario as u
				join sessao as s on s.fkUsuario = u.idUsuario
					group by u.nome;

-- Selecionar quais são as durações de sessão sem repetições e contar quantas durações não se repetem
select distinct duracao from sessao;
select count(distinct duracao) as 'Durações não repetidas' from sessao;

-- Selecionar quais foram as avaliações de sessões que são diferentes de 'excelente'
select distinct avaliacao from mensagem where avaliacao  <> 'excelente';

-- Calcular a idade dos usuários
-- Foi utilizada a função TIMESTAMPDIFF() para retornar um valor após uma operação de subtração entre o dado do atributo 'dtNascimento' com o CURDATE(), função essa que retorna a data atual
select concat('A pessoa ', nome, ' ', coalesce(`sobrenome`, ''), ' possui ', timestampdiff(year, dtNascimento, curdate()), ' anos.') as 'Nome e idade dos usuários' from usuario;