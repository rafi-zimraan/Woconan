import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Grey, White} from '../user/utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface listData {
  id: number;
  gambar: string;
}

const KaryaUser = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [data, setData] = useState<listData[]>([]);
  // {'Read'}
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      console.log('Ini token', value);

      var requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };
      fetch(
        'https://45a4-2001-448a-4042-41bf-e3dd-7625-3602-b07e.ngrok-free.app/api/beranda-user',
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          console.log(result.data);
          setData(result.data);
        })
        .catch(error => console.log('error', error));
    });
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'light-content'} backgroundColor={Grey} />
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={46} color={White} />
        </TouchableOpacity>
        <Text style={styles.ContentTxt}>Karya User</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {data.map((value, index) => (
            <View key={index} style={{marginBottom: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('detail', {no_id: value.id})
                }>
                <Image
                  source={{uri: value.gambar}}
                  style={{height: 160, width: 140}}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default KaryaUser;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  ContainerIcon: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  ContentTxt: {
    marginTop: '1%',
    fontSize: hp('3%'),
    color: White,
    fontWeight: '700',
    marginLeft: '25%',
  },
  KaryaUser: {
    backgroundColor: 'green',
    marginHorizontal: '3%',
    borderRadius: 10,
  },
  TxtUser: {
    marginLeft: '3%',
    top: '4%',
  },
  TxtKaryaUser: {
    fontFamily: 'Poppins-Medium',
    fontSize: hp('2%'),
    color: White,
  },
  img: {
    flexDirection: 'row',
  },
  Novel: {
    height: hp('20%'),
    width: wp('30% '),
  },
  BookDescription: {
    marginTop: '3%',
    width: wp('60%'),
  },
  Book: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  BookDes: {
    color: White,
    fontFamily: 'Poppins-Medium',
    marginTop: '3%',
  },
});
function useEff4ect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
