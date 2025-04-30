import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Animated, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useRef, useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
   const router = useRouter();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const animationRef = useRef<LottieView>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const slides = [
    {
      id: 1,
      title: 'Discover Amazing Food',
      description: 'Browse through thousands of restaurants and dishes near you',
      lottie: require("@/assets/animations/food_delivery.json"),
      bg: '#F8F9FA',
    },
    {
      id: 2,
      title: 'Fast Delivery',
      description: 'Get your food delivered to your doorstep in record time',
      lottie: require('@/assets/animations/delivery_bike.json'),
      bg: '#FFF9F2',
    },
    {
      id: 3,
      title: 'Easy Payment',
      description: 'Pay with your preferred method securely and conveniently',
      lottie: require('@/assets/animations/wallet.json'),
      bg: '#F0F7FF',
    },
  ];

  // Progress bar animation
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentSlide + 1) * (100 / slides.length),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentSlide]);

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx > 50 && currentSlide > 0) {
        goToPrevSlide();
      } else if (gestureState.dx < -50 && currentSlide < slides.length - 1) {
        goToNextSlide();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      animationRef.current?.reset();
      animationRef.current?.play();
      setCurrentSlide(currentSlide + 1);
      pan.setValue({ x: 0, y: 0 });
    } else {
      // Navigate to main app
      
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      animationRef.current?.reset();
      animationRef.current?.play();
      setCurrentSlide(currentSlide - 1);
      pan.setValue({ x: 0, y: 0 });
    }
  };

  const skipOnboarding = () => {
    
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: slides[currentSlide].bg }]}>
      {/* Skip Button */}
      <TouchableOpacity 
        onPress={skipOnboarding}
        className="absolute top-6 right-6 z-10"
      >
        <Text className="text-gray-500 font-medium">Skip</Text>
      </TouchableOpacity>

      {/* Progress Bar */}
      <View className="w-full px-4 mt-4">
        <View className="w-full h-2 bg-gray-200 rounded-full">
          <Animated.View 
            className="h-full bg-green-500 rounded-full" 
            style={{
              width: progressAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>
      </View>

      {/* Animated Content */}
      <Animated.View 
        className="flex-1"
        style={{
          transform: [
            { translateX: pan.x }
          ]
        }}
        {...panResponder.panHandlers}
      >
        {/* Lottie Animation */}
        <View className="flex-1 justify-center items-center">
          <LottieView
            ref={animationRef}
            source={slides[currentSlide].lottie}
            autoPlay
            loop
            style={{ width: width * 0.9, height: width * 0.9 }}
          />
        </View>

        {/* Content */}
        <View className="px-8 pb-12">
          <Text className="text-3xl font-bold text-center mb-4 text-gray-900">
            {slides[currentSlide].title}
          </Text>
          <Text className="text-lg text-center text-gray-600 mb-8">
            {slides[currentSlide].description}
          </Text>

          {/* Navigation Buttons */}
          <View className="flex-row justify-between items-center">
            {/* Previous Button (hidden on first slide) */}
            {currentSlide > 0 && (
              <TouchableOpacity
                onPress={goToPrevSlide}
                className="p-3"
                activeOpacity={0.7}
              >
                <AntDesign name="arrowleft" size={24} color="#4B5563" />
              </TouchableOpacity>
            )}

            {/* Pagination Dots (centered) */}
            <View className="flex-row justify-center flex-1">
              {slides.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${currentSlide === index ? 'bg-green-500' : 'bg-gray-300'}`}
                />
              ))}
            </View>

            {/* Next/Get Started Button */}
            <TouchableOpacity
              onPress={goToNextSlide}
              className={`py-3 px-6 rounded-full ${currentSlide === slides.length - 1 ? 'bg-green-500' : 'bg-gray-200'}`}
              activeOpacity={0.8}
            >
              {currentSlide === slides.length - 1 ? (
                <Text className="text-white font-bold">Get Started</Text>
              ) : (
                <AntDesign name="arrowright" size={24} color={currentSlide === slides.length - 1 ? "white" : "#4B5563"} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingScreen;