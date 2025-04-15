import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const OrderTracking = () => {
  const router = useRouter();
  const { orderId, currentStatus = 'preparing' } = useLocalSearchParams();

  // Sample order data
  const orderDetails = {
    items: [
      { id: 1, name: 'Veggie Burger', quantity: 2, price: 8.99 },
      { id: 2, name: 'Sweet Potato Fries', quantity: 1, price: 4.50 },
      { id: 3, name: 'Iced Tea', quantity: 1, price: 2.99 },
    ],
    deliveryAddress: '123 Main St, Apt 4B, New York, NY 10001',
    estimatedDelivery: '30-45 min',
    restaurant: 'Burger Palace',
  };

  const trackingSteps: Array<{
    id: string;
    title: string;
    icon: 'check-circle' | 'restaurant' | 'delivery-dining' | 'done-all';
    time: string;
  }> = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      icon: 'check-circle',
      time: '10:15 AM',
    },
    {
      id: 'preparing',
      title: 'Preparing',
      icon: 'restaurant',
      time: '10:20 AM',
    },
    {
      id: 'on-the-way',
      title: 'On the Way',
      icon: 'delivery-dining',
      time: 'Estimated: 10:50 AM',
    },
    {
      id: 'delivered',
      title: 'Delivered',
      icon: 'done-all',
      time: '',
    },
  ];

  const activeStepIndex = trackingSteps.findIndex(step => step.id === currentStatus);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Order #{orderId}</Text>
        <TouchableOpacity className="ml-auto">
          <Ionicons name="help-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Delivery Progress */}
        <View className="mx-5 mt-6 mb-4">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-500">Estimated delivery</Text>
            <Text className="font-medium">{orderDetails.estimatedDelivery}</Text>
          </View>
          
          {/* Progress Bar */}
          <View className="h-2 bg-gray-200 rounded-full mt-2 mb-4">
            <View 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${(activeStepIndex + 1) * 25}%` }}
            />
          </View>
          
          {/* Tracking Steps */}
          <View className="bg-white rounded-xl p-5 shadow-sm">
            {trackingSteps.map((step, index) => {
              const isCompleted = index < activeStepIndex;
              const isActive = index === activeStepIndex;
              const isLastStep = index === trackingSteps.length - 1;

              return (
                <View key={step.id} className="flex-row">
                  {/* Timeline Indicator */}
                  <View className="mr-4 items-center">
                    <View className={`w-8 h-8 rounded-full items-center justify-center 
                      ${isCompleted ? 'bg-green-500' : ''}
                      ${isActive ? 'border-2 border-green-500' : 'bg-gray-100'}`}>
                      
                      {isCompleted ? (
                        <MaterialIcons name="check" size={16} color="white" />
                      ) : (
                        <MaterialIcons 
                          name={step.icon} 
                          size={16} 
                          color={isActive ? '#4CAF50' : '#9CA3AF'} 
                        />
                      )}
                    </View>
                    {!isLastStep && (
                      <View className={`h-12 w-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                    )}
                  </View>

                  {/* Step Details */}
                  <View className={`flex-1 pb-4 ${isLastStep ? '' : 'border-b border-gray-100'}`}>
                    <Text className={`text-base font-medium ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.title}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">{step.time}</Text>
                    {isActive && (
                      <Text className="text-sm text-green-600 mt-1">
                        {step.id === 'preparing' ? 'Your food is being prepared with care' :
                         step.id === 'on-the-way' ? 'Your delivery partner is on the way' : ''}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Delivery Info */}
        <View className="mx-5 my-4 bg-white rounded-xl p-5 shadow-sm">
          <View className="flex-row items-center mb-4">
            <FontAwesome5 name="store" size={20} color="#4CAF50" />
            <Text className="ml-3 font-medium">{orderDetails.restaurant}</Text>
          </View>
          
          <View className="flex-row items-center">
            <MaterialIcons name="location-on" size={24} color="#4CAF50" />
            <View className="ml-3">
              <Text className="font-medium">Delivery Address</Text>
              <Text className="text-gray-600 mt-1">{orderDetails.deliveryAddress}</Text>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View className="mx-5 my-4 bg-white rounded-xl p-5 shadow-sm">
          <Text className="font-medium mb-3">Your Order</Text>
          {orderDetails.items.map(item => (
            <View key={item.id} className="flex-row justify-between py-2 border-b border-gray-100">
              <Text className="text-gray-600">
                {item.quantity}x {item.name}
              </Text>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View className="flex-row justify-between py-3 mt-2">
            <Text className="font-medium">Total</Text>
            <Text className="font-medium">
              ${orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Driver Info (when order is on the way) */}
        {currentStatus === 'on-the-way' && (
          <View className="mx-5 my-4 bg-white rounded-xl p-5 shadow-sm">
            <Text className="font-medium mb-3">Your Delivery Partner</Text>
            <View className="flex-row items-center">
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/42.jpg' }} 
                className="w-12 h-12 rounded-full"
              />
              <View className="ml-3">
                <Text className="font-medium">John D.</Text>
                <Text className="text-gray-600 text-sm">4.9 ★ (120 deliveries)</Text>
              </View>
              <TouchableOpacity className="ml-auto bg-green-100 p-2 rounded-full">
                <MaterialIcons name="phone" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Buttons */}
      <View className="p-5 bg-white border-t border-gray-200">
        {currentStatus !== 'delivered' ? (
          <TouchableOpacity
            className="bg-green-500 py-4 rounded-lg items-center flex-row justify-center"
            onPress={() => {
              // In a real app, this would open a live map
              alert('Opening live tracking map...');
            }}
          >
            <MaterialIcons name="location-on" size={20} color="white" />
            <Text className="text-white font-bold ml-2">View Live Tracking</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row">
            <TouchableOpacity
              className="flex-1 bg-white border border-gray-300 py-3 rounded-lg items-center mr-2"
              onPress={() => router.replace('/')}
            >
              <Text className="text-gray-800 font-medium">Back to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-green-500 py-3 rounded-lg items-center ml-2"
              onPress={() => {
                // In a real app, this would open the rating screen
                alert('Opening rating screen...');
              }}
            >
              <Text className="text-white font-medium">Rate Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrderTracking;