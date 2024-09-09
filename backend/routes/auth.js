const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Clave secreta para firmar el JWT
const JWT_SECRET = 'mi_secreta';

// Ruta de registro
router.post('/register', async (req, res) => {
  const { nombre, email, clave, telefono, direccion } = req.body;

  // Validar que los campos no estén vacíos
  if (!nombre || !email || !clave) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario ya existe
  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la clave
    const hashedPassword = bcrypt.hashSync(clave, 10);

    // Asignar el rol de "Cliente" por defecto
    const idRol = 3; // Asumiendo que '3' es el rol de Cliente

    // Insertar el usuario en la base de datos
    db.query('INSERT INTO Usuarios (nombre, email, clave, telefono, direccion, idRol) VALUES (?, ?, ?, ?, ?, ?)', 
    [nombre, email, hashedPassword, telefono, direccion, idRol], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

// Ruta de login
router.post('/login', async (req, res) => {
  const { email, clave } = req.body;

  if (!email || !clave) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Verificar si el usuario existe
  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    const user = results[0];

    // Verificar la clave
    const isMatch = bcrypt.compareSync(clave, user.clave);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ idUsuario: user.idUsuario, idRol: user.idRol }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user: { idUsuario: user.idUsuario, nombre: user.nombre, idRol: user.idRol } });
  });
});

module.exports = router;