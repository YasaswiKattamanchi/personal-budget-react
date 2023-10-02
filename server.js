const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 2000;
// app.use('/home', express.static('public'));
app.use(cors());


const data = fs.readFileSync('budget.json', 'utf8');


app.get('/budget',(req, res) => {
    res.send(data);
});

app.listen(port, () => {
    console.log(`API http://localhost:${port}`);
})