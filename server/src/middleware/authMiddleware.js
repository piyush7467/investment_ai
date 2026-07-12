import jwt from "jsonwebtoken";
import User from "../modules/auth/auth.model.js";
import ApiError from "../utils/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(
            new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Not authorized to access this route"
            )
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return next(
                new ApiError(
                    HTTP_STATUS.NOT_FOUND,
                    "No user found with this id"
                )
            );
        }

        next();
    } catch (error) {
        return next(
            new ApiError(
                HTTP_STATUS.UNAUTHORIZED,
                "Not authorized to access this route"
            )
        );
    }
};

export const authOptional = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id).select("-password");
        
        next();
    } catch (error) {
        // Proceed as guest if token is invalid or expired
        next();
    }
};
