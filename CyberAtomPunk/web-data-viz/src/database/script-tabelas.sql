-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE cyberAtom;

USE cyberAtom;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) not null,
	email VARCHAR(50) not null,
	senha VARCHAR(50) not null
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE perfil_special (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT NOT NULL UNIQUE,  -- Cada usuario so pode ter um perfil
	strength INT NOT NULL,           -- (1-10)
	perception INT NOT NULL,         -- (1-10)
	endurance INT NOT NULL,          -- (1-10)
	charisma INT NOT NULL,           -- (1-10)
	intelligence INT NOT NULL,       -- (1-10)
	agility INT NOT NULL,            -- (1-10)
	luck INT NOT NULL,               -- (1-10)
	pontos_usados INT NOT NULL,      -- = 40
	data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE pergunta (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(500) NOT NULL,
	descricao VARCHAR(1000),
	tipo VARCHAR(50) NOT NULL DEFAULT 'multipla_escolha'
);

CREATE TABLE opcao (
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300) NOT NULL,
	fk_pergunta INT NOT NULL,
	-- Qual atributo é requerido para passar nessa opcao?
	atributo_requerido VARCHAR(20),  -- 'strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'
	pontos_necessarios INT NOT NULL DEFAULT 0,  -- Quantos pontos do atributo precisa para passar?
	FOREIGN KEY (fk_pergunta) REFERENCES pergunta(id)
);

CREATE TABLE resultado_quiz (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT NOT NULL,
	fk_pergunta INT NOT NULL,
	fk_opcao INT NOT NULL,
	passou TINYINT NOT NULL,-- 1 = passou, 0 = não passou
	data_realizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
	FOREIGN KEY (fk_pergunta) REFERENCES pergunta(id),
	FOREIGN KEY (fk_opcao) REFERENCES opcao(id)
);

INSERT INTO pergunta (titulo, descricao, tipo) VALUES
('Você decide finalmente sair da sua VAULT mas seu supervisor não libera... E agora?', 'Chegou sua hora de sair! Mas não lhe concedem liberdade...', 'multipla_escolha'),
('Você encontra um ser desfigurado lhe encarando, ele segura uma arma e te olha bem torto... O que fazer?', 'Um homem desfigurado não foi com sua cara... Será que você vai com a dele?', 'multipla_escolha'),
('Chegando em uma cidade, não há mais pessoas, e sim monstros gigantes e horriveis! E agora?!', 'Você percebe porque o seu supervisor não deixou você sair, mas agora é tarde. E agora?', 'multipla_escolha');

INSERT INTO opcao (descricao, fk_pergunta, atributo_requerido, pontos_necessarios) VALUES
('Arrebentar ele na porrada e roubar as chaves', 1, 'strength', 6),
('Achar uma brecha na instalação para sair', 1, 'perception', 7),
('Hackear o terminal e abrir a porta', 1, 'intelligence', 8),
('Procurar a chave de baixo do tapete', 1, 'luck', 5);

INSERT INTO opcao (descricao, fk_pergunta, atributo_requerido, pontos_necessarios) VALUES
('Se certificar que ele fique desfigurado', 2, 'strength', 7),
('Conversar de forma pacifica e amigavel', 2, 'charisma', 8),
('Enganar com informações falsas', 2, 'intelligence', 6),
('Correr o mais rápido que puder!', 2, 'agility', 7);

INSERT INTO opcao (descricao, fk_pergunta, atributo_requerido, pontos_necessarios) VALUES
('Meter a porrada neles!!!', 3, 'strength', 10),
('Encontrar uma arma para se defender', 3, 'perception', 6),
('Dar meia volta', 3, 'intelligence', 5),
('Assusta-los com seu tamanho', 3, 'endurance', 8),
('Tentar a sorte e pedir ajuda aos deuses', 3, 'luck', 10);

select * from usuario;
truncate table usuario;
select * from perfil_special;
truncate table perfil_special;
select * from pergunta;
truncate table pergunta;
select * from opcao;
truncate table opcao;
SET FOREIGN_KEY_CHECKS = 0;



/*create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);*/

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

/*create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);*/

/*insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);*/