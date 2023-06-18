import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Black, Grey, White} from '../utils/Colors';
// import { LikeButtonProps } from './path/to/LikeButtonProps';

type Navigation = NativeStackScreenProps<RootStackParams, 'detail'>;

interface listData {
  likeCount: number;
  liked: boolean;
  gambar: string;
  judul: string;
  deskripsi: string;
}

interface LikeButtonProps {
  postId: number;
  no_id: number;
}

const DetailProduck = ({route}: Navigation) => {
  const [data, setData] = useState<listData[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    console.log(route.params?.no_id);
    AsyncStorage.getItem('token').then(value => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        `https://5b08-2001-448a-4044-4106-921b-b8e7-cae1-bde1.ngrok-free.app/api/read-user/${route.params?.no_id}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setData(result.data);
        })
        .catch(error => console.log('error', error));
    });
  }, []);

  // useEffect(() => {
  //   fetchLikeData();
  // }, [data]);

  // const fetchLikeData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://1bf6-2001-448a-4040-6643-fc9c-1382-7317-1f92.ngrok-free.app/api/posts/15',
  //     );
  //     const {liked, likeCount} = response.data;
  //     setLiked(liked);
  //     setLikeCount(likeCount);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLike = async () => {
  //   try {
  //     const response = await axios.post(
  //       'https://1bf6-2001-448a-4040-6643-fc9c-1382-7317-1f92.ngrok-free.app/api/posts/15/like',
  //       {
  //         liked: !liked,
  //       },
  //     );
  //     const {liked, likeCount} = response.data;
  //     setLiked(liked);
  //     setLikeCount(likeCount);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLike = () => {
  //   AsyncStorage.getItem('token').then(value => {
  //     var requestOptions = {
  //       method: 'POST',
  //       redirect: 'follow',
  //       headers: {
  //         Authorization: `Bearer ${value}`,
  //       },
  //     };

  //     fetch(
  //       'https://1bf6-2001-448a-4040-6643-fc9c-1382-7317-1f92.ngrok-free.app/api/posts/4/like',
  //       requestOptions,
  //     )
  //       .then(response => response.json())
  //       .then(result => {
  //         console.log(result);
  //         setLiked(prevLiked => !prevLiked); // Toggle liked state
  //         setLikeCount(prevCount => prevCount + 1); // Increment like count
  //         setLikeCount(result.likeCount); // Update like count with the received value from API
  //       })
  //       .catch(error => console.log('error', error));
  //   });
  // };

  // const Like = () => {
  //   AsyncStorage.getItem('token').then(value => {
  //     const headers = {
  //       Authorization: `Bearer ${value}`,
  //     };

  //     axios
  //       .get(
  //         'https://1bf6-2001-448a-4040-6643-fc9c-1382-7317-1f92.ngrok-free.app/api/posts/15/like',
  //         null,
  //         {headers},
  //       )
  //       .then(response => {
  //         const {liked, likeCount, message} = response.data;
  //         setLiked(liked);
  //         setLikeCount(likeCount);

  //         // Tampilkan pesan sukses
  //         console.log(message);
  //       })
  //       .catch(error => console.log('error', error));
  //   });
  // };

  return (
    <View style={{flex: 1, backgroundColor: Grey}}>
      <ScrollView style={{backgroundColor: Grey}}>
        {data.map((value, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <Image
              source={{uri: value.gambar}}
              style={{height: 485, width: 799}}
            />
            <Text style={styles.Judul}>{value.judul}</Text>
            {/* <TouchableOpacity onPress={() => handleLike()}>
              <View>
                <Icon
                  name={liked ? 'heart' : 'heart'}
                  size={30}
                  color={liked ? 'red' : 'black'}
                />
                <Text>{likeCount}</Text>
              </View>
            </TouchableOpacity> */}
            <Text style={styles.Description}>{value.deskripsi}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DetailProduck;

const styles = StyleSheet.create({
  Judul: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Bold',
    color: White,
  },
  Description: {
    color: White,
    marginHorizontal: 10,
    textAlign: 'justify',
  },
});
