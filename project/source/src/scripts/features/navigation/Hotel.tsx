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


import React, { useState,useEffect } from 'react';
import { View,StyleSheet, Text,ImageBackground ,Image,TouchableOpacity,ScrollView} from 'react-native';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Modal from '../../layouts/Modal';


//constants
import {BG01,_IMG03,_IMG04,_IMG05,IMG22,IMG21,_IMG06,_IMG15,_IMG36,_IMG10, _IMG35,IMG35,IMG36,IMG37,_IMG37, IMG24, IMG29,IMG57, IMG23,IMG28,IMG25, IMG30,IMG26,IMG31,IMG40,IMG41, IMG51,IMG52,IMG53,IMG54,IMG55,IMG56,GLITCH} from '../../constants/images'; 
import {ROOMS,HOME,AUTH,BOOKS,HOTEL} from '../../constants/screens';
import {ACT01,ACT02,ACT03,ACT04,ACT05,_ACT01,_ACT02,_ACT03,_ACT04,_ACT05,ACTS,ACTSNAME} from '../../constants/activities';
import {BLU_PRIMARIO,GRIGIO_PRIMARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';

const Hotels = (
  { 
    idAlbergo,
    setIdAlbergo,
    setShowScreen,
    globalId,
    setIdServizio,
    showScreen,
    albergo,
    setAlbergo
  }: {
    idAlbergo: number,
    setIdAlbergo:React.Dispatch<React.SetStateAction<number>>,
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,
    setIdServizio: React.Dispatch<React.SetStateAction<number>>,
    globalId: string,
    showScreen: number,
    albergo: {
      nome: string,
      voto: number,
      contatto: string,
      posizione: string,
      orario: string,
      descrizione: string,
      immagine: string,
      id: number,
      social: number[],
      attivita: number[],
      stanze: {
        nome: string,
        costo: number,
        immagine: string
      }[]
    },
    setAlbergo: React.Dispatch<React.SetStateAction<{
      nome: string,
      voto: number,
      contatto: string,
      posizione: string,
      orario: string,
      descrizione: string,
      immagine: string,
      id: number,
      social: number[],
      attivita: number[],
      stanze: {
        nome: string,
        costo: number,
        immagine: string
      }[]
    }>>
  }) => {
    

    
    const [errorType,setErrorType] = useState(0); 
    const [showOverlay,setShowOverlay] = useState(false)
    const [selectedBox, setSelectedBox] = useState(0); 
    const imagePaths = [
        { click: true, index: HOME, path: _IMG10  },
        { click: true, index: globalId == '' ? AUTH : 3, path: _IMG03 },
        { click: false, index: HOTEL, path: _IMG15 } ,
        { click: true, index: BOOKS, path:  _IMG06  },
      ];

    useEffect(() => {
        fetchHotel();
    }, [idAlbergo]);
  
    const handleImagePress = (index: number) => {
      if(index == BOOKS && globalId==''){
        setShowOverlay(true)
      }else{
        setShowScreen(index);
      }
    };
    const handleAttivita = (index: string) => {
      setIdServizio(+index)
      setShowScreen(ROOMS)
    };

    const handleBoxPress = (numberBox:number) => {
      if(numberBox != 0 && selectedBox == numberBox){
          setSelectedBox(0);
      }else{
          setSelectedBox(numberBox);
      }
    };
    
    const fetchHotel = async () => {
      try {
          const url = `${SERVER_URL}type=hotel&method=getHotelDataApp&idHotel=${idAlbergo}`;
          const response = await fetch(url);
          const data = await response.json();
          const hotel = data[0];

          const transformedData = {
            nome: hotel.nome,
            voto: 3, 
            contatto: '0736 893443', 
            posizione: 'Via Flavia, 3b, 00187 Roma RM', 
            orario: '8:00 - 00:00 lun-dom',
            descrizione: hotel.descrizione,
            immagine: hotel.immagine,
            id: parseInt(hotel.id, 10),
            social: [_IMG35, _IMG36, _IMG37],
            attivita: [ACT01, ACT02, ACT03],
            stanze: hotel.nome_stanza.split(',').map((nomeStanza: string, index: number) => ({
                nome: nomeStanza,
                immagine: hotel.immagine_stanza.split(',')[index] || hotel.immagine_stanza.split(',')[0],
                costo: parseFloat(hotel.costo)
            }))
           
        };

        setAlbergo(transformedData)
      } catch (error) {
          console.error('Error fetching hotel:', error);
      }
  };


      return (
        <ImageBackground
          source={BG01}
          style={styles.background}
          resizeMode="cover"
        >
          <Header isHome={showScreen} title={albergo.nome} image={_IMG03} />

    <View style={styles.container}>
            <View style={styles.overlayContent}>
            
                {
                    selectedBox == 0 ?
                    <View style={styles.shadowBody}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                  
                        <View style={styles.imageContainerGroup}>
                            <View  style={styles.imageContainer}>
                                <ImageBackground source={{uri:albergo.immagine}} style={styles.overlayContentBody}>
                                </ImageBackground>
                            </View>
                                {albergo.stanze.map((stanza, i) => (
                                     <View key={i+120} style={styles.imageContainer}>
                                        <ImageBackground 
                                            source={{uri:stanza.immagine}}
                                            style={styles.overlayContentBody}>     
                                            <View style={styles.overlayFooter}>
                                                <Text style={styles.styleDesc}>{stanza.nome}</Text>
                                           </View>
                                     </ImageBackground>
                                   </View>
                                ))}
                        </View>



                    </ScrollView>
                  </View>
                : selectedBox == 1 ? <View style={styles.infoContainer}>
                <View style={styles.infoDescContainer}>
                  <Text style={styles.infoDescText}>
                  {albergo.descrizione.length < 70 ? albergo.descrizione : `${albergo.descrizione.substring(0, 67)}...`}
                  </Text>
                </View>
              
                <View style={styles.infoAltroContainer}>
                  <View style={styles.infoAltroRow}>
                          <Image 
                      source={IMG55}
                      style={styles.iconContainer} 
                      
                    />
                    <Text style={styles.infoAltroTextBlue}>
                    {albergo.contatto}
                    </Text>
                  </View>
                  <View style={styles.infoAltroRow}>
                          <Image 
                      source={IMG54}
                      style={styles.iconContainer} 
                    />
                    <Text style={styles.infoAltroTextBlue}>
                   {albergo.posizione}
                    </Text>
                  </View>
                  
                  <View style={styles.infoAltroRow}>
                          <Image 
                      source={IMG53}
                      style={styles.iconContainer} 
                    />
                    <Text style={styles.infoAltroTextGrey}>
                        {albergo.orario}
                    </Text>
                  </View>
                </View>
              
                <View style={styles.infoSocialContainer}>
                {albergo.social.map((social, index) => (
       
              <Image
                key={index+20}
                source={
                    social == _IMG35 ? IMG35
                    :
                    social == _IMG36 ? IMG36
                    : 
                    social == _IMG37 ? IMG37
                    :
                    GLITCH
                } 
                resizeMode="contain"
                style={styles.socialContainer}
              />
          
            ))}
                          
                </View>
              </View>
               :   
               <View style={styles.shadowBody}>

               <View style={{ alignItems: 'center', justifyContent: 'center' }}>

               <ScrollView
                 showsHorizontalScrollIndicator={false}
                 showsVerticalScrollIndicator={false}
               >
                   <Image
                     source={IMG57}
                     resizeMode="contain"
                   />
               </ScrollView>
               </View>
               </View>
                }
           
              <View style={styles.redDiv}>
                <View style={[styles.smallBox, { marginBottom: 25 }]}>
                  <TouchableOpacity onPress={() => handleBoxPress(1)}>
                    <Image 
                      source={selectedBox === 1 ? IMG51 : IMG52}
                      style={styles.centeredImg} 
                      resizeMode="contain"

                    />
                  </TouchableOpacity>
                </View> 
                <View style={styles.smallBox}>
                  <TouchableOpacity onPress={() => handleBoxPress(2)}>
                    <Image 
                      source={selectedBox === 2 ? IMG51 : IMG56}
                      style={styles.centeredImg} 
                      resizeMode="contain"

                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.overlayContentInner}>
            </View>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>

            {ACTS.map((act, i) => {
                const isInStabilimento = albergo.attivita.includes(act);
                return (
                    <TouchableOpacity
                        style={[isInStabilimento ? styles.buttonContainer : styles.buttonDisabled]}
                        key={i+40}
                        disabled={act !== ACT01 || !isInStabilimento}
                        onPress={() => handleAttivita(act.toString())}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{ACTSNAME[act]}</Text>
                        </View>

                    
                            <Image 
                                key={i+60} 
                                source={
                                    isInStabilimento ? 
                                        //stanze attivo
                                        act === ACT01 ? IMG41
                                        :
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
                                        //stanze attivo
                                        act === ACT01 ? IMG40
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
                                style={[styles.iconButtonContainer, { marginLeft: 5 }]}
                                resizeMode="contain"

                            />
                    


                  
                    </TouchableOpacity>
                );
            })}

<TouchableOpacity
                        style={ styles.buttonDisabled}
                   
                        disabled={true}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Recensioni</Text>
                        </View>

                    
                          <View style={[styles.iconContainerVoto, { marginLeft: 5 }]}>

                        {[...Array(5).keys()].map((idx) => (
                                                <React.Fragment key={idx + 100}>
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
                    </TouchableOpacity>







   </ScrollView>

          </View>

















          <Footer imagePaths={imagePaths} onPressImage={handleImagePress} />


          {showOverlay && ( <Modal errorType={errorType}  showScreen={showScreen}  setShowOverlay={setShowOverlay} setShowScreen={setShowScreen}/>)}

        </ImageBackground>
      );
    };
    
    
    const styles = StyleSheet.create({
      image: {
        width: 30,
        height: 30,
      },  
      buttonDisabled:{
        width: '100%',
        height: 53,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
 
        marginBottom:12,
        elevation: 5,
      },
      imageContainerGroup: {
        flexDirection: 'row',
      },
      imageContainer: {
        marginRight: 20,
      },
      overlayFooter: {
        position: 'absolute',

        width: '100%',
        height: 34,
        backgroundColor: 'white',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    
      },
      styleDesc: {
        fontFamily: 'Nunito-Semibold',
        fontSize: 15,
        color: GRIGIO_PRIMARIO,
        
        marginLeft: 15,
      },
        buttonContainer: {
          width: '100%',
          height: 53,
          backgroundColor: '#FFFFFF',
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          marginBottom:12,
          elevation: 5,
        },
        textContainer: {
          justifyContent: 'center',
          flex: 1,
          paddingLeft: 10,
        },
        text: {
          fontFamily: 'Nunito-Light',
          fontSize: 17,
          color: GRIGIO_PRIMARIO,
        },
        iconButtonContainer: {
          justifyContent: 'center',
          alignItems: 'center', 
          width: 40,
          height: 40,
          marginRight: 10,
        },
        iconContainerVoto: {
          flexDirection: 'row',
          marginRight:10
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
      overlayContentBody: {
        width: 370, 
        position: 'relative',

        height: '100%',
        resizeMode: 'cover',
      },
      infoContainer: {
        width: '93%',
        height: '90%',
        justifyContent: 'space-between', 

      },
      
      infoDescContainer: {
        width: '90%',
        alignItems: 'flex-start', 
      },
      
      infoDescText: {
        fontFamily: 'nunito-light',
        fontSize: 17,
        color: GRIGIO_PRIMARIO,
        textAlign: 'left',
        
      },
      
      infoAltroContainer: {

      },
      
      infoAltroRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      
      infoAltroTextBlue: {
        fontFamily: 'nunito-light',
        fontSize: 17,
        color: BLU_PRIMARIO,
      },
      
      infoAltroTextGrey: {
        fontFamily: 'nunito-light',
        fontSize: 17,
        color: GRIGIO_PRIMARIO,
      },
      
      infoSocialContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end', 
    },
      
      iconContainer: {
        width: 25,
        height: 25,
        marginRight: 10,
        marginTop: 5,
      },
      socialContainer: {
        width: 35,
        height: 35,
        marginRight: 10,
      },
      
      overlayContentInner: {
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.7,
        width: '100%',
        height: 230,
        zIndex: -1,
      },
      shadowBody: {
        position: 'relative', 
        width: '97%',
        height: '93%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        elevation: 4,
        alignSelf: 'center',
      },
      overlayContent: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 5,
        width: '100%',
        height: 230,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        width: '93%',
        height: '68%',
        marginTop: 85,
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
    });
    
export default Hotels;
