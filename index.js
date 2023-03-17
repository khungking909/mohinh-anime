const express = require('express')
const app = express()
const handle = require('express-handlebars')
const path = require('path')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport')
require('dotenv').config()
app.use(session({
  secret: process.env.ACCESS_TOKEN_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.session())
app.use(passport.initialize())
app.use(cookieParser())
app.use(methodOverride('_method'))
const router = require('./routers')
String.prototype.UpperCase = function () {
    let words = this.split(" ");
    let capitalizedWords = words.map(word => {
        let firstLetter = word.charAt(0).toUpperCase();
        let restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });
    return capitalizedWords.join(" ");
};
app.engine('hbs', handle.engine(
    {
        extname: '.hbs'
    }
))
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'css')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
router(app)
app.listen(3333, () => {
    console.log('Runnnnnnn........')
})
