import { ReactNode } from "react";
import { toast } from "react-toastify";

export const errorToast = (textOrComponent: string | ReactNode, ms: number, toastId: string) => {
  toast.error(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    toastId: toastId,
    autoClose: ms,
    theme: "colored",
  });
};

export const successToast = (textOrComponent: string | ReactNode, ms: number, toastId: string) => {
  toast.success(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    toastId: toastId,
    autoClose: ms,
    theme: "colored",
  });
};

export const infoToast = (textOrComponent: string | ReactNode, ms: number, toastId: string) => {
  toast.info(textOrComponent, {
    position: "bottom-center",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    toastId: toastId,
    autoClose: ms,
    theme: "colored",
  });
};
