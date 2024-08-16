/*
 * Gestione Hotels App v1.0.0 (https://github.com/vittorioPiotti/Gestione-Hotels-App/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Gestione-Hotels-App/blob/main/LICENSE.md)
 */


/*
  React Native v0.74.0 (https://github.com/facebook/react-native/releases/tag/v0.74.0)
  Copyright Facebook, Inc.
  Licensed under MIT (https://github.com/facebook/react-native/blob/main/LICENSE)
*/

/**
 * @access public
 * @package src.scripts.features.onboarding
 * @author Vittorio Piotti
 * @class Preview.tsx
 * @description Schermata iniziale di caricamento applicazione
*/

//native
import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Image } from 'react-native';

//constants
import {BG01,LOGO} from '../../constants/images'; 
import {SEMIBOLD,REGULAR} from '../../constants/fonts'; 

const Preview = () => {
 

  return (
    <ImageBackground
      source={BG01}
      style={styles.background}
      resizeMode="cover"
    >
        <View style={styles.container}>
            <Text style={[styles.title,styles.titleFs]}>Gestione</Text>
            <Text style={[styles.title,styles.titleNd]}>Hotel</Text>

            <View style={{ width: 70, height: 70, position: 'absolute', bottom: 60,left: '50%',  transform: [{ translateX: -35 }]  }}>
                <Image
                    source={LOGO} 
                    style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover', 
                    borderRadius: 16,
                    }}
                />
            </View>
        </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleFs: {
    fontWeight:"light",
    fontFamily: REGULAR,
  },
  titleNd: {
    fontWeight:"bold",
    fontFamily: SEMIBOLD,
  },

  title: {
    fontSize: 70,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center', 
    marginLeft:20
  },
  jsContainer: {
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  }
});

export default Preview;
