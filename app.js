/**
 * @file app.js
 * @description Configuración centralizada de la aplicación Express y middlewares de API.
 * @author Manuel Andrés Acosta Aguilera
 */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

// 1. Middlewares globales para API REST
app.use(cors());
app.use(morgan("dev"));     // Monitoreo de logs en la consola
app.use(express.json());    // Interpretación de payloads en formato JSON

// 2. Ruta raíz de bienvenida 
app.get('/', (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Bienvenido, conectado de manera exitosa a la API de Servicios Web SAIC",
        version: "1.0.0",
        author: "Manuel Andrés Acosta Aguilera"
    });
});

// 3. Inyección de Rutas Modulares de la API (Para Postman)
app.use('/api/auth', authRoutes);

// 4. Manejador global para endpoints inválidos (404 API)
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint no encontrado en los servicios web de SAIC." });
});

export default app;