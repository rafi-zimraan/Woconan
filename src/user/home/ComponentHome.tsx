import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  DrawerLayoutAndroid,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AbuABu, Black, Grey, White} from '../utils/Colors';
import ImageFlatlist from '../imageFlatlist/index';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import index from '../imageFlatlist/index';

interface listData {
  id: number;
  gambar: string;
}

const ComponentHome = () => {
  const [data, setData] = useState<listData[]>([]);
  const drawerRight = useRef<DrawerLayoutAndroid>(null);
  // {'Navigation'}
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // {'logout with application'}
  const logout = () => {
    AsyncStorage.getItem('token').then(value => {
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };
      fetch(
        'https://d3ad-2001-448a-4040-8920-8f82-2cfc-3dfc-cbd7.ngrok-free.app/api/logout',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          AsyncStorage.removeItem('token');
          navigation.replace('login');
        })
        .catch(error => console.log('error', error));
    });
  };
  // {'Warning logout'}
  const Warning = () => {
    Alert.alert('Perhatian !', 'Apakah anda ingin keluar', [
      {
        text: 'tidak',
      },
      {
        text: 'ok',
        onPress: () => logout(),
      },
    ]);
  };

  const image = [
    require('../icon/Noval3.png'),
    require('../icon/Novel2.png'),
    require('../icon/Novel4.png'),
    require('../icon/Noval3.png'),
    require('../icon/Novel2.png'),
    require('../icon/Noval3.png'),
    require('../icon/Noval3.png'),
    require('../icon/Novel2.png'),
    require('../icon/Novel4.png'),
    require('../icon/Noval3.png'),
    require('../icon/Novel2.png'),
    require('../icon/Noval3.png'),
  ];

  // {'Read'}
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log('Ini token', value);

      var requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };
      fetch(
        'https://927c-2001-448a-4040-8920-8ea6-3d14-6ef-70b9.ngrok-free.app/api/beranda-user',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result.data);
          setData(result.data);
        })
        .catch(error => console.log('error', error));
    });
  }, []);

  // { 'PERCOBAAN BELUM BERHASIL ' }
  // // { 'get data user' }
  // // const [data, setData] = useState();
  // let Data = [
  //   {
  //     id: 1,
  //     value:
  //       'https://res.cloudinary.com/dzfmf0byk/image/upload/v1685946097/gambare/2023-06-05_062134_rn_image_picker_lib_temp_c67766b5-069c-49bb-9378-b8e1c6320e72.jpg',
  //   },
  // ];
  // async function getData() {
  //   try {
  //     const response = await axios.get(
  //       'https://ebc2-2001-448a-404f-59c4-820f-947a-484f-cc39.ngrok-free.app/api/beranda-user',
  //       {
  //         headers: {
  //           Authorization: `Bearer 21|TzhPrKdmKn4OefXw6PWvDSBRPbocdEQIIiOkZbId`,
  //         },
  //       },
  //     );

  //     let data = JSON.parse(response.data.data);
  //     Data = data;
  //     console.log('RESPONSE', data);
  //   } catch (error: any) {
  //     console.log('ERROR', error.message);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  // const Daata = [
  //   {
  //     id: 1,
  //     value:
  //       'https://res.cloudinary.com/dzfmf0byk/image/upload/v1685972751/gambare/2023-06-05_134549_0bc2685358ad4d81bc90dc57af047dd0.jpg',
  //   },
  // ];
  // const RenderItem = ({uri, item}) => {
  //   return (
  //     <View>
  //       <Image source={{uri: uri.value}} style={{width: 100, height: 100}} />
  //       <Text>{item.id}</Text>
  //     </View>
  //   );
  // };

  const navigationDrawer = (
    <View
      style={{
        flexDirection: 'row',
        marginTop: '6%',
        alignItems: 'flex-start',
        marginLeft: '4%',
      }}>
      <TouchableOpacity onPress={() => Warning()}>
        <Image
          source={require('../icon/check-out.png')}
          style={{height: hp('5%'), width: wp('10%')}}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: Black,
          height: hp('2%'),
          marginTop: '4%',
          marginLeft: '3%',
        }}
        onPress={() => drawerRight.current?.closeDrawer()}>
        logout
      </Text>
    </View>
  );

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      {/* Drawer */}
      <DrawerLayoutAndroid
        ref={drawerRight}
        drawerWidth={270}
        drawerPosition={'right'}
        renderNavigationView={() => navigationDrawer}
        style={{flex: 1}}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Home</Text>
          <View style={styles.HeaderView}>
            <TouchableOpacity>
              <Image source={require('../icon/Lonceng.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => drawerRight.current?.openDrawer()}>
              <Image
                source={require('../icon/vertIcon.png')}
                style={{height: hp('2.8%'), width: wp('5.2%')}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Content}>
          <Text style={styles.ContentTxtPerent}>Top Picks For You</Text>
          <TouchableOpacity style={styles.ContentImg}>
            <Text style={styles.ContentTxt}>lihat semua</Text>
            <Icon
              name="chevron-right"
              size={26}
              color={AbuABu}
              style={styles.ContentIconRight}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: '2%'}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {image.map((val, index, item) => {
              return (
                <View>
                  <ImageFlatlist
                    source={val}
                    style2={{width: wp('40%'), height: hp('20%')}}
                    CostumKey={index}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.TextPopular}>
          <Text style={styles.PopularTxt}>Now Popular</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {data.map((value, index) => (
              <View key={index} style={{marginBottom: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('detail', {no_id: value.id})
                  }>
                  <Image
                    source={{uri: value.gambar}}
                    style={{height: 160, width: 140}}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    </View>
  );
};

export default ComponentHome;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: '2%',
    backgroundColor: Grey,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  HeaderText: {
    color: White,
    fontSize: hp('3%'),
    fontWeight: '700',
  },
  HeaderView: {
    flexDirection: 'row',
    width: wp('14%'),
    justifyContent: 'space-between',
  },
  Content: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    justifyContent: 'space-between',
    marginTop: '4%',
  },
  ContentTxtPerent: {
    color: White,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  ContentImg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContentTxt: {
    color: AbuABu,
    fontSize: hp('1.7%'),
  },
  ContentIconRight: {
    paddingTop: '1%',
  },
  TextPopular: {
    marginLeft: '3%',
    marginTop: '6%',
  },
  PopularTxt: {
    color: White,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
    fontWeight: '700',
  },
});
