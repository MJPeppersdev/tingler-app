import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'

// App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:noisybanana368@cluster0.jqa6c.mongodb.net/datingDB?retryWrites=true&w=majority'

// Middleware
app.use(express.json())
app.use(Cors())

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Dev"))

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))