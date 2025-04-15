import { View, Image } from 'react-native'
import React from 'react'

const Homeicon = () => {
    return (
        <View className='justify-center items-center'>
        <Image
            className='self-center h-[45px] w-[40px]'
            source={require('@/assets/images/logo.png')}
        />
       </View>
    )
}

export default Homeicon