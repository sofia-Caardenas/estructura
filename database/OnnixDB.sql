DROP DATABASE IF EXISTS OnnixDB;
CREATE DATABASE OnnixDB;
USE OnnixDB;

-- Tabla de Roles
CREATE TABLE Roles (
    id_Rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    estado VARCHAR(10) NOT NULL
);

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    clave VARCHAR(32) NOT NULL,
    estado VARCHAR(10) NOT NULL,
    id_Rol INT,
    FOREIGN KEY (id_Rol) REFERENCES Roles(id_Rol) ON DELETE CASCADE
);

-- Tabla de Contacto
CREATE TABLE Contacto (
    id_Contacto INT AUTO_INCREMENT PRIMARY KEY,
    telefono1 VARCHAR(15) NOT NULL,
    telefono2 VARCHAR(15),
    direccion VARCHAR(100),
    estado VARCHAR(10) NOT NULL,
    id_Usuario INT,
    FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario) ON DELETE CASCADE
);

-- Tabla de Productos
CREATE TABLE Productos (
    id_Producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    fecha_Agregado DATE NOT NULL,
    ruta_Imagen VARCHAR(500),
    estado VARCHAR(10) NOT NULL
);

-- Tabla de Pedidos
CREATE TABLE Pedidos (
    id_Pedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha_Pedido DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    id_Usuario INT,
    FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario) ON DELETE CASCADE
);

-- Tabla de Detalles de Pedidos
CREATE TABLE Detalles_Pedidos (
    id_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    id_Pedido INT,
    id_Producto INT,
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id_Pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_Producto) REFERENCES Productos(id_Producto) ON DELETE CASCADE
);

-- Tabla de Registro de Pagos
CREATE TABLE Registro_Pagos (
    id_Pago INT AUTO_INCREMENT PRIMARY KEY,
    metodo_Pago VARCHAR(30) NOT NULL,
    fecha_Pago DATE NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    detalle_Registro VARCHAR(255),
    id_Pedido INT,
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id_Pedido) ON DELETE CASCADE
);

-- Tabla de Historial de Pedidos
CREATE TABLE Historial_Pedidos (
    id_Historial INT AUTO_INCREMENT PRIMARY KEY,
    fecha_Pedido DATE NOT NULL,
    estado VARCHAR(30) NOT NULL,
    id_Usuario INT NOT NULL,
    id_Pedido INT NOT NULL,
    FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_Pedido) REFERENCES Pedidos(id_Pedido) ON DELETE CASCADE
);

-- Insertar datos iniciales en Roles
INSERT INTO Roles (nombre, estado) VALUES
('Admin', 'Activo'),
('Empleado', 'Activo'),
('Cliente', 'Activo');

-- Insertar datos iniciales en Usuarios
INSERT INTO Usuarios (nombre, email, clave, id_Rol, estado) VALUES
('Juan Perez', 'juan.perez@example.com', MD5('password123'), 3, 'Activo'),
('Maria Gomez', 'maria.gomez@example.com', MD5('password123'), 3, 'Activo'),
('Pedro Martinez', 'pedro.martinez@example.com', MD5('password123'), 3, 'Activo'),
('Ana Rodriguez', 'ana.rodriguez@example.com', MD5('password123'), 3, 'Activo'),
('Carlos Sanchez', 'carlos.sanchez@example.com', MD5('password123'), 2, 'Activo');

-- Insertar datos iniciales en Contacto
INSERT INTO Contacto (id_Usuario, telefono1, telefono2, direccion, estado) VALUES
(1, '3001234567', NULL, 'Calle 123 #45-67', 'Activo'),
(2, '3102345678', NULL, 'Carrera 12 #34-56', 'Activo'),
(3, '3203456789', NULL, 'Avenida 45 #67-89', 'Activo'),
(4, '3304567890', NULL, 'Calle 56 #78-90', 'Activo'),
(5, '3405678901', NULL, 'Carrera 23 #45-67', 'Activo');

-- Insertar datos iniciales en Productos
INSERT INTO Productos (nombre, descripcion, precio, stock, fecha_Agregado, ruta_Imagen, estado) VALUES
('Café Premium', 'Café colombiano de alta calidad', 1500.00, 50, CURDATE(), 'ruta_imagen_1.jpg', 'Activo'),
('Tamal', 'Tamal colombiano', 7000.00, 50, CURDATE(), 'ruta_imagen_2.jpg', 'Activo'),
('Coca Cola', 'Coca Cola personal', 4000.00, 50, CURDATE(), 'ruta_imagen_3.jpg', 'Activo');

-- Insertar datos iniciales en Pedidos
INSERT INTO Pedidos (id_Usuario, estado, total) VALUES
(1, 'En Preparación', 35000.00),
(2, 'En Preparación', 18000.00),
(3, 'Listo para Recoger', 23000.00),
(4, 'Entregado', 25000.00),
(5, 'En Preparación', 12000.00);

-- Insertar datos iniciales en Detalles_Pedidos
INSERT INTO Detalles_Pedidos (id_Pedido, id_Producto, cantidad, precio, subtotal) VALUES
(1, 1, 2, 15000.00, 30000.00);

-- Insertar datos iniciales en Registro_Pagos
INSERT INTO Registro_Pagos (id_Pedido, metodo_Pago, monto, detalle_Registro) VALUES
(1, 'Tarjeta de Crédito', 35000.00, 'Pago realizado con tarjeta');

-- Insertar datos iniciales en Historial_Pedidos
INSERT INTO Historial_Pedidos (id_Usuario, id_Pedido, fecha_Pedido, estado) VALUES
(1, 1, '2024-10-01', 'Entregado');