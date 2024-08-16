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
 * @package src.scripts.features.navigation
 * @author Vittorio Piotti
 * @class Home.tsx
 * @description Schermata principale con lista degli alberghi
*/

//native
import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView,TouchableOpacity } from 'react-native';

//constants
import {_IMG16,_IMG03,_IMG06,_IMG15,IMG51,IMG41,IMG52,_IMG10,BG01,_IMG23, _IMG28,_IMG24,_IMG25,_IMG26,_IMG30,_IMG35,_IMG36,_IMG37,_IMG31,_IMG29} from '../../constants/images'; 
import {LIGHT,REGULAR,SEMIBOLD} from '../../constants/fonts'; 
import {BOOKS,HOME,AUTH,SETTINGS, HOTEL,ROOM} from '../../constants/screens';
import {_ACT01,_ACT02,_ACT03,_ACT04,_ACT05, } from '../../constants/activities';
import {VERDE_PRIMARIO,BLU_PRIMARIO,GRIGIO_PRIMARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Modal from '../../layouts/Modal';


const Rooms: React.FC<{
  setShowScreen: React.Dispatch<React.SetStateAction<number>>;
  showScreen: number;
  idAlbergo: number;
  setIdAlbergo: React.Dispatch<React.SetStateAction<number>>;
  setNomeStanza: React.Dispatch<React.SetStateAction<string>>;
  globalId: string;
  albergo: {
    nome: string;
    id: number;
    stanze: {
      id: number;
      nome: string;
      costo: number;
      descrizione: string;
      immagine: string;
    }[];
  };
  setAlbergo: React.Dispatch<
    React.SetStateAction<{
      nome: string;
      id: number;
      stanze: {
        id: number;
        nome: string;
        costo: number;
        descrizione: string;
        immagine: string;
      }[];
    }>
  >;
}> = ({
  setShowScreen,
  showScreen,
  idAlbergo,
  setIdAlbergo,
  setNomeStanza,
  globalId,
  albergo,
  setAlbergo,
}) => {

  const [errorType,setErrorType] = useState(0); 
  const [selectedBoxes, setSelectedBoxes] = useState<boolean[]>(Array(albergo.stanze.length).fill(false));
  const [showOverlay,setShowOverlay] = useState(false)
  const imageFooterPaths = [
    { click: true, index: HOTEL, path: _IMG10  },
    { click: true, index: globalId == '' ? AUTH : SETTINGS,path:   _IMG03 },
    { click: false, index: HOME, path:  _IMG15  },
    { click: true, index: BOOKS, path:  _IMG06  },
  ];
  
    
    useEffect(() => {
        fetchHotel();
    }, [idAlbergo]);

    const handleBoxPress = (index: number) => {
        setSelectedBoxes(prevState => {
          const newSelectedBoxes = [...prevState];
          if (!newSelectedBoxes[index]){
            const newSelectedBoxes = Array(albergo.stanze.length).fill(false); 
            newSelectedBoxes[index] = !newSelectedBoxes[index];

            return newSelectedBoxes;
          }
          newSelectedBoxes[index] = !newSelectedBoxes[index];
          return newSelectedBoxes;
        });
      };

    const handleImagePress = (index: number) => {
      if(index == BOOKS && globalId==''){
        setErrorType(0)
        setShowOverlay(true)
      }else{
        setShowScreen(index);
      }
    };

    const handleOverlayPress = (idStabilimento: string,nomeStanza:string) => {
      setNomeStanza(nomeStanza)
      if (globalId != ''){
        setIdAlbergo(+idStabilimento)
        setShowScreen(ROOM);
      }else{
        setErrorType(1)
        setShowOverlay(true)
      }
    };

    const fetchHotel = async () => {
      try {
          const url = `${SERVER_URL}type=room&method=getHotelRoomsDataApp&idHotel=${idAlbergo}`;
          const response = await fetch(url);
          const data = await response.json();
          const hotel = data[0]; 
  
          const transformedData = {
              nome: hotel.nome,
              id: parseInt(hotel.id, 10),
              stanze: hotel.nome_stanza.split(',').map((nomeStanza: string, index: number) => ({
                  id: index, 
                  nome: nomeStanza,
                  immagine: hotel.immagine_stanza.split(',')[index] || hotel.immagine_stanza.split(',')[0],
                  costo: hotel.costo_stanza.split(',')[index] || '', 
                  descrizione: hotel.descrizione
              }))
          };
  
     
          setAlbergo(transformedData);
      } catch (error) {
          console.error('Error fetching hotel:', error);
      }
  };




    return (
        <ImageBackground source={BG01 } style={styles.background} resizeMode="cover">
            <Header isHome={showScreen} title={albergo.nome} image={_IMG16} />
            <View style={styles.container}>
            <View
                        style={ styles.buttonDisabled}
                   
            
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Prenota Stanze</Text>
                        </View>

                    
                            <Image 
                            
                                source={IMG41} 
                                style={[styles.iconButtonContainer, { marginLeft: 5 }]}
                                resizeMode="contain"

                            />
                    


                  
                    </View>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {albergo.stanze.map((stanza, i) => (

                  <TouchableOpacity onPress={() => handleOverlayPress(albergo.id.toString(),stanza.nome)}>

                        <View key={stanza.id}>
                            
                            <View style={styles.overlayContent}>
                                <View style={styles.overlayHeader}>
                                <View style={styles.overlayHeaderLeft}>

                                            <Text style={styles.headerTextLeft}>
                                                {stanza.nome}
                                            </Text>
                                            </View>
                                            <View style={styles.containerCosto}>

                                            <View style={styles.overlayHeaderRight}>
                                            <Text style={styles.headerTextRight}>
                                                {stanza.costo}
                                            </Text>
                                            <Text style={styles.headerTextRightNd}>
                                                €/gg
                                            </Text>
                                            </View>
                                            </View>

                                </View>
                                {
                                    !selectedBoxes[i] ? 
                                <View style={styles.shadowBody}>
                                    

                                                
                                                    <View key={i + 20} >
                                                    <ImageBackground source={{uri:stanza.immagine}} style={styles.imageContainerGroup}>
                                                           
                                                           </ImageBackground>
                                                    </View>

                                          
                                </View>
                                :

                                <View style={styles.outerContainerDescrizione}>

                                <View style={styles.infoContainer}>
                                    <Text style={styles.textInfo}>

                                    {stanza.descrizione.length < 220 ? stanza.descrizione : `${stanza.descrizione.substring(0, 180)}...`}


                                    </Text>
                                </View>
                                <View style={styles.overlayContentInnerDesc}></View>

                                </View>

}
                                <View style={styles.redDiv}>
                <View style={styles.smallBox}>
                  <TouchableOpacity onPress={() => handleBoxPress(i)}>
                    <Image 
                      source={selectedBoxes[i]  ? IMG51 : IMG52 }
                      style={styles.centeredImg} 
                      resizeMode="contain"

                    />
                  </TouchableOpacity>
                </View> 
                
              </View>
                            </View>
                            <View style={styles.overlayContentInner}></View>
                        </View>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
                
            </View>
            <Footer imagePaths={imageFooterPaths} onPressImage={handleImagePress} />


            {showOverlay && ( <Modal errorType={errorType} showScreen={showScreen}  setShowOverlay={setShowOverlay} setShowScreen={setShowScreen}/>)}
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
  
    containerCosto:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: LIGHT,
        fontSize: 20,
        color: GRIGIO_PRIMARIO,
      },
    iconButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginRight: 10,
      },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 10,
      },
        buttonDisabled:{
          width: '100%',
          height: 53,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom:10,
          elevation: 5,
        },
    textInfo:{
        fontSize: 17,
        marginLeft:10,
        width:'90%',
        fontFamily:LIGHT
    },
    infoContainer: {
        width: '93%',
        height: '90%',
        justifyContent: 'space-between', 
        marginTop:10,
   

      },
    redDiv: {
        position: 'absolute',
        width: 50, 
        height: '100%', 
        top: 0, 
        right: 0,
        justifyContent: 'center', 

      },
      smallBox: {
        width: 55,
        height: 47,
        backgroundColor: 'white',
        borderTopLeftRadius: 100, 
        borderBottomLeftRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',

      },
      centeredImg:{
        width: 35,
        height: 35,
      },
  image: {
    width: 23,
    height: 23,
  },  
  textBody: {
    fontSize: 17,
    fontFamily: LIGHT,
    color: GRIGIO_PRIMARIO,
  },
  backgroundTextBodySecond: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 5,
    borderRadius: 7,

  },
  overlayHeaderLeft: {
    flex: 1, 
    justifyContent: 'center',
  
  },
  overlayHeaderRight: {
    backgroundColor: BLU_PRIMARIO,
    borderRadius: 7,
    height: '70%', 
    marginRight: 15,    
    flexDirection: 'row',
    
    
  },
  footerElementFirst:{
    width:'40%',
    height:'100%',


  },
  innerFooterElementFirst:{ 
    marginLeft: 10,    
    height:'100%',
    flexDirection: 'row',
    alignItems: 'center',
},
innerFooterElementThird:{ 
  marginRight: 15,    
  height:'100%',

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
},
stanza:{
    fontFamily: REGULAR,

},
  footerElementSecond:{
    width:'20%',
    height:'100%',
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerElementThird: {
    width: '40%',
    height: '100%',
  },
  
  subHeaderText: {
    fontFamily: LIGHT,
    fontSize: 20,
    color: '#7F7F7F',
    marginLeft: 'auto',
    marginRight: 20,
  },
  headerTextLeft: {
    fontFamily: REGULAR,
    fontSize: 25,
    color: VERDE_PRIMARIO,
    marginLeft: 20,

  },
  headerTextRight:{
    fontFamily: LIGHT,
    fontSize: 22,
    textAlign:'center',

    marginRight: 'auto',
    paddingLeft:10,
    color:'white'
      
  },
  headerTextRightNd:{
    fontFamily: REGULAR,
    fontSize: 15,
    textAlign:'center',
    marginRight: 'auto',
    paddingRight:10,
    paddingLeft:5,
    color:'white',
    
  },
  styleDesc: {
    fontFamily: SEMIBOLD,
    fontSize: 15,
    color: GRIGIO_PRIMARIO,
    marginLeft: 15,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  container: {

    width: '93%',
    height: '68%',
    marginTop: 85,
  },
  overlayContentInner: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.7,
    width: '100%',
    height: 235,
    zIndex: -1,
  },
  overlayContentInnerDesc: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.7,
    width: '100%',
    height:'100%',
    zIndex: -1,
  },
  overlayFooter: {
    width: '100%',
    height: 34,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',

  },
  overlayHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '97%',
 

    height: 42,
    zIndex: 2,
  },
  overlayContent: {
    marginBottom:20,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
    
    width: '100%',
    height: 235,
    justifyContent:'center',
    alignItems: 'center',
  },
  imageContainerGroup: {
    flexDirection: 'row',

    height: '100%',
    width: '100%',
   margin:'auto',
   resizeMode: 'cover',
  },

  overlayContentBody: {
    width: 370, 
    height: '100%',
    resizeMode: 'cover',
  },
shadowBody: {
  width: '97%',
  height: 170,


  alignSelf: 'center',
  },
  outerContainerDescrizione: {
    width: '97%',
    height: 170,
    alignSelf: 'center',
    borderTopWidth: 0, 

    borderWidth: 5, 
    borderColor: 'white', 
  },
});

export default Rooms;
