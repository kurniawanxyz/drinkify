import { useLocalSearchParams } from 'expo-router';
import { Card, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui';
import { useDetailDailyGoal } from '../../../../hooks/useDailyGoal';
import { format } from 'date-fns';
import { galonImg } from '../../../../assets';

export default function HistoryRoute() {
  const { id } = useLocalSearchParams();
  const { data, isSuccess } = useDetailDailyGoal(String(id));

  if (isSuccess) {
    const goal = data?.data;

    return (
      <ScrollView padding={20} space>
        {/* Header Section */}
        <YStack
          mt={10}
          width="100%"
          justifyContent="center"
          alignItems="center"
          borderRadius="$6"
          backgroundColor="$backgroundSoft"
          paddingVertical={30}
          shadowColor="$shadowColor"
          shadowOpacity={0.1}
          shadowRadius={6}
          shadowOffset={{ width: 0, height: 4 }}
        >
          <Image source={galonImg} width={100} height={100} />
          <XStack
            justifyContent="space-between"
            alignItems="center"
            gap={20}
            mt={15}
            px={15}
          >
            {/* Goal Amount */}
            <InfoBox
              title="Goal"
              value={`${goal?.goal_amount} ml`}
              color="$blue10"
            />
            {/* Divider */}
            <Divider />
            {/* Remaining Water */}
            <InfoBox
              title="Remaining"
              value={`${goal?.remaining_water} ml`}
              color="$yellow10"
            />
            {/* Divider */}
            <Divider />
            {/* Water Intake */}
            <InfoBox
              title="Intakes"
              value={`${goal?.total_water_intake} ml`}
              color="$green10"
            />
          </XStack>
        </YStack>

        {/* Water Intake History */}
        <YStack mt={30} pb={50} space={15}>
          {data.data?.water_intakes.length??0 > 0 ? (
            data.data?.water_intakes.map((item) => (
              <Card
                key={item.id}
                flex={1}
                paddingVertical={15}
                paddingHorizontal={20}
                backgroundColor="$backgroundSoft"
                borderRadius="$4"
                shadowColor="$shadowColor"
                shadowOpacity={0.1}
                shadowRadius={4}
                shadowOffset={{ width: 0, height: 2 }}
              >
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize={15} color="$colorMuted">
                    {format(new Date(item.created_at), 'dd MMMM yyyy, k:mm a')}
                  </Text>
                  <Text fontSize={16} fontWeight="bold" color="$blue10">
                    {item.amount} ml
                  </Text>
                </XStack>
              </Card>
            ))
          ) : (
            <EmptyState />
          )}
        </YStack>
      </ScrollView>
    );
  }

  return null;
}

// Komponen untuk kotak informasi
function InfoBox({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <YStack alignItems="center" space={5}>
      <Text fontSize={16} fontWeight="bold" color={color}>
        {value}
      </Text>
      <Text fontSize={12} color="$colorMuted">
        {title}
      </Text>
    </YStack>
  );
}

// Komponen Divider
function Divider() {
  return (
    <View
      width={1}
      height="100%"
      backgroundColor="$colorMuted"
      opacity={0.3}
    />
  );
}

// Komponen untuk keadaan kosong
function EmptyState() {
  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      backgroundColor="$backgroundSoft"
      borderRadius="$6"
      padding={30}
    >
      <Image source={galonImg} width={100} height={100} />
      <Text mt={15} fontSize={16} color="$colorMuted" textAlign="center">
        No water intake history available.
      </Text>
    </YStack>
  );
}
