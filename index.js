const express = require('express')
const { DateTime } = require('luxon');
const app = express()
const port = 3001
app.use(express.json())

app.post('/', (req, res) => {
    let timeZone = req.body && req.body.timeZone? req.body.timeZone : 'America/New_York';
    let responseTime = DateTime.local().setZone(timeZone).toLocaleString(DateTime.TIME_24_WITH_SECONDS)
    res.send(responseTime)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})