import React, { useState } from 'react'
import {  Heading, Image, Input, Text, View, YStack } from 'tamagui'
import { LogoImg } from '../../assets'
import { Link, router } from 'expo-router'
import { Button } from '../elements'
import { handleFetch } from '../../utils'

export default function LoginScreen() {
    const [data, setData] = useState({
        email:'',
        password:''
    })

    async function handleRegister(){
        try {
            const response = await handleFetch<null>("/auths/register",{
                method: "POST",
                data: data,
            })
            if(response.success){
                return router.push("/")
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <View
        width={"100%"}
        flex={1}
        alignItems='center'
        justifyContent='center'
    >
        <View
            backgroundColor={"$blue11Light"}
            borderRadius={"$12"}
        >
            <Image src={LogoImg} width={100} height={100}/>
        </View>
        <Heading fontWeight={"bold"} marginTop={10}>Drinkify</Heading>
        <Text>Please login to continue</Text>

        <YStack width={"70%"} mt={"$8"}>
            <Input placeholder='Email' keyboardType='email-address'/>
            <Input placeholder='Password' secureTextEntry mt={"$2"}/>
            <Button  backgroundColor={"$blue11Light"} theme={'active'} color={"white"} mt={"$5"}>Login</Button>
        </YStack>
        <Text mt={"$8"}>Don't have an account yet? <Link href={"/register"}><Text color={"$accentColor"} fontWeight={"500"}>Register!</Text></Link></Text>
    </View>
  )
}
