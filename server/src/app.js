import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";
import ApiResponse from "./utils/ApiResponse.js";

import routes from "./routes/index.js";


const app = express();

// Middlewares
app.use(
    cors({
        origin: (origin, callback) => {
            callback(null, true);
        },
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.get("/", (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            "Investment AI Backend Running 🚀"
        )
    );
});

app.use("/api/v1", routes);


app.use(errorMiddleware);

export default app;