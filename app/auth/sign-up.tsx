import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function SignUpScreen() {
  type FormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Account created successfully!');
      // Here you would typically send data to your backend
      // navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
    <StatusBar style="dark" />
    <ScrollView 
      className="flex-1 bg-white p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="auto" />
      
      {/* Header with Logo */}
      <View className="items-center mb-8 mt-10">
        <Text className="text-3xl font-bold text-blue-600 mb-2 ">CHECK IN</Text>
        <Text className="text-xl text-black">Create your account</Text>
      </View>
      
      {/* Form */}
      <View className="space-y-4 mb-6">
        {/* Full Name */}
        <View>
          <Text className="text-black mb-1 text-2xl font-medium">Full Name</Text>
          <TextInput
            className={`border rounded-lg p-3 text-black ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your full name"
            placeholderTextColor="#9CA3AF"
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
          />
          {errors.fullName && <Text className="text-red-500 text-xs mt-1">{errors.fullName}</Text>}
        </View>
        
        {/* Email */}
        <View>
          <Text className="text-black mb-1 text-2xl font-medium">Email</Text>
          <TextInput
            className={`border rounded-lg p-3 text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
        </View>
        
        {/* Password */}
        <View>
          <Text className="text-black mb-1 text-2xl font-medium">Password</Text>
          <View className={`flex-row items-center border rounded-lg pr-3 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
            <TextInput
              className="flex-1 p-3 text-black"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons 
                name={showPassword ? 'visibility-off' : 'visibility'} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
        </View>
        
        {/* Confirm Password */}
        <View>
          <Text className="text-black mb-1  text-2xl font-medium">Confirm Password</Text>
          <View className={`flex-row items-center border rounded-lg pr-3 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}>
            <TextInput
              className="flex-1 p-3 text-black"
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirmPassword}
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons 
                name={showConfirmPassword ? 'visibility-off' : 'visibility'} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword}</Text>}
        </View>
        
        {/* Terms and Conditions */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity className="mr-2">
            <MaterialIcons name="check-box-outline-blank" size={32} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-black text-xl">
            I agree to the <Text className="text-blue-600">Terms</Text> and <Text className="text-blue-600">Privacy Policy</Text>
          </Text>
        </View>
        
        {/* Sign Up Button */}
        <TouchableOpacity 
          className="bg-blue-600 py-3 rounded-lg mt-6"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>
        
        {/* Social Login Options */}
        <View className="flex-row justify-center space-x-4 mt-6">
          <TouchableOpacity className="border border-gray-300 p-3 rounded-full">
            <MaterialIcons name="facebook" size={24} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 p-3 rounded-full">
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 p-3 rounded-full">
            <MaterialIcons name="apple" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer */}
      <View className="flex-row justify-center ">
        <Text className="text-black">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
          <Text className="text-blue-600 font-bold">Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}