import React, { Component } from 'react'
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
  StatusBar,
  ActivityIndicator
} from "react-native"
import { withNavigation } from 'react-navigation'
import { RNCamera } from 'react-native-camera'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

class index extends Component {


  constructor() {
    super()
    this.state = {
      recording: false,
      processing: false
    }
  }




  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options)
    //  eslint-disable-next-line
    console.log(data.uri)
  }

  stopRecording() {
    this.camera.stopRecording()
  }

  async startRecording() {
    this.setState({ recording: true })
    // default to mp4 for android as codec is not set
    const { uri, codec = "mp4" } = await this.camera.recordAsync()
    this.setState({ recording: false, processing: true })
    this.props.ChangeState('attachment', uri)
    console.log(uri)
    this.setState({ processing: false })
  }



  render() {
    const { recording, processing } = this.state

    let button = (
      <TouchableOpacity
        onPress={this.startRecording.bind(this)}
        style={styles.capture}
      >
        <Text style={{ fontSize: 14 }}> RECORD </Text>
      </TouchableOpacity>
    )

    if (recording) {
      button = (
        <TouchableOpacity
          onPress={this.stopRecording.bind(this)}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}> STOP </Text>
        </TouchableOpacity>
      )
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, width: wp("100%"), height: 60, backgroundColor: "#fff" }} />
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={[styles.preview, styles.container]}
          type={RNCamera.Constants.Type.front}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          {button}
        </View>
      </View>
    )
  }
}



export default withNavigation((index))


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    justifyContent: 'flex-end',
    height: hp("40%"),
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
})
