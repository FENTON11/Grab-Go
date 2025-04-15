// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { StatusBar } from 'expo-status-bar'
// import EvilIcons from '@expo/vector-icons/EvilIcons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// const Cart = () => {
//   return (
//     <SafeAreaView className='px-10  bg-secondary flex-1 gap-10 '>
//       <Text className='font-rubik-bold text-3xl text-center mt-12 '> My Cart</Text>
//       {/* <Text className='font-rubik text-base text-center mt-4 '> You have no items in your cart</Text> */}
//       {/* parent container */}
//       <View className=' h-48  border-b-2 border-gray-500 mt-10 flex-row gap-5'>
//         {/* child 1 */}
//         <View className='flex-[0.35]  justify-center items-center'>
//           <Image
//             source={{ uri: "https://img.freepik.com/free-psd/juicy-red-strawberries-fresh-harvest-pile-berries_84443-42498.jpg?uid=R136135220&ga=GA1.1.963878250.1741008880&semt=ais_hybrid&w=740" }}
//             className='w-48 h-48 '
//             resizeMode='contain'
//           />
//         </View>
//         {/* child 2 */}
//         <View className='flex-[0.7] '>
//           <View className='flex-row justify-between  items-center'>
//             <Text className='font-rubik-bold text-2xl '>Strawberry</Text>
//             <TouchableOpacity
//               onPress={() => {
//                 console.log('close')
//               }}
//             >
//               <EvilIcons name="close" size={30} color="black" />
//             </TouchableOpacity>

//           </View>
//           <View>
//             <Text className='font-rubik-medium text-xl text-gray-700 '>1kg, Price</Text>
//           </View>
//           <View className=' justify-between flex-row items-center '>
//             <View className='flex-row gap-5 items-center mt-5'>
//             <AntDesign name="minuscircleo" size={50} color="gray" />
//             <Text className='font-rubik-bold text-2xl'>1</Text>
//             <AntDesign name="pluscircleo" size={50} color="gray" />
//             </View>
//             <Text className='font-rubik-bold text-3xl '>$ 4.99</Text>
//           </View>
//         </View>
//          {/* child 2 */}
//       </View>
//     </SafeAreaView>
//   )
// }

// export default Cart



import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Cart = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Strawberry',
      price: 4.99,
      quantity: 1,
      weight: '1kg',
      image: 'https://img.freepik.com/free-psd/juicy-red-strawberries-fresh-harvest-pile-berries_84443-42498.jpg',
    },
    {
      id: 2,
      name: 'Egg Chicken Red',
      price: 6.99,
      quantity: 2,
      weight: '500g',
      image: 'https://img.freepik.com/free-photo/eggs-basket_1203-7687.jpg?uid=R136135220&ga=GA1.1.963878250.1741008880&semt=ais_hybrid&w=740',
    }
  ]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <SafeAreaView className='px-6 bg-secondary flex-1'>
      <StatusBar style='dark' />
      <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
      <Text className='font-rubik-bold text-3xl text-center mt-6'>My Cart</Text>
      
      {cartItems.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='font-rubik text-base text-center mt-4'>You have no items in your cart</Text>
        </View>
      ) : (
        <>
          <View className='mt-6 flex-1'>
            {cartItems.map((item) => (
              <View key={item.id} className='h-40 border-b border-gray-300 mb-4 flex-row gap-4'>
                {/* Product Image */}
                <View className='flex-[0.35] justify-center items-center'>
                  <Image
                    source={{ uri: item.image }}
                    className='w-32 h-32 rounded-lg'
                    resizeMode='cover'
                  />
                </View>
                
                {/* Product Details */}
                <View className='flex-[0.7] justify-center'>
                  <View className='flex-row justify-between items-center'>
                    <Text className='font-rubik-bold text-xl'>{item.name}</Text>
                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                      <MaterialIcons name="close" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text className='font-rubik-medium text-lg text-gray-700'>{item.weight}, Price</Text>
                  
                  <View className='flex-row justify-between items-center mt-3'>
                    <View className='flex-row items-center gap-4'>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                        <FontAwesome5 name="minus-circle" size={30} color="#6b7280" />
                      </TouchableOpacity>
                      <Text className='font-rubik-bold text-xl'>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                        <FontAwesome5 name="plus-circle" size={30} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                    <Text className='font-rubik-bold text-xl'>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Checkout Section */}
          <View className='py-4 border-t border-gray-300'>
            <View className='flex-row justify-between mb-2'>
              <Text className='font-rubik text-lg'>Subtotal</Text>
              <Text className='font-rubik-bold text-lg'>${calculateTotal()}</Text>
            </View>
            <View className='flex-row justify-between mb-4'>
              <Text className='font-rubik text-lg'>Delivery</Text>
              <Text className='font-rubik-bold text-lg'>$2.99</Text>
            </View>
            <View className='flex-row justify-between mb-4'>
              <Text className='font-rubik-bold text-xl'>Total</Text>
              <Text className='font-rubik-bold text-xl'>${(parseFloat(calculateTotal()) + 2.99).toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              className='bg-primary py-3 mt-[30px] h-24 rounded-lg justify-center items-center'
              activeOpacity={0.8}
              onPress={() => router.push("/(app)/(stack)/Checkout")}
            >
              <Text className='font-rubik-bold text-white text-lg'>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Cart