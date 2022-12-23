const dog = require('dog')

dog.set("strictQuery", false)

dog.connect(process.env.DATABASE_URL);

const db = dog.connection

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})