import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Black, White} from '../utils/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ComponentsTextSearch = () => {
  return (
    <View>
      <View style={styles.ContentText}>
        <Text style={styles.TxtTags}>Your Top Tags </Text>
      </View>
      <View style={styles.Content}>
        <TouchableOpacity style={styles.Horor}>
          <Text style={styles.TxtHoror}>Horor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Humor}>
          <Text style={styles.TxtHumor}>Humor</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Content}>
        <TouchableOpacity style={styles.Horor}>
          <Text style={styles.TxtHoror}>Fiksi Ilmiah</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Humor}>
          <Text style={styles.TxtHumor}>Puisi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Browse}>
        <Text style={styles.TxtBrowse}>Browse Tags </Text>
      </View>
      <View style={styles.BoxBrowse}>
        <TouchableOpacity style={styles.CeritaPen}>
          <Text style={styles.TxtBrow}>Cerita Pendek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Fantasi}>
          <Text style={styles.TxtBrow}>Fantasi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BoxBrowse}>
        <TouchableOpacity style={styles.CeritaPen}>
          <Text style={styles.TxtBrow}>Fiksi Remaja</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Fantasi}>
          <Text style={styles.TxtBrow}>Klasik</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BoxBrowse}>
        <TouchableOpacity style={styles.CeritaPen}>
          <Text style={styles.TxtBrow}>Aksi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Fantasi}>
          <Text style={styles.TxtBrow}>Petualangan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComponentsTextSearch;

const styles = StyleSheet.create({
  ContentText: {
    marginTop: '5%',
    alignItems: 'flex-start',
  },
  TxtTags: {
    marginLeft: '3%',
    fontSize: hp('3%'),
    color: White,
    fontFamily: 'Poppins-Medium',
    fontWeight: '700',
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: '3%',
  },
  Horor: {
    justifyContent: 'center',
    backgroundColor: White,
    alignItems: 'flex-start',
    right: '9%',
    height: hp('9%'),
    width: wp('46%'),
    borderRadius: 10,
  },
  TxtHoror: {
    color: Black,
    fontSize: hp('3%'),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginLeft: '4%',
  },
  Humor: {
    justifyContent: 'center',
    backgroundColor: White,
    alignItems: 'flex-start',
    height: hp('9%'),
    width: wp('46%'),
    borderRadius: 10,
  },
  TxtHumor: {
    color: Black,
    fontSize: hp('3%'),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginLeft: '4%',
  },
  Browse: {
    marginTop: '8%',
    alignItems: 'flex-start',
    marginLeft: '3%',
  },
  TxtBrowse: {
    color: White,
    fontSize: hp('3%'),
    fontFamily: 'Poppins-Medium',
    fontWeight: '700',
  },
  BoxBrowse: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: '3%',
  },
  CeritaPen: {
    justifyContent: 'center',
    backgroundColor: White,
    alignItems: 'flex-start',
    right: '9%',
    height: hp('9%'),
    width: wp('46%'),
    borderRadius: 10,
  },
  Fantasi: {
    justifyContent: 'center',
    backgroundColor: White,
    alignItems: 'flex-start',
    height: hp('9%'),
    width: wp('46%'),
    borderRadius: 10,
  },
  TxtBrow: {
    color: Black,
    fontSize: hp('2.5%'),
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginLeft: '4%',
  },
});
