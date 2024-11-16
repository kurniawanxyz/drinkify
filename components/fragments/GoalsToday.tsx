import { Image, Text, View, XStack, YStack } from "tamagui";
import { useUser } from "../../hooks/useUser";
import { DailyGoal } from "../../type/DailyGoal";
import { Button } from "../elements";
import { galonImg } from "../../assets";
import { router } from "expo-router";

export default function GoalsToday() {
    const { isSuccess, data } = useUser()
    if (data?.data?.goals_today === null) {
        return (
            <YStack
                mt={10}
                width={"100%"}
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={"$5"}
                backgroundColor={"$blue5Light"}
                padding={10}
            >
                <Image source={galonImg} width={100} h={100} />
                <Text textAlign="center">Kamu Belum memiliki daily goals</Text>
                <Button onPress={()=>router.push("/home/create")} mt={10}>Buat daily goals</Button>
            </YStack>
        )
    }
    if (isSuccess) {
        const goal: DailyGoal = data?.data?.goals_today as DailyGoal
        return (
            <YStack
                mt={10}
                width={"100%"}
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={"$5"}
                backgroundColor={"$blue5Light"}
                padding={30}
            >
                <Image source={galonImg} width={100} h={100} />
                <Text textAlign="center" fontSize={20} fontWeight={"bold"}>{goal.goal_amount} ml</Text>
                <XStack
                    padding={10}
                    gap={20}
                    justifyContent="center"
                    width={"100%"}
                    flex={1}
                    flexDirection="row"
                >
                    <Button width={"40%"} onPress={()=>router.push("/home/create")} mt={10}>Atur</Button>
                    <Button width={"40%"} onPress={()=>router.push("/home/create")} mt={10}>Detail</Button>
                    {/* <Button onPress={()=>router.push("/home/create")} mt={10}>Atur Daily goals</Button> */}
                </XStack>
            </YStack>
    )
}
}
