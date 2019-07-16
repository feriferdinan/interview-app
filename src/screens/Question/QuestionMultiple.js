import React from 'react';
import {StatusBar,Keyboard,ScrollView,Alert,Modal,Text,TouchableOpacity,View, ImageBackground, StyleSheet,FlatList,AsyncStorage,BackHandler,TextInput ,Button,TouchableHighlight,YellowBox} from 'react-native';
import { withNavigation } from 'react-navigation';

import SelectMultiple from 'react-native-select-multiple'

 class QuestionMultiple extends React.Component {
     state = {
         selected:0,
         choice:[],
         selectedItems:[]
     }

      async componentDidMount (){
        let choice = []
         await this.props.quest.options.split(',').map((item, key) => {
            choice.push({label: item, value: key})
        })
        await this.setState({choice:choice})
     }

     onSelectionsChange = (selectedItems) => {
        let  selected = ""
        this.setState({ selectedItems })
        selectedItems.map(item =>{
            selected += item.label + ", "
        })
        this.props.ChangeState('answer', selected)
      }
     
    render() {
        console.log(this.state.choice);
        
        let {choice,selectedItems} = this.state
        return (
        <View style={[ styles.container ]}>
         <ScrollView>        
            {/* { */}
                {/* (choice.length == 0) ? <View/> : */}
                <SelectMultiple
                    items={choice}
                    selectedItems={selectedItems}
                    onSelectionsChange={this.onSelectionsChange} />
             {/* } */}
        </ScrollView>
	    </View>
    )
    }
}



export default withNavigation(QuestionMultiple);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        height:"100%"
    },
    
   
   
   
})