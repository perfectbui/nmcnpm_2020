require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.listen(port);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

app.use(morgan("dev"));

const cookieParser = require("cookie-parser");

/* 
try {
	fs.mkdirSync(path.join(__dirname, '/public/uploads/imgs'));
} catch (err) {
	if (err.code !== 'EXIST') {
		console.log('Error khi tao directory : ', err);
	}
}
 */

mongoose
  .connect(process.env.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {})
  .catch((err) => console.log(err));

app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/public/"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/api/signup", require("./routes/register"));
app.use("/api/signin", require("./routes/login"));
app.use("/api/user", require("./routes/user"));
app.use("/api/posts", require("./routes/post"));

app.use("/api/admin", require("./routes/admin"));
app.use("/api/test", require("./routes/test"));
