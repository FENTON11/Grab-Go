import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function EventsSearchScreen() {
  const events = [
    {
      id: '1',
      title: 'Indie Rock Night',
      category: 'Music',
      location: 'The Roxy Theatre',
      time: '7PM'
    },
    {
      id: '2',
      title: 'Stand-Up Comedy Show',
      category: 'Comedy',
      location: 'Laugh Factory',
      time: '8PM'
    },
    {
      id: '3',
      title: 'Basketball Game',
      category: 'Sports',
      location: 'Staples Center',
      time: '7:30PM'
    }
  ];

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Search Header */}
      <View className="p-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-black mb-1">Search</Text>
        <Text className="text-gray-500">Search events, locations, or dates</Text>
      </View>
      
      {/* Search Input */}
      <View className="mx-4 my-3">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
          <MaterialIcons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-black"
            placeholder="Search events..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
      
      {/* Upcoming Events Section */}
      <View className="px-4 mt-2">
        <Text className="text-lg font-bold text-black mb-3">Upcoming Events</Text>
        
        {/* Events List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {events.map(event => (
            <TouchableOpacity 
              key={event.id}
              className="border-b border-gray-100 py-4"
              activeOpacity={0.8}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm mb-1">{event.category}</Text>
                  <Text className="text-black font-bold text-lg">{event.title}</Text>
                  <Text className="text-gray-500 mt-1">
                    {event.location} · {event.time}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}