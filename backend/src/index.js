const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes'));


app.listen(3030, () => {
    console.log("App lintening in port 3030");
});