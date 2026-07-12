import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import chatbotService from "./chatbot.service.js";

class ChatbotController {
    chat = asyncHandler(async (req, res) => {
        const { message, history, companyContext } = req.body;

        if (!message) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ApiResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Message is required."
                )
            );
        }

        const reply = await chatbotService.chat(
            message,
            history,
            companyContext
        );

        return res.status(HTTP_STATUS.OK).json(
            new ApiResponse(
                HTTP_STATUS.OK,
                "Reply generated successfully.",
                {
                    reply,
                }
            )
        );
    });
}

export default new ChatbotController();
