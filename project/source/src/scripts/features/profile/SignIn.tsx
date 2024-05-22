/**
 * @access public
 * @package src.scripts.features.profile
 * @author Vittorio Piotti
 * @class SignIn.tsx
 * @description Schermata di accesso e registrazione (metodo proprietario) 
*/


//native
import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';

//constants
import {BG03,BG04,_IMG03,_IMG04,_IMG05,_IMG06,IMG11,IMG12,_IMG10} from '../../constants/images'; 
import {LIGHT,MEDIUM} from '../../constants/fonts';
import {SIGNIN,HOME,AUTH,BOOKS,SETTINGS} from '../../constants/screens';
import {BLU_PRIMARIO,GRIGIO_PRIMARIO} from '../../constants/colors';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Modal from '../../layouts/Modal';
import {SERVER_URL} from '../../constants/connection';


const SignIn = (
  { 
    globalId,
    setShowScreen,
    showScreen, 
    setGlobalId,
     
  }: 
  {
    globalId:string,
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,
    showScreen:number,
    setGlobalId: (id: string) => void,
   }
  ) => {

  const [errorType,setErrorType] = useState(0); 
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);
  const imagePaths = [
    { click: true, index: AUTH, path: _IMG10 },
    { click: false, index: SIGNIN, path: _IMG04 },
    { click: true, index: HOME, path: _IMG05 },
    {click:true,index: BOOKS, path: _IMG06 },
  ];

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const [showOverlayAuth,setShowOverlayAuth] = useState(false)

  const handleImagePress = (index: number) => {
    if(index == BOOKS && globalId==''){
      setShowOverlayAuth(true)
    }else{
      setShowScreen(index);
    }
  };

  const login = async () => {
    const url = `${SERVER_URL}type=auth&method=login&authState=client`;
    const requestBody = new URLSearchParams({
      email,
      password
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody.toString()
      });
  
      const result = await response.json();
      setAuthStatus(result.userId)
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        if(result.userId  !== false){
          setGlobalId(result.userId )
          setShowScreen(SETTINGS);

        }
      }, 2000);
    } catch (error) {
        setTimeout(() => {
          setShowOverlay(false);
        }, 2000);
      }
  };
  
  const handleButtonPress = async () => {
    const apiMethod = isRegistering ? 'register' : 'login';
    const url = `${SERVER_URL}type=auth&method=${apiMethod}&authState=client`;
    const requestBody = new URLSearchParams({
      email,
      password
    });
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: requestBody.toString()
      });
      const result = await response.json();  
      if(apiMethod == 'register'){
        if(result.register === true){
          login()
        }else{
             setShowOverlay(true);
          setTimeout(() => {
            setShowOverlay(false);
          }, 2000);
        }
      }else{
        setAuthStatus(result.userId)
        setShowOverlay(true);
        setTimeout(() => {
          setShowOverlay(false);
          if(result.userId  !== false){
            setGlobalId(result.userId )
            setShowScreen(SETTINGS);
          }
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
    }
  };
  


  return (
    <ImageBackground
    source={isRegistering ? BG04 : BG03}
      style={styles.background}
      resizeMode="cover"
    >
      <Header isHome={showScreen} title={'Profilo'} image={_IMG03} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{isRegistering ? 'Registrati' : 'Accesso'}</Text>
        </View>
        <View style={styles.innerContainer}>
     
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#707070"
            onChangeText={(text) => setEmail(text)}
            value={email}
            testID="emailInput"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#707070"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            testID="passwordInput"
          />
          <View style={styles.askContainer}>
            <TouchableOpacity onPress={toggleMode}>
            <View style={styles.noAccountContainer}>
      <Text style={styles.noAccountText}>
      {isRegistering ? 'Hai già un account?' : 'Non hai un account? '}
      </Text>
    </View>
  
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress()}
        >
          <Text style={styles.buttonText}>{isRegistering ? 'Registrati' : 'Accedi'}</Text>
        </TouchableOpacity>
      </View>
      <Footer imagePaths={imagePaths} onPressImage={handleImagePress} />

      {showOverlay && (
        <View style={styles.overlay}>
          <Image
            source={authStatus ? IMG12 : IMG11}
            style={styles.overlayContent}
          />
        </View>
      )}

{showOverlayAuth && ( <Modal errorType={errorType} showScreen={showScreen} setShowOverlay={setShowOverlayAuth} setShowScreen={setShowScreen}/>)}

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
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
  title: {
    fontFamily: MEDIUM,
    color: 'white',
    fontSize: 40,
  },
  titleContainer: {
    width: "100%",
    alignItems: 'flex-start',
    position: 'absolute',
    top: 50,
  },
  askContainer: {
    width: 296,
    alignItems: 'flex-start',
  },
  input: {
    width: 296,
    height: 53,
    backgroundColor: 'white',
    paddingLeft: 15,
    marginTop: 20,
    fontFamily: LIGHT,
    fontSize: 17,
    color: GRIGIO_PRIMARIO,
  },
  noAccountContainer: {
    marginTop:15,
    marginBottom:50,
    backgroundColor: 'white', 
    paddingVertical: 4, 
    paddingHorizontal: 10,
    borderRadius: 20, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noAccountText: {
    fontFamily: LIGHT,
    fontSize: 16,
    color: BLU_PRIMARIO, 
  },
  
  innerContainer:{
    marginTop:60
  },
  button: {
    width: 105,
    height: 44,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {

    fontFamily: LIGHT,
    fontSize: 20,
    color: BLU_PRIMARIO,
  },
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
});

export default SignIn;