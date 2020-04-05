import React, { useState, Component } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import Svg, { Image, ClipPath, Circle } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug("stop clock", stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}
        >
          <Svg height={height+50} width={width}>
            <ClipPath id="clip">
              <Circle r={height+50} cx={width/2} />
            </ClipPath>
            <Image
              width={width}
              height={height+50}
              href={require("../assets/bg.jpg")}
              preserveAspectRatio="xMidYMid slice"
              clipPath= "url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={styles.formContainer}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <Text style={{ ...styles.buttonText }}>Login</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#CF5C45",
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text style={{ ...styles.buttonText, color: "white" }}>
              Login with Gmail
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              height: height / 3,
              top: null,
              justifyContent: "center",
              zIndex: this.textInputZIndex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View
                style={{
                  ...styles.closeButton,
                  transform: [{ rotate: concat(this.rotateCross, "deg") }],
                }}
              >
                <Animated.Text style={{ fontSize: 15, color: "grey" }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <TextInput
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor="grey"
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor="grey"
            />
            <Animated.View
              style={{ ...styles.button, backgroundColor: "#1F9CEE" }}
            >
              <Text style={{ ...styles.buttonText, color: "white" }}>
                Login
              </Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    width: width,
    height: height,
  },
  formContainer: {
    height: height / 3,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 35,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingLeft: 10,
    borderColor: "rgba(0,0,0,0.2)",
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
  },
});
