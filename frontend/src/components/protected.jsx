//frontednd/src/components/prottected.jsx
import  { useEffect, useState } from 'react';
import { getProtectedData } from '../services/api';

const ProtectedRoute = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProtectedData(token);
                setData(response.data);
            } catch (error) {
                alert(error.response.data.message);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div>
            {data ? <p>{data.message}</p> : <p>Loading...</p>}
        </div>
    );
};

export default ProtectedRoute;
