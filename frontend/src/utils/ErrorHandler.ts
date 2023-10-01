import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const errorHandler = (e: Error | AxiosError) => {
  const defaultMessage = e.message;
  if ((e as AxiosError).response) {
    const err = e as AxiosError;
    toast(
      JSON.stringify(
        (err.response?.data as Record<string, unknown>) ?? defaultMessage
      )
    );
  }
  toast(defaultMessage);
};
