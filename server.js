/**
 * @file server.js
 * @description Punto de entrada principal para inicializar la escucha de los servicios de la API.
 */
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` SAIC API SERVICES ONLINE (GA7-AA5)`);
    console.log(` Servidor levantado en: http://localhost:${PORT}`);
    console.log(`====================================================`);
});