import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
  Linking,
} from "react-native";

const { width } = Dimensions.get("window");
const messages = require("../data/default-messages.json");

const B = (props) => (
  <Text
    onPress={() => {
      Linking.openURL(props.children);
    }}
    style={{ color: "#80bfff", textDecorationLine: "underline" }}
  >
    {props.children}
  </Text>
);

const C = (props) => (
  <Text style={{ textDecorationLine: "underline" }}>{props.children}</Text>
);

import dateFormat, { masks } from "dateformat";

export default function MessageDetails({ route, navigation }) {
  const fiftyBob = 50;
  const zeroPointFive = 0.5;
  const onePointFive = 1.5;
  return (
    <ScrollView
      bounces={false}
      alwaysBounceVertical={false}
      contentContainerStyle={styles.container}
    >
      {route.params.listName === "MPESA" ? (
        <>
          <View style={styles.messageContainer}>
            <Image
              style={styles.icon}
              source={{ uri: route.params.listIcon }}
            />

            <View>
              <Text style={styles.timeText}>Tue, 4 Oct, 15:27</Text>

              <View style={styles.messageItem}>
                <Text style={styles.messageText}>
                  QJ12ZF2078 Confirmed.You have recieved Ksh200.00 from ERNEST
                  GHATI 0788980099 ON 04/10/22 at 3:27PM New M-PESA balance is
                  Ksh2890.00.Download M-PESA app on{" "}
                  <B>https://bit.ly/mpesaappsm</B> & get 500MB
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.messageContainer, { marginTop: 20 }]}>
            <Image
              style={styles.icon}
              source={{ uri: route.params.listIcon }}
            />

            <View>
              <Text style={styles.timeText}>Thur, 6 Oct, 15:27</Text>

              <View style={styles.messageItem}>
                <Text style={styles.messageText}>
                  QJ12ZF2078 Confirmed. Ksh1,028.00 sent to Elly Tingo
                  0727452815 on 6/10/22 at 9:24 AM. New M-PESA balance is
                  Ksh0.00. Transaction cost, Ksh22.00.Amount you can transact
                  within the day is 298,697.00. Pay for goods & Services using
                  Lipa Na M-Pesa! To reverse, forward this message to 456.
                </Text>
              </View>
            </View>
          </View>

          {/* <View style={styles.messageContainer}>
            <Image
              style={styles.icon}
              source={{ uri: route.params.listIcon }}
            />

            <View>
              <Text style={styles.timeText}>
                {route.params.listName === "MPESA"
                  ? dateFormat(route.params.time, "shortTime")
                  : route.params.listTime}
              </Text>

              <View style={styles.messageItem}>
                <Text style={styles.messageText}>
                  {route.params.listName === "MPESA"
                    ? route.params.message
                    : route.params.listMessage}{" "}
                  <B>https://mpesaapp.page.link/ggGV</B> & get 500MB.
                </Text>
              </View>
            </View>
          </View> */}

          <View style={styles.messageContainer}>
            <Image
              style={styles.icon}
              source={{ uri: route.params.listIcon }}
            />

            <View>
              <Text style={styles.timeText}>
                {route.params.listName === "MPESA"
                  ? dateFormat(route.params.time, "shortTime")
                  : route.params.listTime}
              </Text>

              <View style={styles.messageItem}>
                <Text style={styles.messageText}>
                  {route.params.listName === "MPESA"
                    ? route.params.message
                    : route.params.listMessage}{" "}
                  Click <B>https://bit.ly/3LQTXIT</B>
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.messageContainer, { marginTop: 20 }]}>
            <Image
              style={styles.icon}
              source={{ uri: route.params.listIcon }}
            />

            <View>
              {/* <Text style={styles.timeText}>Today 15:27</Text> */}

              <View style={styles.messageItem}>
                <Text style={styles.messageText}>
                  {route.params.code} Confirmed. Fuliza M-PESA amount is Ksh{" "}
                  {route.params.amount}, Intrest charged Ksh{" "}
                  {route.params.amount === fiftyBob.toFixed(2)
                    ? zeroPointFive.toFixed(2)
                    : onePointFive.toFixed(2)}
                  . Total Fuliza M-PESA outstanding amount is Ksh 897.83{" "}
                  <C>due on 09/12/22.</C> To check daily charges, Dial *234*0#OK
                  Select Query Charges
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cantContainer}>
            <Text style={styles.cantText}>
              Can't reply to this conversation
            </Text>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://www.google.com/invalid");
              }}
            >
              <Text style={{ textDecorationLine: "underline", color: "blue" }}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.messageContainer}>
            <Image
              style={styles.icon}
              source={{ uri: route.params.listIcon }}
            />

            <View>
              <Text style={styles.timeText}>{route.params.listTime}</Text>

              <View style={styles.messageItem}>
                <Text style={styles.messageText}>
                  {route.params.listMessage}
                </Text>
              </View>
            </View>
          </View>

          <TextInput
            placeholder="Text message"
            placeholderTextColor="gray"
            style={{
              position: "absolute",
              bottom: 10,
              borderWidth: 1,
              borderColor: "gray",
              width: "100%",
              alignSelf: "center",
              height: 40,
              borderRadius: 20,
              paddingHorizontal: 20,
            }}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14141f",
    padding: 20,
    paddingBottom: 100,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 1.4,
  },
  cantContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  cantText: {},
  timeText: {
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  messageItem: {
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 20,
  },
  messageText: {
    color: "white",
    fontSize: 20,
  },
});
