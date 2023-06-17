import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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

const AboutYourSelf = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [namaLengkap, setNamaLengkap] = useState<String>('');
  const [statusHidup, setStatusHidup] = useState<String>('');
  const [hobi, setHobi] = useState<String>('');
  const [wargaNegara, setWargaNegara] = useState<String>('');
  const [jenisKelamin, setJenisKelamin] = useState<String>('');

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
        <View style={styles.containerImg}>
          <Image source={require('../image/FotoRafi.jpg')} style={styles.Img} />
          <Text style={styles.Drawertxt}>User</Text>
        </View>
        <View style={styles.ContentText}>
          <Text style={styles.Txt}>
            Silahkan lengkapi data diri anda dengan mengisi kolom di bawah!
          </Text>
        </View>
        <View>
          <View style={styles.TextInput}>
            <View style={styles.HeaderTextInput}>
              <Icon
                name="content-save-all-outline"
                size={26}
                color={'#FF9125'}
                style={styles.Icon}
              />
              <TextInput
                style={styles.BackgroundTextInput}
                placeholder="Nama Lengkap"
                cursorColor={Black}
                onChangeText={val => setNamaLengkap(val)}
              />
            </View>
          </View>
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
                onChangeText={val => setStatusHidup(val)}
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
                onChangeText={val => setWargaNegara(val)}
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
                onChangeText={val => setJenisKelamin(val)}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.SubmitBiodata}
          onPress={() => navigation.goBack()}>
          <Text style={styles.TextSubmit}>Submit</Text>
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
