import { Spinner } from "flowbite-react";
import Swal from "sweetalert2";

const confirmAlert = ({ title, confirmText, text }) => {
    
    return Swal.fire({
        title,
        iconColor: 'red',
        icon: "warning",
        text,
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: confirmText,
        reverseButtons: true
    })
}

const successAlert = ({ title, text }) => {
    Swal.fire({
        position: "center",
        icon: "success",
        text,
        title,
        showConfirmButton: false,
        timer: 2000
    })
}
const errorAlert = ({ title }) => {
    Swal.fire({
        position: "center",
        icon: "error",
        title: title,
        text: 'Something went wrong. Please try again or contact support.',
        showConfirmButton: false,
        timer: 2000
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
export { confirmAlert, successAlert, errorAlert, pendingAlert }
