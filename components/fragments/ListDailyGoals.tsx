import React from 'react'
import { Heading, Image, Text, View, XStack, YStack } from 'tamagui'
import { useUser } from '../../hooks/useUser'
import {format} from "date-fns"
import { Button } from '../elements'
import { galonImg } from '../../assets'
export default function ListDailyGoals() {

    const { isSuccess, data } = useUser()

    if (data?.data?.daily_goals === null) {
        return (
            <YStack
                mt={10}
            >
                <Heading
                    fontSize={15}
                    fontWeight={"bold"}
                >
                    History Daily Goals
                </Heading>
            </YStack>
        )
    }

    if(isSuccess){
        const dailyGoals = data.data?.daily_goals.slice(0,0)
        return (
            <YStack
                mt={10}
            >
                <Heading
                    fontSize={15}
                    fontWeight={"bold"}
                >
                    History Daily Goals
                </Heading>
                {
                    isSuccess &&  dailyGoals?.map((item)=>(
                        <XStack
                            key={item.id}
                            backgroundColor={"$blue5Light"}
                            px={20}
                            py={"$3"}
                            borderRadius={"$3"}
                            flex={1}
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Text>{format(item.created_at, "dd MMMM yyyy")}</Text>
                            <Button>Detail</Button>
                        </XStack>
                    ))
                }
                {
                    dailyGoals?.length === 0 && (
                        <YStack
                            backgroundColor={"$blue5Light"}
                            padding={30}
                            borderRadius={"$3"}
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Image src={galonImg} h={75} w={75}/>
                            <Text mt={20}>Belum memiliki data daily goals</Text>
                        </YStack>
                    )
                }
            </YStack>
        )
    }

}
