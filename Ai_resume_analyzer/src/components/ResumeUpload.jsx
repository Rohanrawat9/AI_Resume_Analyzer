import { useState } from "react";

export default function ResumeUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState("gpt-4o-mini");
  const [jobDescription, setJobDescription] = useState("");
  
  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) return;
    console.log("Uploading file:", file);
    console.log("Using model:", model);
    console.log("Job description:", jobDescription);
    // Add upload and analysis logic here
  };

  return (
    <div className="lg:col-span-1">
      <form 
        onSubmit={handleSubmit} 
        className="bg-[var(--card-background)] border border-[var(--card-border)] backdrop-blur-sm bg-opacity-90 shadow-md rounded-xl p-6 space-y-6"
      >
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Upload Resume
          </label>
          <div className="absolute top-2 right-2">
            <button 
              type="button" 
              onClick={handleReset} 
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--gray-50)] hover:bg-[var(--gray-100)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--ring)] p-2"
              title="Reset form"
            >
              🔄
            </button>
          </div>
          <input 
            id="file-upload" 
            type="file" 
            accept=".pdf,.docx" 
            className="block w-full text-sm text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-950 file:text-blue-600 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="model-select" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            AI Model
          </label>
          <select 
            id="model-select" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
            className="w-full p-3 text-sm text-[var(--text-secondary)] bg-[var(--gray-100)] rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          >
            <option value="gpt-3.5-turbo">⚡ GPT-3.5 Turbo (Fast & Simple)</option>
            <option value="gpt-4o-mini">✨ GPT-4o Mini (Recommended - Best Balance)</option>
            <option value="claude-3.5-haiku">🎯 Claude Haiku (Smart & Precise)</option>
          </select>
        </div>
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            Job Description (Optional)
          </label>
          <textarea 
            id="jobDescription" 
            rows={4} 
            placeholder="Paste job description here..." 
            value={jobDescription} 
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 text-sm text-[var(--text-secondary)] bg-[var(--gray-100)] rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium tracking-wide hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={!file}
        >
          Upload and Analyze
        </button>
      </form>
    </div>
  );
}
