import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckoutScreen = () => {
  const router = useRouter()
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | null>(null);
  const [promoCode, setPromoCode] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

   // Card payment state
   const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isCardValid, setIsCardValid] = useState(false)

  // Sample cart items
  const cartItems = [
    { id: 1, name: 'Organic Bananas', price: 2.99, quantity: 3 },
    { id: 2, name: 'Fresh Strawberries', price: 4.99, quantity: 2 },
    { id: 3, name: 'Whole Wheat Bread', price: 3.49, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOption === 'express' ? 5.99 : 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const validateCard = () => {
    // Basic validation - in production use a library like card-validator
    const validNumber = cardDetails.number.replace(/\s/g, '').length === 16;
    const validName = cardDetails.name.trim().length > 3;
    const validExpiry = /^\d{2}\/\d{2}$/.test(cardDetails.expiry);
    const validCvc = cardDetails.cvc.length >= 3;
    
    setIsCardValid(validNumber && validName && validExpiry && validCvc);
    return validNumber && validName && validExpiry && validCvc;
  };

  const handleCardInputChange = (field: 'number' | 'name' | 'expiry' | 'cvc', value: string) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }
    // Format expiry date
    else if (field === 'expiry' && value.length === 2 && !cardDetails.expiry.includes('/')) {
      formattedValue = value + '/';
    }
    
    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
    
    if (paymentMethod === 'card') validateCard();
  };



  const handlePlaceOrder = async () => {
    if(!paymentMethod){
       Alert.alert( 'Payment Method Required','Please select a payment method');
      return;
     }
     if(paymentMethod==='card' && !validateCard()){
      Alert.alert( 'Invalid Card Details','Please enter valid card details');
      return;
     }
    setIsPlacingOrder(true);
    try {
      // api call to place order
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push({
        pathname: '/(app)/(stack)/Orderconfirmation',
        params: {
          orderId: `#${Math.floor(Math.random() * 1000000)}`,
          totalAmount: total.toFixed(2),
          paymentMethod: paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit/Debit Card',
          deliveryAddress: '123 Main Street, Apt 4B',
          estimatedDelivery: deliveryOption === 'express' ? '30-45 mins' : '1-2 hours'
        }
      });
    } catch (error) {
      Alert.alert(
        'Order Failed',
        'There was an error placing your order. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsPlacingOrder(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="px-4 pt-6"
       showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address */}
        <View className="mb-6">
          <Text className="text-lg font-rubik-bold mb-3">Delivery Address</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <View className="flex-row items-center mb-2">
              <MaterialIcons name="location-on" size={30} color="#4CAF50" />
              <Text className="ml-2 font-rubik-medium">Home</Text>
            </View>
            <Text className="text-gray-600">123 Main Street, Apt 4B</Text>
            <Text className="text-gray-600">New York, NY 10001</Text>
            <TouchableOpacity className="mt-3">
              <Text className="text-primary font-rubik-medium">Change Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Options */}
        <View className="mb-6">
          <Text className="text-lg font-rubik-bold mb-3">Delivery Options</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <TouchableOpacity 
              className={`flex-row justify-between items-center py-3 border-b border-gray-100 ${deliveryOption === 'standard' ? 'opacity-100' : 'opacity-70'}`}
              onPress={() => setDeliveryOption('standard')}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="delivery-dining" size={30} color="#4CAF50" />
                <Text className="ml-3">Standard Delivery</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-3">${deliveryFee.toFixed(2)}</Text>
                {deliveryOption === 'standard' ? (
                  <MaterialIcons name="radio-button-checked" size={30} color="#4CAF50" />
                ) : (
                  <MaterialIcons name="radio-button-unchecked" size={30} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              className={`flex-row justify-between items-center py-3 ${deliveryOption === 'express' ? 'opacity-100' : 'opacity-70'}`}
              onPress={() => setDeliveryOption('express')}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="flash-on" size={30} color="#4CAF50" />
                <Text className="ml-3">Express Delivery</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="mr-3">$5.99</Text>
                {deliveryOption === 'express' ? (
                  <MaterialIcons name="radio-button-checked" size={30} color="#4CAF50" />
                ) : (
                  <MaterialIcons name="radio-button-unchecked" size={30} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View className="mb-6">
          <Text className="text-lg font-rubik-bold mb-3">Order Summary</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            {cartItems.map(item => (
              <View key={item.id} className="flex-row justify-between py-2 border-b border-gray-100">
                <Text className="text-gray-600">
                  {item.quantity}x {item.name}
                </Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}

            <View className="mt-4">
              <View className="flex-row justify-between py-1">
                <Text className="text-gray-600">Subtotal</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-1">
                <Text className="text-gray-600">Delivery Fee</Text>
                <Text>${deliveryFee.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-1">
                <Text className="text-gray-600">Tax</Text>
                <Text>${tax.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between py-3 mt-2 border-t border-gray-200">
                <Text className="font-rubik-bold">Total</Text>
                <Text className="font-rubik-bold">${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-3">Payment Method</Text>
          {!paymentMethod && (
            <Text className="text-red-500 text-sm mb-2">* Please select a payment method</Text>
          )}
          
          <View className="bg-white p-4 rounded-lg shadow-sm">
            {/* Cash Option */}
            <TouchableOpacity 
              className={`flex-row justify-between items-center py-3 border-b border-gray-100 ${
                paymentMethod === 'cash' ? 'opacity-100' : 'opacity-70'
              }`}
              onPress={() => setPaymentMethod('cash')}
            >
              <View className="flex-row items-center">
                <MaterialIcons 
                  name="attach-money" 
                  size={20} 
                  color={paymentMethod === 'cash' ? '#4CAF50' : '#9CA3AF'} 
                />
                <Text className="ml-3">Cash on Delivery</Text>
              </View>
              {paymentMethod === 'cash' ? (
                <MaterialIcons name="radio-button-checked" size={30} color="#4CAF50" />
              ) : (
                <MaterialIcons name="radio-button-unchecked" size={30} color="#9CA3AF" />
              )}
            </TouchableOpacity>

            {/* Card Option */}
            <TouchableOpacity 
              className={`flex-row justify-between items-center py-3 ${
                paymentMethod === 'card' ? 'opacity-100' : 'opacity-70'
              }`}
              onPress={() => setPaymentMethod('card')}
            >
              <View className="flex-row items-center">
                <MaterialIcons 
                  name="credit-card" 
                  size={20} 
                  color={paymentMethod === 'card' ? '#4CAF50' : '#9CA3AF'} 
                />
                <Text className="ml-3">Credit/Debit Card</Text>
              </View>
              {paymentMethod === 'card' ? (
                <MaterialIcons name="radio-button-checked" size={30} color="#4CAF50" />
              ) : (
                <MaterialIcons name="radio-button-unchecked" size={30} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Card Payment Form - Only shows when card is selected */}
          {paymentMethod === 'card' && (
            <View className="mt-4 bg-white p-4 rounded-lg shadow-sm">
              <Text className="font-medium mb-3">Card Details</Text>
              
              <Text className="text-sm font-medium text-gray-600 mb-1">Card Number</Text>
              <TextInput
                className="bg-gray-50 p-3 rounded-lg mb-3"
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={19}
                value={cardDetails.number}
                onChangeText={(text) => handleCardInputChange('number', text)}
              />

              <Text className="text-sm font-medium text-gray-600 mb-1">Cardholder Name</Text>
              <TextInput
                className="bg-gray-50 p-3 font-rubik-medium rounded-lg mb-3"
                placeholder="John Doe"
                value={cardDetails.name}
                onChangeText={(text) => handleCardInputChange('name', text)}
              />

              <View className="flex-row justify-between">
                <View className="flex-1 mr-2">
                  <Text className="text-sm font-rubik-medium text-gray-600 mb-1">Expiry Date</Text>
                  <TextInput
                    className="bg-gray-50 p-3 rounded-lg font-rubik-medium"
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChangeText={(text) => handleCardInputChange('expiry', text)}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-sm font-rubik-medium text-gray-600 mb-1">CVC</Text>
                  <TextInput
                    className="bg-gray-50 p-3 rounded-lg"
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    value={cardDetails.cvc}
                    onChangeText={(text) => handleCardInputChange('cvc', text)}
                  />
                </View>
              </View>

              {!isCardValid && paymentMethod === 'card' && (
                <Text className="text-red-500 text-sm  font-rubik-bold mt-2">
                  * Please enter valid card details
                </Text>
              )}
            </View>
          )}
        </View>


        {/* Promo Code */}
        <View className="mb-8">
          <Text className="text-lg font-rubik-bold mb-3">Promo Code</Text>
          <View className="flex-row">
            <TextInput
              className="flex-1 bg-white p-3 rounded-l-lg border border-gray-200"
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity className="bg-primary  px-4 py-3 rounded-r-lg">
              <Text className="text-white font-rubik-medium">Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="px-4 pb-6 pt-3 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className={`py-4 rounded-lg items-center ${
            (paymentMethod === 'card' && !isCardValid) || isPlacingOrder
              ? 'bg-gray-400'
              : 'bg-green-500'
          }`}
          onPress={handlePlaceOrder}
          disabled={
            !paymentMethod || 
            (paymentMethod === 'card' && !isCardValid) ||
            isPlacingOrder
          }
        >
          <Text className="text-white font-bold text-lg">
            {isPlacingOrder ? 'Processing Payment...' : `Pay $${total.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;