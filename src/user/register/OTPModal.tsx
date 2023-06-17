import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useRef, useState, MutableRefObject} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {White, lightGreen} from '../utils/Colors';
import {RootStackParams} from '../../App';

interface Props {
  visible: boolean;
  onPress?: () => void;
}

const OTPModal: React.FC<Props> = ({visible}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [otp, setOTP] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOTPChange = (index: number, value: string) => {
    setOTP(prevOTP => {
      const updatedOTP = prevOTP.split('');
      updatedOTP[index] = value;
      return updatedOTP.join('');
    });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  // {'API MODAL'}
  const verify = () => {
    var formdata = new FormData();
    formdata.append('token', otp);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://aca1-2001-448a-4045-45d9-28e7-9606-2565-1970.ngrok-free.app/api/kirim-verifikasi',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.error_message) {
          Alert.alert('Perhatian', 'kode OTP yang anda masukkan salah', [
            {
              text: 'Ok',
            },
          ]);
        } else {
          navigation.replace('login');
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Modal visible={visible} animationType={'slide'}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={White}
        translucent={false}
      />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 25,
            color: 'black',
            marginTop: 30,
            alignSelf: 'center',
          }}>
          Verifikasi OTP
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 30,
            color: 'black',
            marginTop: 60,
          }}>
          Verifikasi
        </Text>
        <Text style={{fontSize: 15, fontFamily: 'Poppins-Reguler'}}>
          Masukkan kode OTP{'\n'}
          yang telah terkirim ke Email anda
        </Text>
        <View style={styles.container}>
          {Array.from({length: 6}, (_, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={otp[index]}
              onChangeText={value => handleOTPChange(index, value)}
              onKeyPress={({nativeEvent: {key}}) =>
                handleOTPKeyPress(index, key)
              }
              keyboardType="numeric"
              maxLength={1}
              ref={ref => (inputRefs.current[index] = ref)}
              autoFocus={index === 0}
            />
          ))}
        </View>
        {otp.length == 6 ? (
          <TouchableOpacity onPress={verify}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: lightGreen,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                alignSelf: 'center',
                marginTop: 50,
              }}>
              <Icon name="arrow-right" size={25} color={'white'} />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </Modal>
  );
};

export default OTPModal;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: lightGreen,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    marginTop: 30,
  },
});

function onComplete(otp: string) {
  throw new Error('Function not implemented.');
}
