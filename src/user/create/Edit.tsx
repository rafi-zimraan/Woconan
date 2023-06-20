import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {krem, Grey, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popup from './Popup';
import ModalEdit from './ModalEdit';

interface listData {
  id: number;
  gambar: string;
}

const Edit = () => {
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [data, setData] = useState<listData[]>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const handleEdit = (id: number) => {
    setPopup(true);
    setSelectedId(id);
  };
  const HandleModalEdit = () => {
    setPopup(false);
    setPopup2(true);
  };
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
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Grey}
        translucent={false}
      />
      <View style={styles.ContainerIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name={'arrow-left'} size={46} color={White} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.ContentTxt}>Edit</Text>
        </View>
        <TouchableOpacity>
          <Image source={require('../icon/Lonceng.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: '2%'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((value, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => handleEdit(value.id)}>
                <Image
                  source={{uri: value.gambar}}
                  style={{height: 160, width: 140}}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.Push}
        onPress={() => navigation.replace('bottom')}>
        <Text style={styles.txt3}>Push in</Text>
      </TouchableOpacity>
      <Popup
        visible={popup}
        onPress={() => setPopup(false)}
        onPress2={HandleModalEdit}
        id={selectedId}
      />
      <ModalEdit visible={popup2} id={selectedId} />
    </View>
  );
};

export default Edit;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Grey,
  },
  ContainerIcon: {
    flexDirection: 'row',
    marginTop: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  ContentTxt: {
    marginTop: '3%',
    fontSize: hp('3%'),
    color: White,
    fontWeight: '700',
  },
  Push: {
    backgroundColor: krem,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 6,
    marginTop: '150%',
    marginHorizontal: '25%',
    width: wp('51%'),
    height: hp('8%'),
  },
  txt3: {
    color: White,
    fontSize: hp('2.6%'),
    fontWeight: '700',
  },
});
