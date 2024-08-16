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
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView,TouchableOpacity} from 'react-native';

//constants
import {IMG40,_IMG16,_IMG03,_IMG06,_IMG05,_IMG15,_IMG99,IMG70,IMG41,_IMG10,BG01,_IMG23,IMG12,IMG11, _IMG28,_IMG24,_IMG25,_IMG26,_IMG30,_IMG35,_IMG36,_IMG37,_IMG31,_IMG29,IMG23, IMG28, IMG24, IMG29, IMG25, IMG30,IMG26,IMG31,GLITCH} from '../../constants/images'; 
import {LIGHT,REGULAR,SEMIBOLD,EXTRABOLD} from '../../constants/fonts'; 
import {SIGNIN,HOME,AUTH,SETTINGS} from '../../constants/screens';
import {ACT01,ACT02,ACT03,ACT04,ACT05,_ACT01,_ACT02,_ACT03,_ACT04,_ACT05,ACTS,ACTSNAME} from '../../constants/activities';
import {VERDE_PRIMARIO,MARRONE,ROSSO,BLU_PRIMARIO,BLU_SECONDARIO,GRIGIO_PRIMARIO,GRIGIO_SECONDARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Modal from '../../layouts/Modal';



const Books = (
  { 
    setShowScreen,
    showScreen,
    globalId 
  }: { 
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,
    showScreen:number, 
    globalId: string 
  }) => {

    const [selectBook, setSelectBook] = useState(0);
    const [isClick,setIsClick] = useState(0)
    const [errorType,setErrorType] = useState(2)
    const [showOverlayAuth,setShowOverlayAuth] = useState(false)
    const [isSuccess,setIiSuccess] = useState(false);
    const [isPaied,setIsPaied] = useState(false)
    const  attivita:number[]= [ACT01, ACT02, ACT03];
    const [showOverlayCheckout, setShowOverlayCheckout] = useState(false);
    const imageFooterPaths = [
      { click: true, index: globalId == '' ? AUTH : SETTINGS,path:   _IMG03 },
      { click: true, index: HOME, path:  _IMG05  },
      { click: false, index: SIGNIN, path:  _IMG99  },
    ];
    const [prenotazioni, setPrenotazioni] = useState<{
      hotel: string,
      stanza: string,
      inizio: string, 
      fine: string, 
      importo: number, 
      numero:number,
    }[]>([
      {
        hotel: "Hotel Mario",
        stanza: "stanza 107", 
        inizio: "9/5/2024",
        fine: "10/5/2024", 
        importo:344,
        numero:23,
    },
  ]);

  useEffect(() => {  
    fetchBookings();
  }, []);

    const handleSelect = (index:number) =>{
        setSelectBook(index)
    }

  const handleCheckoutPress = () => {
    setShowOverlayCheckout(!showOverlayCheckout);
  }

  const handleImagePress = (index: number) => {
      setShowScreen(index);
  };

  const handlePayPress = () => {
    setIsPaied(true)
    setIiSuccess(false)
    setTimeout(() => {
      if(isSuccess == true){
        setShowScreen(HOME);
        setTimeout(() => {
          setShowScreen(AUTH);
        }, 2000);
      }else{
        setIsPaied(false)
      }
    }, 2000);
  }

  const isBeforeToday = (dateString:string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte per confrontare solo la data

    return today < date;
  };


  const fetchBookings = async () => {
    try {
      const url = `${SERVER_URL}type=book&method=getBookingsDataApp&clientId=${globalId}`;
      const response = await fetch(url);
      const data = await response.json();
        const transformedData = data.map((book: {

          id: number,
          hotel: string,
          room: string,
          fsDate:string,
          ndDate:string,
          cost:number,
        }) => ({
          hotel: book.hotel,
        stanza: book.room,
        inizio: book.fsDate,
        fine: book.ndDate,
        importo:book.cost,
        numero:book.id
      }));
      setPrenotazioni(transformedData);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  
  
    const Riepilogo =({prenotazione}:{prenotazione:  {
        hotel: string,
        stanza:string, 
        inizio: string,
        fine: string, 
        importo:number,
        numero:number
    }}) =>{
      return (
        <View style={styles.containerCheckoutOver}>
          <View style={styles.containerCheckoutInner}>
            <View style={styles.row}>
              <Text style={styles.leftColumn}>Hotel:</Text>
              <Text style={styles.textAlbergo}>{prenotazione.hotel}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftColumn}>Stanza:</Text>
                <Text style={styles.textStanza}>{prenotazione.stanza}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftColumn}>Prenotazione:</Text>
                <View style={styles.contDate}>
                    <Text style={styles.leftDate}>
                      { 
                        prenotazione.inizio
                      }
                    </Text>
                  <Text style={styles.middleDate}>·</Text>
                  <Text style={styles.rightDate}>
                    { 
                        prenotazione.fine
                    }
                  </Text>
                  <View style={styles.imgContCalendar}>
                    <Image 
                      source={IMG70} 
                      style={[styles.imgCalendar, { marginLeft: 5 }]}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
        
                <View style={styles.row}>
                  <Text style={styles.textCosto}>Importo Prenotazione:</Text>
                    <View style={styles.contCost}>
                      <Text style={styles.textCost}>
                          {prenotazione.importo}€
                      </Text>
                    </View>
                  </View>
                </View>
              </View>  
  
    )
  }



  return (
<ImageBackground source={BG01 } style={styles.background} resizeMode="cover">
        <Header isHome={showScreen} title={"Storico Acquisti"} image={_IMG06} />
          <View style={styles.container}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>

              {ACTS.map((act, i) => {
                  
                  const isInStabilimento = attivita.includes(act);
                  return (

                    isClick != act ?
                      <TouchableOpacity
                          style={[isInStabilimento ? styles.buttonContainer : styles.buttonDisabled]}
                          key={i+400}
                          disabled={act !== ACT01 || !isInStabilimento}
                          onPress={() => {
                            prenotazioni.length != 0 ?

                            setIsClick(act) : setShowOverlayAuth(true)} 
                          
                          }
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
                      :  isClick == ACT01 ? 
                <View>
             <View style={[styles.overlayContentCheckout,{height:isBeforeToday(prenotazioni[selectBook].inizio) ? 380 :335}]}>
             <TouchableOpacity
                  key={i+900}
                  disabled={act !== ACT01 || !isInStabilimento}
                  onPress={() => {setIsClick(-1)}}
              >
             <View style={ styles.buttonDisabled}>
             <View style={styles.textContainer}>
               <Text style={styles.text}>Prenota Stanze</Text>
             </View>
             <Image 
               source={IMG41} 
               style={[styles.iconButtonContainer, { marginLeft: 5 }]}
               resizeMode="contain"
             />
           </View>
           </TouchableOpacity>
           <View></View>
               <View style={styles.containerCheckoutOuter}>
               <View style={styles.innerContainerCheckout}>
               <View style={styles.innerContainerCheckoutUnder}></View>
               <View style={styles.innerContainerCheckoutOver}>
 <ScrollView
   nestedScrollEnabled={true}
   showsHorizontalScrollIndicator={false} 
   horizontal={true} 
 >
{prenotazioni.map((prenotazione, index) => (
 <TouchableOpacity
   key={index}
   style={[styles.square,index == selectBook ? styles.mbSelected  : styles.mbNotSelected] }
   onPress={() => handleSelect(index)}
 >                   
<Image source={IMG41 } style={styles.backgroundContain} resizeMode="contain">
</Image>
<View style={styles.rowOver}>
   <Text style={styles.textRowOver}>N.{prenotazione.numero}</Text>
</View>
 
  </TouchableOpacity>
))}

 </ScrollView>
</View>

               </View>
                 <View style={styles.containerCheckout}>
                     <Riepilogo prenotazione={prenotazioni[selectBook]}/> 

          
                <View style={styles.rowThird}>
                    
                {isBeforeToday(prenotazioni[selectBook].inizio) && (
          <TouchableOpacity
            style={styles.buttonSecond}
            onPress={handleCheckoutPress}>
            <Text style={styles.buttonTextFirst}>Disdici</Text>
          </TouchableOpacity>
        )}
                       </View>
  
                   </View>
                 </View>
               </View>
               <View style={[styles.overlayContentInnerCheckout,{height:isBeforeToday(prenotazioni[selectBook].inizio) ? 380 :335}]}/>
             </View>
             :

             <Text>ciao</Text>
)

})}

</ScrollView>

          </View>

          <Footer imagePaths={imageFooterPaths} onPressImage={handleImagePress} />
         
          {showOverlayCheckout && (
            <View style={styles.overlay}>
              <View style={styles.overlayContentCheckoutSecondOver}>
                <View style={styles.containerOverlayCheckoutOuterOver}>
                  <View style={styles.containerOverlayCheckout}>
                    <View style={styles.containerCheckoutOuterOver}>                   
                      <View style={styles.headerOver}>
                        <Text style={styles.headerText}>Disdici</Text>
                      </View>
                      <View style={styles.contentOverNd}>
                        <View style={styles.contentOverInner}>
                
                         <View style={styles.contentOver}>
                      <Text style={styles.payText}>Rimborso</Text>
                     
              
                  
                      <View style={styles.contCard}>
              <View style={styles.onlyRow}>
           
   
    
              <View style={styles.overlayContentBody}>
  <View style={styles.textBodyContainer}>
    <View style={styles.textContainerBody}>
      <View style={styles.backgroundTextBodyFirst}>
      <Text style={[styles.textBody]}>La richiesta sarà elaborata nei prossimi giorni</Text>
      </View>
     

    </View>
    <View style={styles.textContainerBody}>
    <Text style={[styles.textBody]}>Verificare l'identità e richiedere il </Text>

      <View style={styles.backgroundTextBodySecond}>
      <Text style={[styles.textBody]}>Rimborso</Text>

      </View>
     

    </View>
 


              
  </View>




</View> 
            
              </View>
              </View>
              
              
                     
                  </View>
                     
                
                        </View>
                    </View>
                      <View style={styles.hrOver}/>
    <View style={{height:'40%',justifyContent:'center'}}>
                      <Riepilogo prenotazione={prenotazioni[selectBook]}/> 
                      </View>
                        
                        
                
                      </View>
                    </View>
                  </View>   
                <View style={styles.onlyRow}>    
              <TouchableOpacity
                style={styles.buttonOverlayCheckout}
                onPress={() =>handleCheckoutPress()}
              >
              <Text style={styles.buttonTextSecond}>Annulla</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonOverlayCheckout}
                onPress={() =>handlePayPress()}
              >
              <Text style={styles.buttonTextFirst}>Disdici</Text>
            </TouchableOpacity>
           
        </View>
        <View style={styles.overlayOverlayContentInnerCheckoutOver}/>
        </View>
        {isPaied ? <View style={styles.overlayContentInnerOutput}>
          <Image
            source={isSuccess ? IMG12 : IMG11}
            style={styles.imageContent}
          />
        </View> : null}
      </View>
    )}

{showOverlayAuth && ( <Modal errorType={errorType} showScreen={showScreen} setShowOverlay={setShowOverlayAuth} setShowScreen={setShowScreen}/>)}

    </ImageBackground>
  );

};

const styles = StyleSheet.create({
    rowOver:{
        position:'absolute',
        bottom:0,
        width:'100%',
        height:20,
        backgroundColor:'#EEEEEE',
        textAlign:'center',
        justifyContent:'center',
    },
    textRowOver:{
        fontFamily:SEMIBOLD,
        color:GRIGIO_PRIMARIO,
        textAlign:'center',
        justifyContent:'center',
        fontSize:14
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
    inputEnabled: {
        backgroundColor: 'white',
        width:260,
        
      },
    textBodyContainer: {
        marginLeft: 5,
        marginRight: 5,

 
      },
    overlayContentBody: {
        width: "100%",
        height: 128,
        justifyContent:'center'
  
       
    },
    backgroundTextBodyFirst: {
        width: '100%',
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 5,
        borderRadius: 7,

      },
  inputGenerico:{
    width:'180%',
    height:'100%',
    backgroundColor:'#EEEEEE',
    borderRadius:8,
    fontFamily:REGULAR,
    textAlign:'center'
  },
  outerContainerInputs:{
    marginEnd:15,
  },
  containerInputs:{
    zIndex:-200,alignItems:'flex-end',width:'100%',flexDirection:'row',
  },
  containerNome:{

    width:120,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    
    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40


  },
  containerCognome:{
    width:120,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    
    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40
  },
  containerMeseCarta:{

    width:70,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    
    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40


  },
  textContainerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:10
  
  },
  containerAnnoCarta:{
    width:80,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    
    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40
  },
  containerCodiceCarta:{
    width:75,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40
  },

  labelText:{

      fontFamily:REGULAR,
      textAlign:'left',
      fontSize:14,

      color:GRIGIO_PRIMARIO

  },
  quartettoNumeroCarta:{
      backgroundColor:'#EEEEEE',
      width:'23%',
      height:'100%',
      borderRadius:8,

      textAlign:'center'
  },
  containerTipoCarta:{
    height:50,

  },
  containerNumeroCarta:{
    width:250,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40
    
  },

  imageScroll:{
    width: 20,
    height: 20,
  },
  imgSelect:{
    width: 20,
    height: 20,
    
  },
  imageCard:{
    width: 30,
    height: 30,
    
  },
  imageBack: {
    width: 32,
    height: 32,
    marginStart:10
    
  },
  flexOne:{
    flex:1
  },
  spaceBetween:{
    justifyContent: 'space-between',
  },
  
  buttonOverlayCheckoutBack:{
    borderStartStartRadius:20,
    borderEndStartRadius:20,
    borderWidth:1,
    borderColor:GRIGIO_SECONDARIO,
    width: 60,
    height: 44,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 8,

  },
  containerBtnBack:{
    backgroundColor:'red',
    
  },
  labelInput:{
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    height:20,
   

  },
  selectHeader:{
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    height:20,
    width:50,

  },
  scrollType:{
    height:40,
    width:25,

 

 
    alignItems:'center',
    justifyContent: 'center',
  },
  selectButton: {
    justifyContent: 'center',
    alignItems:'center',
    height:40,
    width:50,

    
  },
  optionsContainer: {
    position: 'absolute',
    alignItems:'center',
    justifyContent: 'center',
    padding:5,

    backgroundColor: 'white',
  
    width:50,
    
   
    zIndex: 1,
  },
  option: {
    marginVertical:5,
    
  },
  onlyRow:{
    flexDirection: 'row',

  },
  inputMeseCarta:{
    width: 70,
  },
  inputAnnoCarta:{
    width: 70,
  },
  inputCodiceCarta:{
    width: 70,
  },
  inputNome:{
    width: 130,
  },
  inpuCognome:{
    width: 130,
  },
  inputTipoCarta:{
    width: 70,
  },
  inputNumeroCarta:{
    width: 220,
  },
  input: {
    backgroundColor: 'white',
    height: 53,

  
    paddingLeft: 15,
    marginTop: 5,
    fontFamily: LIGHT,
    fontSize: 17,
    borderColor:GRIGIO_SECONDARIO,
    borderWidth:1,
    color: GRIGIO_PRIMARIO,
    marginBottom:15,
  },
 contCard:{

  paddingHorizontal:10,


  



  
 },
  imageContent: {
    width: 90,
    height: 90,
  },
  overlayContentInnerOutput: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.9,
    width: '93%',
    height: "55%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentOverInner:{
    justifyContent:'center',
    alignItems:'center',
   
    height:'100%',


  },
  shadowContainer: {
    borderWidth:1,
    borderColor:GRIGIO_SECONDARIO,
   
    
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
    width: 43,
    height: 43,
    margin:'auto',
    marginStart:5
  },
  textColumn: {
    flex: 1,
    textAlign: 'center',
    fontFamily: LIGHT,
    fontSize: 17,
    color: GRIGIO_PRIMARIO,
    lineHeight: 53,
  },
  payText:{
    fontFamily:REGULAR,
    fontSize:25,
    marginLeft:10,
    color:GRIGIO_PRIMARIO,

  },
  headerText:{
    fontFamily:LIGHT,
    fontSize:25,
    color:'white',
    marginLeft:10
    
  },
  overlayOverlayContentInnerCheckoutOver:{
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.7,
    width: '100%',
    height: "100%",
    zIndex: -1,
    
  },
  containerOverlayCheckoutOuterOver:{
    alignItems:'center',
    height:'89%',
    width:'100%',

  },
  overlayContentCheckoutSecondOver: {
    borderColor: 'white',
    borderWidth: 5,
    backgroundColor:'transparent',

    width: '93%',
    height: "55%",

   
  },
  hrOver:{
    width:"40%",
    height:6,
    backgroundColor:ROSSO

  },
  contentOverNd:{
    height:'42%',
    width:'100%',
    marginTop:5,

   
  },
  contentOver:{
    width:'100%',
    marginTop:5,
    flex:1


  },
  headerOver:{
    width:"100%",
    height:60,
    backgroundColor:ROSSO,
    justifyContent:'center',
  },
  containerCheckoutOuterOver:{
    alignItems:'center',
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    borderRadius: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,

},
  containerCheckoutOver:{
    justifyContent:'center',
    height:150,
    
    width:'100%',
    marginVertical:10


    
},
  containerOverlayCheckout:{
       height:'96%',
        width:'95%',
        marginTop:10,

  },
  buttonOverlayCheckout:{
    borderWidth:1,
    borderColor:GRIGIO_SECONDARIO,
    width: 105,
    height: 44,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    elevation: 8,

  },
  buttonOverlayTextCheckout:{
    fontFamily: LIGHT,
    fontSize: 20,
    color: BLU_PRIMARIO,
  },
  overlayOverlayContentInnerCheckout:{
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.7,
    width: '100%',
    height: 440,
    zIndex: -1,
  },
  containerOverlayCheckoutOuter:{
    alignItems:'center',
    height:'87%',
    width:'100%',

  },
  overlayContentCheckoutSecond: {
    marginBottom:20,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,

    width: '93%',
    height: 450,

   
  },
    buttonTextCalendar: {
        fontFamily: LIGHT,
        fontSize: 20,
        color: BLU_PRIMARIO,
        
      },
    containerCalendarOuter:{
        alignItems:'center',
        height:'87%',
        width:'100%',
    },
    buttonCalendar:{
        borderWidth:1,
        borderColor:GRIGIO_SECONDARIO,
        width: 105,
        height: 44,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        elevation: 8,
    },
    containerCalendar:{
        height:'95%',
        width:'95%',
        marginTop:10,
       
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
      },
    imgContCalendar:{
        justifyContent:'center',
        alignItems:'center'
    },
    imgCalendar:{
        width:23,
        height:23,
    
    },
    contDate:{
        flexDirection: 'row',
    },
    leftDate:{
        textAlign: 'right',
        fontFamily: LIGHT,
        fontSize: 16,
    },
    rightDate:{
        textAlign: 'right',
        fontFamily: LIGHT,
        fontSize: 16,
    },
    middleDate:{
        textAlign: 'right',
        fontFamily: EXTRABOLD,
        fontSize: 16,
        marginHorizontal:5
    },
    contCost:{
        backgroundColor: '#EEEEEE',
        borderWidth:1,
        borderRadius:7,
        borderColor:GRIGIO_SECONDARIO,
        

    },
    textCost:{
        textAlign: 'right',
        fontFamily: REGULAR,
        fontSize: 16,
        paddingHorizontal: 15,
       
        color: GRIGIO_PRIMARIO,
    },
    contDisp:{
        backgroundColor: BLU_PRIMARIO,
        borderRadius: 7,

    },
    textDisp:{
        textAlign: 'right',
        fontFamily: LIGHT,
        fontSize: 16,
        paddingHorizontal: 7,
   
        color: 'white',
    },
    buttonSecond: {
        borderWidth:1,
        borderColor:GRIGIO_SECONDARIO,
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
    button: {
        marginTop:5,
        borderWidth:1,
        borderColor:GRIGIO_SECONDARIO,
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
      buttonTextFirst: {
        fontFamily: LIGHT,
        fontSize: 20,
        color: ROSSO,
        
      },
       buttonTextSecond: {
        fontFamily: LIGHT,
        fontSize: 20,
        color: BLU_PRIMARIO,
        
      },
      rowSecond: {
        flexDirection: 'row',
        marginBottom: 10,
    
    },
    rowThird: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft:10
    
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 13,
        
    
    },
    textCosto: {
        textAlign: 'left',
        fontFamily: REGULAR,
        fontSize: 16,
        color:GRIGIO_PRIMARIO
    },
    leftColumn: {
        textAlign: 'left',
        fontFamily: LIGHT,
        fontSize: 16,
    },
    rightColumn: {
        textAlign: 'right',
        fontFamily: LIGHT,
        fontSize: 16,
    },
    textAlbergo: {
        color:MARRONE,
        textAlign: 'right',
        fontFamily: REGULAR,
        fontSize: 16,
    },
    textStanza: {
        color: VERDE_PRIMARIO,
        textAlign: 'right',
        fontFamily: REGULAR,
        fontSize: 16,
    },
    containerCheckoutOuter:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',

    },
    containerCheckoutInner:{
        marginLeft:10,
        marginRight:10,
        marginTop:10
    },
    containerCheckout:{
        backgroundColor:'white',
        justifyContent:'center',
   
        width:'97%',
   
        
    },
    innerContainerCheckout: {
        position: 'relative',
        justifyContent: 'flex-end',
        height: 75,
        width: '97%',
      },
      innerContainerCheckoutOver: {
        position: 'absolute', 
        bottom: 0, 
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems:'center',
        height:85,
        flexDirection:'row',
        paddingHorizontal:10,
        width: '100%',
        zIndex: 20,
      },
   
      
      square: {
        position:'relative',
        justifyContent: 'flex-start',
        alignItems:'center',
        width: 55,
        height: 55,
        backgroundColor: 'white',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.55,

        elevation: 5,
      },
      mbSelected :{
       top:5,
       borderWidth:3,
       borderColor:BLU_SECONDARIO

      },
      mbNotSelected :{
        bottom:5,

      },
    
      innerContainerCheckoutUnder: {
        position: 'absolute', 
        bottom: 0, 
        backgroundColor: BLU_SECONDARIO,
        justifyContent: 'center',
        height: 45,
        width: '100%',
        zIndex: -1,
      },
      
    textCheckout: {
        fontFamily: LIGHT,
        fontSize: 20,
        color: GRIGIO_PRIMARIO,
        marginStart:5
      },
    containerCircle:{
        backgroundColor:BLU_SECONDARIO,
        width:23,
        height:23,
        borderRadius:23,
        marginEnd:15
    },
    overlayContentInnerCheckout: {
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.7,
        width: '100%',
       
        zIndex: -1,
        justifyContent:'center',
        alignItems:'center'
      },
    shadowBodyCheckout: {
        width: '97%',
        height: 170,
        alignSelf: 'center',
        },
    overlayHeaderCheckout: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 35,
        zIndex: 2,
      },
    overlayContentCheckout: {
        marginBottom:12,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 5,
        width: '100%',

        alignItems: 'flex-start',


        
      },

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
        fontSize: 19,
        marginLeft:10,
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
    marginLeft: 13,

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
  backgroundContain: {

    width: '70%',
    height: '70%',
  
   
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
    marginBottom:10,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
    
    width: '100%',
    height: 235,
    justifyContent:'center',
    alignItems: 'center',
  },
  overlayContentCalendar: {
    marginBottom:20,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
    
    width: '93%',
    height: 450,

   
  },
  overlayContentInnerCalendar: {
    position: 'absolute',
    backgroundColor: 'white',
    opacity: 0.7,
    width: '100%',
    height: 440,
    zIndex: -1,
  },
  imageContainerGroup: {
    flexDirection: 'row',

    height: '100%',
    width: '100%',
   margin:'auto',
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

export default Books;
