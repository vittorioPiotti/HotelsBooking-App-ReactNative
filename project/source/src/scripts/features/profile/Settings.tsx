/**
 * @access public
 * @package src.scripts.features.profile
 * @author Vittorio Piotti
 * @class Settings.tsx
 * @description Schermata con le impostazioni dell'account
*/

//native
import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity,Image,ScrollView } from 'react-native';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

//costants
import {BG07,IMG11,IMG12,_IMG03,_IMG04,_IMG05,_IMG06} from '../../constants/images'; 
import {HOME,AUTH,BOOKS,PROFILE,PREVIEW} from '../../constants/screens';
import {REGULAR,LIGHT } from '../../constants/fonts';
import {VERDE_SECONDARIO,ROSSO,BLU_PRIMARIO,BLU_SECONDARIO,GRIGIO_PRIMARIO,GRIGIO_SECONDARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';





const Settings = (
  { 
    setShowScreen,
    showScreen,
    globalId ,
    setGlobalId,
  }: { 
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,
    showScreen:number,
    globalId: string,
    setGlobalId: (id: string) => void,
  }) => {

  const [stateModal,setStateModal] = useState(1)
  const [clientEmail,setClientEmail] = useState('')
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSuccess,setIiSuccess] = useState(false);
  const imagePaths = [
    { click:false,index: AUTH, path: _IMG04},
    { click:true,index: HOME, path: _IMG05 },
    {click:true,index: BOOKS, path: _IMG06 },
  ];
  const MODALS = [
    {
      title: "Elimina Profilo",
      subtitle: "Tutti i dati associati al profilo verrano eliminati",
      desc: "L'eliminazione dei dati è  ",
      mark: "irreversibile",
      btn: "Elimina"
    },
    {
      title: "Richiesta di Assistenza",
      subtitle: "Verrà inviato il link per accedere al servizio alla propria email",
      desc: "Conferma invio richiesta di ",
      mark: "assistenza",
      btn: "Richiedi"
    },
  ]

  useEffect(()=>{
    fetchEmail()
  },[globalId])




  const informazioniProfilo = () => {
    setShowScreen(PROFILE);
  };



  const disconnettiProfilo = () => {
    setGlobalId('');
    setShowScreen(PREVIEW);
    setTimeout(() => {
      setShowScreen(HOME);
    }, 2000);
  };
  const eseguiRichiesta =()=>{
    setIiSuccess(false);
    setIsDeleted(true);

    setTimeout(() => {

      setIsDeleted(false);
    }, 2000);

  }

  const annullaElimina = () =>{
    setShowOverlay(false)

  }
  const eliminaProfilo = () => {
    setStateModal(0)
    setShowOverlay(true)
  };
  const richiediAssistenza = () =>{
    setStateModal(1)
    setShowOverlay(true)
  }

  const handleImagePress = (index: number) => {
    setShowScreen(index);

  };

  const fetchEmail = async () => {
    try {
      const url = `${SERVER_URL}type=auth&method=getClientEmail&idClient=${globalId}`;
      const response = await fetch(url);
      const data = await response.json();
      setClientEmail(data.email)
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  
  const eseguiElimina  = async () => {
    const url = `${SERVER_URL}type=auth&method=delete&authState=client`;
    const requestBody = new URLSearchParams();
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
      setIiSuccess(data.delete);
      setIsDeleted(true);
      setTimeout(() => {
        setTimeout(() => {
          setIsDeleted(false);
        }, 2000);
      if (data.delete == true) {
        setGlobalId('')
        setShowScreen(PREVIEW);
        setTimeout(() => {
          setShowScreen(HOME);
        }, 2000);
      }
    }, 2000);
    } catch (error) {
      setIiSuccess(false);
    }
  };



  return (
    <ImageBackground
      source={BG07}
      style={styles.background}
      resizeMode="cover"
    >
      <Header isHome={showScreen} title={'Profilo'} image={_IMG03} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Impostazioni</Text>

          <Text style={styles.textDescFs}>Sei autenticato come:</Text>
          <Text style={styles.textDescNd}>{clientEmail}</Text>
        </View>
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>

        <View style={styles.innerContainer}>

          <TouchableOpacity style={styles.shadowContainer} onPress={informazioniProfilo}>
            <View style={styles.divider}>
              <Text style={[styles.text, styles.colorTextGray]}>Informazioni Profilo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.shadowContainer]} disabled>
            <View style={[styles.divider]}>
              <Text style={[styles.text, styles.colorTextGray]}>Privacy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.shadowContainer]}  onPress={richiediAssistenza}>
            <View style={[styles.divider]}>
              <Text style={[styles.text, styles.colorTextGray]}>Assistenza</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shadowContainer} onPress={disconnettiProfilo}>
            <View style={styles.divider}>
              <Text style={[styles.text, styles.colorTextBlue]}>Disconnetti Profilo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shadowContainer} onPress={eliminaProfilo}>
            <View style={styles.divider}>
              <Text style={[styles.text, styles.colorTextRed]}>Elimina Profilo</Text>
            </View>
          </TouchableOpacity>
   

        </View>
        </ScrollView>

      </View>
      <Footer imagePaths={imagePaths} onPressImage={handleImagePress} />









      {showOverlay && (
        <View style={styles.overlay}>
        <View style={styles.overlayContent}>
        <View style={[styles.overlayContentHeader, { backgroundColor: stateModal == 0 ? ROSSO : BLU_SECONDARIO }]}>
  <Text style={styles.headerText}>{MODALS[stateModal].title}</Text>
</View>
<View style={styles.overlayContentBody}>
  <View style={styles.textBodyContainer}>
    <View style={styles.textContainerBodyFs}>
      <View style={styles.backgroundTextBodyFirst}>
      <Text style={[styles.textBody]}>{MODALS[stateModal].subtitle}</Text>
      </View>
     

    </View>
    <View style={styles.textContainerBody}>
    <Text style={[styles.textBody]}>{MODALS[stateModal].desc}</Text>

      <View style={styles.backgroundTextBodySecond}>
      <Text style={[styles.textBody]}>{MODALS[stateModal].mark}</Text>

      </View>
     

    </View>

  </View>
</View>


            <View style={styles.overlayContentFooter}>

                <TouchableOpacity
                style={styles.button}
                onPress={annullaElimina}
                >
                <Text style={[styles.buttonText, {  color: stateModal == 0 ?BLU_PRIMARIO : GRIGIO_PRIMARIO }]}>Annulla</Text>
                </TouchableOpacity>
                

                <TouchableOpacity
                style={styles.button}
                onPress={stateModal == 0 ? eseguiElimina : eseguiRichiesta}
                >
                <Text  style={[styles.buttonText, { color: stateModal == 0 ?ROSSO : VERDE_SECONDARIO}] } >{MODALS[stateModal].btn}</Text>
                </TouchableOpacity>


            </View>
        </View>


          <View style={styles.overlayContentInner}></View>
          {isDeleted ? <View style={styles.overlayContentInnerOutput}>
          <Image
            source={isSuccess ? IMG12 : IMG11}
            style={styles.imageContent}
          />
          </View> : null}
        </View>
      )}










    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  textDescFs:{
    marginTop:10,
    fontSize:20,
    fontFamily:LIGHT,
    color:'white'
  },
  textDescNd:{
    fontSize:20,
    fontFamily:REGULAR,
    color:'white'
  },
    inputDisabled: {
        backgroundColor: '#f0f0f0', // Colore invertito
      },
    imageContent: {
        width: 90,
        height: 90,
      },
    input: {
        width: 296,
        height: 53,
        paddingLeft: 15,
        marginTop: 15,
        fontFamily: 'Nunito-Light',
        fontSize: 17,
        borderColor:GRIGIO_SECONDARIO,
        borderWidth:1,
        color: GRIGIO_PRIMARIO,
      },
      inputEnabled: {
        backgroundColor: 'white',
      },
    textBodyContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop:3,
 
      },
      textContainerBodyFs: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      textContainerBody: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      textBody: {
        fontSize: 17,
        fontFamily: "Nunito-light",
        color: GRIGIO_PRIMARIO,
      },
      backgroundTextBodySecond: {
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 5,
        borderRadius: 7,

      },
    backgroundTextBodyFirst: {
        width: '100%',
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 5,
        borderRadius: 7,

      },
      
    button: {
        width: 105,
        height: 44,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        elevation: 8,
    

      }, 
       buttonText: {
        fontFamily: 'Nunito-Light',
        fontSize: 20,

        
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
  innerContainer: {

    
  },
  titleContainer: {
    marginTop:90,

    paddingBottom:20,
    width: '100%',
    alignItems: 'flex-start',
  
  },
  title: {
    fontFamily: 'Nunito-Medium',
    color: 'white',
    fontSize: 40,
  },
  colorTextGray: {
    color: GRIGIO_PRIMARIO,
  },
  colorTextBlue: {
    color: BLU_PRIMARIO,
  },
  colorTextRed: {
    color: ROSSO,
  },
  containerDisabled:{
    backgroundColor: 'white',

  },

  shadowContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 8,
    borderRadius: 10,
    marginTop: 20,
  },
  divider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 296,
    height: 53,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: 'Nunito-Light',
    fontSize: 17,
    lineHeight: 53,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:1,
  },
  overlayContentInnerOutput: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.9,
    width: '93%',
    height: 275,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayContentInner: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.7,
    width: '93%',
    height: 275,
    zIndex: -1,
    
  },
overlayContent: {
  backgroundColor: 'transparent',
  borderColor: 'white',
  borderWidth: 5,

  width: '93%',
  height:275,
  alignItems: 'flex-start', 
},

headerText: {
    fontFamily: 'Nunito-Regular',

    fontSize: 25,
    height:59,
    color: 'white',
    textAlign: 'left',
    marginLeft: 20,
    lineHeight: 59, 
},
  overlayContentHeader: {
    marginTop: 5,
    height: 59,
    width: "97%",
  
    alignSelf: 'center', 
    
  },
  
overlayContentBody: {
  width: "97%",
  height: 140,
  backgroundColor: 'white',
  justifyContent:'center',
  alignSelf: 'center', 
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
},
overlayContentFooter:{
    marginTop: 0,
    height: 55,
    width: "97%",
    alignSelf: 'center', 
    flexDirection: 'row', 
    alignItems:'center',
}

  
});

export default Settings;
