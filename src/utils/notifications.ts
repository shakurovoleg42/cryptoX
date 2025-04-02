import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notify = (type: string, message: string) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      break;
    default:
      toast.info(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
  }
};
