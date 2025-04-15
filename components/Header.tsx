import { View, Text } from 'react-native'
import React from 'react'

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View className='mt-10 flex-row justify-between items-center'>
      <Text className='text-xl font-rubik-semibold'>{title}</Text>
      <Text className='text-primary font-rubik text-base'>See all</Text>
    </View>
  )
}

export default Header