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

INSERT INTO usuario (nome, email, senha) VALUES
('Well','Well.souza@sptech.school','12345678');

/*insert into aquario (descricao, fk_empresa) values ('Aquário de Estrela-do-mar', 1);
insert into aquario (descricao, fk_empresa) values ('Aquário de Peixe-dourado', 2);*/

select*from usuario;

-- QUIZ

-- Perfil SPECIAL
CREATE TABLE perfil_special (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT NOT NULL UNIQUE,  -- Cada usuario so pode ter um perfil
	strength INT NOT NULL,           -- S = Força (1-10)
	perception INT NOT NULL,         -- P = Percepção (1-10)
	endurance INT NOT NULL,          -- E = Resistência (1-10)
	charisma INT NOT NULL,           -- C = Carisma (1-10)
	intelligence INT NOT NULL,       -- I = Inteligência (1-10)
	agility INT NOT NULL,            -- A = Agilidade (1-10)
	luck INT NOT NULL,               -- L = Sorte (1-10)
	pontos_usados INT NOT NULL,      -- Total gasto (deve ser 33)
	data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

-- Perguntas
CREATE TABLE pergunta (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(500) NOT NULL,
	descricao VARCHAR(1000),
	tipo VARCHAR(50) NOT NULL DEFAULT 'multipla_escolha'
);

-- Opções de resposta
CREATE TABLE opcao (
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300) NOT NULL,
	fk_pergunta INT NOT NULL,
	-- Qual atributo é requerido para passar nessa opcao?
	atributo_requerido VARCHAR(20),  -- 'strength', 'perception', 'endurance', 'charisma', 'intelligence', 'agility', 'luck'
	pontos_necessarios INT NOT NULL DEFAULT 0,  -- Quantos pontos do atributo precisa para passar?
	FOREIGN KEY (fk_pergunta) REFERENCES pergunta(id)
);

-- Resultado
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

-- Inserir perguntas

-- INSERIR PERGUNTAS DE EXEMPLO
INSERT INTO pergunta (titulo, descricao, tipo) VALUES
('Você encontra um enigma antigo', 'Diante de uma porta antiga, você deve escolher como entrar...', 'multipla_escolha'),
('Uma negociação tensa', 'Um comerciante oferece um produto ilegal. Como você reage?', 'multipla_escolha'),
('Um salto perigoso', 'Você precisa atravessar um abismo. Qual é sua estratégia?', 'multipla_escolha');

-- PERGUNTA 1 (enigma)
INSERT INTO opcao (descricao, fk_pergunta, atributo_requerido, pontos_necessarios) VALUES
('Força bruta - quebrar a porta', 1, 'strength', 6),
('Observar e encontrar uma alavanca', 1, 'perception', 7),
('Usar conhecimento antigo para desvendar', 1, 'intelligence', 8),
('Tentar sorte e pedir ajuda aos deuses', 1, 'luck', 5);

-- PERGUNTA 2 (negociação)
INSERT INTO opcao (descricao, fk_pergunta, atributo_requerido, pontos_necessarios) VALUES
('Ameaçar violentamente', 2, 'strength', 7),
('Convencer com palavras', 2, 'charisma', 8),
('Enganar com promessas falsas', 2, 'intelligence', 6),
('Fingir interesse e sair de fininho', 2, 'agility', 7);

-- PERGUNTA 3 (salto)
INSERT INTO opcao (descricao, fk_pergunta, atributo_requerido, pontos_necessarios) VALUES
('Pular direto com força bruta', 3, 'strength', 8),
('Analisar a distância com precisão', 3, 'perception', 6),
('Usar corda e equipamento', 3, 'intelligence', 5),
('Pular com agilidade pura', 3, 'agility', 9),
('Confiar na sorte', 3, 'luck', 10);