import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtil.js";


// Middleware pour authentifier l'utilisateur
export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            throw new UnauthenticatedError("Token manquant ou invalide.");
        }

        // Vérification du token JWT
        const { userID, role } = verifyJWT(token);
        req.user = { userID, role };
        next();
    } catch (error) {
        next(new UnauthenticatedError("Authentification invalide."));
    }
};

// Middleware pour autoriser certaines permissions selon le rôle de l'utilisateur
export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new UnauthorizedError("Accès non autorisé à cette route.");
        }
        next();
    };
};
