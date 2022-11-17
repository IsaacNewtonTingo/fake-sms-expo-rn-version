import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
const messages = require("../data/default-messages.json");

import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import dateFormat, { masks } from "dateformat";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDoc,
} from "firebase/firestore";

export default function Home({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("70.00");
  const [name, setName] = useState("ZURI GENESIS CO LTD");
  const [account, setAccount] = useState("006");
  const [balance, setBalance] = useState("1045.00");
  const [transactionCost, setTransactionCost] = useState("0.00");
  const [createdAt, setCreatedAt] = useState("");

  const [message, setMessage] = useState("");

  const fiftyBob = 50;
  const hundredBob = 100;
  const zeroBob = 0;
  const twoBob = 2;
  const twentyThreeBob = 23;

  useEffect(() => {
    getMessages();
  }, []);

  const firebaseConfig = {
    apiKey: "AIzaSyBVddw711JEwHW-Qf3MP4gxOsdbKkuScfY",
    authDomain: "fakesms-17ba8.firebaseapp.com",
    projectId: "fakesms-17ba8",
    storageBucket: "fakesms-17ba8.appspot.com",
    messagingSenderId: "534199061690",
    appId: "1:534199061690:web:4854146c417308c1a84683",
    measurementId: "G-K1DZYMZMX0",
  };

  let myApp = initializeApp(firebaseConfig);

  const firestore = getFirestore(myApp);

  const db = getFirestore(myApp);

  async function createMessage() {
    setIsPosting(true);
    await setDoc(doc(firestore, "Expo-Messages", "MPESA"), {
      code,
      name: name.toUpperCase(),
      amount,
      account,
      balance,
      createdAt: Date.now(),
    })
      .then(() => {
        Alert.alert("Posted successfully");
        setShowModal(false);
        setIsPosting(false);
        getMessages();
      })
      .catch((err) => {
        console.log(err);
        setIsPosting(false);
      });
  }

  const docRef = doc(db, "Expo-Messages", "MPESA");

  async function getMessages() {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const messageData = docSnap.data();

      setCreatedAt(messageData.createdAt);
      setCode(messageData.code);
      setAmount(messageData.amount);
      masks.myDate = "dd/mm/yy";

      setMessage(
        `${messageData.code} Confirmed. Ksh${messageData.amount} sent to ${
          messageData.name
        } for account ${messageData.account} on ${dateFormat(
          messageData.createdAt,
          "myDate"
        )} at ${dateFormat(
          messageData.createdAt,
          "shortTime"
        )}.New M-PESA balance is Ksh0.00. Transaction cost, Ksh${
          parseInt(messageData.amount) <= hundredBob.toFixed(2)
            ? twoBob.toFixed(2)
            : twentyThreeBob.toFixed(2)
        }. Amount you can transact within the day is 299,775.00. Download M-PESA app on `
      );
    } else {
      console.log("No such document!");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconAndInput}>
        <Fontisto
          style={styles.searchIcon}
          name="search"
          size={17}
          color="white"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="white"
          editable={false}
        />

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.menuIcon}
        >
          <Entypo name="dots-three-vertical" size={17} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          style={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("MessageDetails", {
                  listName: item.name,
                  listTime: item.time,
                  listMessage: item.message,
                  listIcon: item.icon,

                  code: code,
                  amount: amount,

                  time: createdAt,
                  message: message,
                });
              }}
              style={styles.messageContainer}
              key={item.name}
            >
              <Image style={styles.icon} source={{ uri: item.icon }} />

              <View style={styles.nameAndMessageContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.messageText}>
                  {item.name === "MPESA"
                    ? message.slice(0, 80) + "..."
                    : item.message.length <= 80
                    ? item.message
                    : item.message.slice(0, 80) + "..."}
                </Text>
                <Text style={styles.timeText}>
                  {item.name === "MPESA"
                    ? dateFormat(createdAt, "shortTime")
                    : item.time}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.subHeading}>Pay Zuri</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter account number"
              value={account}
              placeholderTextColor="gray"
              onChangeText={setAccount}
            />

            {/* <TextInput
              style={styles.modalInput}
              placeholder="Enter name"
              value={name}
              placeholderTextColor="gray"
              onChangeText={setName}
            /> */}

            <TextInput
              style={styles.modalInput}
              placeholder="Enter code"
              value={code}
              placeholderTextColor="gray"
              onChangeText={setCode}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              placeholderTextColor="gray"
              onChangeText={(text) => setAmount(text)}
              keyboardType="number-pad"
            />

            {isPosting == false ? (
              <TouchableOpacity
                onPress={createMessage}
                style={[
                  styles.button,
                  { backgroundColor: "#006699", width: "80%" },
                ]}
              >
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.button,
                  { backgroundColor: "#006696", width: "80%" },
                ]}
              >
                <ActivityIndicator size={20} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[
                styles.button,
                { backgroundColor: "#ff3300", width: "80%" },
              ]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        // onPress={() => setShowModal(true)}
        style={styles.newChat}
      >
        <Text style={styles.newChatText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14141f",
  },

  iconAndInput: {
    marginTop: 20,
  },
  menuIcon: {
    position: "absolute",
    zIndex: 1,
    right: 35,
    top: 32,
  },
  searchIcon: {
    position: "absolute",
    zIndex: 1,
    left: 35,
    top: 32,
  },
  input: {
    width: "90%",
    height: 40,
    borderRadius: 30,
    color: "white",
    backgroundColor: "#595959",
    paddingHorizontal: 40,
    marginTop: 20,
    alignSelf: "center",
  },
  newChat: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7575a3",
    borderColor: "#99b3e6",
    borderWidth: 2,
  },
  newChatText: {
    color: "white",
    fontWeight: "900",
    fontSize: 40,
  },
  messageContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  nameText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  messageText: {
    color: "#999999",
  },
  timeText: {
    color: "#999999",
    position: "absolute",
    right: 0,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  flatlistContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  nameAndMessageContainer: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    width: 350,
    paddingVertical: 40,
    justifyContent: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalInput: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 10,
    backgroundColor: "#e6e6ff",
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
    width: "80%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#a162f7",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
  },
});
