const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const Shipment = require("./models/shipment");
const shipmentRouter = require("./routes/shipment");
const authRouter = require("./routes/auth");
const siteNavRouter = require("./routes/siteNav");
const adminRouter = require("./routes/adminDashboard");
const connectMongo = require("./config/dbConnection");

const app = express();
connectMongo();

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "my-secret-key123321",
    resave: false,
    saveUninitialized: true
}));

// Storing res session messages
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use("/shipment", shipmentRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/", siteNavRouter);

app.listen(PORT, () => console.log(`Server up and running on port-> ${PORT}`));