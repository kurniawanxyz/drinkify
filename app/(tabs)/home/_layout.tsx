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
        <Stack.Screen
            name='daily_goal/[id]'
            
            options={{
                title: "Detail Goal Today",
                presentation:"modal",
                animation: "slide_from_bottom"
            }}
         />
        <Stack.Screen
            name='history/[id]'
            
            options={{
                title: "Detail Goals",
                presentation:"modal",
                animation: "slide_from_bottom"
            }}
         />

         
    </Stack>
  )
}
