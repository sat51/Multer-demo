// Import express
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
 
    destination: (req, file, cb) => {
      // Get the type of file.
      const ext = file.mimetype.split("/")[0];
      if (ext === "image") {
          // if type is image then store in images folder
        cb(null, "uploads/images");
      } else {
          // In case of not an image store in others
        cb(null, "uploads/others");
      }
    },
    filename: (req, file, cb) => {
      // Combine the Date in milliseconds and original name and pass as filename
      cb(null,file.originalname );
    },
  });

// Configure storage engine instead of dest object.
const upload = multer({ storage: storage })
 
const PORT = process.env.PORT || 3000;
 
// Create instance of express.
const app = express();

// Include express.json() middleware
app.use(express.json());

// Include express.urlencoded() middleware
app.use(express.urlencoded({ extended: true }));
 
// Create a GET endpoint for '/' route
app.get("/", (req, res) => {
    res.send("Welcome to API");
});
 
// Create a POST endpoint for '/upload' route
app.post("/upload", upload.array("myFile"), (req, res) => {
    // .array() is used to support upload of multiple files.
    console.log("Body: ", req.body);
    console.log("Files: ", req.files);
    res.send("Files successfully uploaded.");
});

 
// Listen on the specified port.
app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
});
