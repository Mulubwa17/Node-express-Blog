require("dotenv").config();
const express = require("express")
const expressEdge = require("express-edge")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const expressSession = require("express-session")
const connectMongo = require("connect-mongo")
const connectFlash = require("connect-flash")
const edge = require("edge.js")
const cloudinary = require("cloudinary")
const createPostController = require("./controllers/createPost")
const homePageController = require("./controllers/homePage")
const storePostController = require("./controllers/storePost")
const getPostController = require("./controllers/getPost")
const registerController = require("./controllers/register")
const storeUserController = require("./controllers/storeUser")
const loginController = require("./controllers/login")
const loginUserController = require("./controllers/loginUser")
const logoutController = require("./controllers/logout")


const app = express()

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use(connectFlash());

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME

})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(fileUpload())

app.use(express.static("public"))

app.use(expressEdge.engine)

app.set("views", `${__dirname}/views`)

app.use("*", (req, res, next) => {
    edge.global("auth", req.session.userId)
    next()
})

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))




const storePost = require("./middleware/storePost")
const auth = require("./middleware/auth")
const redirectAuth = require("./middleware/redirectAuth")

app.use("/posts/store", storePost)

// Post routes
app.get("/", homePageController)

app.get("/post/:id", getPostController)

app.get("/posts/new", auth, createPostController)

app.post("posts/store", auth, storePost, storePostController)


// User routes
app.get("/auth/register", redirectAuth, registerController)

app.get("/auth/login", redirectAuth, loginController)

app.post("/users/register", redirectAuth, storeUserController)

app.post("/users/login", redirectAuth, loginUserController)

app.get("/auth/logout", auth, logoutController)

app.use((req, res) => res.render("404"))







app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})