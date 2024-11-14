import { Stack } from "expo-router";
import { ExpoTamaguiProvider } from "../providers";


export default function RootLayout() {
  return (
    <ExpoTamaguiProvider>
        <Stack>
            <Stack.Screen
                name="index"
                />

            <Stack.Screen
                name="test"
                options={{
                    presentation: "modal",
                    animation: "ios_from_left",
                }}
                />
        </Stack>
    </ExpoTamaguiProvider>
  )
}
