import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error');
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign In Button (goes to Sign In Screen)
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/start
  */

  const NavigationBar = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="Create an Account" />
      </Appbar.Header>
    );
  };

  const signUp = () => {
    console.log("1");
    if (email == "" || password == ""){
      setErrorMessage("Email or Password is not filled out.")
    }
    console.log("Email " + email);
    console.log("Password " + password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
        console.log("You signed up.");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMessage(errorMessage);
        // ..
        console.log(errorMessage);
            });
      navigation.goBack;
      
  }

  const onToggleSnackBar = () => setSnackVisible(!snackVisible);

  const onDismissSnackBar = () => {
    setErrorMessage("Error");
    setSnackVisible(false)};

  return (
    <>
      <NavigationBar/>
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.textInput} label="Email" value={email} onChangeText={email => setEmail(email)}/>
        <TextInput style={styles.textInput} label="Password" value={password} onChangeText={password => setPassword(password)}/>
        <Button style={styles.button} mode="contained" onPress={signUp}>
          CREATE AN ACCOUNT
        </Button>
        <Button style={styles.button} mode="text" onPress={() => navigation.navigate('SignInScreen')}>
          OR SIGN IN INSTEAD
        </Button>
        <Snackbar visible={snackVisible} onDismiss={onDismissSnackBar}>
          {errorMessage}
        </Snackbar>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    marginRight: 10,
  }
});
