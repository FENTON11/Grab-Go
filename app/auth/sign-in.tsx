import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const Signin = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className='flex-1 bg-secondary'>
      <StatusBar style='dark' backgroundColor='white' />
      <ScrollView className='flex-1 pt-32'>
        <Image
          className='self-center h-[100px] w-[90px]'
          source={require('@/assets/images/logo.png')}
        />

        <View className='px-5 pt-24'>
          <Text className='text-accent text-3xl font-rubik-medium'>Sign In</Text>
          <Text className='text-accent text-base font-rubik-medium mt-5'>
            Enter credentials to continue
          </Text>
          
         {/* Email */}
          <Text className='text-xl font-rubik-light text-accent mt-10'>Email</Text>
          <TextInput
            placeholder='Enter email'
            className='border-2 border-[#E3E3E3] rounded-lg px-4 py-3 mt-2 focus:border-primary'
            keyboardType='email-address'
          />

          {/* Password */}
          <Text className='text-xl font-rubik-light text-accent mt-10'>Password</Text>
          <View className='relative mt-2'>
            <TextInput
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              maxLength={16}
              placeholder='Enter password'
              className='border-2 border-[#E3E3E3] rounded-lg px-4 py-3 pr-12 text-base text-gray-700 focus:border-primary'
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className='absolute right-4 top-3.5'
            >
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={22} color='gray' />
            </TouchableOpacity>
          </View>
          <Text
            className="text-lg mt-5 tracking-[0.7px] leading-6 font-rubik-medium text-accent opacity-80"
            numberOfLines={2}
          >
         <Text className="font-rubik-medium  ">Forgot Password</Text> 
            
          </Text>

          <TouchableOpacity className='bg-primary rounded-3xl mt-[30px] h-[70px] justify-center items-center'
            activeOpacity={0.7}
            onPress={() => router.replace ("/(app)/(tabs)/home")}
          >
            <Text className='text-2xl text-secondary font-rubik-medium'>Log In</Text>
          </TouchableOpacity>
          <View className='flex-row justify-center items-center mt-5 gap-5'>
            <Text className='text-base items-center font-rubik-medium'>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => router.push('/auth/sign-up')}
            >
              <Text className='text-base text-primary font-rubik-medium'>Sign up</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
