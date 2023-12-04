import { useEffect } from "react";
import Swal from "sweetalert2";


const checkOutConfirm = ({ title, confirmText, realtime }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      if (realtime) {
        const intervalId = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update every second
  
        return () => {
          clearInterval(intervalId);
        };
      }
    }, [realtime]);
  
    const renderFooter = () => {
      if (realtime) {
        return (
          <div>
            <p>Current Time: {currentTime.toLocaleTimeString()}</p>
          </div>
        );
      }
      return null;
    };
  
    const swalConfig = {
      title,
      iconColor: 'red',
      icon: 'warning',
      text : renderFooter(),
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: confirmText,
      reverseButtons: true,
    };
  
    return Swal.fire(swalConfig);
  };

const confirmAlert = ({ title, confirmText, text, realtime }) => {
    return Swal.fire({
        title,
        iconColor: 'red',
        icon: "warning",
        text,
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: confirmText,
        reverseButtons: true,
    })
}

const successAlert = ({ title, text }) => {
    Swal.fire({
        position: "center",
        icon: "success",
        text,
        title,
        showConfirmButton: false,
        timer: 3000
    })
}
const errorAlert = ({ title }) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: title,
        text: 'Something went wrong. Please try again or contact support.',
        showConfirmButton: false,
        timer: 3000
    })
}
const pendingAlert = ({ title }) => {
    Swal.fire({
        position: "center",
        title,
        showConfirmButton: false,
        allowOutsideClick: false,
    })
}
export { confirmAlert, successAlert, errorAlert, pendingAlert, checkOutConfirm }
