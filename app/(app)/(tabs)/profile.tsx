import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';

const ProfileScreen = () => {
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (234) 567-8901',
    joinedDate: 'Member since June 2022',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    orders: 24,
    favorites: 8,
    addresses: 3,
  };

  const menuItems: { icon: keyof typeof Feather.glyphMap | keyof typeof AntDesign.glyphMap; name: string; iconType: 'feather' | 'antdesign'; count?: number }[] = [
      { icon: 'user', name: 'Personal Information', iconType: 'feather' },
      { icon: 'shopping-bag', name: 'My Orders', iconType: 'feather', count: user.orders },
      { icon: 'hearto', name: 'Favorites', iconType: 'antdesign', count: user.favorites },
      { icon: 'map-pin', name: 'Saved Addresses', iconType: 'feather', count: user.addresses },
      { icon: 'credit-card', name: 'Payment Methods', iconType: 'feather' },
      { icon: 'settings', name: 'Settings', iconType: 'feather' },
      { icon: 'help-circle', name: 'Help Center', iconType: 'feather' },
      { icon: 'logout', name: 'Log Out', iconType: 'feather' },
  ];

  const renderIcon = (iconType: 'feather' | 'antdesign', iconName: keyof typeof Feather.glyphMap | keyof typeof AntDesign.glyphMap) => {
    switch (iconType) {
      case 'feather':
        return <Feather name={iconName as keyof typeof Feather.glyphMap} size={20} color="#4B5563" />;
      case 'antdesign':
        return <AntDesign name={iconName as keyof typeof AntDesign.glyphMap} size={20} color="#4B5563" />;
      default:
        return <Feather name={iconName as keyof typeof Feather.glyphMap} size={20} color="#4B5563" />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center pt-8 pb-6 bg-white">
          <View className="relative mb-4">
            <Image
              source={{ uri: user.avatar }}
              className="w-24 h-24 rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-green-100 p-2 rounded-full">
              <Feather name="edit-2" size={16} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-rubik-bold">{user.name}</Text>
          <Text className="text-gray-500 mt-1">{user.email}</Text>
          <Text className="text-gray-400 text-sm mt-1">{user.joinedDate}</Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-around mx-4 my-4">
          <View className="bg-white p-4 rounded-lg shadow-sm w-28 items-center">
            <Text className="text-2xl font-rubik-bold text-primary">{user.orders}</Text>
            <Text className="text-gray-500 mt-1">Orders</Text>
          </View>
          <View className="bg-white p-4 rounded-lg shadow-sm w-28 items-center">
            <Text className="text-2xl font-rubik-bold text-primary">{user.favorites}</Text>
            <Text className="text-gray-500 mt-1">Favorites</Text>
          </View>
          <View className="bg-white p-4 rounded-lg shadow-sm w-28 items-center">
            <Text className="text-2xl font-rubik-bold text-primary">{user.addresses}</Text>
            <Text className="text-gray-500 mt-1">Addresses</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mx-4 mt-2 mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center justify-between p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="mr-4">
                  {renderIcon(item.iconType, item.icon)}
                </View>
                <Text className="text-gray-700">{item.name}</Text>
              </View>
              <View className="flex-row items-center">
                {item.count && (
                  <View className="bg-gray-100 px-2 py-1 rounded-full mr-2">
                    <Text className="text-xs text-gray-600">{item.count}</Text>
                  </View>
                )}
                <Feather name="chevron-right" size={18} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;