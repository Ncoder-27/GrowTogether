require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/business', require('./routers/businessRouter'));
app.use('/partner', require('./routers/partnerRouter'));
app.use('/chat', require('./routers/chatRouter')); // Add the chat router
app.use('/contact', require('./routers/contactusRouter')); // Add the contact router


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});