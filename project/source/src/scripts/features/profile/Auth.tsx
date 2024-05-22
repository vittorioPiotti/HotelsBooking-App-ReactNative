/**
 * @access public
 * @package src.scripts.features.profile
 * @author Vittorio Piotti
 * @class Auth.tsx
 * @description Schermata di autenticazione con scelta metodo di accesso (google o proprietario)
*/

//native
import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

//constants
import {BG02,IMG07,LOGO,_IMG03,_IMG04,_IMG05,_IMG06,IMG12,IMG11} from '../../constants/images'; 
import {LIGHT,MEDIUM} from '../../constants/fonts'; 
import {SIGNIN,HOME,AUTH,BOOKS} from '../../constants/screens';
import {GRIGIO_PRIMARIO} from '../../constants/colors';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Modal from '../../layouts/Modal';


const Auth = (
  { 
    globalId,
    setShowScreen,
    showScreen 
  }: { 
    globalId:string,
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,
    showScreen:number 
  }) => {

    

  const[ errorType,setErrorType] = useState(0)
  const[ showOverlayGoogle,setShowOverlayGoogle] = useState(false)
  const[ authStatus,setAuthStatus] = useState(false)
  const imagePaths = [
    { click:false,index: AUTH, path: _IMG04},
    { click:true,index: HOME, path: _IMG05 },
    { click:true,index: BOOKS, path: _IMG06 },
  ];

  const handleJustSeaSignIn = () => {
    setShowScreen(SIGNIN); 
  };

  const handleGoogleSignIn = () => {
    setAuthStatus(false)
    setShowOverlayGoogle(true)
    setTimeout(() => {
      setShowOverlayGoogle(false)
    }, 2000);

  };
  const [showOverlay,setShowOverlay] = useState(false)

  const handleImagePress = (index: number) => {
    if(index == BOOKS && globalId==''){
      setShowOverlay(true)
    }else{
      setShowScreen(index);
    }
  };

  return (
    <ImageBackground
      source={BG02}
      style={styles.background}
      resizeMode="cover"
    >
      <Header isHome={showScreen} title={'Profilo'} image={_IMG03} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Autenticazione</Text>
        </View>
        <TouchableOpacity style={styles.shadowContainer} onPress={handleGoogleSignIn} >
          <View style={styles.divider}>
            <Image source={IMG07} style={styles.imageColumn} />
            <Text style={styles.textColumn}>Accedi con Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shadowContainer} onPress={handleJustSeaSignIn}> 
          <View style={styles.divider}>
            <Image source={LOGO} style={styles.imageColumn} />
            <Text style={styles.textColumn}>Accedi con Gestione Hotel</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Footer imagePaths={imagePaths} onPressImage={handleImagePress} />
      {showOverlay && ( <Modal errorType={errorType} showScreen={showScreen} setShowOverlay={setShowOverlay} setShowScreen={setShowScreen}/>)}

      {showOverlayGoogle && (
        <View style={styles.overlay}>
          <Image
            source={authStatus ? IMG12 : IMG11}
            style={styles.overlayContent}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    width: 90,
    height: 90,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '93%',
    height: '68%',
    marginTop: 85,
  },
  titleContainer: {
    width: "100%",
    alignItems: 'flex-start',
    position: 'absolute',
    top: 90,
  },
  title: {
    fontFamily: MEDIUM,
    color: 'white',
    fontSize: 40,
  },
  shadowContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 10,
    marginTop: 50,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 296,
    height: 53,
    backgroundColor: "white",
    overflow: 'hidden',
  },
  imageColumn: {
    width: 53,
    height: 53,
  },
  textColumn: {
    flex: 1,
    textAlign: 'center',
    fontFamily: LIGHT,
    fontSize: 17,
    color: GRIGIO_PRIMARIO,
    lineHeight: 53,
  },
});

export default Auth;