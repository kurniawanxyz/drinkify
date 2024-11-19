import axios, { AxiosRequestConfig } from "axios";
import { ResponseJson } from "../type/ResponseJson";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default async function handleFetch<T>(
  url: string,
  config?: AxiosRequestConfig | null,
  isForm: boolean = false,
  isShowToast: boolean = true,
): Promise<ResponseJson<T>> {
  const apiUrl = 'https://www.dringkify.kaitodecode.com/api' + url;
  let configuration: AxiosRequestConfig = config || { method: "GET" };

  if (isForm) {
    configuration.headers = {
      ...configuration.headers,
      "Content-Type": "multipart/form-data",
    };
  } else {
    configuration.headers = {
      ...configuration.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  const token = await AsyncStorage.getItem("access_token");
  const expired_at = await AsyncStorage.getItem("expired_at");
  const today = new Date();

  if (expired_at) {
    const expiredDate = new Date(parseInt(expired_at));
    if (
      expiredDate.getFullYear() === today.getFullYear() &&
      expiredDate.getMonth() === today.getMonth() &&
      expiredDate.getDate() === today.getDate()
    ) {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("expired_at");
      router.push("/");
    }
  }

  if (token) {
    configuration.headers = {
      ...configuration.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios<ResponseJson<T>>(apiUrl, configuration);
    console.log(response);

    if (response.status >= 200 && response.status < 300) {
      if (isShowToast) {
        Toast.show({
          text1: "Success",
          text2: response.data.message,
          type: "success",
        });
      }
    } else {
      const errorMessage =
        typeof response.data.errors !== "string"
          ? response.data.errors?.[0] || "An error occurred."
          : response.data.message;
      Toast.show({
        text1: "Error",
        text2: errorMessage,
        type: "error",
      });
    }

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Handle HTTP errors
      const status = error.response.status;
      console.log({status})
      if (status === 422) {
        for (const key in error.response.data.errors) {
          if (Object.prototype.hasOwnProperty.call(error.response.data.errors, key)) {

            const element = error.response.data.errors[key];
            Toast.show({
              text1: `${key}`,
              text2: element,
              type: "error",
            });
            
          }
        }
      } else if (status === 401) {
        await AsyncStorage.removeItem("access_token");
        await AsyncStorage.removeItem("expired_at");
        router.push("/");
      } else {
        const errorMessage = error.response.data?.message || "An unexpected error occurred.";
        Toast.show({
          text1: "Error",
          text2: errorMessage,
          type: "error",
        });
      }
    } else {
      console.log(error)
      // Handle network or other errors
      Toast.show({
        text1: "Error",
        text2: error.message || "An unexpected error occurred.",
        type: "error",
      });
    }

    throw error; // Optionally re-throw for further handling
  }
}
