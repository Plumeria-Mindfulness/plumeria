-- Criação de banco de dados
create database Plumeria;

-- Selecionar o banco de dados 'Plumeria'
use Plumeria;

-- Criação de tabelas 
create table usuario (
    idUsuario int primary key auto_increment,
    nome varchar(45),
    sobrenome varchar(45),
    dtNascimento date,
    email varchar(50), 
        constraint chkEmail check (email like '%@%.%' and email not like '@%' and email not like '%.'), 
    senha varchar(20)
        -- Possibilidade de criar uma constraint que validará a senha do usuário
        -- constraint chkSenha check (senha like ('%!%' or '%"%' or '%#%'or '%$%'or '%%%' or '%&%' or "%'%" or '%(%' or '%)%' or '%*%' or '%+%' or '%,%' or '%-%' or '%.%' or '%/%' or '%:%' or '%;%' or '%<%' or '%=%' or '%>%' or '%?%' or '%@%' or '%[%' or '%\%' or '%]%' or '%^%' or '%_%' or '%`%' or '%{%' or '%|%' or '%}%' or '%~%') and ('%0%' or '%1%' or '%2%' or '%3%' or '%4%' or '%5%' or '%6%' or '%7%' or '%8%' or '%9%') and ('%a%' or '%b%' or '%c%' or '%d%' or '%e%' or '%f%' or '%g%' or '%h%' or '%i%' or '%j%' or '%k%' or '%l%' or '%m%' or '%n%' or '%o%' or '%p%' or '%q%' or '%r%' or '%s%' or '%t%' or '%u%' or '%v%' or '%w%' or '%x%' or '%y%' or '%z%') and ('%A%' or '%B%' or '%C%' or '%D%' or '%E%' or '%F%' or '%G%' or '%H%' or '%I%' or '%J%' or '%K%' or '%L%' or '%M%' or '%N%' or '%O%' or '%P%' or '%Q%' or '%R%' or '%S%' or '%T%' or '%U%' or '%V%' or '%W%' or '%X%' or '%Y%' or '%Z%'))
);

create table sessao (
    idSessao int primary key auto_increment,
    dtSessao date,
    duracao int, -- O dado da duração é transformado em minutos por uma função no JavaScript
    fkUsuario int, foreign key (fkUsuario) 
        references usuario(idUsuario)
);

create table mensagem (
    idMensagem int auto_increment,
    descricao varchar(1200),
    fkSessao int, foreign key (fkSessao) 
		references sessao(idSessao),
	fkUsuario int, foreign key (fkUsuario)
		references usuario(idUsuario),
        primary key (idMensagem, fkSessao, fkUsuario)
);

-- Exibir a descrição dos atributos de cada entidade
desc usuario;
desc sessao;
desc mensagem;

-- Inserção de dados nas tabelas 
insert into usuario values 
	-- (null, 'Luiz Nison', 'Filler', '2022-08-18', 'luiznison@gmail.com', '@Sptech2022'),
	(null, 'Giulia', null, '1998-01-15', 'giulia@hotmail.com', '123abcDEF@!');

insert into sessao values
	(null, '2022-10-28', '30', '1'),
	(null, '2022-11-01', '40', '1'),
	(null, '2022-11-01', '60', '1'),
	(null, '2022-10-30', '20', '2'),
	(null, '2022-10-31', '40', '2'),
	(null, '2022-11-01', '30', '2');

insert into mensagem values 
	(null, 'Sessão bem intensa, mas com certeza me ajudou bastante a digerir algumas coisas que já estavam há muito tempo por aqui.', 1, 1),
	(null, 'Hoje a sessão foi curta, mas bem profeitosa.', 2, 1),
	(null, 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 3, 1),
	(null, 'Espaço muito bom que consegui criar hoje para refletir sobre uma dificuldade no trabalho.', 3, 2),
	(null, 'Foi um pouco difícil de controlar a ansiedade hoje. Preciso conversa e levar isso à terapia.', 3, 2),
	(null, 'Ai... que momento bom e que experiência autocompassiva!', 3, 2);

-- Selecionar as tabelas isoladamente
select * from usuario;
select * from sessao;
select * from mensagem;

-- 
