import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notify = (type: string, message: string) => {
  const toastId = message;
  switch (type) {
    case "success":
      toast.success(message, {
        toastId,
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      break;
    case "error":
      toast.error(message, {
        toastId,
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      break;
    default:
      toast.info(message, {
        toastId,
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
  }
};
