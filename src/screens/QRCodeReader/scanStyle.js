import React, { Component } from "react";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;
const styles = {
  scrollViewStyle: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#2196f3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingLeft: 15,
    paddingTop: 10,
    width: deviceWidth,
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
    color: "white",
  },
  textTitle1: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
    color: "white",
  },
  cardView: {
    width: deviceWidth - 32,
    height: deviceHeight - 200,
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    backgroundColor: "white",
  },
  scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 25,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: "white",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonScan: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#258ce3",
    paddingTop: 5,
    paddingRight: 25,
    paddingBottom: 5,
    paddingLeft: 25,
    marginTop: 20,
  },
  buttonScan2: {
    marginLeft: deviceWidth / 2 - 50,
    width: 100,
    height: 100,
  },
  descText: {
    padding: 16,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
  },
  centerText: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    padding: 32,
    color: "white",
  },
  bottomContent: {
    width: deviceWidth,
    height: 120,
  },
  buttonTextStyle: {
    color: "black",
    fontWeight: "bold",
  },
};

export default styles;
