require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3001'
}));
app.use(express.json());
app.use('/business', require('./routers/businessRouter'));
app.use('/partner', require('./routers/partnerRouter'));


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});