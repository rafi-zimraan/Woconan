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
import {useNavigation, useRoute} from '@react-navigation/native';
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

interface RouteParams {
  token?: string;
}

const AboutYourSelf = () => {
  const route = useRoute();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [hobi, setHobi] = useState<string>('');
  const [kewarganegaraan, setKewarganegaraan] = useState<string>('');
  const [jenis_kelamin, setJenis_Kelamin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProfileData[]>([]);

  const [gambar, setGambar] = useState<{
    uri: string | undefined;
    name: string | null;
    type: string | null;
  }>({
    uri: '',
    name: null,
    type: null,
  });

  let token = (route.params as RouteParams)?.token;

  // {'Get data profile'}
  const get_data_profile = () => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      'https://1c2c-2001-448a-404a-611e-d28c-b918-a2ae-498a.ngrok-free.app/api/index-profil/5',
      requestOptions,
    )
      .then(response => response.json())
      .then(response => {
        setData(response.data);
        setName(response.data.name);
        setStatus(response.data.status);
        setHobi(response.data.hobi);
        setKewarganegaraan(response.data.kewarganegaraan);
        setJenis_Kelamin(response.data.jenis_kelamin);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    get_data_profile();
  }, []);

  // {'Update data'}
  const update_data = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append('gambar', gambar);
    formdata.append('name', name);
    formdata.append('status', status);
    formdata.append('hobi', hobi);
    formdata.append('kewarganegaraan', kewarganegaraan);
    formdata.append('jenis_kelamin', jenis_kelamin);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://1c2c-2001-448a-404a-611e-d28c-b918-a2ae-498a.ngrok-free.app/api/update-profil/5',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result),
          ToastAndroid.show('Anda berhasil update data', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };
  // {'IMAGE PICKER'}
  async function chooseImage() {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.1,
      });
      if (result?.assets && result.assets.length > 0) {
        const {fileName: name, type, uri} = result.assets[0];
        setGambar({
          ...gambar,
          uri: uri || '',
          name: name || '',
          type: type || '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          <TouchableNativeFeedback onPress={() => chooseImage()}>
            <View style={styles.ViewCamera}>
              <Image
                source={require('../icon/camera.png')}
                style={styles.camera}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.ContentText}>
          <Text style={styles.Txt}>
            Silahkan lengkapi data diri anda dengan mengisi kolom di bawah!
          </Text>
        </View>
        <View>
          {/* nama */}
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
                placeholder="Nama"
                cursorColor={Black}
                onChangeText={val => setName(val)}
                value={name}
              />
            </View>
          </View>
          {/* status */}
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
                value={status}
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
                value={hobi}
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
                value={kewarganegaraan}
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
                value={jenis_kelamin}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.SubmitBiodata}
          onPress={() => update_data()}>
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
