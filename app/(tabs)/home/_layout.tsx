import { router, Stack } from 'expo-router'
import { Button } from '../../../components'

export default function HomeLayout() {
  return (
    <Stack>
        <Stack.Screen name='index'/>
        <Stack.Screen
            name='create'
            
            options={{
                title: "Create Today Goal",
                presentation:"modal",
                animation: "slide_from_bottom"
            }}
         />
    </Stack>
  )
}
