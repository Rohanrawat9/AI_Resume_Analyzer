import { useState } from "react";
import axios from "axios";
import { PiSpinnerBallFill } from "react-icons/pi";

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jobDescriptions, setJobDescriptions] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload a resume.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("job_descriptions", jobDescriptions);

        try {
            const response = await axios.post("http://localhost:4000/analyze-resume", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log(response.data.feedback);
        } catch (error) {
            console.error("Error:", error);
            console.log("Failed to analyze resume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-screen py-10">
            <div className="mx-auto text-center my-4">
                <div>
                    <h2 className="text-xl font-bold">📄 Upload Resume for AI Feedback</h2>
                </div>
                <div className="my-10">
                    <div className="flex-col flex gap-10">
                        <input type="text" placeholder="Job Description" value={jobDescriptions} onChange={(e)=>setJobDescriptions(e.target.value)} />
                        <input className="cursor-pointer" type="file" accept=".pdf" onChange={handleFileChange} />
                        <button onClick={handleUpload} disabled={loading} className=" cursor-pointer">
                            {loading ? <div className="animate-spin" size={16} > <PiSpinnerBallFill /> Analyzing... </div> : "Upload & Analyze"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeUpload;