// import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import React from 'react'
// import { MaterialIcons } from '@expo/vector-icons';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// const Orderconfirmation = () => {
//     const router = useRouter()
//     const {
//         orderId,
//         totalAmount,
//         paymentMethod,
//         deliveryAddress,
//         estimatedDelivery,
//     } = useLocalSearchParams();
//     return (
//         <SafeAreaView className='flex-1 bg-gray-50'>
//             <StatusBar style="dark" />
//             <ScrollView>
//             {/* Header */}
//             <View className='flex-row items-center p-4 bg-secondary border-b border-gray-200'>
//                 <TouchableOpacity onPress={() => router.back()}>
//                     <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
//                 </TouchableOpacity>
//                 <Text className='text-lg font-rubik-bold '>Order Confirmation</Text>
//             </View>
//             {/* Content */}
//             <View className='flex-1 p-5'>
//             </View>
//             {/* Success icon*/}
//             <View className='items-center my-5 mt-'>
//                 <View className='bg-primary rounded-full w-20 h-20 items-center justify-center'>
//                     <MaterialIcons name="check" size={36} color="white" />
//                 </View>
//             </View>
//             {/* Confirmation message */}
//             <Text className='text-2xl font-rubik-bold text-center text-primary mb-2'>Order Confirmed!</Text>
//             <Text className='text-gray-600 text-center mb-8'>
//                 Your order #{orderId} has been confirmed
//             </Text>
//             {/* Order details */}
//             <View className='bg-secondary rounded-xl p-5 mb-5 shadow-sm'>
//                 <View className='flex-row justify-between py-2 border-b border-gray-100'>
//                     <Text className='text-lg  text-gray-500 font-rubik-bold'>Payment Method</Text>
//                     <Text className='font-rubik-medium'>{paymentMethod}</Text>
//                 </View>
//                 <View className="flex-row justify-between py-2 border-b border-gray-100">
//                     <Text className="text-gray-500">Total Amount</Text>
//                     <Text className="font-rubik-medium">${totalAmount}</Text>
//                 </View>
//                 <View className="flex-row justify-between py-2 border-b border-gray-100">
//                     <Text className="text-gray-500">Delivery Address</Text>
//                     <Text className="text-right">{deliveryAddress}</Text>
//                 </View>

//                 <View className="flex-row justify-between py-2">
//                     <Text className="text-gray-500">Estimated Delivery</Text>
//                     <Text>{estimatedDelivery}</Text>
//                 </View>
//             </View>
//             {/* Order Tracking*/}
//             <View className='bg-secondary rounded-xl p-5  shadow-sm'>
//                 <Text className='font-rubik-bold mb-4'>Track Your Order</Text>
//                 <View className='ml-3'>
//                     {/* Step 1- confirmed */}
//                     <View className='flex-row items-center mb-1'>
//                         <View className='bg-primary rounded-full w-6 h-6 items-center justify-center mr-3'>
//                             <MaterialIcons name="check" size={20} color="white" />
//                         </View>
//                         <Text className='text-gray-500 font-rubik'>Order Confirmed</Text>
//                     </View>
//                     <View className="h-6 border-l-2 border-gray-300 ml-3 mb-1"></View>
//                 </View>
//                 {/* Step 2 - Preparing */}
//                 <View className="flex-row items-center mb-1">
//                     <View className="bg-gray-200 w-6 h-6 rounded-full justify-center items-center mr-3">
//                         <Text className="text-gray-600">2</Text>
//                     </View>
//                     <Text className="text-gray-600">Preparing</Text>
//                 </View>
//                 {/* Step 3 - On the Way */}
//                 <View className="flex-row items-center mb-1">
//                     <View className="bg-gray-200 w-6 h-6 rounded-full justify-center items-center mr-3">
//                         <Text className="text-gray-600">3</Text>
//                     </View>
//                     <Text className="text-gray-600">On the Way</Text>
//                 </View>
//                 <View className="h-6 border-l-2 border-gray-300 ml-3 mb-1"></View>
//                 {/* Step 4 - Delivered */}
//                 <View className="flex-row items-center mb-1">
//                     <View className="bg-gray-200 w-6 h-6 rounded-full justify-center items-center mr-3">
//                         <Text className="text-gray-600">4</Text>
//                     </View>
//                     <Text className="text-gray-600">Delivered</Text>
//                     {/* Footer Button */}
//                     <View className="p-5 bg-white border-t border-gray-200">
//                         <TouchableOpacity
//                             className="bg-green-500 py-3 rounded-lg mb-3 items-center"
//                             onPress={() => router.push({
//                                 pathname: '/(app)/(stack)/OrderTracking',
//                                 params: { orderId }
//                             })}
//                         >
//                             <Text className="text-white font-bold">Track Order</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             className="bg-white py-3 rounded-lg border border-gray-300 items-center"
//                             onPress={() => router.replace('/')}
//                         >
//                             <Text className="text-gray-800 font-medium">Back to Home</Text>
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             </View>
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

// export default Orderconfirmation
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Orderconfirmation = () => {
    const router = useRouter()
    const {
        orderId,
        totalAmount,
        paymentMethod,
        deliveryAddress,
        estimatedDelivery,
        currentStatus = 'confirmed' // Default to 'confirmed' if not provided
    } = useLocalSearchParams();

    // Define order tracking steps with estimated times
    const trackingSteps: {
        id: string;
        title: string;
        description: string;
        estimatedTime: string;
        icon: "check-circle" | "restaurant" | "delivery-dining" | "done-all";
    }[] = [
        { 
            id: 'confirmed',
            title: 'Order Confirmed',
            description: 'We\'ve received your order',
            estimatedTime: '5 min ago',
            icon: 'check-circle'
        },
        { 
            id: 'preparing',
            title: 'Preparing',
            description: 'Your order is being prepared',
            estimatedTime: 'Estimated: 15-20 min',
            icon: 'restaurant'
        },
        { 
            id: 'on-the-way',
            title: 'On the Way',
            description: 'Delivery partner has picked up your order',
            estimatedTime: 'Estimated arrival: 30 min',
            icon: 'delivery-dining'
        },
        { 
            id: 'delivered',
            title: 'Delivered',
            description: 'Your order has been delivered',
            estimatedTime: '',
            icon: 'done-all'
        }
    ];

    // Determine active step index
    const activeStepIndex = trackingSteps.findIndex(step => step.id === currentStatus);

    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <StatusBar style="dark" />
            <ScrollView>
                {/* Header */}
                <View className='flex-row items-center p-4 bg-secondary border-b border-gray-200'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                    <Text className='text-lg font-rubik-bold ml-2'>Order Confirmation</Text>
                </View>

                {/* Content */}
                <View className='flex-1 p-5'>
                    {/* Success icon*/}
                    <View className='items-center my-5'>
                        <View className='bg-primary rounded-full w-20 h-20 items-center justify-center'>
                            <MaterialIcons name="check" size={36} color="white" />
                        </View>
                    </View>

                    {/* Confirmation message */}
                    <Text className='text-2xl font-rubik-bold text-center text-primary mb-2'>Order Confirmed!</Text>
                    <Text className='text-gray-600 text-center mb-8'>
                        Your order #{orderId} has been confirmed
                    </Text>

                    {/* Order details */}
                    <View className='bg-white rounded-xl p-5 mb-5 shadow-sm border border-gray-100'>
                        <View className='flex-row justify-between py-2 border-b border-gray-100'>
                            <Text className='text-lg text-gray-500 font-rubik-bold'>Payment Method</Text>
                            <Text className='font-rubik-medium'>{paymentMethod}</Text>
                        </View>
                        <View className="flex-row justify-between py-2 border-b border-gray-100">
                            <Text className="text-gray-500">Total Amount</Text>
                            <Text className="font-rubik-medium">${totalAmount}</Text>
                        </View>
                        <View className="flex-row justify-between py-2 border-b border-gray-100">
                            <Text className="text-gray-500">Delivery Address</Text>
                            <Text className="text-right">{deliveryAddress}</Text>
                        </View>
                        <View className="flex-row justify-between py-2">
                            <Text className="text-gray-500">Estimated Delivery</Text>
                            <Text>{estimatedDelivery}</Text>
                        </View>
                    </View>

                    {/* Order Tracking*/}
                    <View className='bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-5'>
                        <Text className='font-rubik-bold text-lg mb-4'>Order Status</Text>
                        
                        {trackingSteps.map((step, index) => {
                            const isCompleted = index < activeStepIndex;
                            const isActive = index === activeStepIndex;
                            const isLastStep = index === trackingSteps.length - 1;

                            return (
                                <View key={step.id}>
                                    <View className='flex-row'>
                                        {/* Icon/Number */}
                                        <View className='mr-3'>
                                            <View className={`w-6 h-6 rounded-full items-center justify-center 
                                                ${isCompleted ? 'bg-primary' : ''}
                                                ${isActive ? 'bg-primary/20 border-2 border-primary' : ''}
                                                ${!isCompleted && !isActive ? 'bg-gray-200' : ''}`}>
                                                
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
                                        </View>

                                        {/* Step details */}
                                        <View className='flex-1 pb-4'>
                                            <View className='flex-row justify-between'>
                                                <Text className={`font-rubik-medium ${isCompleted || isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {step.title}
                                                </Text>
                                                {step.estimatedTime && (
                                                    <Text className='text-xs text-gray-400'>{step.estimatedTime}</Text>
                                                )}
                                            </View>
                                            <Text className='text-sm text-gray-500 mt-1'>{step.description}</Text>
                                        </View>
                                    </View>

                                    {/* Connector line */}
                                    {!isLastStep && (
                                        <View className={`h-6 border-l-2 ${isCompleted ? 'border-primary' : 'border-gray-200'} ml-3`} />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            {/* Footer Buttons */}
            <View className="p-5 bg-white border-t border-gray-200">
                <TouchableOpacity
                    className="bg-primary py-4 rounded-lg mb-3 items-center flex-row justify-center"
                    onPress={() => router.push({
                        pathname: '/(app)/(stack)/OrderTracking',
                        params: { orderId, currentStatus }
                    })}
                >
                    <MaterialIcons name="location-on" size={20} color="white" />
                    <Text className="text-white font-rubik-bold ml-2">Track Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-white py-3 rounded-lg border border-gray-300 items-center"
                    onPress={() => router.replace('/')}
                >
                    <Text className="text-gray-800 font-rubik-medium">Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Orderconfirmation