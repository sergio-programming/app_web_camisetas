import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { userRoutes } from './routes/user.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { authRoutes } from './routes/auth.routes.js';

// Instancia de express
const app = express();

// Configuración de las variables de entorno
dotenv.config();

// Configuración de Middlewares
app.use(express.json()); // Permite el analisis de solicitudes en formato JSON
app.use(cors()); // Habilita CORS para permitir peticiones externas

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Conexión a la base de datos
connectDB();

// Configuración para levantar el servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});