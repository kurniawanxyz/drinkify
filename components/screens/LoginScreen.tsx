import React, { useState } from 'react'
import { Heading, Image, Input, Text, View, YStack } from 'tamagui'
import { LogoImg } from '../../assets'
import { Link, router } from 'expo-router'
import { Button } from '../elements'
import { handleFetch } from '../../utils'
import { LoginResponse } from '../../type/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginScreen() {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    async function handleLogin() {
        try {
            const response = await handleFetch<LoginResponse>("/auths/login", {
                method: "POST",
                data: data,
            })
            console.log("tes")
            console.log({response})
            if (response.success) {
             await AsyncStorage.setItem("access_token", response.data?.token as string)
             await AsyncStorage.setItem("expired_at", response.data?.expired_at as string)
             return router.push("(tabs)/home")
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
                overflow='hidden'
            >
                <Image src={LogoImg} width={100} height={100} />
            </View>
            <Heading fontWeight={"bold"} marginTop={10}>Drinkify</Heading>
            <Text>Please login to continue</Text>

            <YStack width={"70%"} mt={"$8"}>
                <Input
                    onChangeText={(e) => {
                        setData((prev) => ({
                            ...prev,
                            email: e
                        }))
                    }}
                    placeholder='Email'
                    keyboardType='email-address' />
                <Input
                    onChangeText={(e) => {
                        setData((prev) => ({
                            ...prev,
                            password: e
                        }))
                    }}
                    placeholder='Password'
                    secureTextEntry
                    mt={"$2"} />
                <Button
                    onPress={handleLogin}
                    backgroundColor={"$blue11Light"}
                    theme={'active'}
                    color={"white"}
                    mt={"$5"}
                >Login</Button>
            </YStack>
            <Text mt={"$8"}>Don't have an account yet? <Link href={"/register"}><Text color={"$accentColor"} fontWeight={"500"}>Register!</Text></Link></Text>
        </View>
    )
}
