const express = require('express');
const { uploadImg, getImageReference } = require('./handle_img_upload.js');

const app = express();

app.post('/upload', uploadImg, (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }
  
  const imageRef = getImageReference(req.file);
  res.status(200).send(`Image uploaded successfully! Filename: ${imageRef}`);
});
  
app.get('/upload-form', (req, res) => {
    res.send(`
        <html>
          <head>
            <title>Upload an Image</title>
          </head>
          <body>
            <h1>Upload an Image</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
              <input type="file" name="image" accept="image/*" required>
              <button type="submit">Upload</button>
            </form>
          </body>
        </html>
    `);
});
  
  

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
