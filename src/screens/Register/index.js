import React, { Component } from 'react';
import {
StyleSheet,
Text,
View,
TextInput,
TouchableOpacity,
AsyncStorage,
Alert,
StatusBar,
ScrollView,
Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigation} from 'react-navigation';

import { Spinner } from 'native-base';
import configs from '../../../config';
const axios = require('axios');

import * as actionInterview from '../../redux/action';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';


class Register extends Component {
    constructor(){
        super()

        this.state={
            inputEmail:"",
            inputUsername: "",
            inputPhone:"",
            icEye: 'visibility-off',
            showPassword: true,
            isLoading:false
        }
    }
    

    handleRegister = async () => {
      if( this.state.inputUsername=="" || this.state.inputEmail=="" || this.state.inputPhone=="") {
        alert("Lengkapi Form Terlebih dahulu")  
      }else{ 
        register = await this.props.register({ username: this.state.inputUsername, email: this.state.inputEmail, phone_number: this.state.inputPhone })
        console.log(this.props.auth.saveId)
        if (this.props.auth.saveId!=null){
          this.props.navigation.navigate('Home',{
            "userId" :this.props.auth.data.id,
            "username" :this.props.auth.data.username
          })
        }
        
    }
  }


render(){
  
  const { navigate } = this.props.navigation;
  const field = this.props.auth.field
  return(
    (this.props.auth.isLoading==true) 
    ? 
    <View style={{flexGrow: 1,justifyContent:'center',alignItems: 'center'}}> 
      <StatusBar  barStyle='dark-content' backgroundColor="#f2fcfe" translucent = {false} />
        <Spinner color='#517da2' style={{justifyContent:"center"}} />
        <Text>Loading . . .</Text>
    </View>
    :
  <View style={styles.container}>
  {(this.props.error)?alert('Gagal Registrasi, Email Sudah Ada atau Pastikan Koneksi Anda Stabil'):null}
   <LinearGradient colors={['#f2fcfe','#1c92d2']} style={{flex:1,width:"100%",
  justifyContent:"center",
  flexDirection:"column",
  alignItems:"center",}} >
<StatusBar  barStyle='dark-content' backgroundColor="#f2fcfe" translucent = {false} />
  <View style={styles.wrapperForm} >
    <Text style={styles.title}>Halo Peserta </Text>
    <Text>Isi Biodata Sebelum Melanjutkan Interview</Text>
    <View style={styles.inputBox} >
    <TextInput 
        value={this.state.inputUsername}
        placeholder="Masukan Nama Anda"
        placeholderTextColor = "grey"
        autoFocus = {true}
        returnKeyType = {"next"}
        onSubmitEditing={() => { this.secondTextInput.focus(); }}
        blurOnSubmit={false}
        onChangeText={(text)=>this.setState({
            inputUsername:text
        })}
    />
    <Icon 
        style={{position:"absolute",left:12,top:15}}
        name="person"
        size={16}
        color="rgba(0,0,0,0.5)"
    />
    </View>
    <View style={styles.inputBox} >
    <TextInput 
        value={this.state.inputEmail}
        placeholder="Masukan Email Anda"
        keyboardType = 'email-address'
        placeholderTextColor = "grey"
        ref={(input) => { this.secondTextInput = input; }}
        returnKeyType = {"next"}
        onSubmitEditing={() => { this.phoneTextInput.focus(); }}
        onChangeText={(text)=>this.setState({
            inputEmail:text
        })}
    />
    <Icon 
        style={{position:"absolute",left:12,top:15}}
        name="email"
        size={16}
        color="rgba(0,0,0,0.5)"
    />
    </View>
    <View style={[styles.inputBox]} >
    <TextInput
        value={this.state.inputPhone}
        keyboardType = 'phone-pad'
        placeholder="Masukan No.Telepon"
        ref={(input) => { this.phoneTextInput = input; }}
        returnKeyType = {"go"}
        onSubmitEditing={this.handleRegister}
        placeholderTextColor = "grey"
        onChangeText={(text)=>this.setState({
            inputPhone:text
        })}
    />
    <Icon 
        style={{position:"absolute",left:12,top:15}}
        name="phone"
        size={16}
        color="rgba(0,0,0,0.5)"
    />
   
    </View>

    <TouchableOpacity 
      style={styles.button}
      onPress={this.handleRegister}>
      <Text style={styles.buttonText}>Interview Sekarang</Text>
    </TouchableOpacity>

   


</View>
</LinearGradient>
</View>

)}
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (value) => dispatch(actionInterview.register(value))
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Register));

const styles = StyleSheet.create({
container : {
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
},
title:{
  fontSize:20,
  fontWeight:"700",
  color:"#1c313a",
  margin:10,

},
inputBox: {
    width:"90%",
    borderRadius: 25,
    paddingHorizontal:16,
    paddingLeft:30,
    fontSize:16,
    color:'grey',
    marginVertical: 10,
    backgroundColor:"rgba(211, 235, 248, 1)",
    
},
wrapperForm:{
  width:"100%",
  backgroundColor:'rgba(86,130,163,0)',
  flexDirection:"column",
  alignItems:"center",
  borderRadius:20,
  padding:10,

},
wrapperinputPhone:{
  flexDirection:"row",
},
icon: {
  position: 'absolute',
  top: 11,
  right: 15
},
button: {
    width:"90%",
    backgroundColor:'#517da2',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
},
buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
}

});

export const componentColors = {
  password_icon_color:'#aeaeae',
};
