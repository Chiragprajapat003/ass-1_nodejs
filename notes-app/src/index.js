const app = require("./app");

require("dotenv").config();
const ConnectDB = require("./config/db")

ConnectDB();

const PORT = process.env.PORT || 5000;


app.listen(PORT , () => {
    console.log(`server is the running on the port ${PORT}`);
})
