import React, {useState} from 'react';
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
import {Grey, White, krem} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgetPassword = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [email, setEmail] = useState<string>('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  // { 'reset password '}
  const ResetPassword = () => {
    if (email === '') {
      Alert.alert('Perhatian !!', 'Anda harus mengisi from email dahulu', [
        {
          text: 'ok',
        },
      ]);
    } else if (
      email.split('@')[1] !== 'gmail.com' &&
      email.split('@')[1] !== 'email.com'
    ) {
      Alert.alert('Perhatian !!', 'Email wajib mengunakan "gmail.com" ', [
        {
          text: 'ok',
        },
      ]);
    } else if (!toggleCheckBox) {
      Alert.alert('Perhatian !', 'Anda harus checklist kotak di bawah', [
        {
          text: 'OK',
        },
      ]);
    } else {
      AsyncStorage.getItem('token').then(value => {
        var formdata = new FormData();
        formdata.append('email', email);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
          headers: {
            Authorization: `Bearer ${value}`,
          },
        };
        fetch(
          'https://baeb-2001-448a-404c-1cd1-a02a-fe39-5413-1026.ngrok-free.app/api/kirim-ulang',
          requestOptions,
        )
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.message === 'User tidak ditemukan') {
              Alert.alert(
                'peringatan',
                'Maaf password atau Email yang anda masukan salah',
              );
            } else {
              ToastAndroid.show(
                'Akun berhasil di perbarui',
                ToastAndroid.SHORT,
              );
              navigation.replace('otpPassword');
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
        <Text style={styles.TextHeader}>Apakah anda</Text>
        <Text style={styles.TextHeader2}>lupa Password ?</Text>
      </View>
      <View style={styles.HeaderEmail}>
        <Text style={styles.TextEmail}>
          Masukan Email anda terlebih dahulu!!
        </Text>
      </View>
      <View style={styles.ContentTextInput}>
        <View style={styles.ViewTextInput}>
          <Icon
            name="email-outline"
            size={26}
            color="#FF9125"
            style={styles.Icon}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Masukan email anda"
            onChangeText={val => setEmail(val)}
          />
        </View>
      </View>
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
      <TouchableOpacity style={styles.Submit} onPress={() => ResetPassword()}>
        <Text style={styles.TxtSubmit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

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
