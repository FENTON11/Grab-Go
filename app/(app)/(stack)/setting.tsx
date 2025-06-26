import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Switch } from 'react-native';
import { useState } from 'react';

export default function SettingsScreen() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => router.replace('/auth/sign-in')
        }
      ]
    );
  };

  type MaterialIconName =
    | "person"
    | "notifications"
    | "email"
    | "lock"
    | "security"
    | "brightness-2"
    | "brightness-7"
    | "language"
    | "info";

  interface SettingsItem {
    name: string;
    icon: MaterialIconName;
    action: () => void;
    isSwitch?: boolean;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
  }

  const settingsItems: { title: string; items: SettingsItem[] }[] = [
    {
      title: "Account",
      items: [
        { 
          name: "Profile", 
          icon: "person",
          action: () => router.push('/profile') 
        },
        { 
          name: "Notifications", 
          icon: "notifications",
          action: () => router.push('/notifications'),
          isSwitch: true,
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled
        },
        { 
          name: "Email Notifications", 
          icon: "email",
          action: () => {},
          isSwitch: true,
          value: emailNotificationsEnabled,
          onValueChange: setEmailNotificationsEnabled
        },
        { 
          name: "Privacy", 
          icon: "lock", 
          action: () => router.push('/privacy') 
        },
        { 
          name: "Security", 
          icon: "security", 
          action: () => router.push('/security') 
        },
      ]
    },
    {
      title: "App",
      items: [
        { 
          name: "Dark Mode", 
          icon: colorScheme === 'dark' ? "brightness-2" : "brightness-7",
          action: toggleColorScheme,
          isSwitch: true,
          value: colorScheme === 'dark',
          onValueChange: toggleColorScheme
        },
        { 
          name: "Language", 
          icon: "language", 
          action: () => router.push('/language') 
        },
        { 
          name: "About", 
          icon: "info", 
          action: () => router.push('/about') 
        },
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Profile Header */}
      <View className="p-6 bg-white dark:bg-gray-800 items-center">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          className="w-20 h-20 rounded-full mb-3"
        />
        <Text className="text-xl font-bold text-black dark:text-white">John Doe</Text>
        <Text className="text-gray-500 dark:text-gray-400">john.doe@example.com</Text>
        <TouchableOpacity
          className="mt-3 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full"
          onPress={() => router.push('/profile')}
        >
          <Text className="text-blue-600 dark:text-blue-400 font-medium">View Profile</Text>
        </TouchableOpacity>
      </View>
      
      {/* Settings Sections */}
      <View className="pb-4 mt-2">
        {settingsItems.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-2">
            {/* Section Header */}
            <Text className="text-gray-500 dark:text-gray-400 text-sm font-medium px-6 py-3">
              {section.title}
            </Text>
            
            {/* Section Items */}
            <View className="bg-white dark:bg-gray-800">
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700"
                  onPress={item.action}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    <MaterialIcons 
                      name={item.icon} 
                      size={22} 
                      color={colorScheme === 'dark' ? '#9CA3AF' : '#4B5563'} 
                      className="mr-4" 
                    />
                    <Text className="text-black dark:text-white text-base">{item.name}</Text>
                  </View>
                  
                  {item.isSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ true: '#3B82F6', false: '#D1D5DB' }}
                      thumbColor={colorScheme === 'dark' ? '#F3F4F6' : '#FFFFFF'}
                    />
                  ) : (
                    <MaterialIcons 
                      name="chevron-right" 
                      size={22} 
                      color={colorScheme === 'dark' ? '#6B7280' : '#9CA3AF'} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
      
      {/* Log Out Button */}
      <TouchableOpacity
        className="mx-6 my-8 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800 items-center"
        onPress={handleLogout}
      >
        <Text className="text-red-600 dark:text-red-400 font-medium">Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

