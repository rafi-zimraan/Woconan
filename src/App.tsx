import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from './user/screen/Home';
import Login from './user/login/Login';
import BottomTabLogin from './user/screen/BottomTabLogin';
import Register from './user/register/Register';
import Edit from './user/create/Edit';
import NewStory from './user/create/NewStory';
import Splash from './user/splash/Splash';
import Produck from './user/produck/Produck';
import CommentProduck from './user/produck/CommentProduck';
import HomeAdmin from './admin/HomeAdmin';
import KaryaUser from './admin/KaryaUser';
import BiodataUser from './admin/BiodataUser';
import ProfileAdmin from './admin/ProfileAdmin';
import ComponentProfile from './user/profile/ComponentProfile';
import AboutYourSelf from './user/profile/AboutYourSelf';
import ForgetPassword from './user/forgetPassword/ForgetPassword';
import PasswordNew from './user/forgetPassword/PasswordNew';
import DetailProduck from './user/home/DetailProduck';
import ComponentHome from './user/home/ComponentHome';
import OtpPasswordNew from './user/forgetPassword/OtpPasswordNew';
import ModalComment from './user/home/ModalComment';

export type RootStackParams = {
  splash: undefined;
  login: undefined;
  bottom: undefined;
  register: undefined;
  produck: undefined;
  comment: undefined;
  edit: undefined;
  newStory: undefined;
  homeAdmin: undefined;
  karyaUser: undefined;
  biodataUser: undefined;
  profileAdmin: undefined;
  profileUser: undefined;
  aboutYouSelf: {token: any} | undefined;
  forgetPassword: undefined;
  passwordNew: undefined;
  detail: {no_id: number};
  home: undefined;
  otpPassword: undefined;
  modalComment: {postId: number};
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* user */}
      <Stack.Screen name={'splash'} component={Splash} />
      <Stack.Screen name={'login'} component={Login} />
      <Stack.Screen name={'bottom'} component={BottomTabLogin} />
      <Stack.Screen name={'register'} component={Register} />
      <Stack.Screen name={'produck'} component={Produck} />
      <Stack.Screen name={'comment'} component={CommentProduck} />
      <Stack.Screen name={'edit'} component={Edit} />
      <Stack.Screen name={'newStory'} component={NewStory} />
      <Stack.Screen name={'profileUser'} component={ComponentProfile} />
      <Stack.Screen name={'aboutYouSelf'} component={AboutYourSelf} />
      <Stack.Screen name={'forgetPassword'} component={ForgetPassword} />
      <Stack.Screen name={'passwordNew'} component={PasswordNew} />
      <Stack.Screen
        name={'detail'}
        component={DetailProduck}
        initialParams={{no_id: 0}}
      />
      <Stack.Screen name={'home'} component={ComponentHome} />
      <Stack.Screen name={'otpPassword'} component={OtpPasswordNew} />
      <Stack.Screen name={'modalComment'} component={ModalComment} />
      {/* admin */}
      <Stack.Screen name={'homeAdmin'} component={HomeAdmin} />
      <Stack.Screen name={'karyaUser'} component={KaryaUser} />
      <Stack.Screen name={'biodataUser'} component={BiodataUser} />
      <Stack.Screen name={'profileAdmin'} component={ProfileAdmin} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
