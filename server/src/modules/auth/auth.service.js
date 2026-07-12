import bcrypt from "bcrypt";
import ApiError from "../../utils/ApiError.js";
import authRepository from "./auth.repository.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import { generateToken } from "../../utils/jwt.js";

class AuthService {

    async register(userData) {

    const existingUser = await authRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            "Email already registered."
        );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await authRepository.createUser({
        ...userData,
        password: hashedPassword,
    });

    user.password = undefined;

    return user;
}



async login(userData) {

    const { email, password } = userData;

    const user = await authRepository.findByEmail(email);

    if (!user) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            "Invalid email or password."
        );
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            "Invalid email or password."
        );
    }

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}

}

export default new AuthService();