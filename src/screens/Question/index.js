import React from 'react'
import { StatusBar,  ScrollView,  Text, TouchableOpacity, View,  StyleSheet,  AsyncStorage} from 'react-native'

import { Icon } from "react-native-elements"
import { Right, Left, Header } from "native-base"
import { withNavigation } from 'react-navigation'
import * as actionInterview from '../../redux/action'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import CountDown from 'react-native-countdown-component'

import QuestionText from './QuestionText'
import QuestionMulti from './QuestionMulti'
import QuestionMultiple from './QuestionMultiple'
import QuestionVideo from './QuestionVideo'

class Question extends React.Component {

  constructor() {
    super()
    this.state = {
      question: "",
      question_count: "",
      number: 1,
      answer: "",
      attachment: "",
      user_id: "",
      submited:false,
      isLoading:false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header style={{ backgroundColor: 'white' }} androidStatusBarColor='black'>
          <Left>
            <Text style={{ fontSize: 20, fontWeight: 'bold', width: 90 }}>
              Question
          </Text>
          </Left>
          <Right>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
              <Icon
                name="close"
                size={30}
              />
            </TouchableOpacity>
          </Right>
        </Header>
      )
    }
  }



  async componentDidMount() {
    user_id = await AsyncStorage.getItem('uid')
    await this.props.getQuestion(this.state.number)
    await this.setState({
      question: this.props.question.data.question[0],
      question_count: this.props.question.data.question_count,
      user_id: user_id
    })
  }

  _increment = async () => {
    await this.setState({
      number: this.state.number + 1
    })
  }

  nextQuestion = async () => {
    await this.handleSubmit()
    await this._increment()
    if (this.state.number <= this.props.question.data.question_count) {
      await this.props.getQuestion(this.state.number)
    } else {
      alert('Terimakasih Telah Berpartisipasi, Kami Akan Segera Mengabari Anda')
      await AsyncStorage.removeItem("uid")
      this.props.navigation.navigate('Register')
      
    }
    await this.setState({
      question: this.props.question.data.question[0],
      answer: "",
      attachment: "",
      submited:false,
      isLoading:false
    })
  }

  ChangeState = (state, value) => {
    switch (state) {
      case "answer":
        this.setState({
          answer: value
        })
        break
      case "attachment":
        this.setState({
          attachment: value
        })
        break
    }
  }

  handleSubmit = async () => {
    user_id = this.state.user_id
      await this.setState({submited:true,isLoading:true})
      answer = await this.props.answer({
        user_id: user_id,
        question_id: this.props.question.data.question[0].id,
        answer: this.state.answer,
        attachment: this.state.attachment
      })
  }

  render() {
    return (
      (this.state.isLoading || this.props.question.isLoading)
        ?
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar barStyle='dark-content' backgroundColor="#f2fcfe" translucent={false} />
          <Spinner color='#517da2' style={{ justifyContent: "center" }} />
          <Text>Loading . . .</Text>
        </View>
        :
        <View >
          <StatusBar barStyle='dark-content' backgroundColor="#f2fcfe" translucent={false} />
          <View style={{ height: 60, backgroundColor: "#517da2", flexDirection: "row" }}>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={{ color: "#fff", fontSize: 18, paddingHorizontal: 10, paddingVertical: 20 }}>{"Question : " + this.state.question.number + " of " + this.state.question_count}</Text>
            </View>
            <View style={{ right: 0, position: "absolute", padding: 6 }} >
              <CountDown
                until={this.state.question.timer * 60}
                onFinish={this.nextQuestion}
                size={17}
                digitStyle={{ backgroundColor: '#FFF', borderWidth: 5, borderColor: "#517da2", borderRadius: 10 }}
                digitTxtStyle={{ color: '#517da2' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                separatorStyle={{ color: '#fff', fontSize: 40 }}
                showSeparator
              />
            </View>
          </View>
          <ScrollView>
            <View style={{ margin: 10 }}>
              <Text style={{ color: "#000", fontSize: 19 }}>{this.state.question.description}</Text>
            </View>
            {
              (this.state.question.type == "multiple") ?
                <View style={styles.wrapperAnswer}>
                  <QuestionMultiple quest={this.props.question.data.question[0]} ChangeState={this.ChangeState} />
                </View>
                :
                (this.state.question.type == "text") ?
                  <QuestionText quest={this.props.question.data.question[0]} ChangeState={this.ChangeState} />
                  :
                  (this.state.question.type == "multi") ?
                    (<QuestionMulti quest={this.props.question.data.question[0]} ChangeState={this.ChangeState} />)
                    :
                    (this.state.question.type == "video") ?
                      (<View style={{ height: 450 }}>
                        <QuestionVideo quest={this.props.question.data.question[0]} ChangeState={this.ChangeState} />
                      </View>
                      )
                      :
                      null
            }
          </ScrollView>
          <View >

            <View style={styles.compose}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.nextQuestion}
                disabled={(this.state.submited) ? true : false}
              >
                <Text style={styles.buttonText}>{(this.state.question_count != this.state.question.number) ? "Next Question" : "Save Answer and Exit"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    question: state.question,
    answers: state.answer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (number) => dispatch(actionInterview.getQuestion(number)),
    answer: (value) => dispatch(actionInterview.answer(value))
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(Question))

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  compose: {
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: "transparent",

  },

  button: {
    borderColor: '#517da2',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: "3%",
    paddingHorizontal: '3%',
    borderWidth: 2
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '100',
    color: '#517da2',
    textAlign: 'center',
    paddingHorizontal: 30
  },
  wrapperAnswer: {
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  }

})