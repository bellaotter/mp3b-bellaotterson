import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import firebase from "firebase";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignInScreen">;
}

export default function SignInScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign Up Button (goes to Sign Up screen)
      - Reset Password Button
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/starts
  */
  const NavigationBar = () => {
    return (
      <Appbar.Header>
        <Appbar.Content title="Sign In" />
      </Appbar.Header>
    );
  };

  const signIn = () => {
    if (password == ''){
      resetPassword;
    }
    else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          console.log("Account Created");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
        navigation.goBack;
    }
  };

  const resetPassword = () => {
    setSnackVisible(true);
  };
 
  const onToggleSnackBar = () => setSnackVisible(!snackVisible);

  const onDismissSnackBar = () => setSnackVisible(false);

  return (
    <>
      <NavigationBar/>
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.textInput} label="Email" value={email} onChangeText={email => setEmail(email)}/>
        <TextInput style={styles.textInput} label="Password" value={password} onChangeText={password => setPassword(password)}/>
        <Button style={styles.button} mode="contained" onPress={signIn}>
          Submit
        </Button>
        <Button style={styles.button} mode="text" onPress={() => navigation.navigate('SignUpScreen')}>
          Create an Account
        </Button>
        <Button style={styles.button} mode="text" onPress={resetPassword}>
          Reset Password
        </Button>
        <Snackbar visible={snackVisible} onDismiss={onDismissSnackBar}>
          A password reset link has been sent to your email.
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
