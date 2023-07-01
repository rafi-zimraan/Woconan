import React, {useEffect, useState} from 'react';
import {
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
import {useRoute, RouteProp} from '@react-navigation/native';

interface listData {
  id: number;
  gambar: string;
}

interface ProfileUserProps {
  id: number;
  gambar: string;
  name: any;
}

const ComponentProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [dataProfile, setDataProfile] = useState<listData[]>([]);
  const [data, setData] = useState<ProfileUserProps | null>();
  const [token, setToken] = useState('');
  const [isFollowing, setIsFollowing] = useState<Boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // ! {'Modal'}
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // ! {'Profile User'}
  const fetch_data = (token: any) => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      'https://kelompokx.muhammadiyahexpo.com/api/index-profil/5',
      requestOptions,
    )
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        setData(response.data);
        tampilkan_content(token);
      })
      .catch(e => console.log(e));
  };

  // ! {'tampilkan content'}
  const tampilkan_content = (token: any) => {
    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      'https://kelompokx.muhammadiyahexpo.com/api/beranda-user',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setDataProfile(result.data);
      })
      .catch(error => console.log('error', error));
  };

  // !{'following'}
  const following = (token: any) => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      'https://kelompokx.muhammadiyahexpo.com/api/users/43/follow',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setIsFollowing(prevState => !prevState);
      })
      .catch(error => console.log('error', error));
  };

  // ! {'refresh all item'}
  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      fetchProfileData();
    });
    return refresh;
  }, [navigation]);

  // ! ['Api Profile User']
  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token!);
      const userId = await AsyncStorage.getItem('user_id');
      console.log('userId', userId);
      fetch_data(token!);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />

      {/* MODAL */}
      <Modal
        isVisible={isModalVisible}
        backdropColor={Black}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={2000}
        animationOutTiming={2000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
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
      {data && (
        <View style={styles.profileContainer}>
          <TouchableOpacity>
            <Image source={{uri: data.gambar}} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.MapDataProfile}>{data.name}</Text>
        </View>
      )}
      <View style={styles.Description}>
        <Text style={styles.TxtDes}>Description about yourself</Text>

        {/* ABOUT YOUR SELF */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.AboutSelf}
            onPress={() =>
              navigation.navigate('aboutYouSelf', {
                token,
              })
            }>
            <Text style={styles.TextAboutYouSelf}>About your self</Text>
          </TouchableOpacity>

          {/* FOLLOWERS */}
          <TouchableOpacity
            style={[
              styles.ViewFollow,
              {backgroundColor: isFollowing ? 'blue' : 'red'},
            ]}
            onPress={() => following(token)}>
            <Text style={styles.TxtViewFollow}>
              {isFollowing ? 'follow' : 'Unfollow'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{flexDirection: 'row', marginLeft: '2%', flexWrap: 'wrap'}}>
          {dataProfile.map((value, index) => (
            <View key={index} style={{margin: 16}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('detail', {no_id: value.id})
                }>
                <Image
                  source={{uri: value.gambar}}
                  style={{height: 130, width: 100}}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
    marginTop: '3%',
    backgroundColor: White,
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
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  MapDataProfile: {
    color: White,
    fontFamily: 'Poppins-Bold',
    marginLeft: 24,
    marginTop: '1%',
    fontSize: hp('2.7%'),
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  Description: {
    backgroundColor: Abu,
    marginTop: '7%',
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
    elevation: 14,
    marginHorizontal: 10,
    width: wp('30%'),
    height: hp('4.5%'),
  },
  TextAboutYouSelf: {
    color: White,
    fontSize: hp('2%'),
    fontWeight: '700',
  },
  ViewFollow: {
    backgroundColor: Blue,
    width: wp('30%%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 14,
  },
  TxtViewFollow: {
    color: White,
    fontFamily: 'Poppins-Bold',
    fontSize: hp('1.8%'),
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
