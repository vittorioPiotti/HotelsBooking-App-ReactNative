/**
 * @access public
 * @author Vittorio Piotti
 * @class App.tsx
 * @description App 
*/

//native
import React, { useState, useEffect } from 'react';
import {  View } from 'react-native';

//constants
import {PREVIEW,AUTH,SIGNIN,HOME,HOTEL, SETTINGS,PROFILE,ROOMS,ROOM,BOOKS} from './src/scripts/constants/screens';
import {SERVER_URL} from './src/scripts/constants/connection';

//onboarding
import Preview from './src/scripts/features/onboarding/Preview';

//profile
import Auth from './src/scripts/features/profile/Auth';
import SignIn from './src/scripts/features/profile/SignIn'; 
import Settings from './src/scripts/features/profile/Settings'; 
import Profile from './src/scripts/features/profile/Profile'; 


//navigation
import Home from './src/scripts/features/navigation/Home'; 
import Hotels from './src/scripts/features/navigation/Hotel'; 
import Rooms from './src/scripts/features/navigation/Rooms'; 
import Room from './src/scripts/features/navigation/Room'; 
import Books from './src/scripts/features/navigation/Books'; 




const App = () => {

  
  const [showScreen, setShowScreen] = useState(PREVIEW);
  const [globalId, setGlobalId] = useState(''); 
  const [idAlbergo,setIdAlbergo] = useState(0);
  const [idServizio,setIdServizio] = useState(0);
  const [nomeStanza,setNomeStanza] = useState('');
  const [clientEmail,setClientEmail] = useState('')

  const [alberghi, setAlberghi] = useState<{ 
    nome: string ,
    voto:number,
    costo:number,
    immagine:string
    id:number,
    attivita:number[],
    stanze:{
        nome: string ,
        immagine:string
    }[]
}[]>([]);

const [albergo, setAlbergo] = useState<{
    nome: string,
    voto: number,
    contatto: string, 
    posizione: string, 
    orario: string, 
    descrizione: string, 
    immagine: string, 
    id: number,
    social:number[],
    attivita: number[],
    stanze: {
        nome: string,
        costo: number,
        immagine: string 
    }[]
}>({
  nome: "",
  voto: 0,
  contatto: "",
  posizione: "",
  orario: "",
  descrizione: "",
  immagine: "",
  id: 0,
  social: [], 
  attivita: [], 
  stanze: [] 
});


const [stanze, setStanze] = useState<{
  nome: string,
  id: number,
  stanze: {
      id:number,
      nome: string,
      costo: number,
      descrizione:string
      immagine: string,
  }[]
}>({
  nome: "",
  id: 0,
  stanze: []
});




  useEffect(()=>{
    fetchEmail()
  },[])


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowScreen(HOME)
    }, 2000);
    return () => clearTimeout(timeout);
  }, []); 
 

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
  


 


  return (
    <View style={{ flex: 1 }}>
      
      {
        showScreen === PREVIEW &&
        <Preview />
      }
      {
        showScreen === AUTH && 
        <Auth 
          globalId={globalId} 
          showScreen={showScreen} 
          setShowScreen={setShowScreen} 
        />
      }{
        showScreen === SIGNIN &&
        <SignIn 
          globalId={globalId} 
          setShowScreen={setShowScreen} 
          showScreen={showScreen} 
          setGlobalId={setGlobalId}  
        />
      }{
        showScreen === HOME &&  
        <Home 
          alberghi={alberghi} 
          setAlberghi={setAlberghi} 
          setShowScreen={setShowScreen} 
          showScreen={showScreen} 
          setIdAlbergo={setIdAlbergo} 
          globalId={globalId} 
        />
      }{
        showScreen === HOTEL && 
        <Hotels 
          idAlbergo={idAlbergo} 
          setIdAlbergo={setIdAlbergo}  
          albergo={albergo} 
          setAlbergo={setAlbergo} 
          setShowScreen={setShowScreen}  
          globalId={globalId}  
          setIdServizio={setIdServizio} 
          showScreen={showScreen}
        />
      }{
        showScreen === SETTINGS && 
        <Settings 
          setShowScreen={setShowScreen} 
          showScreen={showScreen} 
          globalId={globalId} 
          setGlobalId={setGlobalId}  
        />
      }{
        showScreen === PROFILE && 
        <Profile 
          setShowScreen={setShowScreen} 
          showScreen={showScreen} 
          globalId={globalId}    
        />
      }{
        showScreen === ROOMS && 
        <Rooms albergo={stanze} 
          setAlbergo={setStanze} 
          setShowScreen={setShowScreen} 
          showScreen={showScreen} 
          idAlbergo={idAlbergo} 
          setIdAlbergo={setIdAlbergo} 
          setNomeStanza={setNomeStanza}  
          globalId={globalId} 
        />
      }{
        showScreen === ROOM && 
        <Room  
          setShowScreen={setShowScreen} 
          showScreen={showScreen} 
          idAlbergo={idAlbergo}  
          nomeStanza={nomeStanza} 
          globalId={globalId} 
        />
      }
      {
        showScreen === BOOKS && 
        <Books 
          setShowScreen={setShowScreen} 
          showScreen={showScreen}   
          globalId={globalId} 
        />
      }
    </View>
  );
};

export default App;