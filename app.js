const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const app = express()

const PORT = config.get('port') || 5000

app.use(cookieParser());

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/books', require('./routes/books.routes'))

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        })
        app.listen(PORT, () => {
            console.log(`App was started on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
