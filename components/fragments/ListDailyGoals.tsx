import React from 'react';
import { Card, Heading, Image, Text, View, XStack, YStack } from 'tamagui';
import { useUser } from '../../hooks/useUser';
import { format } from 'date-fns';
import { Button } from '../elements';
import { galonImg } from '../../assets';
import { router } from 'expo-router';
import FaIcon from '@expo/vector-icons/FontAwesome';
import { DailyGoal } from '../../type/DailyGoal';

export default function ListDailyGoals() {
  const { isSuccess, data } = useUser();

  if (!isSuccess || !data) return null;

  const dailyGoals = data.data?.daily_goals?.slice(1) || [];

  return (
    <YStack mt={20} px={8} space>
      <Heading fontSize={18} fontWeight="bold" color="$color">
        History Daily Goals
      </Heading>

      {dailyGoals.length === 0 ? (
        <EmptyState />
      ) : (
        <YStack gap={15}>
          {dailyGoals.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </YStack>
      )}
    </YStack>
  );
}

// Komponen untuk tampilan kartu
function HistoryCard({ item }: { item: DailyGoal }) {
  return (
    <Card>
            <YStack
      backgroundColor="$backgroundSoft"
      borderRadius="$4"
      shadowColor="$shadowColor"
      shadowOpacity={0.1}
      shadowRadius={4}
      shadowOffset={{ width: 0, height: 2 }}
      px={20}
      py={15}
      space={10}
    >
      <XStack alignItems="center" gap={10}>
        <FaIcon name="calendar" size={18} color="$colorMuted" />
        <Text fontSize={16} fontWeight="bold" color="$color">
          {format(new Date(item.created_at), 'EEEE, dd MMMM yyyy')}
        </Text>
      </XStack>
      <Text fontSize={14} color="$colorMuted">
        Keep track of your daily water goals and stay hydrated.
      </Text>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={15} fontWeight="bold" color="$blue10">
          {item.goal_amount} ml
        </Text>
        <Button
          size="$4"
          backgroundColor="$blue10"
          pressStyle={{ backgroundColor: '$blue11' }}
          onPress={() => router.push(`/home/history/${item.id}`)}
        >
          Detail
        </Button>
      </XStack>
    </YStack>
    </Card>
  );
}

// Komponen untuk keadaan kosong
function EmptyState() {
  return (
    <View
      backgroundColor="$backgroundSoft"
      padding={30}
      borderRadius="$4"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={galonImg} width={75} height={75} />
      <Text mt={10} fontSize={16} color="$colorMuted" textAlign="center">
        You don’t have any daily goals yet.
      </Text>
    </View>
  );
}
