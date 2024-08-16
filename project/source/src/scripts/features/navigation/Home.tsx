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
import React, {useEffect,useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView,TouchableOpacity } from 'react-native';

//constants
import {_IMG16,_IMG03,_IMG06,_IMG15,BG01,_IMG23, _IMG28,_IMG24,_IMG25,_IMG26,_IMG30,_IMG31,_IMG29,IMG21,IMG22,IMG23, IMG28, IMG24, IMG29, IMG25, IMG30,IMG26,IMG31,GLITCH} from '../../constants/images'; 
import {LIGHT,REGULAR,SEMIBOLD} from '../../constants/fonts'; 
import {BOOKS,HOME,AUTH,SETTINGS,HOTEL} from '../../constants/screens';
import {ACT01,ACT02,ACT03,ACT04,ACT05,_ACT01,_ACT02,_ACT03,_ACT04,_ACT05,ACTS,} from '../../constants/activities';
import {VERDE_PRIMARIO,MARRONE,GRIGIO_PRIMARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Modal from '../../layouts/Modal';


const Home = ({
    alberghi,
    setAlberghi,
    setShowScreen,
    showScreen,
    setIdAlbergo,
    globalId,
  
  }: {
    alberghi: {
      nome: string;
      voto: number;
      costo: number;
      immagine: string;
      id: number;
      attivita: number[];
      stanze: {
        nome: string;
        immagine: string;
      }[];
    }[];
    
    setAlberghi: React.Dispatch<React.SetStateAction<{
      nome: string;
      voto: number;
      costo: number;
      immagine: string;
      id: number;
      attivita: number[];
      stanze: {
        nome: string;
        immagine: string;
      }[];
    }[]>>;
    setShowScreen: React.Dispatch<React.SetStateAction<number>>;
    showScreen: number;
    setIdAlbergo: React.Dispatch<React.SetStateAction<number>>;
    globalId: string;
  
  }) => {

    const [errorType,setErrorType] = useState(0); 
    const [showOverlay,setShowOverlay] = useState(false)
    const imageFooterPaths = [
        { click: true, index: globalId == '' ? AUTH : SETTINGS,path:   _IMG03 },
        { click: false, index: HOME, path:  _IMG15  },
        { click: true, index: BOOKS, path:  _IMG06  },
    ];

    useEffect(() => {
        if(alberghi.length == 0){
            fetchHotels();
        }
    }, []);

    const handleImagePress = (index: number) => {
        if(index == BOOKS && globalId==''){
          setShowOverlay(true)
        }else{
          setShowScreen(index);
        }
      };

    const handleOverlayPress = (idStabilimento: string) => {
        setIdAlbergo(+idStabilimento)
        setShowScreen(HOTEL);
    };

    const fetchHotels = async () => {
        try {
          const url = `${SERVER_URL}type=hotel&method=getHotelsDataApp`;
          const response = await fetch(url);
          const data = await response.json();
            const transformedData = data.map((hotel: { nome: any; costo: string; immagine: any; id: string; nome_stanza: string; immagine_stanza: string; }) => ({
            nome: hotel.nome,
            voto: 3, 
            costo: parseFloat(hotel.costo),
            immagine: hotel.immagine,
            id: parseInt(hotel.id, 10),
            attivita: [ACT02,ACT03],
            stanze: hotel.nome_stanza.split(',').map((nomeStanza, index) => ({
              nome: nomeStanza,
              immagine: hotel.immagine_stanza.split(',')[index] || hotel.immagine_stanza.split(',')[0]
            }))
          }));
          setAlberghi(transformedData);
        } catch (error) {
          console.error('Error fetching hotels:', error);
        }
      };
      



    return (
        <ImageBackground source={BG01 } style={styles.background} resizeMode="cover">
            <Header isHome={showScreen} title={''} image={_IMG16} />
            <View style={styles.container}>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    {alberghi.map((albergo, index) => (
                        <View key={albergo.id}>
                            <View style={styles.overlayContent}>
                                <View style={styles.overlayHeader}>
                                    {albergo.nome && albergo.nome.includes(" ") && (
                                        <>
                                            <Text style={[styles.nomeFs,styles.headerText]}>
                                                {albergo.nome.split(" ")[0] + " "}
                                            </Text>
                                            
                                            <Text style={[styles.nomeNd,styles.headerText]}>
                                                {albergo.nome.split(" ").slice(1).join(" ")}
                                            </Text>
                                        </>
                                    )}                                
                                </View>
                                <View style={styles.shadowBody}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <TouchableOpacity onPress={() => handleOverlayPress(albergo.id.toString())}>
                                            <View style={styles.imageContainerGroup}>
                                                <View key={albergo.id} style={styles.imageContainer}>
                                                    <ImageBackground source={{uri:albergo.immagine}} style={styles.overlayContentBody}>
                                                        <View style={styles.overlayFooter}>
                                                            <View style={styles.footerElementFirst}>
                                                                <View style={styles.innerFooterElementFirst}>
                                                                    {[...Array(5).keys()].map((idx) => (
                                                                    <React.Fragment key={idx}>
                                                                        {idx + 1 <= albergo.voto ? (
                                                                        <Image
                                                                        source={IMG22}

                                                                            style={[styles.image, { marginRight: 1 }]}
                                                                        />
                                                                        ) : (
                                                                        <Image
                                                                        source={IMG21}
                                                                            style={[styles.image, { marginRight: 1 }]}
                                                                        />
                                                                        )}
                                                                    </React.Fragment>
                                                                    ))}
                                                                </View>
                                                            </View>
                                                            <View style={styles.footerElementSecond}>
                                                                <View style={styles.backgroundTextBodySecond}>
                                                                    <Text style={styles.textBody}>{albergo.costo}€</Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.footerElementThird}>
                                                                <View style={styles.innerFooterElementThird}>  
                                                                    {ACTS.map((act, i) => {
                                                                        if(act != ACT01){//ignora attivita prenotazione camere
                                                                            const isAttivitaPresente = albergo.attivita.includes(act);
                                                                            return (
                                                                                <Image 
                                                                                    key={i} 
                                                                                    source={
                                                                                        isAttivitaPresente ? 
                                                                                            //ristorante attivo
                                                                                            act === ACT02 ? IMG28
                                                                                            :
                                                                                            //bar attivo
                                                                                            act === ACT03 ? IMG29
                                                                                            :
                                                                                            //eventi attivo
                                                                                            act === ACT04 ? IMG30
                                                                                            :
                                                                                            //sport attivo
                                                                                            act === ACT05 ? IMG31
                                                                                            :
                                                                                            //attivita non identificata
                                                                                            GLITCH
                                                                                        : 
                                                                                            //ristorante disattivo
                                                                                            act === ACT02 ? IMG23
                                                                                            :
                                                                                            //bar disattivo
                                                                                            act === ACT03 ? IMG24
                                                                                            :
                                                                                            //eventi disattivo
                                                                                            act === ACT04 ? IMG25
                                                                                            :
                                                                                            //sport disattivo
                                                                                            act === ACT05 ? IMG26
                                                                                            :
                                                                                            //attivita non identificata
                                                                                            GLITCH
                                                                                    } 
                                                                                    style={[styles.image, { marginLeft: 10 }]} 
                                                                                    resizeMode="contain"

                                                                                />
                                                                            );
                                                                        }else{
                                                                            return null;
                                                                        }
                                                                    })}


                                                              
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </ImageBackground>
                                                </View>

                                                {albergo.stanze.map((stanza, i) => (
                                                    <View key={i} style={styles.imageContainer}>
                                                        <ImageBackground source={{uri:stanza.immagine}} style={styles.overlayContentBody}>
                                                            <View style={styles.overlayFooter}>
                                                                <View style={styles.footerElementFirst}>
                                                                    <View style={styles.innerFooterElementFirst}>
                                                                        <Text key={i} style={styles.stanza}>{stanza.nome}</Text>
                                                                 
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </ImageBackground>
                                                    </View>

                                                ))}
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={styles.overlayContentInner}></View>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Footer imagePaths={imageFooterPaths} onPressImage={handleImagePress} />
            {showOverlay && ( <Modal errorType={errorType}  showScreen={showScreen}  setShowOverlay={setShowOverlay} setShowScreen={setShowScreen}/>)}

        </ImageBackground>
    );

};

const styles = StyleSheet.create({
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
  headerText: {
    fontFamily: LIGHT,
    fontSize: 30,
  },
  nomeFs:{
    marginLeft: 20,
    color: VERDE_PRIMARIO,

  },
  nomeNd:{
    color: MARRONE,

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
    height: 230,
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
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 42,
    zIndex: 2,
  },
  overlayContent: {
    marginBottom:20,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
    width: '100%',
    height: 230,
    alignItems: 'flex-start',
  },
  imageContainerGroup: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 20,
  },
  overlayContentBody: {
    width: 370, 
    height: '100%',
    resizeMode: 'cover',
  },
shadowBody: {
  width: '97%',
  height: 170,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  elevation: 4,
  alignSelf: 'center',
  }
});

export default Home;
