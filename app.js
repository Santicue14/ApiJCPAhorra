require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');  // Asegúrate de que la ruta sea correcta
const cookieParser = require('cookie-parser');
const GlobalUserRoutes = require('./src/routes/globaluser.routes');
const SoporteControllerRoutes = require('./src/routes/soporte.routes');
const NegociosRoutes = require('./src/routes/negocios.routes');
const ClientesRoutes = require('./src/routes/clientes.routes');
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Llamar modelos
// const Usuario = require('./src/entities/Usuario');
// const Cliente = require('./src/entities/Cliente');  

app.use('/auth',GlobalUserRoutes)
app.use('/support',SoporteControllerRoutes)
app.use('/negocios',NegociosRoutes)
app.use('/clientes',ClientesRoutes)
// Conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la BD exitosa');
  })
  .catch(error => {
    console.error('Error al conectar a la BD:', error);
  });

// Sincronizar los modelos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados');
  })
  .catch(error => {
    console.error('Error sincronizando los modelos:', error);
  });

app.listen(PORT, '0.0.0.0',() => {
  console.log('API cargada con éxito');
});
