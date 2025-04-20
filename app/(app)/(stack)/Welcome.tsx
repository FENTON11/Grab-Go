import { View, Text, TouchableOpacity, Image, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
const WelcomeScreen = () => {
    const router = useRouter();
  const { width, height } = Dimensions.get('window');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const logoSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence animations on mount
    Animated.parallel([
      // Logo spin animation
      Animated.timing(logoSpin, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      
      // Fade in content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      
      // Slide up content
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const logoRotation = logoSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '0deg']
  });

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F5FDFF']}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="flex-1">
        {/* Animated Logo */}
        <Animated.View 
          className="items-center pt-12"
          style={{
            transform: [{ rotate: logoRotation }],
          }}
        >
          <Image
            source={require('../assets/logo.png')}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </Animated.View>

        {/* Main Content */}
        <Animated.View 
          className="flex-1 justify-center px-8"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }],
          }}
        >
          <Text className="text-4xl font-bold text-center text-gray-900 mb-2">
            Welcome
          </Text>
          <Text className="text-4xl font-bold text-center text-green-600 mb-6">
            to our store
          </Text>

          <Text className="text-lg text-center text-gray-600 mb-8 px-4">
            Get your groceries in as fast as one hour
          </Text>

          {/* Lottie Animation */}
          <LottieView
            source={require('../assets/animations/grocery-delivery.json')}
            autoPlay
            loop
            style={{ width: width * 0.9, height: width * 0.6 }}
          />
        </Animated.View>

        {/* Animated Button */}
        <View className="px-8 pb-10">
          <Animated.View
            style={{ transform: [{ scale: buttonScale }] }}
          >
            <TouchableOpacity
              className="bg-green-500 py-4 rounded-full items-center shadow-lg"
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => {
                // Button press animation
                Animated.sequence([
                  Animated.timing(buttonScale, {
                    toValue: 0.9,
                    duration: 100,
                    useNativeDriver: true,
                  }),
                  Animated.timing(buttonScale, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                  }),
                ]).start(() => {
                  router.push('/home');
                });
              }}
            >
              <Text className="text-white text-lg font-bold">Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;