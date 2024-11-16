import { router, useLocalSearchParams } from 'expo-router'
import { Card, Input, ScrollView, Text, View } from 'tamagui'
import { useDeleteWaterIntake, useDetailDailyGoal } from '../../../../hooks/useDailyGoal'
import { Button } from '../../../../components';
import { useAddWaterIntake } from '../../../../hooks/useWaterIntake';
import { useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import { format } from 'date-fns';

export default function DetailDailyGoalId() {
  const {id} = useLocalSearchParams()
  const {data, isSuccess} = useDetailDailyGoal(String(id));
  const { mutate } = useAddWaterIntake(String(id))
  const waterIntake = useDeleteWaterIntake(String(id))
  const [amount, setAmount] = useState(0);

  function handleSubmit(){
    mutate({
      amount
    })

    router.push("/home")
  }
    function handleDelete(id: string){
      waterIntake.mutate(id)
    }

  if(isSuccess){
    return (
      <ScrollView
        padding={20}
      >
        <Card padding={20}>
          <View>
            <Text fontSize={15}>Water intake</Text>
            <Input keyboardType='decimal-pad' onChangeText={(w)=> setAmount(Number(w))} placeholder='Amount ml'/>
            <Button onPress={handleSubmit} mt={20}>Add</Button>
          </View>
        </Card>
        <View
          mt={30}
          pb={50}
          gap={10}
        >
            {
              data.data?.water_intakes.map((item)=>(
                <Card
                  padding={10}
                  paddingHorizontal={15}
                  flex={1}
                  flexDirection='row'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Text>{format(item.created_at,"k:m a")}</Text>
                  <Text>{item.amount} ml</Text>
                  <Button onPress={()=>handleDelete(String(item.id))}>Delete</Button>
                </Card>
              ))
            }
        </View>
      </ScrollView>
    )
  }
}
