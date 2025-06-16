-- Criação do banco
CREATE DATABASE IF NOT EXISTS registro_ponto;
USE registro_ponto;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matricula VARCHAR(20) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  perfil ENUM('admin', 'funcionario') NOT NULL
);

-- Inserindo usuários de teste
INSERT INTO usuarios (matricula, nome, senha, perfil) VALUES
('123456', 'Administrador', 'admin123', 'admin'),
('789012', 'Funcionário Teste', 'teste123', 'funcionario');

SELECT * FROM usuarios;

CREATE TABLE registros_ponto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  data DATE NOT NULL,
  entrada_manha TIME,
  saida_manha TIME,
  entrada_tarde TIME,
  saida_tarde TIME,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

ALTER TABLE registros_ponto
ADD UNIQUE(usuario_id, data);


