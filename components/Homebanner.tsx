import { View, Text ,Image} from 'react-native'
import React from 'react'

const Homebanner = () => {
  return (
    <View className='mt-5'>
     <Image
        className='h-40 w-full rounded-xl'
        source={require('@/assets/images/banner.png')}
        resizeMode='cover'
       
     />
    </View>
  )
}

export default Homebanner