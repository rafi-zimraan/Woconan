import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Black, Grey, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

type Navigation = NativeStackScreenProps<RootStackParams, 'detail'>;

interface listData {
  likeCount: number;
  liked: boolean;
  gambar: string;
  judul: string;
  deskripsi: string;
}

const DetailProduck = ({route}: Navigation) => {
  const [data, setData] = useState<listData[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [requestOptions, setRequestOptions] = useState<any>(null);
  const [modalPop, setModalPop] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // ! Modal
  // const ModalCommennt = (id : number) => {
  //   setModalPop(true)
  //   setSelectedId(id)
  // }

  useEffect(() => {
    console.log(route.params?.no_id);
    AsyncStorage.getItem('token').then(value => {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        `https://kelompokx.muhammadiyahexpo.com/api/read-user/${route.params?.no_id}`,
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

  // ! {'like'}
  const handleLike = () => {
    AsyncStorage.getItem('token').then(value => {
      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      setRequestOptions(requestOptions); // Set requestOptions value

      fetch(
        `https://kelompokx.muhammadiyahexpo.com/api/posts/${route.params?.no_id}/like`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setLiked(prevLiked => !prevLiked); // Toggle liked state
          setLikeCount(prevCount => prevCount + 1); // Increment like count
          setLikeCount(result.likeCount); // Update like count with the received value from API
        })
        .catch(error => console.log('error', error));
    });
  };

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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: wp('50%'),
              }}>
              <TouchableOpacity onPress={() => handleLike()}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={liked ? 'heart' : 'heart'}
                    size={30}
                    color={liked ? 'red' : 'black'}
                  />
                  <Text style={{marginTop: '2%', marginLeft: '6%'}}>
                    {likeCount}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('modalComment')}>
                <Icon name="comment-processing-outline" size={30} />
              </TouchableOpacity>
            </View>
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
