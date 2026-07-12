import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import authService from "./auth.service.js";

class AuthController {

    register = asyncHandler(async (req, res) => {

        const user = await authService.register(req.body);

        return res.status(HTTP_STATUS.CREATED).json(
            new ApiResponse(
                HTTP_STATUS.CREATED,
                "User registered successfully.",
                user
            )
        );

    });


    login = asyncHandler(async (req, res) => {

    const data = await authService.login(req.body);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            "Login successful.",
            data
        )
    );

});

}

export default new AuthController();