/** Start server for jobly. */

const app = require("./app");
const { PORT } = require("./config.js");

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}!`);
});
