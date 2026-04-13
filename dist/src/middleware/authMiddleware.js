import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
export const authMiddleware = (...roles) => {
    return async (req, res, next) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        });
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized",
            });
        }
        // if (!session.user.emailVerified) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Please verify your account",
        //     });
        // }
        req.user = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: session.user.role,
            emailVerified: session.user.emailVerified,
        };
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        next();
    };
};
//# sourceMappingURL=authMiddleware.js.map