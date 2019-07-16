import React from 'react';
import {StatusBar,Keyboard,ScrollView,Alert,Modal,Text,TouchableOpacity,View, ImageBackground, StyleSheet,FlatList,AsyncStorage,BackHandler,TextInput ,Button,TouchableHighlight,YellowBox} from 'react-native';

import { withNavigation } from 'react-navigation';


 class QuestionText extends React.Component {
  

    render() {
    console.log(this.props);
    
        return (
        <View style={[ styles.container ]}>
                <TextInput 
                    multiline = {true}
                    // value={this.state.answer=="" ? null :this.state.answer}
                    numberOfLines = {1}
                    // autoFocus={(this.state.answer !=="") ? true : false}
                    placeholder="Ketik Jawaban Anda Disini" 
                    style={{margin:10,fontSize:14,flexWrap:"wrap"}} 
                    onChangeText={(text) => this.props.ChangeState('answer',text) }
                  />
       
			</View>
      )
    }
}



export default withNavigation(QuestionText);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    
   
   
   
})