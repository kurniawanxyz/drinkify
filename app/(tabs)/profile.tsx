import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, XStack, YStack, Card, useTheme } from 'tamagui';
import { useUser } from '../../hooks/useUser';
import { Button } from '../../components';
import { handleFetch } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FaIcon from '@expo/vector-icons/FontAwesome';

type User = {
  name: string;
  email: string;
  goals_success: number;
  goals_failed: number;
  average_water_intakes: number;
};

export default function ProfileRoute() {
  const { data, isSuccess } = useUser();
  const theme = useTheme();

  async function handleLogout() {
    const response = await handleFetch('/auths/logout', { method: 'POST' });
    if (response.success) {
      await AsyncStorage.multiRemove(['access_token', 'expired_at']);
      router.push('/');
    }
  }

  if (isSuccess) {
    const user = data?.data;

    return (
      <ScrollView padding={20} backgroundColor={theme.background}>
        {/* Profile Info Section */}
        <Card
          padding={25}
          backgroundColor={theme.backgroundStrong}
          borderRadius={16}
          shadowColor={theme.shadowColor}
          shadowRadius={12}
          shadowOpacity={0.2}
          alignItems="center"
        >
          <FaIcon name="user-circle" size={80} color={theme.primary as any} />
          <YStack gap={5} alignItems="center" mt={15}>
            <Text fontSize={22} fontWeight="600" color={theme.primary}>
              {user?.name}
            </Text>
            <Text fontSize={16} color={theme.colorMuted}>
              {user?.email}
            </Text>
          </YStack>
        </Card>

        {/* Stats Section */}
        <YStack marginTop={30} gap={20}>
          <Text fontSize={18} fontWeight="600" color={theme.primary}>
            Stats Overview
          </Text>
          <XStack justifyContent="space-between" gap={20}>
            <StatCard
              title="Goal Success"
              value={user?.goals_success ?? 0}
              icon="trophy"
              color={"$blue10"}
              backgroundColor={"$blue8"}
            />
            <StatCard
              title="Goal Failed"
              value={user?.goals_failed ?? 0}
              icon="times-circle"
              color="$yellow10"
              backgroundColor={"$yellow8"}
            />
            <StatCard
              title="Avg Water Intake"
              value={`${user?.average_water_intakes ?? 0} ml`}
              icon="tint"
              color={"$green10"}
              backgroundColor={"$green8"}
            />
          </XStack>
        </YStack>

        {/* Logout Button */}
        <XStack marginTop={40} justifyContent="center">
          <Button
            onPress={handleLogout}
            backgroundColor={theme.red10}
            pressStyle={{ backgroundColor: theme.red11 }}
            icon={<FaIcon name="sign-out" size={18}  />}
            size="large"
            color={theme.color}
          >
            Logout
          </Button>
        </XStack>
      </ScrollView>
    );
  }

  return null;
}

// Komponen Stat Card
type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  backgroundColor: string;
};

function StatCard({
  title,
  value,
  icon,
  color,
  backgroundColor,
}: StatCardProps) {
  return (
    <Card
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={20}
      borderRadius={12}
      backgroundColor={backgroundColor}
      shadowColor={color}
      shadowOpacity={0.2}
      shadowRadius={4}
    >
      <FaIcon name={icon as any} size={28} color={color} />
      <Text fontWeight="bold" fontSize={16} color={color} mt={10}>
        {value}
      </Text>
      <Text fontSize={12} color={color} mt={5}>
        {title}
      </Text>
    </Card>
  );
}
