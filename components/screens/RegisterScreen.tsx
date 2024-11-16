import { useState } from 'react'
import { Heading, Image, Input, Text, View, YStack } from 'tamagui'
import { Button } from '../elements'
import { LogoImg } from '../../assets'
import { Link, router } from 'expo-router'
import { Register } from '../../type/auth'
import { handleFetch } from '../../utils'

export default function RegisterScreen() {

    const [data, setData] = useState({
        name:'',
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
    <Text>Please register to continue</Text>

    <YStack width={"70%"} mt={"$8"}>
        <Input
         onChangeText={(e)=>{
            setData((prev)=>({
                ...prev,
                name: e
            }))
         }}
        placeholder='Name'/>
        <Input
         onChangeText={(e)=>{
            setData((prev)=>({
                ...prev,
                email: e
            }))
         }}
        placeholder='Email' mt="$2" keyboardType='email-address'/>
        <Input
         onChangeText={(e)=>{
            setData((prev)=>({
                ...prev,
                password: e
            }))
         }}
        placeholder='Password' secureTextEntry mt={"$2"}/>
        <Button onPress={handleRegister} backgroundColor={"$blue11Light"} theme={'active'} color={"white"} mt={"$5"}>Register</Button>
    </YStack>
    <Text mt={"$8"}>Already have an account yet? <Link href={"/"}><Text color={"$accentColor"} fontWeight={"500"}>Login!</Text></Link></Text>
</View>
  )
}
