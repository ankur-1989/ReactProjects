import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import * as firebase from "firebase";
import { setTargetHours } from "../store/actions/target";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

class TargetHoursScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      hours: "",
      email: "",
    };
  }

  saveHoursHandler = () => {
   
    try {

    
    this.props.createTarget({
      ownerId: this.state.email,
      targetDate: this.state.date,
      targetHours: this.state.hours,
      onSuccess: () => { this.props.navigation.navigate("Home");},
      onFailure: () => {console.log('err')}
    });
  } catch(err) {
    console.log(err);
    console.log('error');
  }
    
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={{ width: "100%" }}>
            <Text style={styles.inputTitle}>Choose Date</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              value={this.state.date}
              onChangeText={(date) => this.setState({ date })}
            />
          </View>

          <View style={{ width: "100%" }}>
            <Text style={styles.inputTitle}>Set Hours</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              value={this.state.hours}
              onChangeText={(hours) => this.setState({ hours })}
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={this.saveHoursHandler}
          >
            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    createTarget: ({ownerId, targetDate, targetHours, onSuccess, onFailure}) => dispatch(setTargetHours({ownerId, targetDate, targetHours, onSuccess, onFailure})) 
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "85%",
    height: 20,
    borderBottomColor: "grey",
    marginVertical: 15,
    alignSelf: "center",
    fontSize: 18,
    paddingLeft: 15,
  },
  inputTitle: {
    marginLeft: 30,
    fontSize: 16,
    marginTop: 10,
    color: "grey",
  },
  registerButton: {
    borderRadius: 15,
    backgroundColor: "#1F9CEE",
    height: 50,
    alignSelf: "center",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  form: {
    marginTop: 50,
    marginHorizontal: 25,
  },
});

export default connect(null, mapDispatchToProps)(TargetHoursScreen);
