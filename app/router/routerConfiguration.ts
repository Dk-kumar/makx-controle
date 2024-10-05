//configure all the route from this page only
import { HomeScreen, AmsVoltage, Timer, Notification } from '../screens';

const routes = [
  { name: 'Home', component: HomeScreen, title: 'Home', showLeftButton: false},
  { name: 'Amps & Volts', component: AmsVoltage, title: 'Amps & Volts'},
  { name: 'Timer', component: Timer, title: 'Timer'},
  { name: 'Notification', component: Notification, title: 'Notification'}
  //{ name: 'SignOut', component: SignOut, title: 'Signout'}
  //{ name: 'SignUp', component: SignUp, title: 'SignUp'}
  //{ name: 'Signin', component: Signin, title: 'Signin'}
];

export default routes;
