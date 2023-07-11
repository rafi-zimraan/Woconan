import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Black, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface komentars {
  konten: any;
  post_id: any;
  user_id: number;
  onPress: () => void;
  visible: boolean;
  fotoprofile: string;
  jam: number;
}

interface ReplyComment {
  konten: any;
  post_id: any;
}

const ModalComment: React.FC<komentars> = ({visible, onPress, post_id}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [konten, setKonten] = useState<string>('');
  const [dataKomentar, setDataKomentar] = useState<komentars[]>([]);
  const [balasan, setBalasan] = useState<ReplyComment | null>(null);

  useEffect(() => {
    GetAllComentar(post_id);
  }, []);

  const GetAllComentar = async (post_id: any) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `https://kelompokx.muhammadiyahexpo.com/api/lihat-komentar/${post_id}`,
        requestOptions,
      );
      const result = await response.json();
      console.log(result.komentars);
      setDataKomentar(result.komentars);
    } catch (error) {
      console.log('error', error);
    }
  };

  // ! Comment Post
  const CommentPost = async (post_id: any) => {
    console.log(konten);
    try {
      const token = await AsyncStorage.getItem('token');
      if (konten !== '') {
        const formdata = new FormData();
        formdata.append('konten', konten);

        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(
          `https://kelompokx.muhammadiyahexpo.com/api/komentar-posts/${post_id}`,
          requestOptions,
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const result = await response.json();
        console.log(result);
        GetAllComentar(post_id);
        // setDataKomentar(result.dataKomentar);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // ! Comment reply
  // const CommentReply = async (post_id: any) => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (konten !== '') {
  //       const formdata = new FormData();
  //       formdata.append('konten', konten);

  //       const requestOptions = {
  //         method: 'POST',
  //         body: formdata,
  //         redirect: 'follow',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };

  //       const response = await fetch(
  //         `https://kelompokx.muhammadiyahexpo.com/api/komentar/${post_id}/balas`,
  //         requestOptions,
  //       );

  //       if (!response.ok) {
  //         throw new Error('Request failed');
  //       }

  //       const result = await response.json();
  //       console.log(result.balasan);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const hendleAllComment = () => {
    console.log('Testing errong');
    CommentPost(post_id);
    setKonten('');
  };

  return (
    <Modal visible={visible}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={'arrow-left-circle-outline'}
          size={36}
          style={{marginLeft: '1%', marginTop: '1%', color: Black}}
        />
      </TouchableOpacity>
      <ScrollView>
        <View>
          {dataKomentar.map((value, index) => (
            <TouchableOpacity>
              <View
                key={index}
                style={{
                  backgroundColor: 'orange',
                  marginVertical: 10,
                  marginHorizontal: 10,
                  height: hp('3%'),
                  borderRadius: 10,
                  alignItems: 'baseline',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: Black,
                    marginLeft: 10,
                    textAlign: 'auto',
                  }}>
                  {value.konten}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            textAlign: 'right',
            color: Black,
            alignItems: 'center',
            marginRight: 10,
          }}>
          {balasan?.konten}
        </Text>
      </View>
      <View style={styles.Container}>
        <TextInput
          placeholder="Comment"
          style={styles.Placeholder}
          value={konten}
          onChangeText={Text => setKonten(Text)}
        />
        <TouchableOpacity
          style={styles.ContentInput}
          onPress={hendleAllComment}>
          <Text style={styles.textInput}>Input</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalComment;

const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: wp('100%'),
    height: hp('7%'),
    bottom: 0,
    flexDirection: 'row',
  },
  Placeholder: {
    flex: 1,
    width: wp('83%'),
    backgroundColor: White,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 10,
    paddingLeft: 10,
    bottom: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ContentInput: {
    width: wp('13%'),
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    bottom: 10,
    marginLeft: '2%',
  },
  textInput: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
});
