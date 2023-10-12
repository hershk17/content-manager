import express from "express";
import { connect } from "mongoose";
import { mongodbURI as db } from "./config/keys";
import test from "./routes/api/test";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/test", test);

if (process.env.NODE_ENV === "production") {
	app.enable("trust proxy");
	app.use((req, res, next) => {
		if (req.secure) next();
		else res.redirect(`https://'${req.headers.host}${req.url}`);
	});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

connect(db)
	.then(() => console.log("DB connected"))
	.catch((err) => console.log("DB error", err));