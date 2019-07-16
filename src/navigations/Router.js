import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  StackNavigator 
} from "react-navigation";

import LoadingScreen from "../screens/Loading/Loading";
import RegisterScreen from "../screens/Register/index";
import HomeScreen from "../screens/Home/index";
import CameraScreen from "../screens/Question/QuestionVideo";
import QuestionScreen from "../screens/Question/index";
import AnswerScreen from "../screens/Question/QuestionText";



const AppStack = createStackNavigator({ 
  Home: {
    screen:HomeScreen,
  }, 
  Camera: {
    screen:CameraScreen,
  }, 
  Question: {
    screen:QuestionScreen,
  }, 
  Answer: {
    screen:AnswerScreen,
  }, 
 
});

const AuthStack = createStackNavigator(
  {
    Register: RegisterScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const AuthLoadingScreen = createStackNavigator(
  { Loading: LoadingScreen },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);


  const Router = createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
  export default createAppContainer(Router);
