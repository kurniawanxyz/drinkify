import { useLocalSearchParams } from 'expo-router'
import { Card, Image, ScrollView, Text, View, XStack, YStack } from 'tamagui'
import { useDetailDailyGoal } from '../../../../hooks/useDailyGoal'
import { format } from 'date-fns';
import { galonImg } from '../../../../assets';

export default function HistoryRoute() {
  const {id} = useLocalSearchParams()
  const {data, isSuccess} = useDetailDailyGoal(String(id));

  if(isSuccess){
    const goal = data?.data
    return (
      <ScrollView
        padding={20}
      >

<YStack
                mt={10}
                width={"100%"}
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRadius={"$5"}
                backgroundColor={"$blue5Light"}
                padding={30}
            >
                <Image source={galonImg} width={100} h={100} />
                <XStack
                    justifyContent="space-between"
                    gap={15}
                    mt={10}
                >
                    <YStack>
                        <Text textAlign="center" fontSize={13} fontWeight={"bold"}>{goal?.goal_amount} ml</Text>
                        <Text textAlign="center" fontSize={10} >Goal</Text>
                    </YStack>
                    <Text textAlign="center" fontSize={20} fontWeight={"bold"}>|</Text>
                    <YStack>
                        <Text textAlign="center" fontSize={13} fontWeight={"bold"}>{goal?.remaining_water} ml</Text>
                        <Text textAlign="center" fontSize={10} >Water remaining</Text>
                    </YStack>
                    <Text textAlign="center" fontSize={20} fontWeight={"bold"}>|</Text>
                    <YStack>
                        <Text textAlign="center" fontSize={13} fontWeight={"bold"}>{goal?.total_water_intake} ml</Text>
                        <Text textAlign="center" fontSize={10} >Water Intakes</Text>
                    </YStack>
                </XStack>
            </YStack>

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
                  <Text>{format(item.created_at,"dd MMMM yyyy k:m a")}</Text>
                  <Text>{item.amount} ml</Text>
                  {/* <Button onPress={()=>handleDelete(String(item.id))}>Delete</Button> */}
                </Card>
              ))
            }
        </View>
      </ScrollView>
    )
  }
}
