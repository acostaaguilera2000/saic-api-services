/**
 * @file validator.js
 * @description Middleware nativo para la validación de payloads de autenticación.
 * @author Manuel Andrés Acosta Aguilera
 */

export const validateAuthPayload = (req, res, next) => {
    // Inicializamos un arreglo de errores en el objeto request para pasarlo al controlador
    req.validationErrors = [];

    const { email, password } = req.body;

    // 1. Validación de existencia de campos
    if (!email || !email.trim()) {
        req.validationErrors.push("El campo 'email' es obligatorio.");
    }
    if (!password || !password.trim()) {
        req.validationErrors.push("El campo 'password' es obligatorio.");
    }

    // 2. Validación de formato de correo electrónico (Regex estándar)
    if (email && email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            req.validationErrors.push("El formato del correo electrónico no es válido.");
        }
    }

    // Continua el ciclo hacia el controlador (él decidirá cómo responder si hay errores)
    next();
};