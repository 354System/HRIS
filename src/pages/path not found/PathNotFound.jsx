import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PathNotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Set timeout untuk mengalihkan setelah 3 detik
        const timeoutId = setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
    
        // Bersihkan timeout jika komponen dilepas
        return () => clearTimeout(timeoutId);
      }, [navigate]);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-3 text-primary">404 - Not Found</h1>
            <p className="text-lg text-primary">Sorry, the page you are looking for is not found on Thinkspedia.</p>
            <p className="mt-2 text-primary">Please check the URL again or navigate to a different page.</p>
        </div>
    )
}
export default PathNotFound;