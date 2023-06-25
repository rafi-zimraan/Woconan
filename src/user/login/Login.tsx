import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RootStackParams} from '../../App';
import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Grey,
  GreyLight,
  KremMuda,
  White,
  krem,
  lightGray,
} from '../utils/Colors';
import {Fumi} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [loading, setLoading] = useState<any>(false);
  const [forgetPassword, setForgetPassword] = useState<string>('');

  const saveToken = async (token: any) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.log('gagal save token', e);
    }
  };

  const saveRoll = async (userRole: any) => {
    try {
      await AsyncStorage.setItem('userRole', userRole);
    } catch (e) {
      console.log('gagal save role', e);
    }
  };

  const Log = () => {
    if (email === '') {
      Alert.alert('Perhatian !', 'Anda harus memasukan email terlebih dahulu', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (
      email.split('@')[1] !== 'gmail.com' &&
      email.split('@')[1] !== 'email.com'
    ) {
      Alert.alert('Perhatian !', 'Email harus mengunakan "gmail.com" ', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (password === '') {
      Alert.alert('Perhatian !', 'Anda belum memasukan password', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (password.length < 8) {
      Alert.alert('Perhatian', 'Password minimal 8 karakter', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else {
      setLoading(true);
      var fromdata = new FormData();
      fromdata.append('email', email);
      fromdata.append('password', password);

      var requestOptions = {
        method: 'POST',
        body: fromdata,
        redirect: 'follow',
      };

      fetch('https://kelompokx.muhammadiyahexpo.com/api/login', requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.message == 'Unauthorized') {
            Alert.alert(
              'peringatan',
              'Maaf password atau Email yang anda masukan salah',
            );
          } else {
            if (result.message == 'user login successful') {
              console.log('token', result.access_token);
              saveToken(result.access_token);
              saveRoll('user');
              ToastAndroid.show('Selamat datang user', ToastAndroid.SHORT);
              navigation.replace('bottom');
            } else if (result.message == 'admin login successful') {
              console.log('token', result.access_token);
              saveToken(result.access_token);
              saveRoll('admin');
              ToastAndroid.show('Selamat datang admin', ToastAndroid.SHORT);
              navigation.replace('homeAdmin');
            }
          }
        })
        .catch(error => {
          console.log('error', error);
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        const result = JSON.parse(value);
        if (result.message === 'user login successful') {
          ToastAndroid.show('Selamat datang user', ToastAndroid.SHORT);
          navigation.replace('bottom');
        } else if (result.message === 'admin login successful') {
          ToastAndroid.show('Selamat datang admin', ToastAndroid.SHORT);
          navigation.replace('homeAdmin');
        }
      }
    };

    checkToken();
  }, [navigation]);

  // {'FORGET PASSWORD'}
  const forget = () => {
    if (forgetPassword === '') {
      Alert.alert('Perhatian !', 'apakah anda lupa kata sandi ?', [
        {
          text: 'tidak',
        },
        {
          text: 'ya',
          onPress: () => navigation.navigate('forgetPassword'),
        },
      ]);
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      <View style={styles.HeaderTxt}>
        <Text style={styles.txt1}>Login to Woconan</Text>
      </View>
      <Fumi
        label={'Email'}
        iconClass={Icon}
        iconName={'user-circle'}
        iconColor={'#169C89'}
        iconSize={20}
        inputPadding={16}
        style={styles.UserName}
        onChangeText={(rr: string) => setEmail(rr)}
      />
      <View style={styles.ContentEye}>
        <TouchableOpacity
          style={styles.ContentImgEye}
          onPress={() => {
            setSecureTextEntry(raf => !raf);
          }}>
          <Image
            style={styles.eye}
            source={require('../icon/mdi_hide-outline.png')}
          />
        </TouchableOpacity>
      </View>
      <Fumi
        label={'Password'}
        iconClass={Icon}
        iconName={'unlock-alt'}
        iconColor={'#169C89'}
        iconSize={20}
        inputPadding={16}
        style={styles.UserName2}
        secureTextEntry={secureTextEntry}
        onChangeText={(rr: string) => setPassword(rr)}
      />
      <TouchableOpacity style={styles.ForgetPass} onPress={() => forget()}>
        <Text style={styles.txt2}>Forget Password ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Login} onPress={() => Log()}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>Login</Text>
        )}
      </TouchableOpacity>
      <View style={styles.ContentLine}>
        <View style={styles.LineLogin} />
        <Text style={styles.Or}>OR</Text>
        <View style={styles.LineLogin2} />
      </View>
      <View style={styles.Content}>
        <TouchableOpacity style={styles.ImageLog}>
          <Image
            source={require('../icon/Facbook.png')}
            style={styles.IconFab}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ImageLog}>
          <Image
            source={require('../icon/Apple.png')}
            style={styles.IconFab2}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ImageLog}>
          <Image
            source={require('../icon/Goggle.png')}
            style={styles.IconFab3}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.TextLog}>
        <Text style={styles.txtAcc}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={styles.Sign}>
          <Text style={styles.txtSign}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  HeaderTxt: {
    marginTop: '36%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt1: {
    fontFamily: 'Poppins-Bold',
    color: GreyLight,
    fontSize: hp('2.8%'),
  },
  UserName: {
    marginTop: '5%',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 10,
  },
  ContentEye: {
    marginTop: '0%',
    zIndex: 26,
    height: hp('0%'),
  },
  ContentImgEye: {
    marginLeft: '83%',
    marginTop: '7%',
  },
  eye: {
    width: wp('7%'),
  },
  UserName2: {
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 10,
    marginTop: '2%',
  },
  ForgetPass: {
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Login: {
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
  txt2: {
    color: KremMuda,
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Reguler',
    top: '39%',
  },
  txt3: {
    color: White,
    fontSize: hp('2.6%'),
    fontWeight: '700',
  },
  ContentLine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '6%',
  },
  LineLogin: {
    width: wp('36%'),
    borderWidth: 0.5,
    backgroundColor: White,
  },
  Or: {
    color: lightGray,
  },
  LineLogin2: {
    width: wp('36%'),
    borderWidth: 0.5,
    backgroundColor: White,
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp('2%'),
    marginHorizontal: 7,
  },
  ImageLog: {
    backgroundColor: White,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '9%',
    height: hp('4.8%'),
    width: wp('27%'),
    borderRadius: 10,
    elevation: 4,
  },
  IconFab: {
    width: wp('8%'),
    height: hp('4%'),
  },
  IconFab2: {
    width: wp('7%'),
    height: hp('4%'),
  },
  IconFab3: {
    width: wp('8%'),
    height: hp('4%'),
  },
  TextLog: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8.9%',
  },
  txtAcc: {
    fontSize: hp('2%'),
    color: GreyLight,
  },
  Sign: {
    paddingLeft: '2%',
  },
  txtSign: {
    color: KremMuda,
    fontSize: hp('2'),
  },
});
