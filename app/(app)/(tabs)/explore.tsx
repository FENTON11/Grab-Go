import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Search from '@/components/Search';
// import local images
const categoryImages: { [key: number]: any } = {
  1: require('@/assets/images/basket-full-vegetables.jpg'),
  2: require('@/assets/images/oil.jpg'),
  3: require('@/assets/images/meat.jpg'),
  4: require('@/assets/images/snacks.jpg'),
  5: require('@/assets/images/egg.jpg'),
  6: require('@/assets/images/beverages.jpg'),
}

const ExploreScreen = () => {
  const categories = [
    { id: 1, name: 'Fresh Fruits & Vegetable', image: 'basket-full-vegetables' },
    { id: 2, name: 'Cooking Oil & Ghee', image: 'oil' },
    { id: 3, name: 'Meat & Fish', image: 'meat' },
    { id: 4, name: 'Bakery & Snacks', image: 'snacks' },
    { id: 5, name: 'Dairy & Eggs', image: 'egg' },
    { id: 6, name: 'Beverages', image: 'beverages' },
  ];

  return (
    <SafeAreaView className="flex-1 px-14 pt-14 bg-white">
      {/* Header */}
      <View className="px-4 pt-4 items-center">
      <Text className="text-3xl font-rubik mt-1">Find Products</Text>
      </View>

      {/* Search Bar */}
      <Search/>

      {/* Categories */}
      <ScrollView className="mt-6 px-4">
        <Text className="text-lg font-semibold mb-4">Categories</Text>
        <View className="flex-row flex-wrap justify-between">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className="w-[48%] bg-gray-50 rounded-lg p-4 mb-4 items-center border border-gray-200"
              
            >
              <View className=" p-3  mb-2">
              <Image 
                  source={categoryImages[category.id]} 
                  className=" h-24 "
                  resizeMode="contain"
                />
              </View>
              <Text className="text-center font-medium">{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
};

export default ExploreScreen;