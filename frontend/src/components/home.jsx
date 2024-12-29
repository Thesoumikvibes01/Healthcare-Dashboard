// //frontednd/src/components/home.jsx
//  import { Routes, Route ,Link} from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { homePage } from "../services/api";
// import Register from './register';
// import Login from './login';
// const Home = ()=>{
//     const [heading,setHeading] = useState('');
//     useEffect(()=>{
//         const getData = async()=>{
//             try {
//                 const response = await homePage();
//                 const heading = response.data.message;
//                 setHeading(heading);

//             } catch (error) {
//                console.log(error)
//             }
//         }
//         getData()
        
//     },[])
     
//     return(
//         <div>
//             <h1>{heading}</h1>
//             {/* <Register/>
//             <Login/> */}
//             <nav>
//                 <Link to="login">Login</Link> | <Link to="register">Register</Link>
//             </nav>
//             <Routes>
//               <Route path="register" element={<Register/>} />
//               <Route path="login" element={<Login/>} />
//             </Routes>
//         </div>
//     )
// }

// export default Home;


import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { homePage, checkSymptoms } from "../services/api"; // Ensure these functions are correctly defined
import Register from './register';
import Login from './login';
import { TextField, Button, Box, Typography } from "@mui/material";

const Home = () => {
    const [heading, setHeading] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await homePage();
                setHeading(response.data.message);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await checkSymptoms(symptoms);
            setResult(response.data); // Expecting an object with a 'conditions' field
        } catch (error) {
            console.error("Error checking symptoms", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>{heading}</h1>
            <nav>
                <Link to="login">Login</Link> | <Link to="register">Register</Link>
            </nav>
            <Routes>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
            </Routes>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Check Symptoms:</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Enter Symptoms"
                        variant="outlined"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="e.g. fever, cough"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Checking...' : 'Check Symptoms'}
                    </Button>
                </form>

                {result && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6">Predicted Conditions:</Typography>
                        <ul>
                            {result.conditions.map((condition, index) => (
                                <li key={index}>
                                    {condition.name} - {condition.probability}%
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default Home;

