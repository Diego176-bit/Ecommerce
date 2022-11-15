const express = require('express')
const passport = require('passport')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')



/* Initialize ---------------------------------------------------------------------------*/
const app = express()
require('./database')
require('./passport/local-auth')

/* Settings -----------------------------------------------------------------------------*/
app.set('views', path.join(__dirname, 'views'))
const PORT = process.env.PORT || 5000
app.set('port', PORT)
app.use(express.json())

/* Middleware---------------------------------------------------------------------------- */
app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{
    app.locals.signupMessage = req.flash('signupMessage')
    app.locals.user = req.user
    next()
})

/* Routes-------------------------------------------------------------------------------- */
app.use('/', require('./routes/index'))

/* Starting server -----------------------------------------------------------------------*/

app.listen(app.get('port'), ()=>{
    console.log(`Server listening on prot ${app.get('port')}`)
})
