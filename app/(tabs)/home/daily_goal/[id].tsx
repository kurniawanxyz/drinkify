import { router, useLocalSearchParams } from 'expo-router'
import { Card, Input, ScrollView, Text, View } from 'tamagui'
import { useDetailDailyGoal } from '../../../../hooks/useDailyGoal'
import { Button } from '../../../../components';
import { useAddWaterIntake } from '../../../../hooks/useWaterIntake';
import { useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import { format } from 'date-fns';

export default function DetailDailyGoalId() {
  const {id} = useLocalSearchParams()
  const {data, isSuccess} = useDetailDailyGoal(String(id));
  const { mutate } = useAddWaterIntake(String(id))
  const [amount, setAmount] = useState(0);

  function handleSubmit(){
    mutate({
      amount
    })

    router.push("/home")
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
          padding={20}
          pb={50}
          gap={10}
        >
            {
              data.data?.water_intakes.map((item)=>(
                <Card
                  padding={10}
                  flex={1}
                  flexDirection='row'
                  justifyContent='space-between'
                >
                  <Text w={"50%"}>{format(item.created_at,"k:m a")}</Text>
                  <Text w={"50%"}>{item.amount} ml</Text>
                </Card>
              ))
            }
        </View>
      </ScrollView>
    )
  }
}
