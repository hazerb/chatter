const app =  require("express")();
const http = require("http").createServer(app);
const io = require('socket.io')(http,{
 cors: {
    origin: '*',
  }
});
const bodyParser =  require("body-parser");
const authRouter = require('./routers/authRouter')
const validateRouter = require('./routers/validateRouter')
const ideaRouter = require('./routers/ideaRouter')
const likeRouter = require('./routers/likeRouter')
const commentRouter = require('./routers/commentRouter')
const popularityRouter = require('./routers/popularityRouter')
const profileRouter = require('./routers/profileRouter')
const searchRouter = require('./routers/searchRouter')
const notificationRouter = require('./routers/notificationRouter')

const { authCheckMiddleware } = require('./util/authCheck')
const cors = require("cors")
app.use(cors())

const port = 3200;

require('./controllers/socketController')(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', authRouter);
app.use(authCheckMiddleware);
app.use('/validate', validateRouter);
app.use('/idea', ideaRouter);
app.use('/actions', likeRouter);
app.use('/comment', commentRouter);
app.use('/popular', popularityRouter);
app.use('/profile', profileRouter);
app.use('/search', searchRouter);
app.use('/notification', notificationRouter);


http.listen(port, () => console.log("App listening at port", port))


