const path = require('path');
const express = require('express');
require('dotenv').config()

const app = express();
const { router } = require("./routes/routes");

app.use(express.static(path.resolve(__dirname, 'static')));

app.use("/api", router);

// app.use((req, res) => {
//   res.status(404);

//   if (req.accepts("html")) {
//     res.send("<h1>Not found</h1>");
//     return;
//   }

//   // respond with json
//   if (req.accepts("application/json")) {
//     res.json({ error: "Not found" });
//     return;
//   }
//   // default to plain-text. send()
//   res.type("txt").send("Not found");
// }
// );

app.listen(3000, err => {
  if (err) {
    console.error(err)
  }
});