import { ScrollView, View, YStack } from "tamagui";
import { GoalsToday, ListDailyGoals, WelcomeSection } from "../fragments";


export default function DashboardScreen() {
  return (
    <ScrollView
      paddingHorizontal={30}
      paddingVertical={20}
      minHeight={"120%"}
    >
        <YStack paddingBottom={200}>
          <WelcomeSection/>
          <GoalsToday/>
          <ListDailyGoals/>
        </YStack>
    </ScrollView>
  )
}
