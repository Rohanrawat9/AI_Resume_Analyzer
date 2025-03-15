const { PORT } = require("./config/dotenv.js");
const fs = require("fs");
const express = require("express");
const path = require("path");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");

const app = express();

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Google Gemini API Key (Make sure to set it in your .env file)
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Multer Setup for PDF Uploads
const upload = multer({ dest: "uploads/" });

// AI Resume Analysis Route
app.post("/analyze-resume", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        // Convert PDF to Text
        const pdfBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(pdfBuffer);
        const resumeText = pdfData.text;

        console.log("Extracted PDF Text:", resumeText);

        // AI Prompt for Resume Analysis
        const prompt = `
        You are an AI Resume Analyst. Analyze the given resume and provide structured feedback with the following format:

        **🔹 Strengths:**  
        - Highlight key skills and experiences relevant to industry standards.  

        **🔹 Weaknesses:**  
        - Mention missing skills, formatting issues, or areas needing improvement.  

        **🔹 Suggested Improvements:**  
        - Provide specific actions the candidate can take to enhance their resume.  

        **🔹 Job Role Suitability:**  
        - Suggest which job roles the candidate is best suited for based on the resume content.  

        **🔹 Industry Standards Match:**  
        - Rate the resume on a scale of 1-10 based on clarity, structure, and skill relevance.  

        Here is the resume content:
        ${resumeText}
        `;

        // Call Google Gemini API
        const response = await axios.post(
            GEMINI_URL,
            {
                contents: [{ parts: [{ text: prompt }] }],
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const aiFeedback = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback available.";

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        // Send AI-generated feedback to the frontend
        res.json({ feedback: aiFeedback });
    } catch (error) {
        console.error("Error analyzing resume:", error);
        res.status(500).json({ error: "Failed to analyze resume." });
    }
});

// Simple Test Route
app.get("/", (req, res) => {
    res.json({ msg: "Hello, Resume Analyzer is running!" });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server is listening on ${PORT}`);
});
