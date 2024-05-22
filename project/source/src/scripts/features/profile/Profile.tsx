/**
 * @access public
 * @package src.scripts.features.profile
 * @author Vittorio Piotti
 * @class Profile.tsx
 * @description Schermata per visualizzare o modificare i dati del profilo
*/


//native
import React, { useState,useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity, TextInput, Image } from 'react-native';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

//costants
import {BG05,BG06,BG10,IMG11,IMG12,_IMG03,_IMG04,_IMG05,_IMG06,_IMG10} from '../../constants/images'; 
import {HOME,BOOKS,SETTINGS,PROFILE} from '../../constants/screens';
import {LIGHT} from '../../constants/fonts';
import {ROSSO,BLU_PRIMARIO,GRIGIO_PRIMARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';



const Profile = (
  { 
    setShowScreen,
    showScreen, 
    globalId,
  }: { 
    setShowScreen: React.Dispatch<React.SetStateAction<number>>, 
    showScreen:number,
    globalId: string,
  }) => {

  const [isEditing, setIsEditing] = useState(false);
  const imagePaths = [
      { click: true, index: SETTINGS, path: _IMG10 },
      { click: false, index: PROFILE, path: _IMG04 },
      { click: true, index: HOME, path: _IMG05 },
      {click:true,index: BOOKS, path: _IMG06 },
  ];
  const [email, setEmail] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPassw, setNewClientPassw] = useState('');
  const [isEditingPassword,setIsEditingPassword] = useState(false)
  const [password, setPassword] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(()=>{
    fetchEmail()
  },[])

  const handleButtonPress = async () => {
    if (isEditing) {

    } else {
    setIsEditing(true);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  
  const aggiorna = async () => {
    
    !isEditingPassword ? newPassw() : newEmail()
  };

  const handleImagePress = (index: number) => {
    setShowScreen(index);
  };

  const fetchEmail = async () => {
    try {
      const url = `${SERVER_URL}type=auth&method=getClientEmail&idClient=${globalId}`;
      const response = await fetch(url);
      const data = await response.json();
      setEmail(data.email)
    } catch (error) {
    }
  };
  
  const newEmail = async () => {  
    const url = `${SERVER_URL}type=auth&method=editClientEmail`;
    const requestBody = new URLSearchParams();
    requestBody.append('userId', globalId);
    requestBody.append('newEmail', newClientEmail);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        body: requestBody.toString(),
      });
      const data = await response.json();
      setAuthStatus(data.editEmail); 
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        if(data.editEmail){
          setShowScreen(SETTINGS);
        }
      }, 2000);

    } catch (error) {
    
    }
  };
  

  const newPassw = async () => {
    const url = `${SERVER_URL}type=auth&method=editClientPassw`;
    const requestBody = new URLSearchParams();
    requestBody.append('newPassw', newClientPassw);
    requestBody.append('userId', globalId);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
            body: requestBody.toString(), 
        });
        const data = await response.json();
  
        setAuthStatus(data.editPassw);
        setShowOverlay(true);
        setTimeout(() => {
            setShowOverlay(false);
            if(data.editPassw){
                setShowScreen(SETTINGS);
            }
        }, 2000);
    } catch (error) {
    }
};



  return (
    <ImageBackground
    source={isEditing ?  isEditingPassword ? BG10 : BG06  : BG05}
      style={styles.background}
      resizeMode="cover"
    >
      <Header isHome={ showScreen} title={'Profilo'} image={_IMG03} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{isEditing ? "Nuova " : "Vedi "}</Text>
          <Text style={styles.title}>{ isEditing ?  isEditingPassword ? "Email" : "Password" : "Informazioni"}</Text>

        </View>
        <View style={ styles.innerContainerSecond}>
 
   
    <>
     
     
      {!isEditing ? (
            <>

       <TextInput
       style={[styles.input, isEditing ? styles.inputEnabled : styles.inputDisabled]}
       placeholder="Email"
       secureTextEntry={false}

       placeholderTextColor="#707070"
       onChangeText={(text) => setEmail(text)}
       value={email}
       testID="emailInput"
       editable={isEditing}
     />

<TextInput
         style={[styles.input, isEditing ? styles.inputEnabled : styles.inputDisabled]}
         placeholder="Password"
         placeholderTextColor="#707070"
         secureTextEntry={true}
         onChangeText={(text) => setPassword(text)}
         value={"password"}
         testID="passwordInput"
         editable={isEditing}
       />

         </>
      ) : 
      <View>
        {
        !isEditingPassword ? 

          <TextInput
          style={[styles.input, isEditing ? styles.inputEnabled : styles.inputDisabled]}
          placeholder="Password"
          placeholderTextColor="#707070"
          secureTextEntry={true}
          onChangeText={(text) => setNewClientPassw(text)}
          value={newClientPassw}
          testID="passwordInput"
          editable={isEditing}
        />


          : 
          <TextInput
          style={[styles.input, isEditing ? styles.inputEnabled : styles.inputDisabled]}
          placeholder="Email"
          secureTextEntry={false}
   
          placeholderTextColor="#707070"
          onChangeText={(text) => setNewClientEmail(text)}
          value={newClientEmail}
          testID="emailInput"
          editable={isEditing}
        />
  }
                  <TouchableOpacity onPress={()=>(setIsEditingPassword(!isEditingPassword))}>
            <View style={isEditingPassword ? styles.noAccountContainer :  styles.noAccountContainerEmail}>
      <Text style={styles.noAccountText}>
      {isEditingPassword ? "Modifica Password" : "Modifica Email" }
      </Text>
    </View>
  
            </TouchableOpacity>
</View>


        
        }
      
      
      
    </>
 

    
 
    

</View>

        <View style={styles.buttonContainer}>
          {!isEditing ? (
            <TouchableOpacity
              style={styles.button}
              onPress={handleButtonPress}
            >
              <Text style={styles.buttonText}>Modifica</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editButtonContainer}>
                <TouchableOpacity
            style={styles.button}
            onPress={toggleEditMode}
            >
            <Text style={[styles.buttonText, { color: ROSSO }]}>Annulla</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={ aggiorna }
            >
            <Text style={[styles.buttonText, { color: BLU_PRIMARIO }]}>Aggiorna</Text>
            </TouchableOpacity>

            </View>
          )}
        </View>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  noAccountContainerEmail: {
    width:140,
    marginTop:15,
 
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
  noAccountContainer: {
    width:170,
    marginTop:15,
 
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
    textAlign:'center',

    fontFamily: LIGHT,
    fontSize: 16,
    color: BLU_PRIMARIO, 
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
    marginTop: 130,
  },
  title: {
    fontFamily: 'Nunito-Medium',
    color: 'white',
    fontSize: 40,
  },
  titleContainer: {
    width: "100%",
    alignItems: 'flex-start',
    position: 'absolute',
    top: 50,
  },
  innerContainerFirst:{
    marginTop:50
  },
  innerContainerSecond:{
    marginTop:100
  },
  buttonContainer: {
    marginTop:50,
  },
  
  input: {
    width: 296,
    height: 53,
    paddingLeft: 15,
    marginTop: 20,
    fontFamily: 'Nunito-Light',
    fontSize: 17,
    color: GRIGIO_PRIMARIO,
  },
  inputEnabled: {
    backgroundColor: 'white',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: 105,
    height: 44,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    marginRight: 20,

    
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButtonContainer: {
    flexDirection: 'row',
    width: 296,

  },
  colorTextGray:{
    color: GRIGIO_PRIMARIO,
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
    marginTop: 20,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 296,
    height: 53,
    backgroundColor: "white",
    overflow: 'hidden',
  },

  text: {
    flex: 1,
    marginLeft:20,
    textAlign: 'left',
    fontFamily: 'Nunito-Light',
    fontSize: 17,
    lineHeight: 53,
  },

  updateButton: {
    backgroundColor: BLU_PRIMARIO,
  },
  buttonText: {
    fontFamily: 'Nunito-Light',
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

export default Profile;