import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {AbuABu, Grey, White, krem, lightGreen} from '../utils/Colors';
import {Fumi} from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {Blue} from '../utils/Colors';
import OTPModal from './OTPModal';

const Register = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<any>();
  const [no_hp, setNo_hp] = useState<any>();
  const [pekerjaan, setPekerjaan] = useState<string>('');
  const [alamat_lengkap, setAlamat_lengkap] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [secureTextentry, setSecureTextEntry] = useState(true);
  const [otpMOdal, setOtpModal] = useState(false);

  const Reg = () => {
    if (name === '') {
      Alert.alert('lur', 'Masukan nama terlebih dahulu!', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (email === '') {
      Alert.alert('lur', 'Masukan email terlebih dahulu!', [
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
      Alert.alert('lur', 'Email harus mengunakan Gmail.com', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (password === '') {
      Alert.alert('lur', 'Masukan password dahulu! ', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (password.length < 8) {
      Alert.alert('lur', 'password minimal 8 karakter', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (no_hp === '') {
      Alert.alert('lur', 'Masukan phone number dahulu!', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (pekerjaan === '') {
      Alert.alert('lur', 'Masukan pekerjaan anda dahulu! ', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else if (alamat_lengkap === '') {
      Alert.alert('lur', 'Masukan alamat lengkap dahulu!', [
        {
          text: 'cancel',
        },
        {
          text: 'ok',
        },
      ]);
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('no_hp', no_hp);
      formdata.append('pekerjaan', pekerjaan);
      formdata.append('alamat_lengkap', alamat_lengkap);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      fetch(
        'https://aca1-2001-448a-4045-45d9-28e7-9606-2565-1970.ngrok-free.app/api/register',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          ToastAndroid.show('akun terdaftar', ToastAndroid.SHORT);
          setOtpModal(true);
        })
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      <ScrollView>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Image
              source={require('../icon/left-arrow.png')}
              style={styles.ImgLeft}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Content}>
          <Text style={styles.TextCreate}>Create Account!</Text>
          <Text style={styles.TextCreate2}>Register to get started.</Text>
        </View>
        <Fumi
          label={'name'}
          iconClass={Icon}
          iconName={'user-circle'}
          iconColor={'#169C89'}
          iconSize={20}
          inputPadding={16}
          style={styles.UserName}
          onChangeText={(rn: string) => setName(rn)}
        />
        <Fumi
          label={'Email Address'}
          iconClass={Icon}
          iconName={'envelope'}
          iconColor={'#169C89'}
          iconSize={20}
          inputPadding={16}
          style={styles.UserName2}
          onChangeText={(rn: string) => setEmail(rn)}
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
          style={styles.UserName3}
          secureTextEntry={secureTextentry}
          onChangeText={(rn: string) => setPassword(rn)}
        />
        <Fumi
          label={'Phone Number'}
          iconClass={Icon}
          iconName={'phone'}
          iconColor={'#169C89'}
          iconSize={20}
          inputPadding={16}
          style={styles.UserName4}
          onChangeText={(rn: string) => setNo_hp(rn)}
        />
        <Fumi
          label={'Work'}
          iconClass={Icon}
          iconName={'briefcase'}
          iconColor={'#169C89'}
          iconSize={20}
          inputPadding={16}
          style={styles.UserName5}
          onChangeText={(rn: string) => setPekerjaan(rn)}
        />
        <Fumi
          label={'full Address'}
          iconClass={Icon}
          iconName={'address-card'}
          iconColor={'#169C89'}
          iconSize={20}
          inputPadding={16}
          style={styles.UserName6}
          onChangeText={(rn: string) => setAlamat_lengkap(rn)}
        />
        <TouchableOpacity style={styles.Register} onPress={() => Reg()}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.TxtReg}>Register</Text>
          )}
        </TouchableOpacity>
        <View style={styles.TxtConnect}>
          <Text style={styles.TxtConnect1}>Or connect via</Text>
        </View>
        <View style={styles.ConnectIcon}>
          <TouchableOpacity style={styles.ImageLog}>
            <Image
              source={require('../icon/Facbook.png')}
              style={styles.IconFab}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ImageLog2}>
            <Image
              source={require('../icon/Apple.png')}
              style={styles.IconFab2}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.ImageLog3}>
            <Image
              source={require('../icon/Goggle.png')}
              style={styles.IconFab3}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.TxtLog}>
          <Text style={styles.TxtConnect1}>Alredy have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.TxtLog1}>Log in</Text>
          </TouchableOpacity>
        </View>
        <OTPModal visible={otpMOdal} />
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  Header: {
    marginTop: '2%',
    height: hp('4%'),
    marginLeft: '3%',
    width: wp('10%'),
  },
  ImgLeft: {
    height: hp('5%'),
    width: wp('9%'),
    left: '9%',
  },
  Content: {
    alignItems: 'flex-start',
    marginTop: '3%',
    left: '4%',
    height: hp('8%'),
  },
  TextCreate: {
    color: lightGreen,
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp('4%'),
  },
  TextCreate2: {
    color: AbuABu,
    fontFamily: 'Poppins-SemiBold',
    bottom: '21%',
    fontSize: hp('2%'),
  },
  UserName: {
    marginHorizontal: '4%',
    borderRadius: 10,
    elevation: 10,
    marginTop: '2%',
  },
  UserName2: {
    marginHorizontal: '4%',
    borderRadius: 10,
    elevation: 10,
    marginTop: '2%',
  },
  UserName3: {
    marginTop: '2%',
    marginHorizontal: '4%',
    borderRadius: 10,
    elevation: 10,
  },
  ContentEye: {
    marginTop: '0%',
    zIndex: 26,
    height: hp('0%'),
  },
  ContentImgEye: {
    marginLeft: '85%',
    marginTop: '6.3%',
  },
  eye: {
    width: wp('7%'),
  },
  UserName4: {
    marginTop: '2%',
    marginHorizontal: '4%',
    borderRadius: 10,
    elevation: 10,
  },
  UserName5: {
    marginTop: '2%',
    marginHorizontal: '4%',
    borderRadius: 10,
    elevation: 10,
  },
  UserName6: {
    marginTop: '2%',
    marginHorizontal: '4%',
    borderRadius: 10,
    elevation: 10,
  },
  Register: {
    backgroundColor: krem,
    marginHorizontal: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: hp('8%'),
    marginTop: '5%',
  },
  TxtReg: {
    color: White,
    fontSize: hp('2.5%'),
    fontWeight: '700',
  },
  TxtConnect: {
    alignItems: 'center',
    marginTop: '2%',
  },
  TxtConnect1: {
    color: AbuABu,
    marginRight: '2%',
  },
  ConnectIcon: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: hp('7%'),
    marginHorizontal: '3%',
  },
  ImageLog: {
    backgroundColor: White,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    height: hp('5%'),
    width: wp('22%'),
    marginLeft: '2%',
    borderRadius: 10,
    elevation: 4,
  },
  ImageLog2: {
    backgroundColor: White,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    height: hp('5%'),
    width: wp('22%'),
    marginLeft: '5%',
    borderRadius: 10,
    elevation: 4,
  },
  ImageLog3: {
    backgroundColor: White,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    height: hp('5%'),
    width: wp('22%'),
    marginLeft: '5%',
    borderRadius: 10,
    elevation: 4,
  },
  IconFab: {
    width: wp('8%'),
    height: hp('4%'),
  },
  IconFab2: {
    width: wp('7%'),
    height: hp('4.2%'),
    marginBottom: '3%',
  },
  IconFab3: {
    width: wp('8%'),
    height: hp('4.2%'),
  },
  TxtLog: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TxtLog1: {
    color: Blue,
    fontSize: hp('1.8%'),
    fontWeight: '700',
  },
});
