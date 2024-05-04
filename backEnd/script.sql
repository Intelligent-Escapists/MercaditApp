CREATE DATABASE mercaditApp;
-- Descomentar la siguiente linea si el usuario no se ha creado
-- create user 'lab'@'localhost' identified by 'Developer123!'

GRANT ALL PRIVILEGES ON mercaditApp.* to 'lab'@'localhost' WITH GRANT OPTION;

USE mercaditApp;

CREATE TABLE usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT,
    correo VARCHAR(345) NOT NULL,
    password VARCHAR(64) NOT NULL,
    PRIMARY KEY (id_usuario),
    UNIQUE KEY correo (correo)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La contraseña es 123456
INSERT INTO usuario (correo,password) VALUES ('lolero12@gmail.com', '576438cfb04f7e49644ccb28c7a6d8215d874a92794a2c8b061724f8bfd031d3'); 
SELECT * FROM usuario;
