const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const PORT = 3000;
const FOLDER_PATH = "./files"; // Folder to store the generated files

// function to get the timestamp as a filename
const getFormattedTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/:/g, "-"); // ISO format
};

// Conditional Statement - To create a folder 
if (!fs.existsSync(FOLDER_PATH)) {
  fs.mkdirSync(FOLDER_PATH);
}

// API 1 - Create a file
app.post("/create-file", (req, res) => {
  const timestamp = getFormattedTimestamp();
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(FOLDER_PATH, fileName);

  fs.writeFile(filePath, `Current Timestamp: ${timestamp}`, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return res.status(500).send("Failed to create file.");
    }
    res.send({ message: "File created successfully", fileName });
  });
});

// API 2 -  Retrieve the files generated
app.get("/files", (req, res) => {
  fs.readdir(FOLDER_PATH, (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      return res.status(500).send("Failed to read files.");
    }

    const textFiles = files.filter((file) => file.endsWith(".txt"));
    res.send(textFiles);
  });
});

// First page
app.get("/", (req, res) => {
  res.send("Welcome! Use /create-file to create a file and /files to view files.");
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});