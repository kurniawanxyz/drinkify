// import '../tamagui-web.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { tamaguiConfig } from '../tamagui.config'
import { ReactNode } from 'react'

export default function ExpoTamaguiProvider({children}: {children: ReactNode}) {
  const colorScheme = useColorScheme()

  return (
    // add this
    <TamaguiProvider config={tamaguiConfig} defaultTheme={'dark'}>
      <ThemeProvider value={DarkTheme}>
        {children}
      </ThemeProvider>
    </TamaguiProvider>
  )
}
