const { PORT } = require("./config/dotenv.js");
const fs = require("fs");
const express = require("express");
const path = require("path");
const pdfParse = require("pdf-parse");
const cors = require('cors');

// cors ka use check kr , when integrating frontend request to backend we first have to set cors in backend so that it will allow the subsequent request

const app = express();

app.use(cors());

// yaha pe api banani hai jismai tumne front end sai bheji file lani hai aur console krna hai
// uske badh usko uploads folder mai write krna hai -> hint: use fs and pathl

app.use(express.raw({ type: "application/pdf", limit: "10mb" }));

app.post("/upload", (req, res) => {
    if (!req.body || req.body.length === 0) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadPath = path.join(__dirname, "uploads", `uploaded-${Date.now()}.pdf`);

    // Write binary data to a file
    fs.writeFile(uploadPath, req.body, async (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ message: "File upload failed" });
        }
        console.log("File saved:", uploadPath);
        // read saved pdf text
        const dataBuffer = fs.readFileSync(uploadPath);
        const pdfData = await pdfParse(dataBuffer);
        const extractedText = pdfData.text;

        console.log("Extracted PDF Text:", extractedText);

        // use ai api to send this pdf text and a prompt telling AI to analyize this text
        // response will be send in bellow res.json
        res.json({ message: "File uploaded successfully", filePath: uploadPath });
    });
});

app.get('/', (req, res) => {
    res.json({ msg: "hello" })
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})

// !important folder structure for backend and what each folder means
//