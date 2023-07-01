import React from 'react';
import {
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
import {White} from '../utils/Colors';

interface Props {
  visible: boolean;
  id: number;
}

const ModalComment: React.FC<Props> = ({visible, id}) => {
  return (
    <Modal>
      <View style={styles.Container}>
        <TextInput placeholder="Search" style={styles.Placeholder} />
        <TouchableOpacity style={styles.ContentInput}>
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
    width: wp('83%'),
    backgroundColor: White,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    paddingHorizontal: 10,
    paddingLeft: 10,
    bottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
