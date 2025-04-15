import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
type Product = {
    name: string;
    img: string;
    pieces: string;
    price: number;
};

const Products = ({ data }: { data: Product[] }) => {
    const router = useRouter();
    return (
        <View className='mt-5'>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                     activeOpacity={0.8}
                     onPress={() => router.push('/(app)/(stack)/Productdetails',{
                        
                     })
                       
                     }
                    >
                        <View className='h-96 w-64 rounded-xl p-4 mb-4  border-2 border- border-[#999999] mr-4'>
                            <Image
                                className='h-48 rounded-xl'
                                source={{ uri: item.img }}
                                resizeMode='contain'
                            />
                            <View className='px-2'>
                                <Text className='text-accent text-lg font-rubik-semibold'>{item.name}</Text>
                                <Text className='text-gray-500 font-rubik-semibold'>{item.pieces}</Text>
                                <View className='flex-row justify-between items-center mt-4'>
                                    <Text className='text-accent font-rubik text-base'>${item.price}</Text>
                                    <AntDesign name="plussquare" size={48} color="#53b175"
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
            />

        </View>
    )
}

export default Products