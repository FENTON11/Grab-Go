import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import DropBox from '@/components/DropBox';
const Productdetails = () => {
  
  return (
    <SafeAreaView className='flex-1  bg-secondary'>
      <StatusBar style='dark' backgroundColor='#E5E5E5' />
      <View className='rounded-b-3xl bg-[#E5E5E5]'>
        <View className='flex-row items-center justify-between px-4 py-4'>
          <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://e7.pngegg.com/pngimages/753/551/png-clipart-red-bell-pepper-vegetable-chili-pepper-greengrocer-vegetable-natural-foods-food-thumbnail.png' }}
          className=' h-96 w-full '
          resizeMode='contain'
        />
      </View>
      <View className='px-4 mt-4 flex-row items-center justify-between'>
        <Text className='text-accent text-3xl font-rubik-medium px-4 mt-4'>Bell Pepper Red</Text>
        <EvilIcons name="heart" size={40} color="black" />
      </View>
      <View className='px-4  justify-between'>
        <Text className='text-gray-700 text-base font-rubik-semibold px-4 mt-4'>1kg, Price</Text>
        <Text className='text-accent text-2xl font-rubik-semibold px-4 mt-4'>$ 4.99</Text>
        <DropBox/>
      </View>
      <View>
     
       
      </View>
    </SafeAreaView>
  )
}

export default Productdetails