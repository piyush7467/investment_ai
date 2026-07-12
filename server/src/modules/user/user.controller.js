import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import userService from "./user.service.js";

class UserController {
    updateProfile = asyncHandler(async (req, res) => {
        const file = req.file; // Populated by multer single upload middleware
        
        const user = await userService.updateProfile(
            req.user._id,
            req.body,
            file
        );

        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Profile updated successfully.",
                user
            )
        );
    });
}

export default new UserController();
