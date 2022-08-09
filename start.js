const app = require("./server.js");
const port = process.env.PORT || 5000;
// 
app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server is running on port " + port);
});
