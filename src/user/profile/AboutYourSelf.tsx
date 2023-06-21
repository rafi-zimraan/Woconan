import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {Black, Grey, White, krem, lightGray} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Asset, launchImageLibrary} from 'react-native-image-picker';

interface ProfileData {
  id: number;
  gambar: string;
  status: string;
  hobi: string;
  kewarganegaraan: string;
  jenis_kelamin: string;
}

const AboutYourSelf = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [name, setName] = useState<String>('');
  const [status, setStatus] = useState<String>('');
  const [hobi, setHobi] = useState<String>('');
  const [kewarganegaraan, setKewarganegaraan] = useState<String>('');
  const [jenis_kelamin, setJenis_Kelamin] = useState<String>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProfileData[]>([]);
  const [gambar, setGambar] = useState({
    uri: '',
    name: null,
    type: null,
  });

  // {'IMAGE PICKER'}
  async function chooseImage() {
    try {
      const {assets}: {assets?: any[]} = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.1,
      });
      const {fileName: name, type, uri} = assets![0];
      setGambar({uri, name, type});
    } catch (error) {
      console.log(error);
    }
  }

  const Profile = () => {
    AsyncStorage.getItem('token').then(value => {
      var formdata = new FormData();
      formdata.append('gambar', gambar);
      formdata.append('status', status);
      formdata.append('hobi', hobi);
      formdata.append('kewarganegaraan', kewarganegaraan);
      formdata.append('jenis_kelamin', jenis_kelamin);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        'https://3466-2001-448a-4042-41bf-736a-29a5-6765-b487.ngrok-free.app/api/create-profil',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          ToastAndroid.show('Berhasil update profile', ToastAndroid.SHORT);
          navigation.goBack();
        })
        .catch(error => console.log('error', error));
    });
  };

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Grey} />
      <ScrollView>
        <TouchableOpacity
          style={styles.HeaderLeftIcon}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../icon/left-arrow.png')}
            style={styles.iconLeft}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {gambar.uri ? (
              <Image
                source={{uri: gambar.uri}}
                style={{
                  width: wp('25%'),
                  height: hp('15%'),
                  borderRadius: 260,
                }}
              />
            ) : null}
          </View>
          <TouchableNativeFeedback onPress={chooseImage}>
            <View style={styles.ViewCamera}>
              <Image
                source={require('../icon/camera.png')}
                style={styles.camera}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        {/* <View style={{backgroundColor: 'green'}}>
          {data.map((value, index) => (
            <View key={index} style={{backgroundColor: 'red'}}>
              <Image
                source={{uri: value.gambar}}
                style={{height: 50, width: 50, borderRadius: 100}}
              />
            </View>
          ))}
        </View> */}
        <View style={styles.ContentText}>
          <Text style={styles.Txt}>
            Silahkan lengkapi data diri anda dengan mengisi kolom di bawah!
          </Text>
        </View>
        <View>
          <View style={styles.TextInput}>
            <View style={styles.HeaderTextInput}>
              <Icon
                name="card-account-details-outline"
                size={26}
                color={'#FF9125'}
                style={styles.Icon}
              />
              <TextInput
                style={styles.BackgroundTextInput}
                placeholder="Status Hidup"
                cursorColor={Black}
                onChangeText={val => setStatus(val)}
              />
            </View>
          </View>
          <View style={styles.TextInput}>
            <View style={styles.HeaderTextInput}>
              <Icon
                name="gamepad-variant-outline"
                size={26}
                color={'#FF9125'}
                style={styles.Icon}
              />
              <TextInput
                style={styles.BackgroundTextInput}
                placeholder="Hobi"
                cursorColor={Black}
                onChangeText={val => setHobi(val)}
              />
            </View>
          </View>
          <View style={styles.TextInput}>
            <View style={styles.HeaderTextInput}>
              <Icon
                name="warehouse"
                size={26}
                color={'#FF9125'}
                style={styles.Icon}
              />
              <TextInput
                style={styles.BackgroundTextInput}
                placeholder="Warga Negara "
                cursorColor={Black}
                onChangeText={val => setKewarganegaraan(val)}
              />
            </View>
          </View>
          <View style={styles.TextInput}>
            <View style={styles.HeaderTextInput}>
              <Icon
                name="account"
                size={26}
                color={'#FF9125'}
                style={styles.Icon}
              />
              <TextInput
                style={styles.BackgroundTextInput}
                placeholder="Jenis Kelamin  "
                cursorColor={Black}
                onChangeText={val => setJenis_Kelamin(val)}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.SubmitBiodata} onPress={Profile}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.TextSubmit}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AboutYourSelf;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  HeaderLeftIcon: {
    marginLeft: '2%',
  },
  iconLeft: {
    height: hp('5%'),
    width: wp('9%'),
  },
  containerImg: {
    alignItems: 'center',
    height: hp('21%'),
  },
  Img: {
    width: hp('13%'),
    height: wp('26%'),
    borderRadius: 150,
    borderWidth: 1,
    borderColor: Black,
  },
  Drawertxt: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: White,
  },
  ViewCamera: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
  camera: {
    height: hp('3%'),
    width: wp('7%'),
  },
  ContentText: {
    marginLeft: '4.5%',
  },
  Txt: {
    fontFamily: 'Poppins-Medium',
    color: White,
    fontSize: hp('2.2%'),
  },
  TextInput: {
    marginHorizontal: 20,
  },
  HeaderTextInput: {
    flexDirection: 'row',
    backgroundColor: White,
    marginTop: '3%',
    borderRadius: 10,
  },
  BackgroundTextInput: {
    height: hp('7%'),
    width: wp('85%'),
  },
  Icon: {
    marginHorizontal: 10,
    marginTop: '3%',
  },
  SubmitBiodata: {
    backgroundColor: krem,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 6,
    marginTop: '4%',
    marginHorizontal: 20,
    width: wp('91%'),
    height: hp('8%'),
  },
  TextSubmit: {
    color: White,
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2.4%'),
  },
});
