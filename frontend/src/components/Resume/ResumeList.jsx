import { useEffect, useState, useContext } from "react";
import { getMyResumes } from "../../services/resumeService";
import { AuthContext } from "../../context/AuthContext";

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMyResumes(token);
            setResumes(res.data.resumes);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>My Resumes</h2>

            {resumes.map((r) => (
                <div key={r._id}>
                    <p>{r.originalName}</p>
                    <p>{r.parsedData?.skills?.join(", ")}</p>
                </div>
            ))}
        </div>
    );
};

export default ResumeList;