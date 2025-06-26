import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function FilterScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('Any date');

  const categories = [
    'Music', 'Sports', 'Conferences', 'Arts',
    'Food & Drink', 'Tech'
  ];

  const dateOptions = [
    'Any date',
    'Today',
    'Tomorrow',
    'This weekend',
    'Next week',
    'This month'
  ];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="p-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-black">Filters</Text>
      </View>
      
      {/* Category Section */}
      <View className="p-4 border-b border-gray-100">
        <Text className="text-lg font-bold text-black mb-3">Category</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
        >
          <View className="flex-row flex-wrap">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`px-4 py-2 rounded-full mr-2 mb-2 ${selectedCategories.includes(category) ? 'bg-blue-600' : 'bg-gray-100'}`}
                onPress={() => toggleCategory(category)}
              >
                <Text className={`${selectedCategories.includes(category) ? 'text-white' : 'text-black'}`}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      
      {/* Date Section */}
      <View className="p-4">
        <Text className="text-lg font-bold text-black mb-3">Date</Text>
        {dateOptions.map((date) => (
          <TouchableOpacity
            key={date}
            className="flex-row justify-between items-center py-3 border-b border-gray-100"
            onPress={() => setSelectedDate(date)}
          >
            <Text className="text-black">{date}</Text>
            {selectedDate === date && (
              <MaterialIcons name="check" size={20} color="#3B82F6" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Apply Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <TouchableOpacity 
          className="bg-blue-600 py-3 rounded-lg"
          onPress={() => console.log('Filters applied', { selectedCategories, selectedDate })}
        >
          <Text className="text-white text-center font-bold">Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}