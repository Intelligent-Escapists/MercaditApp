-- Descomentar la linea si no se ha creado la base de datos
-- CREATE DATABASE mercaditApp;

-- Descomentar la siguiente linea si el usuario no se ha creado
-- create user 'lab'@'localhost' identified by 'Developer123!'

GRANT ALL PRIVILEGES ON mercaditApp.* to 'lab'@'localhost' WITH GRANT OPTION;

USE mercaditApp;

DROP TABLE IF EXISTS tener;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS comentario;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS calificacion;


CREATE TABLE usuario (
	id_usuario INT NOT NULL AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    correo VARCHAR(345) NOT NULL,
    password VARCHAR(64) NOT NULL,
    telefono VARCHAR(13) NOT NULL,
    email_confirmado BOOL DEFAULT FALSE,
    esVendedor BOOL DEFAULT FALSE,
    PRIMARY KEY(id_usuario),
    UNIQUE KEY(correo),
    UNIQUE KEY(nombre_usuario)

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


CREATE TABLE rol(
	id_usuario INT,
    id_rol TINYINT CHECK (id_rol IN (0,1)),
    PRIMARY KEY(id_rol,id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
    
) ENGINE=InnoDB COLLATE=utf8mb4_0900_ai_ci;

;
CREATE TABLE carrito(
	id_carrito INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id_carrito)
)ENGINE=InnoDB AUTO_INCREMENT=1;



CREATE TABLE producto(
	id_producto INT NOT NULL AUTO_INCREMENT,
    id_usuario INT,
    id_carrito INT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    foto TEXT NOT NULL,
    no_stock INT NOT NULL CHECK(no_stock > 0), 
    precio DECIMAL NOT NULL CHECK(precio > 0),
    calificacion TINYINT CHECK(calificacion BETWEEN 0 AND 10),
    id_compra INT,
    PRIMARY KEY(id_producto),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE ON UPDATE CASCADE 
    
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE calificacion(
	id_producto INT,
    id_usuario INT,
    calificacion TINYINT CHECK(calificacion BETWEEN 0 AND 10),
	PRIMARY KEY(id_producto,id_usuario,calificacion),
	FOREIGN KEY(id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE tener (
	id_usuario INT, 
    id_carrito INT,
	FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(id_carrito) REFERENCES carrito(id_carrito) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;



CREATE TABLE comentario (
	id_comentario INT NOT NULL AUTO_INCREMENT,
	id_producto INT,
    id_usuario INT,
    comentario TEXT NOT NULL,
    PRIMARY KEY(id_comentario,id_producto),
    FOREIGN KEY(id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
    
    
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 


CREATE TABLE categoria(
	id_producto INT,
    categoria VARCHAR(50),
    PRIMARY KEY(id_producto,categoria),
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
