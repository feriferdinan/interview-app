import React from 'react';
import {StatusBar,Keyboard,ScrollView,Alert,Modal,Text,TouchableOpacity,View, ImageBackground, StyleSheet,FlatList,AsyncStorage,BackHandler,TextInput ,Button,TouchableHighlight,YellowBox} from 'react-native';

const axios = require('axios');
import { Icon } from "react-native-elements";
import configs from '../../../config'
import { Right,Left,Header } from "native-base";
import { withNavigation } from 'react-navigation';
import CountDown from 'react-native-countdown-component';

 class index extends React.Component {
  
  constructor(){
    super()
    this.state= {
        userId:"",
        question:"",
        questionId:"",
        inputaAnswer:"",
        answer:"",
        attachment:"",
        timer:"",
    }
  }



  async componentWillMount () {
    const { navigation } = this.props;
    const questionNumber = await navigation.getParam('questionNumber');
    const question_id = await navigation.getParam('questionId');
    console.log('question id',question_id);
    
    const uid= await AsyncStorage.getItem('uid')
    this.setState({userId:uid})
    that=this
    axios.get(`http://${configs.BASE_URL}:3333/api/v1/question/${questionNumber}`)
    .then(function (response) {
        console.log(response);
        
      that.setState({
        question:response.data[0].description,
        timer:response.data[0].timer,
        questionId:response.data[0].id
      })
    })
    axios.get(`http://${configs.BASE_URL}:3333/api/v1/answer/${this.state.userId}`)
    .then(function (response) {
        console.log(response.data);
        if(response.data[0].question_id===question_id){
            that.setState({
                questionId:response.data[0].question_id,
                answer:response.data[0].answer
              })
        }else{
            
            
        }
     
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }

  handleSubmit = () => {
    if(this.state.inputaAnswer=="") {
        alert("Isi Jawaban Dulu")  
      }else{ 
        axios.post(`http://${configs.BASE_URL}:3333/api/v1/answer`,{
          "question_id" : this.state.questionId,
          "user_id" : this.state.userId,
          "answer":this.state.inputaAnswer,
        //   "attachment":this.state.attachment
        })
          .then (res => {
            console.log(res.data);
            if (res.data == null){
              alert("Gagal!!")
            }else{
                alert("Ok, Silahkan Jawab Pertanyaan Berikutnya")
              this.props.navigation.navigate('Question')
            }
          })
        .catch(err =>{
          console.log(err)
          alert('Gagal, Tidak Ada Koneksi')
        })}
  }

    render() {
    
        return (
        <View style={[ styles.container ]}>
        {(this.state.answer!=="") ? 
        <View style={{margin:10}}>
            <Text style={{fontWeight:"900"}}>Pertanyaan ini sudah di isi, Silahkan Isi Pertanyaan Berikutnya</Text>
        </View> 
            :
            <CountDown
            until={this.state.timer*60 }
            onFinish={() => [alert('finished'),this.props.navigation.navigate('Question')]}
            timeToShow={['M', 'S']}
            size={18}
        />
        }
        <ScrollView>        
			<View style={styles.container} >
                <View style={{margin:10}}>
                    <Text style={{color:"#000",fontSize:19}}>{this.state.question}</Text>
                </View>
                <TextInput 
                    multiline = {true}
                    value={this.state.answer=="" ? null :this.state.answer}
                    numberOfLines = {1}
                    autoFocus={(this.state.answer !=="") ? true : false}
                    placeholder="Ketik Jawaban Anda Disini" 
                    style={{margin:10,fontSize:14,flexWrap:"wrap"}} 
                    onChangeText={(text) => this.setState({
                      inputaAnswer:text
                    })}
                  />
            </View>
        </ScrollView>
			{(this.state.answer!=="") ? null :
        <View style={styles.compose}>
            <TouchableOpacity 
              style={styles.button}
              onPress={this.handleSubmit} 
            >
            <Text style={styles.buttonText}>Save Answer</Text>
            </TouchableOpacity>
			  </View>
      }
			</View>
      )
    }
}

export default withNavigation(index)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    
    compose: {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor:"transparent",
        
    },
   
      button: {
        borderColor:'#517da2',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
       borderWidth:2
    },
    buttonText: {
        fontSize:16,
        fontWeight:'100',
        color:'#517da2',
        textAlign:'center',
        paddingHorizontal:30
    },
   
   
})