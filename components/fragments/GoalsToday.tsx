import { Card, Image, Text, View, XStack, YStack } from "tamagui";
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

  if (!isSuccess || !data) {
    return null; // Show nothing while loading
  }

  const goal: DailyGoal | null = data?.data?.goals_today || null;

  return (
    <Card>
            <YStack
      mt={20}
      width="100%"
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={20}
      borderRadius="$5"
      backgroundColor="$backgroundSoft"
      space
    >
      <Image source={galonImg} width={120} height={120} />
      {!goal ? (
        <YStack alignItems="center" space>
          <Text textAlign="center" fontSize={18} fontWeight="bold" color="$color">
            You don't have daily goals
          </Text>
          <Button
            onPress={() => router.push("/home/create")}
            size="$4"
            icon={<FontAwesome name="plus-circle" size={16} color="white" />}
          >
            Create Daily Goal
          </Button>
        </YStack>
      ) : (
        <YStack space>
          <XStack justifyContent="space-between" alignItems="center" gap={20}>
            <GoalItem label="Goal" value={`${goal.goal_amount} ml`} />
            <Divider />
            <GoalItem label="Remaining" value={`${goal.remaining_water} ml`} />
            <Divider />
            <GoalItem label="Intake Today" value={`${goal.total_water_intake} ml`} />
          </XStack>
          <XStack justifyContent="center" gap={15} mt={20}>
            <Button
              onPress={() => router.push("/home/create")}
              backgroundColor="$blue10"
              icon={<FontAwesome name="edit" size={16} color="white" />}
            >
              Edit
            </Button>
            <Button
              onPress={() => router.push(`/home/daily_goal/${goal.id}`)}
              backgroundColor="$yellow10"
              icon={<FontAwesome name="info-circle" size={16} color="white" />}
            >
              Details
            </Button>
            <Button
              onPress={() => handleDeleteGoal(String(goal.id))}
              backgroundColor="$red10"
              icon={<FontAwesome name="trash" size={16} color="white" />}
            >
              Delete
            </Button>
          </XStack>
        </YStack>
      )}
    </YStack>
    </Card>
  );
}

// Komponen untuk menampilkan item tujuan
function GoalItem({ label, value }: { label: string; value: string }) {
  return (
    <YStack alignItems="center" space>
      <Text fontSize={18} fontWeight="bold" color="$color">
        {value}
      </Text>
      <Text fontSize={14} color="$colorMuted">
        {label}
      </Text>
    </YStack>
  );
}

// Divider untuk memisahkan item
function Divider() {
  return <Text fontSize={20} color="$colorMuted">|</Text>;
}
