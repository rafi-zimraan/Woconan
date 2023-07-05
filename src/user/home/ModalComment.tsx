import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
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

interface Props {
  visible: boolean;
  id: number;
  onPress: () => void;
}

interface ListCommentPost {
  konten: string;
  post_id: number;
  user_id: number;
}

const ModalComment: React.FC<Props> = ({visible, id, onPress}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [konten, setKonten] = useState<string>('');
  const [data, setData] = useState<ListCommentPost | null>(null);

  // ! Comment Post
  const CommentPost = async () => {
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
          'https://kelompokx.muhammadiyahexpo.com/api/komentar-posts/82',
          requestOptions,
        );
        const result = await response.json();
        console.log(result.data);
        setData(result.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    CommentPost();
  }, []);

  return (
    <Modal visible={visible}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          name={'arrow-left-circle-outline'}
          size={36}
          style={{marginLeft: '1%', marginTop: '1%', color: Black}}
        />
      </TouchableOpacity>
      <View style={styles.Container}>
        <TextInput
          placeholder="Comment"
          style={styles.Placeholder}
          value={konten}
          onChangeText={Text => setKonten(Text)}
        />
        <TouchableOpacity
          style={styles.ContentInput}
          onPress={() => CommentPost()}>
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
    marginLeft: '3%',
  },
  textInput: {
    color: White,
    fontFamily: 'Poppins-Medium',
  },
});
