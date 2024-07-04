import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;
const minButtonSize = 220; // Adjust this as needed

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
  textTitle2: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    padding: 16,
    color: "#2196f3",
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
    padding: 10,
    marginTop: 20,
    width: minButtonSize, // Ensure minimum width
    minHeight: 60, // Ensure minimum height
  },
  iconContainer: {
    width: 40, // Fixed width for icon container to maintain alignment
    alignItems: "center",
  },
  textContainer: {
    flex: 1, // Use the remaining space
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
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
    gap: 10,
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
