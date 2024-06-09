const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://ukfitweb:ukfitweb@123@cluster0.kpyah42.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
