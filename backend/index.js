const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const app = express();
dotEnv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.set("view engine", "ejs");

app.get("/api/status", (req, res) => {
	res.json({ status: "server OK" });
});

app.get("/", (req, res) => {
	res.send(console.log("everyhing aokay"));
});

app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("DB Connection established");
			console.log(`server is running on port ${process.env.PORT}`);
		})

		.catch((err) => console.error("DB Connection failed", err));
});
