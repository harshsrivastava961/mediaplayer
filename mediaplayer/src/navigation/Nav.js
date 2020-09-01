import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import VideoScreen from '../screens/VideoScreen';
import AudioScreen from '../screens/AudioScreen';
import DashBoard from '../screens/DashBoard';

const navigator = createStackNavigator(
  {
    Dash: DashBoard,
    Audio: AudioScreen,
    Video: VideoScreen,
  },
  {
    initialRouteName: 'Dash',
    defaultNavigationOptions: {
      title: 'MediaPlayer',
    },
  }
);

export default createAppContainer(navigator);









