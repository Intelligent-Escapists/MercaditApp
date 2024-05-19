
-- Descomentar la linea si no se ha creado la base de datos
-- CREATE DATABASE mercaditApp;

-- Descomentar la siguiente linea si el usuario no se ha creado
-- create user 'lab'@'localhost' identified by 'Developer123!'

GRANT ALL PRIVILEGES ON mercaditApp.* to 'lab'@'localhost' WITH GRANT OPTION;

USE mercaditApp;

DROP TABLE IF EXISTS tener;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS comentario;
DROP TABLE IF EXISTS calificacion;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS categorias_predefinidas;


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
	PRIMARY KEY(id_producto,id_usuario),
	FOREIGN KEY(id_producto) REFERENCES producto(id_producto) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

CREATE TABLE categorias_predefinidas (
    categoria_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50),
    INDEX idx_nombre_categoria (nombre_categoria)
);

select * from categorias_predefinidas;

INSERT INTO categorias_predefinidas (nombre_categoria) VALUES
('Ropa y Accesorios'),
('Electrónica'),
('Hogar y Jardín'),
('Belleza y Cuidado Personal'),
('Deportes y Aire Libre'),
('Libros y Medios'),
('Juguetes y Juegos'),
('Alimentos y Bebidas'),
('Salud y Bienestar'),
('Automóviles y Motocicletas');


CREATE TABLE categoria (
    id_producto INT,
    categoria VARCHAR(50),
    PRIMARY KEY (id_producto, categoria),
    FOREIGN KEY (id_producto) REFERENCES producto (id_producto) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_categoria
    FOREIGN KEY (categoria)
    REFERENCES categorias_predefinidas (nombre_categoria)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




-- Insertar usuarios de ejemplo
INSERT INTO usuario (nombre_usuario, correo, password, telefono, email_confirmado, esVendedor) 
VALUES 
('usuario1', 'usuario1@example.com', 'contraseña123', '123456789', TRUE, FALSE),
('usuario2', 'usuario2@example.com', 'contraseña456', '987654321', TRUE, TRUE);

SELECT * FROM usuario;

-- Insertar roles de ejemplo
INSERT INTO rol (id_usuario, id_rol) 
VALUES 
(1, 0),
(2, 1);

-- Insertar productos de ejemplo
INSERT INTO producto (id_usuario, nombre, descripcion, foto, no_stock, precio, calificacion) 
VALUES 
(1, 'Producto 1', 'Descripción del Producto 1', 'imagen1.jpg', 10, 25.99, 8),
(1, 'Producto 2', 'Descripción del Producto 2', 'imagen2.jpg', 5, 15.99, 7),
(2, 'Producto 3', 'Descripción del Producto 3', 'imagen3.jpg', 20, 10.50, 9);

-- Insertar calificaciones de ejemplo
INSERT INTO calificacion (id_producto, id_usuario, calificacion) 
VALUES 
(2, 2, 8);

-- Insertar comentarios de ejemplo
INSERT INTO comentario (id_producto, id_usuario, comentario) 
VALUES 
(1, 2, '¡Excelente producto!'),
(2, 1, 'Buen producto, pero podría mejorar en X aspecto.');

-- Insertar categorías de ejemplo
INSERT INTO categoria (id_producto, categoria) 
VALUES 
(1, 'Ropa y Accesorios'),
(1, 'Electrónica'),
(2, 'Alimentos y Bebidas'),
(3, 'Salud y Bienestar');

select * from producto where id_producto = 1;
select * from calificacion where id_producto =1;

select * from usuario;
UPDATE producto
SET calificacion = null
WHERE id_producto = 1;

select * from categoria where id_producto = 1;

