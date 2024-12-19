
const Usuario = require('../entities/Usuario')
const Cliente = require('../entities/Cliente')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const GlobalUserController = {
    login: async (req, res) => {
        const { email, password } = req.body;
    
        try {
          //buscar en la tabla `Cliente`
          const cliente = await Cliente.findOne({ where: { email } });
          
          if (cliente) {
            // Comparar la contraseña
            const isMatch = await bcrypt.compare(password, cliente.password);
            if (isMatch) {
              // Generar el token
              const token = jwt.sign({ id: cliente.id_cliente }, process.env.JWT_SECRET, {
                expiresIn: '1h',
              });
              res.cookie('token',{
                token,
                httpOnly: true,
                maxAge: 3600000
              })
              await cliente.update({fecha_ultimo_acceso: Date.now()})
              return res.json({ token, role: 'cliente', message: 'Login exitoso (Cliente)' });
            } else {
              return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
          }

          // Intentar encontrar el usuario en la tabla `Usuario`
          const usuario = await Usuario.findOne({ where: { email } });
    
          if (usuario) {
            // Comparar la contraseña
            const isMatch = await bcrypt.compare(password, usuario.password);
            if (isMatch) {
              // Generar el token
              const token = jwt.sign({ id: usuario.id_usuario, role: usuario.id_rol }, process.env.JWT_SECRET, {
                expiresIn: '1h',
              });
              res.cookie('token',{
                token,
                httpOnly: true,
                maxAge: 3600000
              })
              return res.json({ token, role: 'usuario', message: 'Login exitoso (Usuario)' });
            } else {
              return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
          }
          
          // Si no se encuentra el email en ninguna tabla
          return res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
          console.error('Error en login:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
        }
      },
    register: async (req, res) => {
        const {  email, password, ...otrosDatos } = req.body; // `tipo` indica si es cliente o usuario
      
        try {
          // Verificar si el email ya existe en `Usuario` o `Cliente`
          const usuarioExiste = await Usuario.findOne({where: {email}})
          const clienteExiste = await Cliente.findOne({where: {email}})
    
          if (usuarioExiste || clienteExiste) {
            return res.status(400).json({ error: 'El email ya está registrado' });
          }
    
          // Encriptar la contraseña
          const hashedPassword = await bcrypt.hash(password, 10);
    
  
            // Crear un nuevo cliente
            const nuevoCliente = await Cliente.create({
              email,
              password: hashedPassword,
              ...otrosDatos,
            });
            return res.status(201).json({ message: 'Cliente registrado con éxito', cliente: nuevoCliente });
          
        } catch (error) {
          console.error('Error en registro:', error);
          return res.status(500).json({ error: 'Error en el servidor' });
        }
      },
      logout: async (req,res)=>{
        try {
        
          if(req.user){
            res.clearCookie('token', {httpOnly: true})
            return res.status(200).json({message: 'Logout exitoso'})
          }else{
            return res.status(400).json({message: 'No estás logueado'})
          }
        } 
      
      catch (error) {
        
      }
      }
}

module.exports = {GlobalUserController}