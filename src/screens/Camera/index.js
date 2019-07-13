import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  AsyncStorage,
  StatusBar
} from "react-native";
import { Icon } from "react-native-elements";
import { Right,Left,Header } from "native-base";
import { Menu, MenuOption , MenuOptions , MenuTrigger } from 'react-native-popup-menu';
import {withNavigation} from 'react-navigation';
const axios = require('axios');
import configs from '../../../config'
import * as actionCrosswords from '../../redux/action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { RNCamera } from 'react-native-camera';

class index extends Component {

   
  constructor(){
    super()
    this.state= {
        userId:"",
        question:"",
        questionId:"",
        answer:"",
        attachment:"",
    }
  }


    takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
      };

      async componentWillMount () {
        const { navigation } = this.props;
        const questionNumber = await navigation.getParam('questionNumber');
        const uid= await AsyncStorage.getItem('uid')
        this.setState({
          userId:uid,
        })
        that=this
        axios.get(`http://${configs.BASE_URL}:3333/api/v1/question/${questionNumber}`)
        .then(function (response) {
            console.log(response);
            
          that.setState({
            question:response.data[0].description,
            questionId:response.data[0].id
          })
        })
        .catch(function (error) {
          console.log(error);
        });
       
      }
       
  
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
        <View style={{width:"100%",height:50,backgroundColor:"#fff"}}>
          <Text style={{color:"#000"}} >{this.state.description}</Text>
        </View>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
        
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', bottom:-200 }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default withNavigation((index))


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height:"60%"
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
});
