//APP.jsx
import { Routes, Route ,Navigate } from 'react-router-dom';
import Home from './components/home';
import ProtectedRoute from './components/protected';
// import Register from './components/register';
// import Login from './components/login';
import "./App.css";
import { Container} from '@mui/material';
const App = () => {
    return (
           <Container>
              <Routes>
                 <Route path="/" element={<Navigate to="/home" />} />
                 <Route path="/home/*" element={<Home />} /> {/* Use nested routing here */}
                 <Route path="/protected" element={<ProtectedRoute />} />
              </Routes>
            </Container>
       
    );
};

export default App;

