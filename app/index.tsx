// // app/index.tsx
// import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
// import React from 'react';
// import { router } from 'expo-router';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const SplashScreen = () => {
//   // Function to navigate to sign-up screen
//   const navigateToSignup = () => {
//     router.replace('/auth/sign-up'); // Adjust this path as necessary
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#53b175] items-center justify-center">
//       <StatusBar barStyle="light-content" backgroundColor="#53b175" />
//       <View className="flex-row items-center gap-[15px]">
//         <Image
//           className='h-[100px] w-[90px] '
//           style={{ tintColor: 'white' }}
//           source={require('@/assets/images/logo.png')} // Ensure the image path is correct
//         />
//         <View>
//           <Text className="text-white text-2xl font-rubik">Grab & GO</Text>
//           <Text className="text-white text-base font-rubik-bold text-center tracking-[5px] mt-2">
//             online groceries
//           </Text>
//         </View>
//       </View>
//       {/* Button to navigate to sign-up screen */}
//       <TouchableOpacity onPress={navigateToSignup}
//         className="mt-5 bg-[#f99808] px-6 py-3 rounded-full">
//         <Text className="text-white text-lg font-rubik-bold">Get Started</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default SplashScreen;

import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react'; // Import useEffect
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();
  
// Add this useEffect to auto-navigate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
     router.push('/(welcome)/welcome')
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#53b175] items-center justify-center">
      <StatusBar barStyle="light-content" backgroundColor="#53b175" />
      <View className="flex-row items-center gap-[15px]">
        <Image
          className='h-[100px] w-[90px] '
          style={{ tintColor: 'white' }}
          source={require('@/assets/images/logo.png')} // Ensure the image path is correct
        />
        <View>
          <Text className="text-white text-2xl font-rubik">Grab & GO</Text>
          <Text className="text-white text-base font-rubik-bold text-center tracking-[5px] mt-2">
            online groceries
          </Text>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default SplashScreen;