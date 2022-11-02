-- OBSERVAÇÕES:
-- ? Não estou conseguindo realizar o seguinte SELECT: 'Selecionar o nome, idade, os dados das sessões e os dados das mensagem daquelas que apenas foram avaliadas como 'muito ruim''
-- ? Não estou conseguindo realizar o SELECT de "Selecionar apenas os usuários que tiveram uma média de duração de sessões maior que 100"
-- ? Não estou conseguindo realizar o SELECT de "Selecionar quais foram as avaliações de sessões que são diferentes de 'excelente'"
-- ! Possibilidade de criar uma constraint que validará a senha do usuário

-- Criação de banco de dados
create database Plumeria;

-- Selecionar o banco de dados 'Plumeria'
use Plumeria;

-- Criação de tabelas 
create table usuario (
    idUsuario int primary key auto_increment,
    nome varchar(45) not null,
    sobrenome varchar(45),
    dtNascimento date not null,
    email varchar(50) not null, 
        constraint chkEmail check (email like '%@%.%' and email not like '@%' and email not like '%.'), 
    senha varchar(20) not null
        -- Possibilidade de criar uma constraint que validará a senha do usuário
        -- constraint chkSenha check (senha like ('%!%' or '%"%' or '%#%'or '%$%'or '%%%' or '%&%' or "%'%" or '%(%' or '%)%' or '%*%' or '%+%' or '%,%' or '%-%' or '%.%' or '%/%' or '%:%' or '%;%' or '%<%' or '%=%' or '%>%' or '%?%' or '%@%' or '%[%' or '%\%' or '%]%' or '%^%' or '%_%' or '%`%' or '%{%' or '%|%' or '%}%' or '%~%') and ('%0%' or '%1%' or '%2%' or '%3%' or '%4%' or '%5%' or '%6%' or '%7%' or '%8%' or '%9%') and ('%a%' or '%b%' or '%c%' or '%d%' or '%e%' or '%f%' or '%g%' or '%h%' or '%i%' or '%j%' or '%k%' or '%l%' or '%m%' or '%n%' or '%o%' or '%p%' or '%q%' or '%r%' or '%s%' or '%t%' or '%u%' or '%v%' or '%w%' or '%x%' or '%y%' or '%z%') and ('%A%' or '%B%' or '%C%' or '%D%' or '%E%' or '%F%' or '%G%' or '%H%' or '%I%' or '%J%' or '%K%' or '%L%' or '%M%' or '%N%' or '%O%' or '%P%' or '%Q%' or '%R%' or '%S%' or '%T%' or '%U%' or '%V%' or '%W%' or '%X%' or '%Y%' or '%Z%'))
);

create table sessao (
    idSessao int auto_increment,
    dtSessao date not null,
    duracao int not null, -- O dado da duração é transformado em minutos por uma função no JavaScript
    fkUsuario int not null, constraint fkUsuarioSessao foreign key (fkUsuario) 
        references usuario(idUsuario),
	primary key (idSessao, fkUsuario)
);

create table mensagem (
    idMensagem int auto_increment,
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

-- Inserção de dados nas tabelas 
insert into usuario values 
	(null, 'Luiz Nison', 'Filler', '2022-08-18', 'luiznison@gmail.com', '@Sptech2022'),
	(null, 'Giulia', null, '1998-01-15', 'giulia@hotmail.com', '123abcDEF@!');

insert into sessao values
	(null, '2022-10-28', 30, 1),
	(null, '2022-11-01', 40, 1),
	(null, '2022-11-01', 60, 1),
	(null, '2022-10-30', 20, 2),
	(null, '2022-10-31', 40, 2),
	(null, '2022-11-01', 30, 2);

insert into mensagem values 
	(null, 'Sessão bem intensa, mas com certeza me ajudou bastante a digerir algumas coisas que já estavam há muito tempo por aqui.', 'muito bom', 1, 1),
	(null, 'Hoje a sessão foi curta, mas bem profeitosa.', 'bom', 2, 1),
	(null, 'Tentei ficar o mesmo tempo de hoje manhã e consegui ficar mais 20 minutos que me ajudaram bastante.', 'excelente', 3, 1),
	(null, 'Espaço muito bom que consegui criar hoje para refletir sobre uma dificuldade no trabalho.', 'muito bom', 1, 2),
	(null, 'Foi um pouco difícil de controlar a ansiedade hoje. Preciso conversa e levar isso à terapia.', 'muito ruim', 2, 2),
	(null, 'Ai... que momento bom e que experiência autocompassiva!', 'excelente', 3, 2);

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

-- Selecionar os dados de um usuário específico junto aos dados de suas sessões e mensagem estando em ordem decrescente de acordo com a data da sessão
-- Foi utilizado a função UPPER e LOWER para, respectivamente, deixar a primeira letra maiúscula e as demais minúsculas utilizando a SUBSTRING para indicar que apenas a primeira letra da primeira palavra ficará maiúculas e a segunda palavra ficará totalmente minúscula.
select concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
		u.dtNascimento as 'Data de Nascimento',
        u.email,
        s.dtSessao as 'Data da sessão',
        s.duracao as 'Duração da sessão (em minutos)',
        m.descricao as 'Descrição da sessão',
        concat(upper(substring(m.avaliacao ,1,1)), lower(substring(m.avaliacao , 2)))
        from usuario as u
			join sessao as s on s.fkUsuario = u.idUsuario
				join mensagem as m on m.fkSessao = s.idSessao and m.fkUsuario = u.idUsuario
					where u.idUsuario = 1
						order by dtSessao desc;
                    
-- Selecionar o nome, idade, os dados das sessões e os dados das mensagem daquelas que apenas foram avaliadas como 'muito ruim'
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

-- Conta a quantidade de sessões que um usuário realizou
select u.nome,
		count(idSessao) 
			from usuario as u
				join sessao on fkUsuario = u.idUsuario
					where idUsuario = 1;
                    
-- Indicar quais foram a duração máxima e mínima de sessões de um cliente específico e todos seus dados
select max(duracao) as 'Duração máxima (em minutos)',
		min(duracao) as 'Duração mínima  (em minutos)',
		s.dtSessao as 'Data da sessão',
        concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
        u.email
			from usuario as u
				join sessao as s on s.fkUsuario = u.idUsuario 
					where idUsuario = 1;
	
-- A MELHORAR | MUDAR PARA TODOS OS CLIENTES
-- Somar a duração de todas as sessões realizadas por todos os clientes
select sum(duracao) as 'Soma da duração das sessões (em minutos)',
		s.dtSessao as 'Data da sessão',
        concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
        u.email
			from usuario as u
				join sessao as s on s.fkUsuario = u.idUsuario 
					where idUsuario = 1;
                    
-- Fazer a média da duração de todas as sessões realizadas por todos os clientes
select round(avg(duracao), 2) as 'Média da duração das sessões (em minutos)',
		s.dtSessao as 'Data da sessão',
        concat (u.nome, ' ', coalesce(`sobrenome`, '')) as 'Nome e sobrenome do usuário',
        u.email
			from usuario as u
				join sessao as s on s.fkUsuario = u.idUsuario 
					where idUsuario = 1;

-- Selecionar apenas os usuários que tiveram uma média de duração de sessões maior que 100



				

-- Selecionar quais são as durações de sessão sem repetições e contar quantas durações não se repetem
select distinct duracao from sessao;
select count(distinct duracao) from sessao;

-- Selecionar quais foram as avaliações de sessões que são diferentes de 'excelente'




-- Calcular a idade dos usuários
-- Foi utilizada a função TIMESTAMPDIFF() para retornar um valor após uma operação de subtração entre o dado do atributo 'dtNascimento' com o CURDATE(), função essa que retorna a data atual
select concat('A pessoa ', nome, ' ', coalesce(`sobrenome`, ''), ' possui ', timestampdiff(year, dtNascimento, curdate()), ' anos.') as 'Nome e idade dos usuários' from usuario;
	