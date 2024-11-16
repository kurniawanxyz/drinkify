import { router, useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, ScrollView, Text, View, XStack } from 'tamagui'
import { useUser } from '../../hooks/useUser'
import { Button } from '../../components'
import { handleFetch } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfileRoute() {
  const { data, isSuccess } = useUser()

  async function handleLogout(){
    const response = await handleFetch("/auths/logout",{method:"POST"})
    if(response.success){
      await AsyncStorage.multiRemove(["access_token","expired_at"])
      router.push("/")
    }
  }

  if (isSuccess) {
    return (
      <ScrollView
        padding={20}
      >
        <Card
          padding={20}
        >
          <Text fontSize={20}>{data.data?.name}</Text>
          <Text fontSize={15}>{data.data?.email}</Text>
        </Card>
        <XStack
        marginTop={20}
        justifyContent='flex-end'
        >
          <Button
                  backgroundColor={"$red10Light"}
                  onPress={handleLogout}
                  pressStyle={{
                    backgroundColor:"$red11Light"
                  }}

          >Logout</Button>
        </XStack>
        <XStack
          marginTop={20}
          gap={10}
        >
          <Card
            flex={1}
            justifyContent='center'
            paddingVertical={30}
            alignItems='center'
            >
            <Text fontWeight={"bold"}>{data.data?.goals_success}</Text>
            <Text fontSize={10} mt={10}>Goal Success</Text>
          </Card>
          <Card
            flex={1}
            justifyContent='center'
            padding={10}
            alignItems='center'
            >
            <Text fontWeight={"bold"}>{data.data?.goals_failed}</Text>
            <Text fontSize={10} mt={10}>Goal failed</Text>
          </Card>
          <Card
            flex={1}
            justifyContent='center'
            padding={10}
            alignItems='center'
            >
            <Text fontWeight={"bold"}>{data.data?.average_water_intakes} ml</Text>
            <Text fontSize={10} mt={10}>Avg Water Intakes</Text>
          </Card>
        </XStack>
      </ScrollView>
    )

  }
}
