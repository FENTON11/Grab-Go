
import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router';

const Protectedlayout = () => {
    const user = false; // Replace with your actual user authentication logic
  return (
  
   user?<Slot/>:<Redirect href={"/"}/>
   
  )
}

export default Protectedlayout