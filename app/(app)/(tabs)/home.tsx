import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const eventsData = [
  {
    id: '1',
    title: 'Tech Talk: AI in Business',
    date: 'Tomorrow',
    time: '6:00 PM',
    location: 'The Innovation Hub',
    description: 'Join us for an insightful discussion on how AI is transforming the business landscape. Hear from industry experts and thought leaders.',
    category: 'tech'
  },
  {
    id: '2',
    title: 'Indie Music Showcase',
    date: 'Wed, Dec 20',
    time: '8:00 PM',
    location: 'The Underground',
    description: 'Discover the hottest new indie artists in town. Featuring live performances from up-and-coming bands.',
    category: 'music'
  },
  {
    id: '3',
    title: 'Basketball Game: City Rivals',
    date: 'Wed, Dec 20',
    time: '7:30 PM',
    location: 'City Arena',
    description: 'Witness the clash of the city\'s top basketball teams. Expect a high-energy game with intense competition.',
    category: 'sports'
  }
];

export default function EventsHomeScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-primary font-bold text-sm">{item.date}</Text>
        <View className="bg-blue-100 px-2 py-1 rounded-full">
          <Text className="text-primary text-xs font-medium capitalize">{item.category}</Text>
        </View>
      </View>
      <Text className="text-black font-bold text-lg mb-1">{item.title}</Text>
      <Text className="text-gray-500 text-sm mb-2">{item.time} · {item.location}</Text>
      <Text className="text-gray-700 text-sm">{item.description}</Text>
      <TouchableOpacity className="bg-primary rounded-lg py-2 mt-3">
        <Text className="text-white text-center font-medium">Get Tickets</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      
      {/* Header */}
      <View className="bg-white p-4 shadow-sm">
        <Text className="text-2xl font-bold text-black">Upcoming Events</Text>
      </View>
      
      {/* Search Bar */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2 shadow-sm">
          <MaterialIcons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-black"
            placeholder="Search events..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="px-4 pt-2 pb-3"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {['all', 'music', 'tech', 'sports'].map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-4 py-2 rounded-full mr-2 ${activeCategory === category ? 'bg-primary' : 'bg-white'}`}
            onPress={() => setActiveCategory(category)}
          >
            <Text className={`font-medium capitalize ${activeCategory === category ? 'text-white' : 'text-gray-700'}`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <MaterialIcons name="event-busy" size={40} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2">No events found</Text>
          </View>
        }
      />
    </View>
  );
}

