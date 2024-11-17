//configure all the route from this page only
import { 
  HomeScreen,
  AmsVoltage,
  Timer,
  Notification,
  DeviceList,
  AddDevice,
  Profile,
  About,
  Signout,
  Signup,
  Signin 
} from '../screens';

const routes = [
  { name: 'Home', component: HomeScreen, title: 'Home', showLeftButton: false},
  { name: 'Amps & Volts', component: AmsVoltage, title: 'Amps & Volts'},
  { name: 'Timer', component: Timer, title: 'Timer'},
  { name: 'Notification', component: Notification, title: 'Notification'},
  { name: 'DeviceList', component: DeviceList, title: 'Select your devices'},
  { name: 'AddDevice', component: AddDevice, title: 'Add Device'},
  { name: 'Profile', component: Profile, title: 'Profile'},
  { name: 'About', component: About, title: 'About'},
  { name: 'Signout', component: Signout, title: 'Signout'},
  { name: 'Signup', component: Signup, title: 'SignUp', headerShown: false, showLeftButton: false},
  { name: 'Signin', component: Signin, title: 'SignIn', headerShown: false, showLeftButton: false}
];

export default routes;
