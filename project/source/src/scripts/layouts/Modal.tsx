/*
 * Gestione Hotels App v1.0.0 (https://github.com/vittorioPiotti/Gestione-Hotels-App/releases/tag/1.0.0)
 * Copyright 2024 Vittorio Piotti
 * Licensed under GPL-3.0 (https://github.com/vittorioPiotti/Gestione-Hotels-App/blob/main/LICENSE.md)
 */

/**
 * @access public
 * @package src.scripts.layouts
 * @author Vittorio Piotti
 * @class Modal.tsx
 * @description Modal a comparsa per errore relativo ai permessi di accesso e al rilevamento di nessuna prenotazione effettuata
*/




import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SEMIBOLD,LIGHT } from '../constants/fonts';
import {IMG89 } from '../constants/images';
import {AUTH,SIGNIN,HOME} from '../constants/screens';
import {BLU_PRIMARIO,GRIGIO_PRIMARIO,GRIGIO_SECONDARIO} from '../constants/colors';



const Modal = ({ 
    errorType,
    showScreen,
    setShowOverlay, 
    setShowScreen 
}:{
    errorType:number,
    showScreen:number,
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>,
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,

}) => {


const ERRORS = [
    {
        titolo: "Accedi o Registrati",
        descrizione: "Devi essere autenticato per poter vedere le prenotazioni",
        bottone: "Autenticati",
        azione:AUTH
      },
    {
      titolo: "Accedi o Registrati",
      descrizione: "Devi essere autenticato per poter prenotare una stanza",
      bottone: "Autenticati",
      azione:AUTH
    },
  
    {
        titolo: "Prenota Stanza",
        descrizione: "Non hai ancora prenotato nessuna stanza",
        bottone: "Prenota",
        azione:HOME
    },
  ];

  return (
    <TouchableOpacity
    activeOpacity={0.94} // Imposta l'opacità dell'effetto al tocco
    onPress={() => {
      setShowOverlay(false)
    }}
    style={styles.overlay}
  >
<View style={{flexDirection:'row'}}>
<View style={styles.containerOver}>
<Text style={styles.errorTextTitle}>{ERRORS[errorType].titolo}</Text>
<View style={styles.lineContainer}>
<View style={styles.line} /> 
</View>
<Text style={styles.errorText}>{ERRORS[errorType].descrizione}</Text>
</View>
<View style={{justifyContent:'center'}}>
<Image
  source={IMG89}
  style={styles.overlayContentOver}
  resizeMode="contain"
/>
</View>
</View>
<View style={{flexDirection:'row',width:'90%'}}>
<TouchableOpacity onPress={()=>(

showScreen != AUTH && showScreen != SIGNIN? setShowScreen(ERRORS[errorType].azione) : setShowOverlay(false)

)} style={{width:'auto',marginTop:20} } >
  <View style={styles.autenticati}>
<Text style={styles.autenticatiText}>
{ERRORS[errorType].bottone}
</Text>
</View>

  </TouchableOpacity>

  {showScreen != AUTH && showScreen != SIGNIN
  
    ?
    <TouchableOpacity onPress={()=>(setShowOverlay(false))} style={{width:'auto',marginTop:20} } >
        <View style={styles.annulla}>
            <Text style={styles.annullaText}>
            Annulla
            </Text>
        </View>
    </TouchableOpacity>

    :


    null
  
  }


  </View>

  
</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    autenticati: {

        marginTop:15,
        marginBottom:50,
        backgroundColor: 'white', 
        width:120,
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
      annulla: {
    
        marginTop:15,
        marginBottom:50,
        backgroundColor: 'white', 
        width:100,
        marginStart:20,
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
      autenticatiText: {
        fontFamily: LIGHT,
        textAlign:'center',
        fontSize: 20,
        color: BLU_PRIMARIO, 
      },
      annullaText:{
        fontFamily: LIGHT,
        textAlign:'center',
        fontSize: 20,
        color: GRIGIO_PRIMARIO,
      },
      lineContainer:{
        width:'100%',
        marginVertical:10
      },
      line: {
        height: 2, // Altezza della riga
        width:'85%',
        backgroundColor: GRIGIO_SECONDARIO, // Colore della riga
      },
      containerOver:{
        width:'70%',
        justifyContent:'center',
        alignItems:'center',
        
      },
      errorText:{
        fontFamily:LIGHT,
        fontSize:20,
        textAlign:'left',
        paddingEnd:10,
        width:'100%',
    
      },
      errorTextTitle:{
        fontFamily:SEMIBOLD,
        fontSize:25,
        
        textAlign:'left',
        width:'100%',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column'
      },
      overlayContentOver: {
        width: 70,
        height: 70,
      },
});

export default Modal;
