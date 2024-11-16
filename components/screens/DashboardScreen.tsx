import { ScrollView, View, YStack } from "tamagui";
import { GoalsToday, ListDailyGoals, WelcomeSection } from "../fragments";


export default function DashboardScreen() {
  return (
    <ScrollView
      paddingHorizontal={30}
      paddingVertical={20}
    >
        <YStack>
          <WelcomeSection/>
          <GoalsToday/>
          <ListDailyGoals/>
        </YStack>
    </ScrollView>
  )
}
