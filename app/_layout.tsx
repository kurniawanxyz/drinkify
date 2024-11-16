import { router, Stack } from "expo-router";
import { ExpoTamaguiProvider } from "../providers";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpoQueryProvider } from "../providers/ExpoQueryProvider";


export default function RootLayout() {

  useEffect(()=>{
    (async()=>{
      const token = await AsyncStorage.getItem("access_token");
      if(token){
        router.push("(tabs)/home")
      }  
    })()
  })

  return (
    <ExpoQueryProvider>
      <ExpoTamaguiProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          >
              <Stack.Screen
                  name="index"
                  />

              <Stack.Screen
                name="register"
                options={{
                  animation: "fade_from_bottom"
                }}
              />
              <Stack.Screen
                name="(tabs)"
              />
          </Stack>
          <Toast/>
      </ExpoTamaguiProvider>
    </ExpoQueryProvider>
  )
}
