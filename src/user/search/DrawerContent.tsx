import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Black} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class DrawerContent extends Component {
  render() {
    return (
      <View>
        <View style={styles.content}>
          <View style={styles.IconContent}>
            <TouchableOpacity>
              <Icon name="home-outline" size={33} color={Black} />
            </TouchableOpacity>
            <Text style={styles.txtContent}>Messages</Text>
          </View>
          <View style={styles.IconContent}>
            <TouchableOpacity>
              <Icon name="account-outline" size={33} color={Black} />
            </TouchableOpacity>
            <Text style={styles.txtContent}>Profile</Text>
          </View>
          <View style={styles.IconContent}>
            <TouchableOpacity>
              <Icon name="cog-outline" size={33} color={Black} />
            </TouchableOpacity>
            <Text style={styles.txtContent}>Settings</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
  },
  IconContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    marginVertical: '8%',
    paddingHorizontal: '5%',
  },
  txtContent: {
    marginLeft: '15%',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2%'),
    color: Black,
  },
});
