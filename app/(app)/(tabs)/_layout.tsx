import React from 'react'
import { Tabs } from 'expo-router'
import { Image, ImageSourcePropType, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className='flex-1 flex flex-col items-center'>
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode='contain'
      className={`${focused ? "size-8" : "size-6"} `}
    />
    <Text
      className={`${focused
          ? "text-primary font-rubik-extrabold"
          : "text-black-200 font-rubik"
        } text-xs w-full text-center `}
    >
      {title}
    </Text>
  </View>
);
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarShowLabel: false, tabBarStyle: {
        backgroundColor: "white",
        position: "absolute",
        borderTopColor: "#0061FF1A",
        borderTopWidth: 1,
        minHeight: 70,

      }
    }}>
      <Tabs.Screen name='home' options={{
        tabBarIcon: ({ focused }) => (
          <View className='flex-1 flex flex-col items-center '>
            <MaterialCommunityIcons name="home" size={focused? 30: 24} color={focused? "#53b175" : "black"} />
          
            <Text
              className={`${focused
                  ? "text-primary font-rubik-extrabold"
                  : "text-black-200 font-rubik"
                } text-base w-full text-center `}
            >
              Home
            </Text>
          </View>
        ),
      }} />
      <Tabs.Screen name='explore' options={{
         tabBarIcon: ({ focused }) => (
          <View className='flex-1 flex flex-col items-center '>
            <AntDesign name="search1" size={focused? 30: 24} color={focused? "#53b175" : "black"} />
            <Text
              className={`${focused
                  ? "text-primary font-rubik-extrabold"
                  : "text-black-200 font-rubik"
                } text-base w-full text-center `}
            >
              Explore
            </Text>
          </View>

        ),
        
      }} />
      <Tabs.Screen name='Cart' options={{
        tabBarIcon: ({ focused }) => (
          <View className='flex-1 flex flex-col items-center'>
            <Ionicons name="cart-outline" size={ focused? 30 : 24} color={focused? "#53b175" : "black"} />
            <Text
              className={`${focused
                  ? "text-primary font-rubik-extrabold"
                  : "text-black-200 font-rubik"
                } text-base w-full text-center `}
            >
              Cart
            </Text>
          </View>

        ),
      }} />
      <Tabs.Screen name='favorite' options={{
        tabBarIcon: ({ focused }) => (
          <View className='flex-1 flex flex-col items-center'>
            <EvilIcons name="heart" size={ focused? 30 : 24} color={focused? "#53b175" : "black"} />
            <Text
              className={`${focused
                  ? "text-primary font-rubik-extrabold"
                  : "text-black-200 font-rubik"
                } text-base w-full text-center `}
            >
              Favourite
            </Text>
          </View>

        ),
      }} />
      <Tabs.Screen name='profile' options={{
        tabBarIcon: ({ focused }) => (
          <View className='flex-1 flex flex-col items-center'>
            <MaterialCommunityIcons name="account-outline" size={ focused? 30 : 24} color={focused? "#53b175" : "black"} />
             <Text
              className={`${focused
                  ? "text-primary font-rubik-extrabold"
                  : "text-black-200 font-rubik"
                } text-base w-full text-center `}
            >
              Profile
            </Text>
          </View>
        ),
      }} />
    </Tabs>
  )
}

export default TabsLayout

