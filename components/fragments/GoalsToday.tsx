import { Image, Text, View, XStack, YStack } from "tamagui";
import { useDeleteGoalToday, useUser } from "../../hooks/useUser";
import { DailyGoal } from "../../type/DailyGoal";
import { Button } from "../elements";
import { galonImg } from "../../assets";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function GoalsToday() {
    const { isSuccess, data } = useUser();
    const deleteGoal = useDeleteGoalToday();

    function handleDeleteGoal(id: string) {
        deleteGoal.mutate(id);
    }

    if (data?.data?.goals_today === null) {
        return (
            <YStack
                mt={20}
                width={"100%"}
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={"$5"}
                backgroundColor={"$blue5Light"}
                padding={20}
            >
                <Image source={galonImg} width={120} height={120} />
                <Text textAlign="center" fontSize={16} fontWeight="bold" mt={10}>
                You don't have daily goals
                </Text>
                <Button onPress={() => router.push("/home/create")} mt={15}>
                    <FontAwesome name="plus-circle" size={16} color="white" />
                    <Text ml={5}>Create</Text>
                </Button>
            </YStack>
        );
    }

    if (isSuccess) {
        const goal: DailyGoal = data?.data?.goals_today as DailyGoal;
        return (
            <YStack
                mt={20}
                width={"100%"}
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={"$5"}
                backgroundColor={"$blue5Light"}
                padding={20}
            >
                <Image source={galonImg} width={120} height={120} />
                <XStack justifyContent="space-between" gap={15} mt={15} alignItems="center">
                    <YStack alignItems="center">
                        <Text textAlign="center" fontSize={16} fontWeight="bold">
                            {goal.goal_amount} ml
                        </Text>
                        <Text textAlign="center" fontSize={12} color="$gray11">
                            Goal
                        </Text>
                    </YStack>
                    <Text textAlign="center" fontSize={20} fontWeight="bold" color="$gray11">
                        |
                    </Text>
                    <YStack alignItems="center">
                        <Text textAlign="center" fontSize={16} fontWeight="bold">
                            {goal.remaining_water} ml
                        </Text>
                        <Text textAlign="center" fontSize={12} color="$gray11">
                            Water Remaining
                        </Text>
                    </YStack>
                    <Text textAlign="center" fontSize={20} fontWeight="bold" color="$gray11">
                        |
                    </Text>
                    <YStack alignItems="center">
                        <Text textAlign="center" fontSize={16} fontWeight="bold">
                            {goal.total_water_intake} ml
                        </Text>
                        <Text textAlign="center" fontSize={12} color="$gray11">
                            Water Intakes Today
                        </Text>
                    </YStack>
                </XStack>
                <XStack padding={10} gap={20} justifyContent="center" mt={20}>
                    <Button onPress={() => router.push("/home/create")}>
                        <FontAwesome name="edit" size={16} color="white" />
                    </Button>
                    <Button
                        backgroundColor={"$yellow10Light"}
                        pressStyle={{
                            backgroundColor: "$yellow11Light",
                        }}
                        onPress={() => router.push(`/home/daily_goal/${goal.id}`)}
                    >
                        <FontAwesome name="info-circle" size={16} color="white" />
                    </Button>
                    <Button
                        backgroundColor={"$red11Light"}
                        pressStyle={{
                            backgroundColor: "$red11Light",
                        }}
                        onPress={() => handleDeleteGoal(String(goal.id))}
                    >
                        <FontAwesome name="trash" size={16} color="white" />
                    </Button>
                </XStack>
            </YStack>
        );
    }

    return null;
}
