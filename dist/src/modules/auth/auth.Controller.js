import { authService } from "./auth.Service.js";
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const result = await authService.getProfileDB(userId);
        res.status(201).json({
            success: true,
            message: "Your Profile",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
export const authController = {
    getProfile
};
//# sourceMappingURL=auth.Controller.js.map