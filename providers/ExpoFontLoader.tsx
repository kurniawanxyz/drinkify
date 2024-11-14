import { ReactNode } from 'react'
import { View } from 'tamagui'

type Props = {
    children: ReactNode
}

export default function ExpoFontLoader({children}: Props) {
  return (
    <View>
        {children}
    </View>
  )
}