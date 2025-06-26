import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const notifications = [
  {
    id: '1',
    title: 'Event Reminder: Tech Conference',
    time: '10:00 AM',
    relativeTime: '',
    dateGroup: 'Today',
    type: 'reminder',
    read: false
  },
  {
    id: '2',
    title: 'New Comment on Your Event',
    time: '',
    relativeTime: '2 hours ago',
    dateGroup: 'Today',
    type: 'comment',
    read: true
  },
  {
    id: '3',
    title: 'Organizer Update: Music Festival',
    time: '',
    relativeTime: '1 day ago',
    dateGroup: 'Yesterday',
    type: 'update',
    read: true
  },
  {
    id: '4',
    title: 'Event Reminder: Art Exhibition',
    time: '',
    relativeTime: '2 days ago',
    dateGroup: 'Yesterday',
    type: 'reminder',
    read: true
  }
];

export default function NotificationsScreen() {
  const groupedNotifications = notifications.reduce<Record<string, typeof notifications>>((groups, item) => {
    const group = groups[item.dateGroup] || [];
    group.push(item);
    groups[item.dateGroup] = group;
    return groups;
  }, {});

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-black">Notifications</Text>
      </View>
      
      {/* Notifications List */}
      <ScrollView className="flex-1">
        {Object.entries(groupedNotifications).map(([date, items]) => (
          <View key={date} className="mb-4">
            {/* Date Header */}
            <View className="bg-gray-100 px-4 py-2">
              <Text className="font-medium text-gray-600">{date}</Text>
            </View>
            
            {/* Notifications */}
            {items.map(notification => (
              <TouchableOpacity 
                key={notification.id}
                className={`flex-row items-start p-4 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
                activeOpacity={0.8}
              >
                {/* Notification Icon */}
                <View className={`p-2 rounded-full mr-3 ${
                  notification.type === 'reminder' ? 'bg-blue-100' : 
                  notification.type === 'comment' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <MaterialIcons 
                    name={
                      notification.type === 'reminder' ? 'notifications' :
                      notification.type === 'comment' ? 'comment' : 'info'
                    } 
                    size={20} 
                    color={
                      notification.type === 'reminder' ? '#3B82F6' :
                      notification.type === 'comment' ? '#10B981' : '#8B5CF6'
                    } 
                  />
                </View>
                
                {/* Notification Content */}
                <View className="flex-1">
                  <Text className={`text-base ${!notification.read ? 'font-bold' : 'font-medium'}`}>
                    {notification.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {notification.time || notification.relativeTime}
                  </Text>
                </View>
                
                {/* Unread Indicator */}
                {!notification.read && (
                  <View className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}