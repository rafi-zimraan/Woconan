import React, {Component} from 'react';
import {
  DrawerLayoutAndroid,
  Image,
  StatusBar,
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
import {Abu2, Black, Grey, GreyLight, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ComponentsTextSearch from './ComponentsTextSearch';
import DrawerImage from './DrawerImage';
import DrawerContent from './DrawerContent';

export default class Search extends Component {
  private drawerSearch = React.createRef<DrawerLayoutAndroid>();

  render() {
    const navigationDrawer = (
      <View>
        <DrawerImage />
        <DrawerContent />
        <Icon
          onPress={() => this.drawerSearch.current?.closeDrawer()}
          name="close"
          size={35}
          style={{position: 'absolute', right: 3, color: '#FFFFFF'}}
        />
      </View>
    );
    return (
      <View style={styles.Container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={Grey}
          translucent={false}
        />
        <DrawerLayoutAndroid
          ref={this.drawerSearch}
          drawerWidth={300}
          drawerPosition={'right'}
          renderNavigationView={() => navigationDrawer}
          style={{flex: 1}}>
          <View style={styles.Header}>
            <Text style={styles.HeaderText}>Search</Text>
            <View style={styles.HeaderView}>
              <TouchableOpacity>
                <Image source={require('../icon/Lonceng.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.drawerSearch.current?.openDrawer()}>
                <Image
                  source={require('../icon/vertIcon.png')}
                  style={{height: hp('2.8%'), width: wp('5.2%')}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.HeaderTextinput}>
            <View style={styles.ViewTextInput}>
              <View style={styles.ContentTextInput}>
                <Icon
                  name="magnify"
                  size={38}
                  color={White}
                  style={styles.IconAccount}
                />
                <TextInput
                  placeholder="Search stories, people or reading lists"
                  placeholderTextColor={'#e4e4e4'}
                  cursorColor={White}
                  style={{color: White}}
                />
              </View>
            </View>
            <TouchableOpacity>
              <Icon name="microphone-outline" size={40} color={White} />
            </TouchableOpacity>
          </View>
          <ComponentsTextSearch />
        </DrawerLayoutAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: '2%',
    backgroundColor: Grey,
  },
  Txt: {
    color: GreyLight,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  HeaderText: {
    color: White,
    fontSize: hp('3'),
    fontWeight: '700',
  },
  HeaderView: {
    flexDirection: 'row',
    width: wp('14%'),
    justifyContent: 'space-between',
  },
  Img: {
    height: hp('4%'),
    width: wp('8%'),
    left: '50%',
    zIndex: 30,
    backgroundColor: 'red',
  },
  HeaderTextinput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '2%',
    marginHorizontal: 4,
  },
  ViewTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContentTextInput: {
    flexDirection: 'row',
    backgroundColor: Abu2,
    width: wp('83%'),
    borderRadius: 40,
  },
  IconAccount: {
    marginHorizontal: 10,
    marginTop: '2%',
  },
});
