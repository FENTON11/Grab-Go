import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from '@/utils/data'
import AntDesign from '@expo/vector-icons/AntDesign';
const DropBox = () => {
  const [myIndex, setmyIndex] = useState<number | undefined>()
  const [toggle, setToggle] = useState(false)
  return (
    <View className='px-4 mt-8'>
      <FlatList
        data={Dropdown}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setmyIndex(index)
                setToggle(!toggle)
              }}
              className='flex-row justify-between items-center  border-b-2 border-gray-500 mb-10 py-4'>
              <Text className='font-rubik-light text-2xl'>{item.Title}</Text>
              <AntDesign name={myIndex == index && toggle ? "down" : "right"} size={24} color="black" />
            </TouchableOpacity>
            {myIndex == index && toggle ?
              <Text className='font-rubik-medium text-base'>{item.description}</Text> : null
            }
          </View>

        )}
      />
      <View className='justify-end '>
        <TouchableOpacity className='bg-primary rounded-3xl mt-[30px] h-24 justify-center items-center'
          activeOpacity={0.7}
          onPress={() => {
            console.log('Add to basket')
          }
          }
        >
          <Text className='text-2xl text-secondary font-rubik-medium'>Add To Basket</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default DropBox