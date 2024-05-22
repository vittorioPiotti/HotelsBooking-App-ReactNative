/**
 * @access public
 * @package src.scripts.features.navigation
 * @author Vittorio Piotti
 * @class Home.tsx
 * @description Schermata principale con lista degli alberghi
*/

//native
import React, {useState,useRef,useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView,TouchableOpacity, TextInput } from 'react-native';

//constants
import {IMG71,IMG73,IMG74,IMG80,IMG75,IMG10,IMG72,_IMG16,_IMG03,_IMG06,_IMG15,IMG51,IMG70,IMG41,IMG52,_IMG10,BG01,_IMG23,IMG12,IMG11, _IMG28,_IMG24,_IMG25,_IMG26,_IMG30,_IMG35,_IMG36,_IMG37,_IMG31,_IMG29} from '../../constants/images'; 
import {LIGHT,REGULAR,SEMIBOLD,EXTRABOLD} from '../../constants/fonts'; 
import {BOOKS,HOME,AUTH,SETTINGS, ROOMS} from '../../constants/screens';
import {_ACT01,_ACT02,_ACT03,_ACT04,_ACT05, } from '../../constants/activities';
import {VERDE_PRIMARIO,VERDE_SECONDARIO,MARRONE,ROSSO,BLU_PRIMARIO,BLU_SECONDARIO,GRIGIO_PRIMARIO,GRIGIO_SECONDARIO} from '../../constants/colors';
import {SERVER_URL} from '../../constants/connection';

//layouts
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import Calendar from '../../layouts/Calendar';



const Room = (
  { 
    setShowScreen,
    showScreen,
    idAlbergo,
    nomeStanza,
    globalId 
  }: { 
    setShowScreen: React.Dispatch<React.SetStateAction<number>>,
    showScreen:number, 
    idAlbergo:number,
    nomeStanza:string,
    globalId: string 
  }) => {

  
    const [codiceCarta, setCodiceCarta] = useState('');
    const [tipoCarta, setTipoCarta] = useState(IMG73);
    const [meseCarta, setMeseCarta] = useState('');
    const [annoCarta, setAnnoCarta] = useState('');
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [dateChecked,setDateChecked] = useState(false)
    const [isSuccess,setIiSuccess] = useState(false);
    const [isPaied,setIsPaied] = useState(false)
    const [isCard,setIsCard] = useState(false)
    const [showOptions, setShowOptions] = useState(false);
    const [options,setOptions] = useState([IMG73, IMG74, IMG75 ]);
    const [selectedValue, setSelectedValue] = useState(IMG73);
    const TODAY = new Date();
    const TOMORROW = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const [fsDate, setFsDate] = useState<{ gg: number, mm: number, aa: number }>({gg:-1,mm:-1,aa:-1});
    const [ndDate, setNdDate] = useState<{ gg: number, mm: number, aa: number }>({gg:-1,mm:-1,aa:-1});
    const [showOverlayCalendar, setShowOverlayCalendar] = useState(false);
    const [showOverlayCheckout, setShowOverlayCheckout] = useState(false);
    const [selectedBoxes, setSelectedBoxes] = useState<boolean>(false);
    const [inputValues, setInputValues] = useState(['', '', '', '']);
    const inputRefs = useRef<Array<React.RefObject<TextInput>>>([
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ]);
    const imageFooterPaths = [
      { click: true, index: ROOMS, path: _IMG10  },
      { click: true, index: globalId == '' ? AUTH : SETTINGS,path:   _IMG03 },
      { click: false, index: HOME, path:  _IMG15  },
      { click: true, index: BOOKS, path:  _IMG06  },
    ];
    const [prenotazione,setPrenotazione] = useState<{
      hotelName: string,
      roomId:number,
      availability:number,
      costo:number,
      imageUrl:string,
      roomCost:number,
      descrizione:String,
    }>({
      hotelName: "",
      roomId:0,
      availability:0,
      costo:0,
      imageUrl:"",
      roomCost:0,
      descrizione:""
    })

  

    useEffect(() => {
      fetchPrenotazione();
    }, [ fsDate,ndDate]);

    const handleCardPress = () => {
      setIsCard(!isCard)
    }
  
    const handlePayPress = () => {
      const app = inputValues[0] + inputValues[1] + inputValues[2] + inputValues[3]
      let error = false;
      if (!codiceCarta || !meseCarta || !annoCarta || !nome || !cognome || !tipoCarta) {
        error = true;
      }
      if (parseInt(meseCarta, 10) < 1 || parseInt(meseCarta, 10) > 12) {
        error = true;
      }
      if (parseInt(annoCarta, 10) < 2024 || parseInt(annoCarta, 10) > 2070) {
        error = true;
      }
      if (codiceCarta.length !== 3) {
        error = true;
      }
      if (app.length !== 16) {
        error = true;
      }
      if(error == false){
        fetchPrenota()
      }
      setIsPaied(true)
      setIiSuccess(!error)
      setTimeout(() => {
      if(!error ){
          setShowScreen(BOOKS);
        }else{
          setIsPaied(false)
        }
      }, 2000);  
    }

    const handlePaypalPress = () => {
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

    const handleBoxPress = () => {
      setSelectedBoxes(prevState => !prevState);
    };

    const handleDatePress = () => {
      setShowOverlayCalendar(!showOverlayCalendar);
    }

    const handleCheckoutPress = () => {
      if(prenotazione.availability!= 0){
        setShowOverlayCheckout(!showOverlayCheckout);
        setIsCard(false);
      }else{   
        setDateChecked(true)
        setTimeout(() => {
          setDateChecked(false)
        }, 2000);
      }
    }

    const handleImagePress = (index: number) => {
      setShowScreen(index);
    };

    const handlePress = () => {
      let inputToFocus = null;
      for (let i = 0; i < inputValues.length; i++) {
        if (inputValues[i].length < 4) {
          inputToFocus = inputRefs.current[i];
          break;
        }
      }
      if (!inputToFocus) {
        inputToFocus = inputRefs.current[inputRefs.current.length - 1];
      }
      inputRefs.current.forEach((ref) => {
        if (ref && ref.current) {
          ref.current.setNativeProps({ editable: true });
        }
      });
      if (inputToFocus && inputToFocus.current) {
        inputToFocus.current.focus();
      }
    };
    
    
    const handleOnSubmitEditing = () => {
      inputRefs.current.forEach((ref) => {
        if (ref && ref.current) {
          ref.current.setNativeProps({ editable: false });
        }
      });
    };
    

    const handleChangeText = (text: string, index: number) => {
      const newValues = [...inputValues];
      newValues[index] = text;
      setInputValues(newValues);
      if (text.length === 4 && index < inputValues.length - 1) {
        const nextInputRef = inputRefs.current[index + 1];
        if (nextInputRef && nextInputRef.current) {
          nextInputRef.current.setNativeProps({ editable: true });
          nextInputRef.current.focus();
        }
      } else if (text.length === 0 && index > 0) {
        const prevInputRef = inputRefs.current[index - 1];
        if (prevInputRef && prevInputRef.current) {
          prevInputRef.current.setNativeProps({ editable: true });
          prevInputRef.current.focus();
        }
      }
    };

    const handleOptionSelect = (option:any) => {
      setSelectedValue(option);
      let appOptions = options;
      for(let i = 0; i < options.length; i ++){
        if (options[i] === option) {
          options[i] = options[0]
          setTipoCarta(option)
          options[0] = option
          setOptions(appOptions)
          break;
        }
      }
      setSelectedValue(option);
      setShowOptions(false);
    };
   
    const checkLoadDate = (appDate: { gg: number, mm: number, aa: number }):boolean => {
      if(appDate.gg == -1 && appDate.mm == -1 && appDate.aa == -1){
          return false;
      }
      else {
          return true
      }
    }

    const fetchPrenota = async () => {
      const url = `${SERVER_URL}type=book&method=newbooking`;
      const requestBody = new URLSearchParams();
      requestBody.append('roomName', nomeStanza);
      requestBody.append('hotelId', idAlbergo.toString());
      requestBody.append('startDate', 
        checkLoadDate(fsDate) && checkLoadDate(ndDate) ?
          `${fsDate.aa}-${fsDate.mm + 1< 10 ? `0${fsDate.mm + 1}` : fsDate.mm + 1}-${fsDate.gg < 10 ? `0${fsDate.gg}` : fsDate.gg}`
          : `${TODAY.getFullYear()}-${TODAY.getMonth() + 1 < 10 ? `0${TODAY.getMonth() + 1}` : TODAY.getMonth() + 1}-${TODAY.getDate() < 10 ? `0${TODAY.getDate()}` : TODAY.getDate()}`
      );
      requestBody.append('endDate',  
        checkLoadDate(fsDate) && checkLoadDate(ndDate) ?
          `${ndDate.aa}-${ndDate.mm + 1< 10 ? `0${ndDate.mm + 1}` : ndDate.mm + 1}-${ndDate.gg < 10 ? `0${ndDate.gg}` : ndDate.gg}`
          : `${TOMORROW.getFullYear()}-${TOMORROW.getMonth() + 1 < 10 ? `0${TOMORROW.getMonth() + 1}` : TOMORROW.getMonth() + 1}-${TOMORROW.getDate() < 10 ? `0${TOMORROW.getDate()}` : TOMORROW.getDate()}`
      );
      requestBody.append('clientId', globalId);
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
          body: requestBody.toString(),
        });
        const data = await response.json();
        
      } catch (error) {
      }
    };

    const fetchPrenotazione = async () => {
      try {
          const appStartDate = checkLoadDate(fsDate) && checkLoadDate(ndDate) ?
              `${fsDate.aa}-${fsDate.mm + 1< 10 ? `0${fsDate.mm + 1}` : fsDate.mm + 1}-${fsDate.gg < 10 ? `0${fsDate.gg}` : fsDate.gg}`
              : `${TODAY.getFullYear()}-${TODAY.getMonth() + 1 < 10 ? `0${TODAY.getMonth() + 1}` : TODAY.getMonth() + 1}-${TODAY.getDate() + 1 < 10 ? `0${TODAY.getDate() + 1}` : TODAY.getDate() + 1}`;
          const appEndDate = checkLoadDate(fsDate) && checkLoadDate(ndDate) ?
              `${ndDate.aa}-${ndDate.mm + 1< 10 ? `0${ndDate.mm + 1}` : ndDate.mm + 1}-${ndDate.gg < 10 ? `0${ndDate.gg}` : ndDate.gg}`
              : `${TOMORROW.getFullYear()}-${TOMORROW.getMonth() + 1 < 10 ? `0${TOMORROW.getMonth() + 1}` : TOMORROW.getMonth() + 1}-${TOMORROW.getDate() + 1 < 10 ? `0${TOMORROW.getDate() + 1}` : TOMORROW.getDate() + 1}`;
          const url = `${SERVER_URL}type=book&method=getBookPreviewApp&startDate=${appStartDate}&endDate=${appEndDate}&hotelId=${idAlbergo}&roomName=${nomeStanza}`;
          const response = await fetch(url);
          const data = await response.json();
          const riepilogo = data[0]; 
          setPrenotazione(
            {
              hotelName: riepilogo.hotelName,
              availability:riepilogo.availability,
              costo:riepilogo.cost,
              imageUrl:riepilogo.roomImage,
              roomCost:riepilogo.roomCost,
              roomId:riepilogo.roomId,
              descrizione:riepilogo.descrizione
            }
          )
      } catch (error) {
          console.error('Error fetching hotel:', error);
      }
    };
    

    
    
    
    const Riepilogo =() =>{
      return (
        <View style={styles.containerCheckoutOver}>
          <View style={styles.containerCheckoutInner}>
            <View style={styles.row}>
              <Text style={styles.leftColumn}>Hotel:</Text>
              <Text style={styles.textAlbergo}>{prenotazione.hotelName}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftColumn}>Stanza:</Text>
                <Text style={styles.textStanza}>{nomeStanza}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftColumn}>Prenotazione:</Text>
                <View style={styles.contDate}>
                    <Text style={styles.leftDate}>
                      { 
                        checkLoadDate(fsDate) ?
                          `${fsDate.gg} / ${fsDate.mm + 1} / ${fsDate.aa}` 
                          : `${TODAY.getDate()} / ${TODAY.getMonth() + 1} / ${TODAY.getFullYear()}`
                      }
                    </Text>
                  <Text style={styles.middleDate}>·</Text>
                  <Text style={styles.rightDate}>
                    { 
                      checkLoadDate(ndDate) ?
                        `${ndDate.gg} / ${ndDate.mm + 1} / ${ndDate.aa}` 
                        : `${TOMORROW.getDate()} / ${TOMORROW.getMonth() + 1} / ${TOMORROW.getFullYear()}`
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
                <Text style={styles.leftColumn}>Disponibilità:</Text>
                  <View style={styles.contDisp}>
                    <Text style={styles.textDisp}>
                   { prenotazione.availability}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textCosto}>Importo Prenotazione:</Text>
                    <View style={styles.contCost}>
                      <Text style={styles.textCost}>
                        {prenotazione.costo}€
                      </Text>
                    </View>
                  </View>
                </View>
              </View>  
  
    )
  }



  return (
<ImageBackground source={BG01 } style={styles.background} resizeMode="cover">
        <Header isHome={showScreen} title={prenotazione.hotelName} image={_IMG16} />
          <View style={styles.container}>
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
            <View key={prenotazione.roomId}>
              <View style={styles.overlayContent}>
                <View style={styles.overlayHeader}>
                  <View style={styles.overlayHeaderLeft}>
                    <Text style={styles.headerTextLeft}>
                        {nomeStanza}
                    </Text>
                  </View>
                  <View style={styles.containerCosto}>
                    <View style={styles.overlayHeaderRight}>
                      <Text style={styles.headerTextRight}>
                        {prenotazione.roomCost}
                      </Text>
                      <Text style={styles.headerTextRightNd}>
                        €/gg
                      </Text>
                    </View>
                  </View>
                </View>
                {
                  !selectedBoxes ? 
                    <View style={styles.shadowBody}>
                      <ImageBackground source={{uri:prenotazione.imageUrl}} style={styles.imageContainerGroup}></ImageBackground>
                    </View>
                  :
                    <View style={styles.outerContainerDescrizione}>
                      <View style={styles.infoContainer}>
                        <Text style={styles.textInfo}>
                          {prenotazione.descrizione.length < 220 ? prenotazione.descrizione : `${prenotazione.descrizione.substring(0, 180)}...`}
                        </Text>
                      </View>
                    <View style={styles.overlayContentInnerDesc}></View>
                  </View>
                }
                <View style={styles.redDiv}>
                  <View style={styles.smallBox}>
                  <TouchableOpacity onPress={() => handleBoxPress()}>
                    <Image 
                      source={selectedBoxes  ? IMG51 : IMG52 }
                      style={styles.centeredImg} 
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View> 
              </View>
            </View>
            <View style={styles.overlayContentInner}/>
          </View>
          <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.overlayContentInnerCheckout}/>

          <View style={styles.overlayContentCheckoutFirst}>
             <View style={styles.overlayHeaderCheckout}>
                  <View style={styles.overlayHeaderLeft}>
                    <Text style={styles.textCheckout}>Effettua Prenotazione</Text>
                  </View>
                  <View style={styles.containerCircle}/>     
                </View>
                <View style={styles.containerCheckoutOuter}>
                  <View style={styles.containerCheckout}>
                    <View style={styles.containerCheckoutInner}>
                      <View style={styles.row}>
                        <Text style={styles.leftColumn}>Hotel:</Text>
                        <Text style={styles.textAlbergo}>{prenotazione.hotelName}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.leftColumn}>Stanza:</Text>
                        <Text style={styles.textStanza}>{nomeStanza}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.leftColumn}>Prenotazione:</Text>
                          <TouchableOpacity
                            onPress={() =>handleDatePress()}
                          >
                          <View style={styles.contDate}>
                            <Text style={styles.leftDate}>
                              { 
                                checkLoadDate(fsDate) ?
                                  `${fsDate.gg} / ${fsDate.mm + 1} / ${fsDate.aa}` 
                                  : `${TODAY.getDate()} / ${TODAY.getMonth() + 1} / ${TODAY.getFullYear()}`
                              }
                            </Text>
                          <Text style={styles.middleDate}>·</Text>
                        <Text style={styles.rightDate}>
                        { 
                          checkLoadDate(ndDate) ?
                            `${ndDate.gg} / ${ndDate.mm + 1} / ${ndDate.aa}` 
                            : `${TOMORROW.getDate()} / ${TOMORROW.getMonth() + 1} / ${TOMORROW.getFullYear()}`
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
                    </TouchableOpacity>
                  </View>
                    <View style={styles.row}>
                      <Text style={styles.leftColumn}>Disponibilità:</Text>
                        <View style={styles.contDisp}>
                          <Text style={styles.textDisp}>
                          { prenotazione.availability}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.textCosto}>Importo Prenotazione:</Text>
                          <View style={styles.contCost}>
                            <Text style={styles.textCost}>
                              {prenotazione.costo}€
                            </Text>
                          </View>
                        </View>
                        <View style={styles.rowSecond}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() =>  {setShowScreen(ROOMS)}}
                          >
                            <Text style={styles.buttonTextFirst}>Cancella</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{handleCheckoutPress()}}>
                            <Text style={styles.buttonTextSecond}>Checkout</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                        {
                   dateChecked       ?
               
              <View style={styles.overlayContentInnerOutputFirst}>
          <Image
            source={ IMG11}
            style={styles.imageContent}
          />
     
                </View>
                

                : null
  }


                     

              </View>
            </ScrollView>   
          </View>
          <Footer imagePaths={imageFooterPaths} onPressImage={handleImagePress} />
            {showOverlayCalendar && (
              <View style={styles.overlay}>
                <View style={styles.overlayContentCalendar}>
                  <View style={styles.containerCalendarOuter}>
                    <View style={styles.containerCalendar}>
                      <Calendar fsDate={fsDate} ndDate={ndDate} setFsDate={setFsDate} setNdDate={setNdDate}/>
                    </View>
                  </View>       
                <TouchableOpacity
                  style={styles.buttonCalendar}
                  onPress={() =>handleDatePress()}
                >
                  <Text style={styles.buttonTextCalendar}>Chiudi</Text>
                </TouchableOpacity>
                <View style={styles.overlayContentInnerCalendar}/>
              </View>
            </View>
          )}
          {showOverlayCheckout && (
            <View style={styles.overlay}>
              <View style={styles.overlayContentCheckoutSecondOver}>
                <View style={styles.containerOverlayCheckoutOuterOver}>
                  <View style={styles.containerOverlayCheckout}>
                    <View style={styles.containerCheckoutOuterOver}>                   
                      <View style={styles.headerOver}>
                        <Text style={styles.headerText}>Checkout</Text>
                      </View>
                      {isCard ? 
                      
                      <View style={styles.contentOver}>
                      <Text style={styles.payText}>Paga con Carta</Text>
                      <View style={styles.contentOverInner}>
              
                      <View style={styles.contCard}>
              <View style={styles.onlyRow}>
                <View>
                  <View style={styles.labelInput} >
                    <Text style={styles.labelText}>Numero Carta</Text>
                  </View>
               
      <TouchableOpacity style={styles.containerNumeroCarta} onPress={handlePress}>
        {inputRefs.current.map((ref, index) => (
          <TextInput
            key={index}
            ref={ref}
            style={styles.quartettoNumeroCarta}
            placeholder="Inserisci il codice"
            onChangeText={(text) => handleChangeText(text, index)}
            keyboardType="number-pad"
            returnKeyType="done"
            value={inputValues[index]}
            maxLength={4}
            editable={false}
            onSubmitEditing={() => handleOnSubmitEditing()}
          />
        ))}
    </TouchableOpacity>
   
    
                </View>
                <View style={[styles.flexOne,{alignItems:'flex-end'}]}>
                  <View >
                    <View  style={styles.selectHeader} >
                      <Text style={styles.labelText}>Tipo</Text>  
                    </View>
                    <View style={styles.onlyRow}>
                      <View style={{zIndex:200}}>
                        {showOptions && (
                          <View style={styles.optionsContainer}>
                            {options.map((option, index) => (
                              <TouchableOpacity
                                key={index}
                                style={ options[0] == option ? {marginBottom:5} : styles.option}
                                onPress={() => handleOptionSelect(option)}>
                                <Image source={option} style={[styles.imageCard, {resizeMode: 'contain'}]} />
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>
                      <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={styles.selectButton}>
                        <Image source={selectedValue} style={[styles.imageCard, {resizeMode: 'contain'}]} />
                      </TouchableOpacity>
                      <View style={styles.scrollType}>
                        <Image source={IMG80} style={[styles.imageScroll, {resizeMode: 'contain'}]} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.containerInputs}>
                <View style={styles.outerContainerInputs}>
                  <View style={styles.labelInput } >
                    <Text style={styles.labelText}>Codice</Text>
                  </View>
                  <View style={styles.containerCodiceCarta} >
                  <TextInput
                    style={styles.inputGenerico}
                    placeholder="Inserisci il codice"
                    onChangeText={(text) => {
                    setCodiceCarta(text)
                    }}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    value={codiceCarta}
                    maxLength={3}
             
                  />
                </View>
              </View>
              <View style={styles.flexOne}></View>
                <View style={styles.outerContainerInputs}>
                  <View style={styles.labelInput} >
                    <Text style={styles.labelText}>Mese</Text>
                  </View>
                  <View style={styles.onlyRow}>
                    <View style={styles.containerMeseCarta}>
                    <TextInput
                      style={styles.inputGenerico}
                      placeholder="Inserisci il codice"
                      onChangeText={(text) => {

                  
                          setMeseCarta(text);
                      }}
                      keyboardType="number-pad"
                      returnKeyType="done"
                      value={meseCarta}
                      maxLength={2}
                    />
                      </View>
                    </View>
                </View>
                <View>
                  <View style={styles.labelInput} >
                  <Text style={styles.labelText}>Anno</Text>
                </View>
                <View style={styles.onlyRow}>
                  <View style={styles.containerAnnoCarta}>
                  <TextInput
                   style={styles.inputGenerico}
                   placeholder="Inserisci il codice"
                   onChangeText={(text) => {

                       setAnnoCarta(text);
                  
                   }}
                   keyboardType="number-pad"
                   returnKeyType="done"
                   value={annoCarta}
                   maxLength={4}
                  />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.containerInputs}>
            <View style={styles.outerContainerInputs}>
              <View style={styles.labelInput} >
                <Text style={styles.labelText}>Nome</Text>
              </View>
              <View style={styles.containerNome}>
              <TextInput
  style={styles.inputGenerico}
  placeholder="Inserisci il codice"
  onChangeText={(text) => {
    // Rimuovi gli spazi dal testo
    const newText = text.replace(/\s/g, '');
    setNome(newText);
  }}
  keyboardType="default"
  value={nome}
  maxLength={10}
/>

              </View>
            </View>
            <View>
              <View style={styles.labelInput} >
                <Text style={styles.labelText}>Cognome</Text>
              </View>
              <View style={styles.containerCognome}>
              <TextInput
                   style={styles.inputGenerico}
                   placeholder="Inserisci il codice"
                   onChangeText={(text) => {
                    const newText = text.replace(/\s/g, '');
                       setCognome(newText);
                  
                   }}
                   keyboardType="default"
                   value={cognome}
                   maxLength={10}
                  />
              </View>
            </View> 
          </View>
        </View>
              
                      </View>
                  </View>
                      
                      
                      :   <Riepilogo/> }
                      <View style={styles.hrOver}/>
                        {!isCard ? 
                        
                        
                        <View style={styles.contentOver}>
                        <Text style={styles.payText}>Metodo di Pagamento</Text>
                        <View style={styles.contentOverInner}>
                
                        <View>
            <TouchableOpacity style={styles.shadowContainer} onPress={()=>{handlePaypalPress()}} >
              <View style={styles.divider}>
                <Image source={IMG71} style={[styles.imageColumn, {resizeMode: 'contain'}]} />
                <Text style={styles.textColumn}>Paga con PayPal</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.shadowContainer,{ marginTop:20}]}  onPress={()=>{handleCardPress()}} >
            <View style={styles.divider}>
              <Image source={IMG72} style={[styles.imageColumn, {resizeMode: 'contain'}]} />
                <Text style={styles.textColumn}>Paga con Carta</Text>
            </View>
          </TouchableOpacity>
        </View>
                
                        </View>
                    </View>
                        
                        
                        
                        :   <Riepilogo/> }
                      </View>
                    </View>
                  </View>   
                <View style={styles.onlyRow}>    
              <TouchableOpacity
                style={styles.buttonOverlayCheckout}
                onPress={() =>handleCheckoutPress()}
              >
              <Text style={styles.buttonTextFirst}>Annulla</Text>
            </TouchableOpacity>
            {isCard ?                   
              <View style={[styles.onlyRow,styles.spaceBetween,styles.flexOne]}>
                <TouchableOpacity
                  style={styles.buttonOverlayCheckout}
                  onPress={()=>handlePayPress()}
                >
                  <Text style={styles.buttonTextSecond}>Prenota</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOverlayCheckoutBack}
                onPress={()=>{handleCardPress()}}
              >
                <Image
                source={IMG10}
                style={styles.imageBack}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          : null}
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
    </ImageBackground>
  );

};

const styles = StyleSheet.create({
  inputGenerico:{
    width:'100%',
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
    pointerEvents: 'none' ,
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
  width:'100%',
  paddingHorizontal:10,
  paddingVertical:10,
  marginBottom:20,

  alignItems:'flex-end',
  justifyContent:'space-between',

  flex:1,
  
  
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
    height: "70%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentOverInner:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,

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
    fontSize:30,
    marginLeft:10,
    color:GRIGIO_PRIMARIO
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
    height:'91%',
    width:'100%',

  },
  overlayContentCheckoutSecondOver: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 5,
    
    width: '93%',
    height: "70%",

   
  },
  hrOver:{
    width:"40%",
    height:6,
    backgroundColor:BLU_SECONDARIO

  },
  contentOver:{
    width:'100%',

    marginTop:10,
    flex:1


  },
  headerOver:{
    width:"100%",
    height:60,
    backgroundColor:BLU_SECONDARIO,
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
    height:200,

    width:'100%',
    marginBottom:10


    
},
  containerOverlayCheckout:{
       height:'97%',
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
        color: VERDE_SECONDARIO,
        
      },
      rowSecond: {
        flexDirection: 'row',
        marginBottom: 10,
    
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
        height:275,
        width:'100%',
        zIndex:-1
    },
    containerCheckoutInner:{
        marginLeft:10,
        marginRight:10,
        marginTop:10
    },
    containerCheckout:{
        backgroundColor:'white',
        justifyContent:'center',
        height:265,
        width:'97%',
        borderTopColor:BLU_SECONDARIO,
        borderTopWidth:15,
        
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
        height: 320,
        zIndex: -1,
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
        marginBottom:20,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 5,
        width: '100%',
        height: 320,
        alignItems: 'flex-start',
        
      },

      overlayContentCheckoutFirst: {
        marginBottom:20,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 5,
        width: '100%',
        height: 320,
        alignItems: 'flex-start',
        
      },
      overlayContentInnerOutputFirst: {
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.9,
        width: '100%',
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:2
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
        alignItems: 'center', // Aggiunto per centrare verticalmente
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

export default Room;