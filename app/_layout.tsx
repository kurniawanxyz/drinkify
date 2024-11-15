import { Stack } from "expo-router";
import { ExpoTamaguiProvider } from "../providers";


export default function RootLayout() {
  return (
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
            />
        </Stack>
    </ExpoTamaguiProvider>
  )
}
