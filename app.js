const express = require('express');
const app = express();
var cors = require('cors');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const path = require('path'); 

const allRoutes = require('./routes');

const PORT = process.env.PORT || 3011;

db.then(() => {
  console.log("Database Connected");
})
.catch((err) => {
  console.log(err);
});

app.use(cors({
  origin: "*",
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(allRoutes);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
