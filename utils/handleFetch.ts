import axios, { AxiosRequestConfig } from "axios";
import { ResponseJson } from "../type/ResponseJson";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default async function handleFetch<T>(
  url: string,
  config?: AxiosRequestConfig | null,
  isForm: boolean = false,
  isShowToas: boolean = true,
): Promise<ResponseJson<T>> {
  const apiUrl = process.env.EXPO_PUBLIC_API + url;
  let configuration: AxiosRequestConfig = config || { method: "GET" };

  if (isForm) {
    configuration.headers = {
      ...configuration.headers,
      'Content-Type': 'multipart/form-data',
    };
  } else {
    configuration.headers = {
      ...configuration.headers,
      'Content-Type': 'application/json',
    };
  }

  const token = await AsyncStorage.getItem("access_token")
  const expired_at = await AsyncStorage.getItem("expired_at")
  const today = new Date();
  if (expired_at) {
    const expiredDate = new Date(parseInt(expired_at));
    if (
      expiredDate.getFullYear() === today.getFullYear() &&
      expiredDate.getMonth() === today.getMonth() &&
      expiredDate.getDate() === today.getDate()
    ) {

      await AsyncStorage.removeItem("access_token")
      await AsyncStorage.removeItem("expired_at")
      router.push("/login");
    }
  }


  if (token) {
    configuration.headers = {
      ...configuration.headers,
      'Authorization': `Bearer ${token}`,
    };
  }



  return await axios<ResponseJson<T>>(apiUrl, configuration)
    .then(response => {
      // Check if the status code is in the successful range (2xx)
      if (response.status >= 200 && response.status < 300) {
        if(isShowToas){
          Toast.show({
            text1: "Success",
            text2: response.data.message,
            type: 'success',
          });
        }
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
      if (error.status == "422") {
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

      } else {
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
