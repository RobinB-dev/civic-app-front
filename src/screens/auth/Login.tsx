import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AuthStackParamList } from "../../types/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { AuthContext } from "../../provider/AuthProvider";
import { gql, useMutation } from "@apollo/client";
import { testObj } from "../../decl/functions.decl";

const LOGIN_EMAIL = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      error
      uid
    }
  }
`;

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  // const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [loginEmail, { data, loading, error }] = useMutation(LOGIN_EMAIL);
  const auth = useContext(AuthContext);
  // const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log(data, error);
    if (data) {
      const user = testObj(data, "login");
      const token = testObj(user, "token");
      const error = testObj(user, "error");
      const uid = testObj(user, "uid");
      if (error) {
        setAuthError(error);
      }
      auth.setToken(token);
      auth.setUid(uid);
    }
  }, [data, loading]);

  // robin@robin.com
  async function login() {
    // setLoading(true);
    console.log("signInWithEmailAndPassword");

    loginEmail({
      variables: {
        email: email,
        password: password,
      },
    });
  }
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            {/* <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/images/login.png")}
            /> */}
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              Login
            </Text>
            {/* <Text>Email</Text> */}
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Adresse email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            {/* <Text style={{ marginTop: 15 }}>Password</Text> */}
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Mot de passe"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            {authError && <Text style={{ marginTop: 15 }}>{authError}</Text>}
            <Button
              text={loading ? "Loading" : "Continue"}
              onPress={() => {
                login();
              }}
              style={{
                marginTop: 26,
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                    color: "#2C60C6",
                  }}
                >
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    color: "#2C60C6",
                  }}
                >
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
