import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Animated, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const OnboardingItem = ({item}) => {
    const dimensions = useWindowDimensions()
    const navigation = useNavigation()
    const shrinkAnimation = useRef(new Animated.Value(180)).current;
    const expandAnimation = useRef(new Animated.Value(36)).current;

    const [hits, setHits] = useState(0)

    const shrinkIn = () => {
        Animated.timing(shrinkAnimation, {
        toValue: 165,
        duration: 150,
        useNativeDriver: false
        }).start();
        setTimeout(() => {
            Animated.timing(shrinkAnimation, {
                toValue: 180,
                duration: 400,
                useNativeDriver: false
                }).start();
        }, 150);

        Animated.timing(expandAnimation, {
        toValue: 45,
        duration: 100,
        useNativeDriver: false
        }).start();
        setTimeout(() => {
            Animated.timing(expandAnimation, {
                toValue: 36,
                duration: 300,
                useNativeDriver: false
                }).start();
        }, 100);
    };

    return (
        <View style={[styles.fullScreen, {width: dimensions.width, height:dimensions.height*0.525}]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={[styles.description, {width: dimensions.width*0.75}]}>{item.description}</Text>
            {item.over && (
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.replace("MainTabs");
                }}>
                    <Text style={styles.buttonText}>C'est parti !</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.faceContainer} onPress={() => {
                shrinkIn()
                setHits(hits+1)
                if (hits == 7) {
                    Alert.alert('Arrêtez de me frapper !', 'Je ne suis pas là pour me faire frapper 😫 \n\n La vie est suffisamment difficile comme ça...', [{text: "Désolé 😨"}, {text: "Je vais continuer 👺", style: 'destructive'}])
                } else if (hits == 20) {
                    Alert.alert('Assez !', 'Bon sang, arrêtez de me frapper ! 😫 \n\n Je ne vous donnerai pas les informations que vous voulez.', [{text: "Désolé 😨"}, {text: "Je vais continuer 👺", style: 'destructive'}])
                } else if (hits == 50) {
                    Alert.alert('Bon...', 'Très bien, je vais tout vous dire ! 🤕 \n\n pourquoi les mouches ont plein doeil? pour gagner au echecs 👍', [{text: "Vous avez changé ma vie 😵‍💫"}])
                }
            }}>
                <Animated.Image style={[styles.face, {width: shrinkAnimation}]} source={item.face}/>
                <Animated.Image style={[styles.emote, {width: expandAnimation}]} source={item.emote}/>
            </TouchableOpacity>
        </View>
    )
}

export default OnboardingItem

const styles = StyleSheet.create({
    fullScreen: {
      alignItems: "center",
      justifyContent: "flex-end"
    },

    title: {
        fontSize: 32,
        fontWeight: '600',
        color: '#FF4070',
        marginBottom: 20
    },

    description: {
        fontSize: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        textAlign: 'center',
        fontWeight: '400',
        color: '#2C60C6',
        backgroundColor: '#FCF4ED'
    },

    faceContainer: {
        position: 'absolute',
        width: 180,
        height: 180,
        top: '-15%'
    },

    face: {
        width: '100%',
        resizeMode: 'contain'
    },

    emote: {
        position: 'absolute',
        width: '20%',
        top: '30%',
        left: '80%',
        resizeMode: 'contain'
    },

    button: {
        position: 'absolute',
        bottom: '-20%',
        backgroundColor: '#2C60C6',
        paddingHorizontal: 110,
        paddingVertical: 20,
        borderRadius: 10,
    },

    buttonText: {
        backgroundColor: '#2C60C6',
        fontSize: 26,
        textAlign: 'center',
        fontWeight: '700',
        color: '#F7F7F7'
    },
})