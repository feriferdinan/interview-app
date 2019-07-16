import React from 'react';
import {StatusBar,Keyboard,ScrollView,Alert,Modal,Text,TouchableOpacity,View, ImageBackground, StyleSheet,FlatList,AsyncStorage,BackHandler,TextInput ,Button,TouchableHighlight,YellowBox} from 'react-native';
import { withNavigation } from 'react-navigation';

import RadioForm from 'react-native-simple-radio-button';
 

 class QuestionMulti extends React.Component {
     state = {
         selected:0,
         choice:[]
     }

     async componentWillMount  (){
        let choice = []
        await this.props.quest.options.split(',').map((item, key) => {
            choice.push({label: item, value: key})
        })
        this.setState({choice:choice})
     }
     
     handleClick = (selected) => {
         this.setState({
             selected:selected
         })
         this.props.ChangeState('answer',this.state.choice[selected].label)
     }

    render() {
        console.log(this.state.choice);
        
        let {choice} = this.state
        return (
        <View style={[ styles.container,{margin:10} ]}>
         <ScrollView>        
            {
                (choice.length == 0) ? null :
                <RadioForm
                    radio_props={choice}
                    initial={0}
                    onPress={(selected) => this.handleClick(selected)}
                />
             }
        </ScrollView>
	    </View>
    )
    }
}



export default withNavigation(QuestionMulti);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        height:"100%"
    },
    
   
   
   
})