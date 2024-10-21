DROP DATABASE IF EXISTS CAFSENA;
CREATE DATABASE CAFSENA;
USE CAFSENA;

CREATE TABLE Roles (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    estado VARCHAR(10) NOT NULL
);

CREATE TABLE Usuarios (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    clave CHAR(32) NOT NULL,
    idRol INT,
    estado VARCHAR(10) NOT NULL,
    FOREIGN KEY (idRol) REFERENCES Roles(idRol) ON DELETE CASCADE
);

CREATE TABLE Productos (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    fechaAgregado DATE DEFAULT CURDATE(),
    estado VARCHAR(10) NOT NULL
);

CREATE TABLE Pedidos (
    idPedido INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    fechaPedido DATE DEFAULT CURDATE(),
    estado VARCHAR(30) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE
);

CREATE TABLE DetallesPedidos (
    idDetalle INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT,
    idProducto INT,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) ON DELETE CASCADE
);

CREATE TABLE RegistroPagos (
    idPago INT AUTO_INCREMENT PRIMARY KEY,
    idPedido INT,
    metodoPago VARCHAR(30) NOT NULL,
    fechaPago DATE DEFAULT CURDATE(),
    monto DECIMAL(10, 2) NOT NULL,
    detalleRegistro VARCHAR(255),
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido) ON DELETE CASCADE
);

CREATE TABLE HistorialPedidos (
    idHistorial INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idPedido INT,
    fechaPedido DATE,
    estado VARCHAR(30) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedido) ON DELETE CASCADE
);

CREATE TABLE Contacto (
    idContacto INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    telefono1 VARCHAR(15),
    telefono2 VARCHAR(15),
    direccion VARCHAR(100),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario) ON DELETE CASCADE
);

INSERT INTO Roles (nombre, estado) VALUES
('Admin', 'Activo'),
('Empleado', 'Activo'),
('Cliente', 'Activo');

INSERT INTO Usuarios (nombre, email, clave, idRol, estado) VALUES
('Juan Perez', 'juan.perez@example.com', MD5('password123'), 3, 'Activo'),
('Maria Gomez', 'maria.gomez@example.com', MD5('password123'), 3, 'Activo'),
('Pedro Martinez', 'pedro.martinez@example.com', MD5('password123'), 3, 'Activo'),
('Ana Rodriguez', 'ana.rodriguez@example.com', MD5('password123'), 3, 'Activo'),
('Carlos Sanchez', 'carlos.sanchez@example.com', MD5('password123'), 2, 'Inactivo');

INSERT INTO Productos (nombre, descripcion, precio, stock, estado) VALUES
('Caf  Premium', 'Caf  colombiano de alta calidad', 15000.00, 50, 'Activo'),
('T  Verde', 'T  natural antioxidante', 8000.00, 30, 'Activo'),
('Galletas de Avena', 'Galletas caseras con avena y miel', 5000.00, 100, 'Activo'),
('Chocolate Caliente', 'Chocolate con leche', 12000.00, 25, 'Activo'),
('Jugo Natural', 'Jugo de frutas frescas', 6000.00, 40, 'Inactivo');

INSERT INTO Pedidos (idUsuario, estado, total) VALUES
(1, 'En Preparacion', 35000.00),
(2, 'En Preparacion', 18000.00),
(3, 'Listo para Recoger', 23000.00),
(4, 'Entregado', 25000.00),
(5, 'En Preparacion', 12000.00);

INSERT INTO DetallesPedidos (idPedido, idProducto, cantidad, precio, subtotal) VALUES
(1, 1, 2, 15000.00, 30000.00),
(1, 2, 1, 8000.00, 8000.00),
(2, 3, 3, 5000.00, 15000.00),
(3, 4, 1, 12000.00, 12000.00),
(4, 5, 2, 6000.00, 12000.00);

INSERT INTO RegistroPagos (idPedido, metodoPago, monto, detalleRegistro) VALUES
(1, 'Tarjeta de Credito', 35000.00, 'Pago realizado con tarjeta'),
(2, 'Efectivo', 18000.00, 'Pago en tienda'),
(3, 'Pago Movil', 23000.00, 'Pago desde app m vil'),
(4, 'Tarjeta de Debito', 25000.00, 'Pago con d bito'),
(5, 'Efectivo', 12000.00, 'Pago en tienda');

INSERT INTO HistorialPedidos (idUsuario, idPedido, fechaPedido, estado) VALUES
(1, 1, '2024-10-01', 'Entregado'),
(2, 2, '2024-10-02', 'Listo para Recoger'),
(3, 3, '2024-10-03', 'En Preparacion'),
(4, 4, '2024-10-04', 'En Preparacion'),
(5, 5, '2024-10-05', 'Entregado');

INSERT INTO Contacto (idUsuario, telefono1, telefono2, direccion) VALUES
(1, '3001234567', NULL, 'Calle 123 #45-67'),
(2, '3102345678', NULL, 'Carrera 12 #34-56'),
(3, '3203456789', NULL, 'Avenida 45 #67-89'),
(4, '3304567890', NULL, 'Calle 56 #78-90'),
(5, '3405678901', NULL, 'Carrera 23 #45-67');
