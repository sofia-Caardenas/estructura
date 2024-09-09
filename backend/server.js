const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
