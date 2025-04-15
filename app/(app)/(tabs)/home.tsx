import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Homeicon from '@/components/Homeicon'
import Search from '@/components/Search'
import Homebanner from '@/components/Homebanner'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Header'
import Products from '@/components/Products'
import { fruits, vegetables } from '@/utils/data'



const index = () => {
  
  return (
    <SafeAreaView className='px-14 pt-14 flex-1 bg-secondary '>
      <StatusBar style='dark' backgroundColor='white' />
      <ScrollView className='flex-1 '
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      
      >
      <View className='gap-10'>
       <Homeicon/>
       <Search/>
       <Homebanner/>
       <Header title='Exclusive Offer'/>
       <Products data={fruits}/>
       <Header title='Best Selling'/>
       <Products data={vegetables}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index