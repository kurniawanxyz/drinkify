import { View } from "tamagui";
import { useUser } from "../../hooks/useUser";

export default function WelcomeSection() {

  const { } = useUser()

  return (
    <View
      width={"100%"}
      height={"$13"}
      backgroundColor={"$blue10Light"}
      borderRadius={"$5"}
    >

    </View>
  )
}
