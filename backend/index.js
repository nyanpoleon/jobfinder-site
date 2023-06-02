const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken")
const app = express();
dotEnv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.set("view engine", "ejs");

const registerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}
});

app.get("/api/status", (req, res) => {
	res.json({ status: "server OK" });
});



app.get("/register", (req, res) => {
	res.json("register route");
});

app.post("/register", (req, res) => {
	const {name, email, mobile, password} = req.body;

	const newRegister = new Register({
		name,
		email,
		mobile,
		password,
	})

	newRegister.save((err) => {
		if (err) {
			console.error("Error registering user", err);
			res.status(500).json({ error: "Failed to register user"})
		} else {
			
		}
	})
});

app.get("/login", (req, res) => {
	res.json("login route");
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
