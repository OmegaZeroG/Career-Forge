import { useState, useContext } from "react";
import { uploadResume } from "../../services/resumeService";
import { AuthContext } from "../../context/AuthContext";

const UploadResume = () => {
    const [file, setFile] = useState(null);
    const { token } = useContext(AuthContext);

    const handleUpload = async () => {
        if (!file) return alert("Select file first");

        try {
            const res = await uploadResume(file, token);
            console.log(res);

            alert("Uploaded & Parsed!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>Upload Resume</h2>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadResume;