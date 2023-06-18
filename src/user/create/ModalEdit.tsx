import {
  StyleSheet,
  View,
  Modal,
  Text,
  ToastAndroid,
  Image,
  TouchableNativeFeedback,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Grey, White, krem} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

interface Props {
  visible: boolean;
  id: number;
}

const ModalEdit: React.FC<Props> = ({visible, id}) => {
  const [judul, setJudul] = useState<string>('');
  const [descripsi, setDescripsi] = useState<string>('');
  const [loading, setLoading] = useState<any>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [gambar, setGambar] = useState({
    uri: '',
    name: null,
    type: null,
  });

  // {'Image picker'}
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

  const Update = () => {
    AsyncStorage.getItem('token').then(value => {
      var formdata = new FormData();
      formdata.append('gambar', gambar);
      formdata.append('judul', judul);
      formdata.append('deskripsi', descripsi);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      fetch(
        `https://5b08-2001-448a-4044-4106-921b-b8e7-cae1-bde1.ngrok-free.app/api/update-postingan/${id}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          navigation.goBack();
          ToastAndroid.show(
            'Anda berhasil uptade postingan ',
            ToastAndroid.SHORT,
          );
        })
        .catch(error => console.log('error', error));
    });
  };

  return (
    <Modal visible={visible}>
      <ScrollView style={styles.Container}>
        <View>
          <View style={styles.HeaderImagePicker}>
            <Image
              source={{uri: gambar.uri}}
              style={{
                width: wp('40%'),
                height: hp('34%'),
              }}
            />
          </View>
          <TouchableNativeFeedback onPress={chooseImage}>
            <View style={styles.ViewCamera}>
              <Image
                source={require('../icon/camera.png')}
                style={styles.camera}
              />
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
              />
            </View>
            <View style={styles.HeaderView}>
              <TextInput
                style={{height: hp('25%'), width: wp('90%')}}
                placeholder="Descripsi"
                onChangeText={val => setDescripsi(val)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.Submit}
            onPress={Update}
            disabled={loading}>
            <Text style={styles.txt3}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalEdit;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  HeaderImagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewCamera: {
    alignItems: 'center',
    marginTop: '1%',
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
  TextInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconPlasholder: {
    marginHorizontal: 10,
    marginTop: '2%',
  },
  Submit: {
    backgroundColor: krem,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 6,
    marginTop: '4%',
    marginHorizontal: 90,
    width: wp('60%'),
    height: hp('6%'),
  },
  txt3: {
    color: White,
    fontSize: hp('2.4%'),
    fontWeight: '700',
  },
});
