import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Abu, Abu2, Black, Blue, Grey, White, krem} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import index from '../imageFlatlist';
import {launchImageLibrary} from 'react-native-image-picker';

interface listData {
  id: number;
  gambar: string;
}

interface ProfileUserProps {
  gambar: string;
  name: any;
}

const ComponentProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [data, setData] = useState<listData[]>([]);
  const [dataPhoto, setDataPhoto] = useState<ProfileUserProps[]>([]);
  const [name, setName] = useState<any>();
  const [gambar, setGambar] = useState<string>('');

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // ['Api Profile User']
  const ProfileUser = () => {
    AsyncStorage.getItem('token').then(value => {
      console.log('ini token', value);

      var formdata = new FormData();
      formdata.append('gambar', gambar);
      formdata.append('name', name);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        'https://d3ad-2001-448a-4040-8920-8f82-2cfc-3dfc-cbd7.ngrok-free.app/api/index-profil/5',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setDataPhoto(result.dataPhoto);
        })
        .catch(error => console.log('error', error));
    });
  };

  // {
  //   ('READ');
  // }
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
        'https://d3ad-2001-448a-4040-8920-8f82-2cfc-3dfc-cbd7.ngrok-free.app/api/beranda-user',
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

  // {'IMAGE PICKER'}
  // const [gambarGalery, setaGambarGlaery] = useState({
  //   uri: '',
  //   name: null,
  //   type: null
  // })

  // async function chooseImage() {
  //   try{
  //     const {assets}: {assets?: any[]} = await launchImageLibrary({
  //       mediaType: 'photo',
  //       quality: 0.1,
  //     })
  //     const {fileName:name,type,uri} = assets![0]
  //     setaGambarGlaery({uri,name,type});
  //   }catch(error) {
  //     console.log((error));
  //   }
  // }

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />

      {/* MODAL */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.ContentModal}>
          <TouchableOpacity style={styles.ViewClose} onPress={closeModal}>
            <Text style={styles.TextClose}>Close</Text>
          </TouchableOpacity>
          <View style={styles.HeaderModal}>
            <Image
              source={require('../image/SilangProfile.png')}
              style={{height: hp('18%'), width: wp('30')}}
            />
            <Text style={styles.TextWarning}>
              Warning !!, Please check in your bio
            </Text>
            <Text style={styles.AboutData}>
              Please fill in your personal data first
            </Text>
          </View>
          <TouchableOpacity
            style={styles.TextInputYes}
            onPress={() => navigation.navigate('aboutYouSelf')}>
            <Text style={{color: White, fontFamily: 'Poppins-Bold'}}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* CONTAINER FROFILE */}
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => ProfileUser()}>
          <Image source={require('../icon/user.png')} style={styles.Img} />
        </TouchableOpacity>
        <Text style={styles.Txt}>Profile</Text>
        {/* <View style={{backgroundColor: 'red', marginTop: '30%'}}>
          {dataPhoto.map((idn, index) => (
            <View key={index}>
              <TouchableOpacity onPress={ProfileUser}>
                <Image source={{uri: idn.gambar}} style={styles.Img} />
              </TouchableOpacity>
              <Text>{idn.name}</Text>
            </View>
          ))}
        </View> */}
        <View style={styles.HeaderTextProfile}>
          <View style={styles.ContentView}>
            <Text style={styles.TxtContent}>1</Text>
            <Text style={styles.TxtContent}>READING LIST</Text>
          </View>
          <View style={styles.ContentView}>
            <Text style={styles.TxtContent}>20</Text>
            <Text style={styles.TxtContent}>WORK</Text>
          </View>
          <View style={styles.ContentView}>
            <Text style={styles.TxtContent}>300</Text>
            <Text style={styles.TxtContent}>FOLLOWERS</Text>
          </View>
        </View>
      </View>
      <View style={styles.Description}>
        <Text style={styles.TxtDes}>Description about yourself</Text>
        <TouchableOpacity
          style={styles.AboutSelf}
          onPress={() => navigation.navigate('aboutYouSelf')}>
          <Text style={styles.TextAboutYouSelf}>About your self</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ContentText}>
        <Text style={styles.TxtContent}>
          Stories by @rafiZimraanarjuna.wijaya
        </Text>
        <Text style={styles.TxtContent2}>2 published story</Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: '2%'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((value, index) => (
            <View key={index} style={{marginHorizontal: -5}}>
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
        </ScrollView>
      </View>
    </View>
  );
};

export default ComponentProfile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  ContentModal: {
    backgroundColor: White,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  ViewClose: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  TextClose: {
    color: Black,
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Medium',
  },
  HeaderModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextWarning: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp('2'),
    color: Black,
  },
  AboutData: {
    textAlign: 'auto',
    color: Black,
    fontSize: hp('1.7%'),
    fontFamily: 'Poppins-Medium',
  },
  TextInputYes: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
    backgroundColor: Blue,
    paddingVertical: 13,
    borderRadius: 10,
  },
  Txt: {
    top: '4%',
    color: White,
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Medium',
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
  },
  Img: {
    width: wp('25.6%'),
    height: hp('13.5%'),
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2%',
  },
  HeaderTextProfile: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp('80%'),
    marginTop: '5%',
  },
  ContentView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtContent: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  TxtContent2: {
    color: Abu2,
    fontFamily: 'Poppins-Medium',
  },
  Description: {
    backgroundColor: Abu,
    marginTop: '4%',
    height: hp('10%'),
    marginHorizontal: 20,
    justifyContent: 'flex-start',
  },
  TxtDes: {
    marginTop: '3%',
    marginLeft: '3%',
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  AboutSelf: {
    backgroundColor: krem,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 4,
    marginHorizontal: 10,
    width: wp('30%'),
    height: hp('4.5%'),
  },
  TextAboutYouSelf: {
    color: White,
    fontSize: hp('2%'),
    fontWeight: '700',
  },
  ContentText: {
    marginTop: '3%',
    marginHorizontal: 32,
  },
  img: {
    flexDirection: 'row',
  },
  Novel: {
    height: hp('20%'),
    width: wp('30% '),
  },
  BookDescription: {
    marginTop: '3%',
    width: wp('60%'),
  },
  Book: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  BookDes: {
    color: White,
    fontFamily: 'Poppins-Medium',
    marginTop: '3%',
  },
});
