import { PORT } from "./config/dotenv.js";
import fs from "fs"
import express from "express"
import path from "path";
import formidable from "formidable";

//import multer from "multer"
import cors from "cors" // cors ka use check kr , when integrating frontend request to backend we first have to set cors in backend so that it will allow the subsequent request

const app = express();

app.use(cors());

// yaha pe api banani hai jismai tumne front end sai bheji file lani hai aur console krna hai
// uske badh usko uploads folder mai write krna hai -> hint: use fs and pathl

app.post("/upload", (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir; // Set upload directory
    form.keepExtensions = true; // Keep file extensions

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const file = files.resume;
        const oldPath = file.filepath;
        const newPath = path.join(uploadDir, file.originalFilename || "resume.pdf");

        // Move file to final destination
        fs.rename(oldPath, newPath, (err) => {
            if (err) return res.status(500).json({ message: "Error saving file" });

            res.json({ message: "File uploaded successfully", filePath: newPath });
        });
    });
});

app.get('/', (req, res) => {
    res.json({ msg: "hello" })
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})

// !important folder structure for backend and what each folder means