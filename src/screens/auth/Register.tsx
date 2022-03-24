import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { AuthStackParamList } from "../../types/navigation";
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

const GET_EMAIL = gql`
  query Feed {
    Feed {
      email
    }
  }
`;

const ADD_EMAIL = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      error
    }
  }
`;

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("test1@fm.com");
  const [password, setPassword] = useState<string>("azerty123");
  const auth = useContext(AuthContext);
  const [addEmail, { data, loading, error }] = useMutation(ADD_EMAIL);
  const [authError, setAuthError] = useState<string | null>(null);
  // const auth = getAuth();
  // const [loading, setLoading] = useState<boolean>(false);

  // const { data, loadingEmail, errorEmail } = useQuery(ADD_EMAIL);
  // useEffect(() => {
  //   console.log(loading);
  // }, [loading]);
  useEffect(() => {
    if (data) {
      const user = testObj(data, "register");
      const token = testObj(user, "token");
      const error = testObj(user, "error");
      if (error) {
        setAuthError(error);
      }
      auth.setToken(token);
    }
  }, [data]);

  async function register() {
    // setLoading(true);
    console.log("createUserWithEmailAndPassword");

    addEmail({
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
              source={require("../../../assets/images/register.png")}
            /> */}
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : '#F7F7F7',
            }}
          >
             <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Register
            </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Nom d'utilisateur"
              // value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="default"
              // onChangeText={(text) => setEmail(text)}
            />
           
            {/* <Text>Email</Text> */}
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            {authError && <Text style={{ marginTop: 15 }}>{authError}</Text>}
            <Button
              text={loading ? "Loading" : "Create an account"}
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
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
              <Text size="md">Déjà membre ?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                    color : "#2C60C6"
                  }}
                >
                  Se connecter
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
                    color : "#2C60C6"
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
