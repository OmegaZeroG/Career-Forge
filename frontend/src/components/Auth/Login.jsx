import { useState, useContext } from "react";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"; 

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);

    const handleSubmit = async () => {
        try {
            const res = await loginUser(form);

            login(res.data); // IMPORTANT: res.data

            alert("Login Success");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button onClick={handleSubmit}>Login</button>
             <p>
      Don't have an account? <Link to="/register">Register</Link>
    </p>
        </div>
    );
};

export default Login;