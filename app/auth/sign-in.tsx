// app/login.tsx
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-secondary px-6">
      <View className="flex-1 justify-center">
        <Text className="text-center text-black font-bold text-xl mb-2">Log In</Text>
        <Text className="text-center text-black font-bold text-3xl mb-6">Welcome back</Text>

        <TextInput
          className="bg-gray-100 text-base px-4 py-4 rounded-xl mb-4 text-black"
          placeholder="Email address"
          placeholderTextColor="#6b7280"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="bg-gray-100 text-base px-4 py-4 rounded-xl mb-2 text-black"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity className="mb-6">
          <Text className="text-blue-600 font-medium text-sm">Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-primary rounded-full py-4 mb-4">
          <Text className="text-center text-white text-base font-semibold">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/sign-up')} 
         className="bg-white border border-gray-300 rounded-full py-4">
          <Text className="text-center text-black font-semibold text-base">New User Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
