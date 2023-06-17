import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Abu, AbuABu, Black, KremMuda, White, lightGreen} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class DrawerImage extends Component {
  render() {
    return (
      <View>
        <View>
          <Image
            source={require('../image/MyImage.jpg')}
            style={styles.bgImage}
          />
          <View style={styles.containerImg}>
            <Image
              source={require('../image/FotoRafi.jpg')}
              style={styles.imgDrawer}
            />
            <Text style={styles.Drawertxt}>User</Text>
          </View>
          <View style={styles.Drawertxt3} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  containerImg: {
    alignItems: 'center',
    height: hp('28%'),
  },
  imgDrawer: {
    width: hp('13%'),
    height: wp('26%'),
    borderRadius: 150,
    borderWidth: 2,
    borderColor: Black,
    marginTop: '10%',
  },
  Drawertxt: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: White,
  },
  Drawertxt3: {
    width: hp('100%'),
    height: 2,
    backgroundColor: Black,
  },
});
