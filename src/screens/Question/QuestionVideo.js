import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
    await camera.takePictureAsync(options)
  }

  stopRecording() {
    this.camera.stopRecording()
  }

  async startRecording() {
    this.setState({ recording: true })
    const { uri, codec = "mp4" } = await this.camera.recordAsync()
    this.setState({ recording: false, processing: true })
    this.props.ChangeState('attachment', uri)
    this.props.nextQuestion()
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
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={[styles.preview]}
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
    alignItems: "center"
  },
  preview: {
    height: hp('49%'),
    width: wp('49%'),
    borderRadius: 20,
  },
  capture: {
    flex: 0,
    backgroundColor: '#aeaeaa',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})
