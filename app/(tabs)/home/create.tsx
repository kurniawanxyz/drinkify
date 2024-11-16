import React, { useState } from 'react'
import { Input, Text, View } from 'tamagui'
import { Button } from '../../../components'
import { useAddTodayGoals } from '../../../hooks/useUser'
import { router } from 'expo-router';

export default function CreateRoute() {
    const [data, setData] = useState({
        amount: 0
    });
    const {mutate} = useAddTodayGoals()
    const handleSubmit = () => {
        if (data.amount <= 0) {
          // Menangani kasus input yang tidak valid
          alert('Amount must be greater than 0');
          return;
        }
    
        mutate({ goal_amount: data.amount }); // Mengirim data amount

        router.push("/home")
      };
  return (
    <View
        flex={1}
        justifyContent='center'
        padding={20}
    >
        <Input
            keyboardType='number-pad'
            placeholder='Amount ml'
            onChangeText={(e)=> setData({
                amount: Number(e)
            })}
        />
        <Button onPress={handleSubmit} mt={10}>Submit</Button>
    </View>
  )
}
