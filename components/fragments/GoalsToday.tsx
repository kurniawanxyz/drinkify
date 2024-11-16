import { Image, Text, View, XStack, YStack } from "tamagui";
import { useDeleteGoalToday, useUser } from "../../hooks/useUser";
import { DailyGoal } from "../../type/DailyGoal";
import { Button } from "../elements";
import { galonImg } from "../../assets";
import { router } from "expo-router";

export default function GoalsToday() {
    const { isSuccess, data } = useUser()
    const deleteGoal = useDeleteGoalToday()

    function handleDeleteGoal(id: string){
        deleteGoal.mutate(id)
    }

    console.log(data?.data?.daily_goals)
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
                <XStack
                    justifyContent="space-between"
                    gap={15}
                    mt={10}
                >
                    <YStack>
                        <Text textAlign="center" fontSize={13} fontWeight={"bold"}>{goal.goal_amount} ml</Text>
                        <Text textAlign="center" fontSize={10} >Goal</Text>
                    </YStack>
                    <Text textAlign="center" fontSize={20} fontWeight={"bold"}>|</Text>
                    <YStack>
                        <Text textAlign="center" fontSize={13} fontWeight={"bold"}>{goal.remaining_water} ml</Text>
                        <Text textAlign="center" fontSize={10} >Water remaining</Text>
                    </YStack>
                    <Text textAlign="center" fontSize={20} fontWeight={"bold"}>|</Text>
                    <YStack>
                        <Text textAlign="center" fontSize={13} fontWeight={"bold"}>{goal.total_water_intake} ml</Text>
                        <Text textAlign="center" fontSize={10} >Water Intakes today</Text>
                    </YStack>
                </XStack>
                <XStack
                    padding={10}
                    gap={20}
                    justifyContent="center"
                    width={"100%"}
                    flex={1}
                    flexDirection="row"
                >
                    <Button onPress={()=>router.push("/home/create")} mt={10}>Atur</Button>
                    <Button 
                        backgroundColor={"$yellow10Light"}
                        pressStyle={{
                            backgroundColor: "$yellow11Light"
                        }}
                    onPress={()=>router.push("/home/daily_goal/"+goal.id)} mt={10}>Detail</Button>
                    <Button 
                        backgroundColor={"$red11Light"} 
                        pressStyle={{
                            backgroundColor: "$red11Light"
                        }}
                        onPress={()=>handleDeleteGoal(String(goal.id))} mt={10}>Delete</Button>
                    {/* <Button onPress={()=>router.push("/home/create")} mt={10}>Atur Daily goals</Button> */}
                </XStack>
            </YStack>
    )
}
}
