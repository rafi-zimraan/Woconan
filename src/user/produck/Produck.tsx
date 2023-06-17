import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Abu, Blue, Black, White} from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Produck = () => {
  const [likeStar, setLikeStar] = useState<boolean>();
  const [likeComment, setLikeComment] = useState<boolean>();
  const [share, setShare] = useState<boolean>();
  const [story, setStory] = useState<boolean>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={White}
        translucent={false}
      />
      <View style={styles.Container}>
        <View style={styles.ContainerIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name={'arrow-left'} size={40} color={Black} />
          </TouchableOpacity>
          <Text style={styles.ContentTxt}>Product</Text>
          <TouchableOpacity>
            <Icon name="magnify" size={40} color={Black} />
          </TouchableOpacity>
        </View>
        <View style={styles.Header}>
          <Image
            source={require('../image/cup-tea-cookies.jpg')}
            style={styles.HeaderImg}
          />
        </View>
        <View style={styles.SubJudul}>
          <Text style={styles.TxtJudul}>Negri di ujung tanduk</Text>
        </View>
        <View style={styles.Content}>
          <View style={styles.IconStar}>
            <TouchableOpacity onPress={() => setLikeStar(!likeStar)}>
              <Icon
                name={likeStar ? 'star' : 'star-outline'}
                size={30}
                style={{color: likeStar ? 'red' : 'black'}}
              />
            </TouchableOpacity>
            <Text style={styles.TxtStar}>17.3K</Text>
          </View>
          <View style={styles.IconStar}>
            <TouchableOpacity onPress={() => navigation.navigate('comment')}>
              <Image source={require('../icon/comment-alt.png')} />
            </TouchableOpacity>
            <Text style={styles.TxtStar}>100K</Text>
          </View>
        </View>
        <View style={styles.Deskripsi}>
          <Text style={styles.TxtDeskripsi}>
            The strikingly beautiful woman, for indeed she was a great beauty,
            with eyes the color of molten gold and raven locks which were darker
            than the blackest of hearts, pale skin which contrasted greatly with
            said locks, skin a man wished to color with passion, bend over to
            wake her daughter from her peaceful slumber. Lady Dracmore nodded.
            "Yes. Uncle John as well as Aunt Katherine are here as well. They
            are staying the home they purchased the previous year. The one which
            is closer to our home, do you remember?" The strikingly beautiful
            woman, for indeed she was a great beauty, with eyes the color of
            molten gold and raven locks which were darker than the blackest of
            hearts, pale skin which contrasted greatly with said locks, skin a
            man wished to color with passion, bend over to wake her daughter
            from her peaceful slumber. Lady Dracmore nodded. "Yes. Uncle John as
            well as Aunt Katherine are here as well. They are staying the home
            they purchased the previous year. The one which is closer to our
            home, do you remember?"
          </Text>
        </View>
        <View style={styles.Bottom}>
          <View style={styles.IconBottom}>
            <TouchableOpacity onPress={() => setLikeStar(!likeStar)}>
              <Icon
                name={likeStar ? 'star' : 'star-outline'}
                size={30}
                style={{color: likeStar ? 'red' : Black}}
              />
            </TouchableOpacity>
            <Text style={styles.Txt}>Vote</Text>
          </View>
          <View style={styles.IconBottom2}>
            <TouchableOpacity onPress={() => setLikeComment(!likeComment)}>
              <Icon
                name={
                  likeComment
                    ? 'comment-text-multiple'
                    : 'comment-text-multiple-outline'
                }
                size={30}
                style={{color: likeComment ? Blue : Black}}
              />
            </TouchableOpacity>
            <Text style={styles.Txt}>300K</Text>
          </View>
          <View style={styles.IconBottom}>
            <TouchableOpacity onPress={() => setShare(!share)}>
              <Icon
                name={share ? 'share-variant' : 'share-variant-outline'}
                size={30}
                style={{color: share ? White : Black}}
              />
            </TouchableOpacity>
            <Text style={styles.Txt}>Share</Text>
          </View>
          <View style={styles.IconBottom}>
            <TouchableOpacity
              style={styles.story}
              onPress={() => setStory(!story)}>
              <Icon
                name={
                  story
                    ? 'contactless-payment-circle'
                    : 'contactless-payment-circle-outline'
                }
                size={30}
                style={{color: story ? 'green' : Black}}
              />
            </TouchableOpacity>
            <Text style={styles.Txt}>StoryTell</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Produck;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: '2%',
    backgroundColor: White,
  },
  ContainerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '1%',
  },
  ContentTxt: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    fontSize: hp('3%'),
    color: Black,
    fontWeight: '700',
  },
  Header: {
    alignItems: 'center',
  },
  HeaderImg: {
    height: hp('34%'),
    width: wp('100%'),
  },
  SubJudul: {
    alignItems: 'center',
    marginTop: '3%',
  },
  TxtJudul: {
    color: Black,
    fontSize: hp('2.7%'),
    fontWeight: '700',
    fontFamily: 'Poppins-Italic',
  },
  Content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: '13%',
  },
  IconStar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('5%'),
    flexDirection: 'row',
  },
  TxtStar: {
    color: Black,
    fontSize: hp('2%'),
    fontWeight: '600',
    marginLeft: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Deskripsi: {
    marginHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TxtDeskripsi: {
    justifyContent: 'center',
    alignItems: 'center',
    color: Black,
    fontSize: hp('1.7%'),
    fontWeight: '700',
    fontFamily: 'Poppins-Medium',
  },
  Bottom: {
    flexDirection: 'row',
    marginTop: '9.7%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Abu,
  },
  IconBottom: {
    marginTop: '1%',
  },
  IconBottom2: {
    marginTop: '1%',
  },
  story: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Txt: {
    color: White,
    marginTop: '5%',
  },
});
