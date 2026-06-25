/**
 * @file authController.js
 * @description Controlador con validación previa procesada por el middleware.
 */
import bcrypt from 'bcrypt';

const usersDatabase = [];

export const registerUser = async (req, res) => {
    try {
        //  Verificando si el middleware capturó errores previos
        if (req.validationErrors && req.validationErrors.length > 0) {
            return res.status(400).json({ errors: req.validationErrors });
        }

        const { email, password } = req.body;

        // Verificar unicidad
        const userExists = usersDatabase.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ error: "El correo electrónico ya se encuentra registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        usersDatabase.push({ email, password: hashedPassword });

        return res.status(201).json({
            message: "Usuario registrado de manera satisfactoria en la API.",
            user: { email }
        });

    } catch (err) {
        console.error("ERROR REAL EN REGISTRO:", err);
        return res.status(500).json({ error: "Error en el servidor al procesar el registro." });
    }
};

export const loginUser = async (req, res) => {
    try {
        //   Verificando si el middleware capturó errores previos
        if (req.validationErrors && req.validationErrors.length > 0) {
            return res.status(400).json({ errors: req.validationErrors });
        }

        const { email, password } = req.body;

        const user = usersDatabase.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: "Error en la autenticación" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ message: "Autenticación satisfactoria" });
        } else {
            return res.status(401).json({ error: "Error en la autenticación" });
        }

    } catch (err) {
        return res.status(500).json({ error: "Error en el servidor al intentar iniciar sesión." });
    }
};