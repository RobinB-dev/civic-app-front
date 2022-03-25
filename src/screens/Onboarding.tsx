import { View, Text, StyleSheet, Animated, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import OnboardingItem from '../components/OnboardingItem';

const Onboarding = () => {

    const startValue = new Animated.Value(-100);
    const startValue2 = new Animated.Value(250);
    const endValue = -50;
    const endValue2 = 200;

    const onboarding = [
        {
            id: '1',
            title: 'LE CONCEPT',
            description: "Améliorez votre ville et rendez votre quartier plus agréable à vivre grâce à Vis Ma Ville ! Ensemble, nous pourrons créer un environnement idéal où se déplacer et nous créerons un vrai réseau de citoyens souhaitant s'entraider.",
            face: require('../../assets/images/head_classic.png'),
            emote: require('../../assets/images/emote-surprise.png'),
            over: false
        },
        {
            id: '2',
            title: 'FONCTIONNEMENT',
            description: "Faites votre trajet du quotidien ou baladez vous dans votre quartier pour pouvoir marquer les points qui pourront aider vos concitoyens ! C'est tout simple : prenez une photo d'un problème, d'une point d’intérêt ou encore d’un événement et postez la !",
            face: require('../../assets/images/head_nerd.png'),
            emote: require('../../assets/images/emote-question.png'),
            over: false
        },
        {
            id: '3',
            title: 'FONCTIONNEMENT',
            description: "Vous pouvez aussi valider ou invalider les posts des autres utilisateurs afin de prévenir si le point partagé est réel ou si c'était une supercherie ! En faisant toutes ces actions, vous pourrez gagner des points d'expérience pour monter en niveau !",
            face: require('../../assets/images/head_nerd.png'),
            emote: require('../../assets/images/emote-question.png'),
            over: true
        }
    ]

    useEffect(() => {
        Animated.loop(
        Animated.spring(startValue, {
            toValue: endValue,
            friction: 2,
            useNativeDriver: false,
        }),
        {iterations: 1000},
        ).start();
    }, [startValue, endValue]);

    useEffect(() => {
        Animated.loop(
        Animated.spring(startValue2, {
            toValue: endValue2,
            friction: 5,
            useNativeDriver: false,
        }),
        {iterations: 1000},
        ).start();
    }, [startValue2, endValue2]);


  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Guide</Text>
      </View>
      <View style={styles.onboardingContainer}>
          <Animated.Image source={require('../../assets/images/cloud.png')} style={[styles.cloud, {left: startValue}]}/>
          <Animated.Image source={require('../../assets/images/cloud.png')} style={[styles.cloud, styles.cloud2, {left: startValue2}]}/>
          <Image source={require('../../assets/images/city.png')} style={[styles.city]}/>
          <FlatList 
            style={styles.onboarding}
            data={onboarding}
            renderItem={({item}) => <OnboardingItem item={item}/>}
            horizontal
            pagingEnabled
          />
      </View>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
    fullScreen: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      backgroundColor: "#F7F7F7",
    },

    header: {
    width: "100%",
    marginTop: "10%",
    height: "10%",
    // backgroundColor: '#FF9900',
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#2C60C6",
    borderStyle: "solid",
    },
    
    headerTitle: {
        fontSize: 28,
        color: "#B4B4B4",
    },

    onboardingContainer:{
        width: '100%',
        height: '70%',
        // backgroundColor: '#FF9900',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        borderBottomWidth: 2,
        borderBottomColor: "#2C60C6",
        borderStyle: "solid",
    },

    onboarding: {
        width: '100%',
        height: '100%',
        // backgroundColor: '#FF99FF20'
    },

    cloud: {
        position: 'absolute',
        width: '80%',
        top: '-25%',
        opacity: 0.20,
        left: '-20%',
        resizeMode: 'contain'
    },

    cloud2: {
        top: '0%',
        width: '70%',
        opacity: 0.125
    },

    city: {
        position: 'absolute',
        width: '100%',
        top: '20%',
        opacity: 1,
        resizeMode: 'contain'
    }
})