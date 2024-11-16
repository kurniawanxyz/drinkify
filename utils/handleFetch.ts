import axios, { AxiosRequestConfig } from "axios";
import { ResponseJson } from "../type/ResponseJson";
import Toast from "react-native-toast-message";

export default async function handleFetch<T>(
  url: string,
  config: AxiosRequestConfig | null,
  isForm: boolean = false
): Promise<ResponseJson<T>> {
  const apiUrl = process.env.EXPO_PUBLIC_API + url;
  let configuration: AxiosRequestConfig = config || { method: "GET" };

  if (isForm) {
    configuration.headers = {
      ...configuration.headers,
      'Content-Type': 'multipart/form-data',
    };
  }else{
    configuration.headers = {
      ...configuration.headers,
      'Content-Type': 'application/json',
    };
  }

  return await axios<ResponseJson<T>>(apiUrl, configuration)
    .then(response => {
      // Check if the status code is in the successful range (2xx)
      if (response.status >= 200 && response.status < 300) {
        Toast.show({
          text1: "Success",
          text2: response.data.message,
          type: 'success',
        });
      } else {
        // Handle unsuccessful responses (non-2xx status)
        const errorMessage = typeof response.data.errors !== "string"
          ? response.data.errors[0]
          : response.data.message;

        Toast.show({
          text1: "Error",
          text2: errorMessage,
          type: 'error',
        });
      }

      return response.data;
    })
    .catch(error => {
        console.log(error.response.data.errors)
        if(error.status == "422"){
            for (const key in error.response.data.errors) {
                if (Object.prototype.hasOwnProperty.call(error.response.data.errors, key)) {
                    const element = error.response.data.errors[key];
                    Toast.show({
                      text1: (`${key}`),
                      text2: element,
                      type: 'error',
                    });
                    
                }
            }

        }else{
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
            Toast.show({
              text1: "Error",
              text2: errorMessage,
              type: 'error',
            });
        }
        // Handle any network or Axios errors

      // Optionally throw the error if needed or return a fallback value
      throw error;
    });
}
