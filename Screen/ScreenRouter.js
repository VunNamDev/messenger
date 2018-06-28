import { StackNavigator, navigation } from 'react-navigation';
import Messenger from './Messenger';
import PersonMessenger from './PersonMessenger';
import HopThoai from './HopThoai';

const Screens = StackNavigator({
  MessengerScreen: {
    screen: Messenger,
    navigationOptions: () => ({
      headerBackTitle: null,
      header: null
    })
  },

  PersonMessengerScreen: {
    screen: PersonMessenger,
    navigationOptions: () => ({
      headerBackTitle: null,
      header: null
    })
  }
});
export default Screens;
