import { ScrollView, View, YStack } from "tamagui";
import { WelcomeSection } from "../fragments";


export default function DashboardScreen() {
  return (
    <ScrollView
      paddingHorizontal={30}
      paddingVertical={20}
    >
        <YStack>
          <WelcomeSection/>
        </YStack>
    </ScrollView>
  )
}
