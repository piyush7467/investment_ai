import api from "../../lib/axios";

/**
 * Updates user profile details (name, avatar upload, and/or password change).
 * @param {FormData} formData - Multipart form containing name, avatar file, currentPassword, newPassword.
 */
export const updateProfile = async (formData) => {
    const { data } = await api.put("/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};
