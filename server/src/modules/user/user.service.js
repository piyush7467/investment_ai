import bcrypt from "bcrypt";
import fs from "fs";
import cloudinary from "../../config/cloudinary.js";
import User from "../auth/auth.model.js";
import ApiError from "../../utils/ApiError.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

class UserService {
    async updateProfile(userId, updateData, file) {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
        }

        // 1. Handle name update
        if (updateData.name) {
            const trimmedName = updateData.name.trim();
            if (trimmedName.length < 3) {
                if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
                throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Name must be at least 3 characters long."
                );
            }
            user.name = trimmedName;
        }

        // 2. Handle avatar upload to Cloudinary
        if (file) {
            try {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "investment-ai/avatars",
                    use_filename: true,
                    unique_filename: true,
                    resource_type: "auto"
                });

                user.avatar = result.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload failed:", uploadError.message);
                throw new ApiError(
                    HTTP_STATUS.INTERNAL_SERVER_ERROR,
                    "Failed to upload image to cloud storage."
                );
            } finally {
                // Remove temporary file from local filesystem
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            }
        }

        // 3. Handle optional password change with validation
        if (updateData.newPassword) {
            if (!updateData.currentPassword) {
                throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "Current password is required to change password."
                );
            }

            // Verify current password
            const isMatch = await bcrypt.compare(
                updateData.currentPassword,
                user.password
            );
            if (!isMatch) {
                throw new ApiError(
                    HTTP_STATUS.UNAUTHORIZED,
                    "Current password is incorrect."
                );
            }

            const newPassword = updateData.newPassword.trim();
            
            // Password length validation
            if (newPassword.length < 8) {
                throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "New password must be at least 8 characters long."
                );
            }

            // Password complexity validation: at least one letter and one number
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                throw new ApiError(
                    HTTP_STATUS.BAD_REQUEST,
                    "New password must contain at least one letter and one number."
                );
            }

            // Hash and set the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        // Return user profile data without password hash
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        };
    }
}

export default new UserService();
