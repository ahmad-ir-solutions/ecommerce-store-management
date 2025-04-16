// messageUtils.ts
import { toast } from "react-toastify";

export const showMessage = (
  type: "success" | "error" | "info" | "warning",
  content: string,
  duration: number = 3000
) => {
  toast[type](content, {
    autoClose: duration,
  });
};

export const showSuccessMessage = (content: string) => {
  showMessage("success", content);
};

export const showErrorMessage = (content: string) => {
  showMessage("error", content);
};

export const showInfoMessage = (content: string) => {
  showMessage("info", content);
};

export const showWarningMessage = (content: string) => {
  showMessage("warning", content);
};
