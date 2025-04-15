import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export type FilterRef = {
  open: () => void;
  close: () => void;
};

const categories = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
const brands = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

const Filter = forwardRef<FilterRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const renderCheckbox = (
    item: string,
    selected: boolean,
    onPress: () => void
  ) => (
    <TouchableOpacity
      key={item}
      onPress={onPress}
      className="flex-row items-center space-x-2 my-2"
    >
      <View
        className={`w-6 h-6 rounded-md border-2 ${
          selected ? 'bg-primary border-primary' : 'border-accent'
        } items-center justify-center`}
      >
        {selected && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text className={`${selected ? 'text-primary' : 'text-black'} text-base`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView className="flex-1 bg-secondary pt-14">
       <StatusBar style='dark' backgroundColor='white' />
        
        {/* Header */}
        <View className="flex-row justify-between items-center px-6">
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Ionicons name="close" size={24} />
          </TouchableOpacity>
          <Text className="text-lg font-rubik-semibold">Filters</Text>
          <View style={{ width: 24 }} /> 
        </View>
        <View className='rounded-t-3xl bg-[#B1B1B1]/50 flex-1 pt-10 mt-28'>

        <ScrollView
          className="px-6 mt-4"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Categories */}
          <Text className="text-lg font-rubik-semibold mt-4 mb-2">Categories</Text>
          {categories.map(cat =>
            renderCheckbox(cat, selectedCategories.includes(cat), () =>
              toggleSelection(categories, setSelectedCategories, cat)
            )
          )}

          {/* Brands */}
          <Text className="text-lg font-rubik-semibold mt-6 mb-2">Brand</Text>
          {brands.map(brand =>
            renderCheckbox(brand, selectedBrands.includes(brand), () =>
              toggleSelection(brands, setSelectedBrands, brand)
            )
          )}
        </ScrollView>

        {/* Apply Button */}
        <Pressable
          onPress={() => {
            console.log('Apply:', {
              categories: selectedCategories,
              brands: selectedBrands,
            });
            setVisible(false);
          }}
          className="absolute bottom-6 mx-6 rounded-2xl bg-primary py-4"
          style={{ width: '90%' }}
        >
          <Text className="text-white text-center font-rubik-medium text-base">
            Apply Filter
          </Text>
        </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

export default Filter;
