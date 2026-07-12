import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

import investmentService from "./investment.service.js";

class InvestmentController {

    analyze = asyncHandler(async (req, res) => {

        const data = await investmentService.analyze(req.body, req.user);

        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Analysis completed.",
                data
            )
        );

    });

    getHistory = asyncHandler(async (req, res) => {

        const data = await investmentService.getUserHistory(req.user._id);

        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "History retrieved successfully.",
                data
            )
        );

    });

}

export default new InvestmentController();