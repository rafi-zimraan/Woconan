import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Grey, White, krem, lightGreen} from '../utils/Colors';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpPasswordNew = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState<string>('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const [otp, setOTP] = useState('');
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // {'OTP PASSWORD'}
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

  const handleOtpEmail = () => {
    if (!toggleCheckBox) {
      Alert.alert('Perhatian !', 'Anda harus checklist kotak di bawah', [
        {
          text: 'OK',
        },
      ]);
    } else {
      AsyncStorage.getItem('token').then(value => {
        var formdata = new FormData();
        formdata.append('otp', otp);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
          headers: {
            Authorization: `Bearer${value}`,
          },
        };
        fetch(
          'https://d3ad-2001-448a-4040-8920-8f82-2cfc-3dfc-cbd7.ngrok-free.app/api/verifikasi-reset',
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.message === 'Kode OTP tidak valid') {
              Alert.alert(
                'peringatan',
                'Maaf password atau Email yang anda masukan salah',
              );
            } else {
              ToastAndroid.show(
                'Akun berhasil di perbarui',
                ToastAndroid.SHORT,
              );
              navigation.replace('passwordNew');
            }
          })
          .catch(error => console.log('error', error));
      });
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Grey} />
      <View style={styles.HeaderTextForgetPass}>
        <Text style={styles.TextHeader}>Lihat email anda, </Text>
        <Text style={styles.TextHeader2}>Now!</Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <View>
          <Text style={styles.TxtOtp}>
            Masukkan kode OTP,{'\n'}
            yang telah terkirim ke Email anda.
          </Text>
        </View>
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
      </View>
      {/* Check box */}
      <View style={styles.CheckBox}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={styles.TextCheckBox}>
          Perhatikan setiap langkah, pastikan anda sudah mengisi email anda
          dengan benar
        </Text>
      </View>
      <TouchableOpacity style={styles.Submit} onPress={() => handleOtpEmail()}>
        {loading ? (
          <ActivityIndicator size={'small'} color="White" />
        ) : (
          <Text style={styles.TxtSubmit}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OtpPasswordNew;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  HeaderTextForgetPass: {
    marginTop: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  TextHeader: {
    color: White,
    fontFamily: 'Poppins-Medium',
    fontSize: hp('3.6%'),
  },
  TextHeader2: {
    color: krem,
    fontFamily: 'Poppins-Medium',
    fontSize: hp('3.4%'),
  },
  HeaderEmail: {
    marginLeft: '4.4%',
    marginTop: '6%',
  },
  TextEmail: {
    color: White,
    fontFamily: 'Poppins-Medium',
    fontSize: hp('2%'),
  },
  ContentTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewTextInput: {
    flexDirection: 'row',
    backgroundColor: White,
    marginHorizontal: 18,
    borderRadius: 10,
  },
  Icon: {
    marginHorizontal: 10,
    marginTop: '3%',
  },
  TextInput: {
    height: hp('7%'),
    width: wp('80%'),
  },
  TxtOtp: {
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Meguler',
    top: '38%',
    color: White,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  CheckBox: {
    flexDirection: 'row',
    marginTop: '49%',
  },
  TextCheckBox: {
    color: White,
    textAlign: 'left',
    width: wp('90%'),
    fontFamily: 'Poppins-Medium',
    fontSize: hp('1.5%'),
  },
  Submit: {
    backgroundColor: krem,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 6,
    marginTop: '2%',
    marginHorizontal: 20,
    width: wp('91%'),
    height: hp('8%'),
  },
  TxtSubmit: {
    color: White,
    fontSize: hp('2.6%'),
    fontWeight: '700',
  },
});
