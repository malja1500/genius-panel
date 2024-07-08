import { toast } from "react-hot-toast";

const showLoadingToast = (message, id) => {
  toast.loading(message, { id });
};

const dismissToast = (id) => {
  toast.dismiss(id);
};

const showSuccessToast = (message) => {
  toast.success(message);
};

const showInfoToast = (message) => {
  toast.info(message);
};

const showErrorToast = (message) => {
  toast.error(message);
};

export {
  dismissToast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showSuccessToast,
};
