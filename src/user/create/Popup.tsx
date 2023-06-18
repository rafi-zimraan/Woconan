import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Black, Blue, White, krem} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

interface Props {
  visible: boolean;
  onPress: () => void;
  onPress2: () => void;
  id: any;
}

const Popup: React.FC<Props> = ({visible, onPress, onPress2, id}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // {'Delete Postingan'}
  const Delete = () => {
    AsyncStorage.getItem('token').then(value => {
      console.log('Ini token', value);

      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${value}`,
        },
      };

      fetch(
        `https://baeb-2001-448a-404c-1cd1-a02a-fe39-5413-1026.ngrok-free.app/api/delete-postingan/${id}`,
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log(result);
          navigation.goBack();
          ToastAndroid.show(
            'Anda berhasil delete postingan ',
            ToastAndroid.SHORT,
          );
        })
        .catch(error => console.log('error', error));
    });
  };

  return (
    <Modal isVisible={visible}>
      <View style={styles.ContainerModal}>
        <TouchableOpacity onPress={onPress} style={{marginLeft: '85%'}}>
          <Text style={{fontSize: 20, color: krem}}>Close</Text>
        </TouchableOpacity>
        <View style={{marginLeft: '2%'}}>
          <Text style={styles.Opsi}>Opsi ?</Text>
        </View>
        <TouchableOpacity style={styles.Delete} onPress={Delete}>
          <Text style={styles.TxtDelete}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress2} style={styles.Edit}>
          <Text style={styles.TxtEdit}>Edit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  ContainerModal: {
    backgroundColor: 'white',
    height: hp('19%'),
    borderRadius: 10,
  },
  Opsi: {
    fontFamily: 'Poppins-Medium',
    color: Black,
    fontSize: hp('2.4%'),
  },
  Delete: {
    marginTop: '2%',
    backgroundColor: Blue,
    marginHorizontal: 15,
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  TxtDelete: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
  Edit: {
    marginTop: '2%',
    backgroundColor: '#FF9125',
    marginHorizontal: 15,
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  TxtEdit: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
});
