import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ImageStyle, TouchableOpacity} from 'react-native';
import {RootStackParams} from '../../App';

interface Props {
  source: any;
  style2: ImageStyle;
  CostumKey: number;
}

const index: React.FC<Props> = ({source, style2, CostumKey}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('produck')}
      style={{marginHorizontal: -24}}>
      <Image source={source} style={style2} />
    </TouchableOpacity>
  );
};

export default index;
