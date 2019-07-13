import React from 'react';
import {StatusBar,Keyboard,ScrollView,Alert,Modal,Text,TouchableOpacity,View, ImageBackground, StyleSheet,FlatList,AsyncStorage,BackHandler,TextInput ,Button,TouchableHighlight,YellowBox} from 'react-native';

const axios = require('axios');
import { Icon, ListItem  } from "react-native-elements";
import configs from '../../../config'
import { Right,Left,Header } from "native-base";
import { withNavigation } from 'react-navigation';

 class index extends React.Component {
  
  constructor(){
    super()
    this.state= {
        question:"",
    
    }
  }

  static navigationOptions  =  ({ navigation }) =>   {
    return {
    header: (
      <Header style={{backgroundColor:'white'}} androidStatusBarColor='black'>
        <Left>
          <Text style={{fontSize: 20,fontWeight:'bold',width:190}}>
            Question
          </Text>
        </Left>
        <Right>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} >
         <Icon 
            name="close"
            size={30}
         />
        </TouchableOpacity>
        </Right>
      </Header>
  )
  }
  };

  async componentDidMount () {
    const uid= await AsyncStorage.getItem('uid')
    this.setState({
      userId:uid,
    })
    that=this
    axios.get(`http://${configs.BASE_URL}:3333/api/v1/questions`)
    .then(function (response) {
        console.log(response.data);
        
      that.setState({
        question:response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }

 

    render() {
    const {navigate} = this.props.navigation
        return (
            
        <View style={[ styles.container ]}>
          
        <ScrollView>        
            <FlatList
					style={styles.container}
					data={this.state.question}
					keyExtractor={(item, index) => (`question-${index}`)}
					renderItem={question = ({ item }) => (
                        <TouchableOpacity
                            // disabled={(item.==null) ? true : false }    
                            onPress={()=> 
                            item.type=="video" ?
                            navigate('Camera',{questionNumber:item.number,questionId:item.id}) 
                            : 
                            navigate('Answer',{questionNumber:item.number,questionId:item.id})
                            
                            }>
                            <ListItem
                                title={"Pertanyaan Ke "+item.number+" "+ item.type}
                            />
                        </TouchableOpacity>
                    )}
				/>
            
            
        </ScrollView>
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