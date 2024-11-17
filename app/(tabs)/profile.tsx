import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, ScrollView, Text, View, XStack, YStack } from 'tamagui'
import { useUser } from '../../hooks/useUser'
import { Button } from '../../components'
import { handleFetch } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FaIcon from '@expo/vector-icons/FontAwesome'

export default function ProfileRoute() {
  const { data, isSuccess } = useUser()

  async function handleLogout() {
    const response = await handleFetch("/auths/logout", { method: "POST" })
    if (response.success) {
      await AsyncStorage.multiRemove(["access_token", "expired_at"])
      router.push("/")
    }
  }

  if (isSuccess) {
    return (
      <ScrollView padding={20}>
        {/* Profile Info Section */}
        <Card padding={20} backgroundColor="$background" borderRadius={16} shadowColor="$shadow" shadowRadius={12}>
          <YStack gap={8} alignItems="center">
            <Text fontSize={22} fontWeight="600" color="$primary">
              {data.data?.name}
            </Text>
            <Text fontSize={16} color="$gray500">
              {data.data?.email}
            </Text>
          </YStack>
        </Card>

        {/* Logout Button */}
        <XStack marginTop={20} justifyContent="flex-end">
          <Button
            backgroundColor="$red10Light"
            onPress={handleLogout}
            pressStyle={{ backgroundColor: "$red11Light" }}
            icon={<FaIcon name="sign-out" size={18} color="#fff" />}
            size="small"
          >
            Logout
          </Button>
        </XStack>

        {/* Stats Section */}
        <YStack marginTop={20} gap={16}>
          <XStack justifyContent="space-between" gap={20}>
            <Card flex={1} justifyContent="center" alignItems="center" padding={15} borderRadius={12} backgroundColor="$blue5Light" shadowColor="$blue500" shadowOpacity={0.1}>
              <FaIcon name="trophy" size={24} color="$blue500" />
              <Text fontWeight="bold" lineBreakMode='clip'  fontSize={14} color="$blue500">{data.data?.goals_success}</Text>
              <Text fontSize={12} color="$blue500" mt={5}>Goal Success</Text>
            </Card>

            <Card flex={1} justifyContent="center" alignItems="center" padding={15} borderRadius={12} backgroundColor="$yellow5Light" shadowColor="$yellow500" shadowOpacity={0.1}>
              <FaIcon name="times-circle" size={24} color="$yellow500" />
              <Text fontWeight="bold" lineBreakMode='clip'  fontSize={14} color="$yellow500">{data.data?.goals_failed}</Text>
              <Text fontSize={12} color="$yellow500" mt={5}>Goal Failed</Text>
            </Card>

            <Card flex={1} justifyContent="center" alignItems="center" padding={15} borderRadius={12} backgroundColor="$green5Light" shadowColor="$green500" shadowOpacity={0.1}>
              <FaIcon name="tint" size={24} color="$green500" />
              <Text fontWeight="bold" lineBreakMode='clip'  fontSize={14}  color="$green500">{data.data?.average_water_intakes} ml</Text>
              <Text fontSize={10} color="$green500" mt={5}>Avg Water Intake</Text>
            </Card>
          </XStack>
        </YStack>
      </ScrollView>
    )
  }

  return null
}
