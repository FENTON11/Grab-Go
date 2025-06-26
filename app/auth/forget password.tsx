import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Router } from 'expo-router';
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendResetLink = () => {
    if (validateEmail()) {
      // Here you would typically call your API to send the reset link
      setEmailSent(true);
    }
  };

  return (
    <ScrollView 
      className="flex-1 bg-white p-6"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="items-center mb-8 mt-10">
        <Text className="text-3xl font-bold text-blue-600 mb-2 mt-7">CHECKIN</Text>
        <Text className="text-xl text-black">Forgot Password</Text>
      </View>
      
      {!emailSent ? (
        <>
          <Text className="text-black mb-6 text-center">
            Enter your email to receive a password reset link
          </Text>
          
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-black mb-1 font-medium">Email</Text>
            <TextInput
              className={`border rounded-lg p-3 text-black ${error ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              onSubmitEditing={handleSendResetLink}
            />
            {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
          </View>
          
          {/* Send Reset Link Button */}
          <TouchableOpacity 
            className="bg-blue-600 py-3 rounded-lg mb-6"
            onPress={handleSendResetLink}
          >
            <Text className="text-white text-center font-bold text-lg">Send Reset Link</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
          <View className="flex-row items-start mb-2">
            <MaterialIcons name="check-circle" size={24} color="#3B82F6" className="mr-2" />
            <View className="flex-1">
              <Text className="text-black font-medium">Email sent successfully!</Text>
              <Text className="text-black mt-1">
                A password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-600 text-sm mt-2">
            Didn't receive the email?{' '}
            <Text 
              className="text-blue-600 font-medium" 
              onPress={() => setEmailSent(false)}
            >
              Resend
            </Text>
          </Text>
        </View>
      )}
      
      {/* Back to Login */}
      <TouchableOpacity 
        className="mt-auto mb-6"
        onPress={() => router.back()}
      >
        <Text className="text-blue-600 text-center font-medium">
          Back to Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}