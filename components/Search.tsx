

import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Filter, { FilterRef } from '@/app/(app)/(stack)/Filter';

const Search = () => {
  const filterRef = useRef<FilterRef>(null);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between w-full items-center px-4 mt-5 py-1">
        {/* Search Input */}
        <View className="bg-[#e3e3e3] rounded-xl px-4 py-3 mt-10 flex-1 flex-row items-center">
          <TouchableOpacity>
            <Image
              source={require('@/assets/images/search.png')}
              className="h-12 w-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput
            className="text-accent text-base ml-5 flex-1"
            placeholder="Search for a store"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity
          className="rounded-xl px-4 py-3 mt-10 ml-2"
          onPress={() => {
            filterRef.current?.open();
          }}
        >
          <Image
            source={require('@/assets/images/filter.png')}
            className="size-8"
            tintColor="black"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Filter ref={filterRef} />
    </SafeAreaView>
  );
};

export default Search;
