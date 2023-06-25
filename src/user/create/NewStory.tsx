import {
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {Grey, White} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewStory = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [judul, setJudul] = useState<string>('');
  const [descripsi, setDescripsi] = useState<string>('');

  const [gambar, setGambar] = useState({
    uri: '',
    name: null,
    type: null,
  });

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      getToken();
    });

    return refresh;
  }, [navigation]);

  // {'Save Token'}
  async function getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Failed to get token from AsyncStorage', error);
      throw error;
    }
  }

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

  //{'CREAT'}
  async function Creat() {
    var formdata = new FormData();
    formdata.append('gambar', gambar);
    formdata.append('judul', judul);
    formdata.append('deskripsi', descripsi);

    try {
      const token = await getToken();

      const {data} = await axios.post(
        'https://kelompokx.muhammadiyahexpo.com/api/create-posts',
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        },
      );
      console.log('RESPONSE', data);
      navigation.goBack();
      ToastAndroid.show('Cerita anda berhasil di Upload', ToastAndroid.SHORT);
    } catch (error: any) {
      console.log('ERROR', error.message);
    }

    // {'MENGUNAKAN FETCH'}
    // navigation.navigate('home');
    //   fetch(
    //     'https://f67e-2001-448a-4046-2a14-8444-b570-701f-22ff.ngrok-free.app/api/create-posts',
    //     {
    //       method: 'POST',
    //       body: formdata,
    //       headers: {
    //         Authorization: `Bearer 14|bKwTVZicPamqMVFCpJwSeE2dbTxJzY7ARxKXjD69`,
    //         'Content-Type': 'multipart/form-data',
    //         Accept: 'application/json',
    //       },
    //     },
    //   )
    //     .then(response => response.json())
    //     .then(result => {
    //       console.log('RESPONSE', result);
    //     })
    //     .catch(error => console.log('error', error));
    // }
  }

  const handleDescriptionChange = (LaneDescription: string) => {
    setDescripsi(LaneDescription);
  };

  return (
    <View style={{flex: 1, backgroundColor: Grey}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {gambar.uri ? (
            <Image
              source={{uri: gambar.uri}}
              style={{
                width: wp('40%'),
                height: hp('34%'),
              }}
            />
          ) : null}
        </View>
      </View>
      <TouchableNativeFeedback onPress={chooseImage}>
        <View style={styles.ViewCamera}>
          <Image source={require('../icon/camera.png')} style={styles.camera} />
        </View>
      </TouchableNativeFeedback>
      <View style={styles.TextInput}>
        <View style={styles.HeaderView}>
          <Icon
            name="chart-bubble"
            size={26}
            color="#888"
            style={styles.IconPlasholder}
          />
          <TextInput
            style={{height: hp('5%'), width: wp('40%')}}
            placeholder="Judul"
            onChangeText={val => setJudul(val)}
            value={judul}
          />
        </View>
        <View style={styles.HeaderViewDescription}>
          <TextInput
            selectionColor={White}
            placeholder="Descripsi"
            onChangeText={val => setDescripsi(val)}
            multiline={true}
            value={descripsi}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2%',
        }}>
        <Button title="Simpan" onPress={Creat} />
      </View>
    </View>
  );
};
export default NewStory;

const styles = StyleSheet.create({
  ViewCamera: {
    alignItems: 'center',
    marginTop: '3%',
  },
  camera: {
    height: hp('5%'),
    width: wp('10%'),
  },
  HeaderView: {
    flexDirection: 'row',
    backgroundColor: White,
    borderRadius: 20,
    marginTop: '2%',
  },
  HeaderViewDescription: {
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 20,
    marginTop: '3%',
    height: hp('20%'),
    width: wp('85%'),
  },
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconPlasholder: {
    marginHorizontal: 10,
    marginTop: '2%',
  },
});
