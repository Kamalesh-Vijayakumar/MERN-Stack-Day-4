const express = require("express");
const qr = require("qr-image");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse URL-encoded data sent by the HTML form
app.use(express.urlencoded({ extended: true }));

// Serve the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle QR code generation
app.post("/generate", (req, res) => {
  const url = req.body.url;
  const qr_img = qr.image(url, { type: "png" });
  const qrCodePath = path.join(__dirname, "public", "website_url.png");

  // Save the QR code image to the public directory
  qr_img.pipe(require("fs").createWriteStream(qrCodePath));

  // Redirect to the same page to display the generated QR code
  qr_img.on("end", () => {
    res.redirect("/show");
  });
});

// Display the generated QR code
app.get("/show", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "show.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
