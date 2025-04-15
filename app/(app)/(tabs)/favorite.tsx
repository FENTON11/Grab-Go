import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Favorite = () => {
  const beverages = [
    {
      id: 1,
      name: 'Sprite Can',
      size: '325ml',
      price: 1.50,
      image: 'https://cdn.mafrservices.com/sys-master-root/h3c/h28/12456184184862/24168_Main.jpg?im=Resize=480',
      isFavorite: true
    },
    {
      id: 2,
      name: 'Diet Coke',
      size: '355ml',
      price: 1.99,
      image: 'https://m.media-amazon.com/images/I/51wYv9ua2qL.jpg',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Apple & Grape Juice',
      size: '2L',
      price: 15.50,
      image: 'https://treetop.com/wp-content/uploads/2023/11/Thumbnail_64oz-apple-cranberry_00028700133057.webp',
      isFavorite: true
    },
    {
      id: 4,
      name: 'Coca Cola Can',
      size: '325ml',
      price: 4.99,
      image: 'https://theoriginalmaidsofhonour.co.uk/cdn/shop/products/CokeCan_600x.png?v=1594893838',
      isFavorite: false
    },
    {
      id: 5,
      name: 'Pepsi Can',
      size: '330ml',
      price: 4.99,
      image: 'https://www.montyskenya.com/wp-content/uploads/2021/08/Pepsi-Can-300ml.jpg',
      isFavorite: false
    }
  ];

  const totalPrice = beverages.reduce((sum, item) => sum + item.price, 0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
      {/* Header */}
      <View className="flex-1 items-center justify-between p-4 bg-white border-b border-gray-200">
        <Text className="text-xl font-rubik-bold ">Favourites</Text>
        
      </View>

      {/* Product List */}
      <ScrollView className="flex-1 px-4">
        {beverages.map((item) => (
          <View 
            key={item.id} 
            className="flex-row items-center bg-white rounded-lg p-3 mb-3 shadow-sm"
          >
            {/* Product Image */}
            <Image
              source={{ uri: item.image }}
              className="w-16 h-16 rounded-lg mr-3"
              resizeMode="contain"
            />
            
            {/* Product Info */}
            <View className="flex-1">
              <View className="flex-row justify-between items-start">
                <Text className="font-rubik-medium text-base">{item.name}</Text>
                <TouchableOpacity>
                  <Ionicons 
                    name={item.isFavorite ? "heart" : "heart-outline"} 
                    size={20} 
                    color={item.isFavorite ? "#FF5252" : "#333"} 
                  />
                </TouchableOpacity>
              </View>
              
              <Text className="text-gray-500 text-sm mt-1">{item.size}</Text>
              
              <View className="flex-row justify-between items-center mt-2">
                <Text className="font-rubik-bold text-primary">${item.price.toFixed(2)}</Text>
                <TouchableOpacity className="bg-green-100 p-1 rounded-full">
                  <MaterialIcons name="add" size={18} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add All Button */}
      <View className="p-4 bg-white border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-rubik-medium">Total ({beverages.length} items)</Text>
          <Text className="font-rubik-bold">${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity 
          className="bg-primary py-3 rounded-lg items-center justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-rubik-bold">Add All To Cart</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorite;