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
 * @package src.scripts.layouts
 * @author Vittorio Piotti
 * @class Header.tsx
 * @description Header con caratterizzazione della pagina corrente 
*/

//native
import React, { useState } from 'react';
import { View, StyleSheet, Text, Image,TextInput } from 'react-native';

//constants
import {IMG03,IMG05,IMG06,IMG16,_IMG03,_IMG05,_IMG06,_IMG16,GLITCH,LOGO} from '../constants/images'; 
import {LIGHT,EXTRABOLD,REGULAR} from '../constants/fonts';
import {HOME,ROOMS,ROOM,HOTEL} from '../constants/screens';
import {VERDE_PRIMARIO,MARRONE,BLU_SECONDARIO,GRIGIO_PRIMARIO,GRIGIO_SECONDARIO} from '../constants/colors';
  

  
  const HeaderIcon = ({ path }: { path: number}) => {
    return  <Image
                source={
                    path == _IMG03 ? IMG03
                    :
                    path == _IMG05 ? IMG05
                    : 
                    path == _IMG06 ? IMG06
                    :
                    path == _IMG16 ? IMG16
                    :
         
                    GLITCH
                } 
                style={styles.image}
                resizeMode="contain"
            />;
};

const Header = (
  { 
    isHome, 
    title, 
    image 
  }:
  { 
    isHome: number, 
    title: string, 
    image: number
  }) => {

    
  const [search, setSearch] = useState('');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
      <Image
        source={LOGO} 
        style={{
          width: 50,
          height: 50,
          marginTop:50,
          resizeMode: 'cover', 
          borderRadius: 16,
          
        }}
      />
      </View>
      
      <View style={styles.textAndImageContainer}>
        {isHome!=HOME 
        ? <View style={styles.textAndImageContainer}>
            {isHome !== HOME ? (
                isHome === HOTEL || isHome === ROOMS || isHome === ROOM ? (
                    <View style={styles.overlayHeader}>
                        {title && title.includes(" ") && (
                            <>
                                <Text style={[styles.nomeFs, styles.headerText]}>
                                    {title.split(" ")[0] + " "}
                                </Text>
                                <Text style={[styles.nomeNd, styles.headerText]}>
                                    {title.split(" ").slice(1).join(" ")}
                                </Text>
                            </>
                        )}
                    </View>
                ) : (
                    <Text style={styles.textProfilo}>{title}</Text>
                )
            ) : (
                <TextInput
                    style={[styles.input, styles.inputEnabled]}
                    placeholder="Ricerca Alberghi"
                    placeholderTextColor="#707070"
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    testID="searchInput"
                    secureTextEntry={false}
                    editable={true}
                />
            )}
        </View>
    
        :    <TextInput
        style={[styles.input,  styles.inputEnabled]}
        placeholder="Ricerca Albergjkhi"
        placeholderTextColor="#707070"
        onChangeText={(text) => setSearch(text)}
        value={search}
        testID="searchInput"
        secureTextEntry={false}
        
        editable={true}
        />
        }
        
          <View style={styles.leftContainer}>
  {isHome === HOTEL || isHome === ROOMS  || isHome === ROOM ? (
    null
  ) : (
    <HeaderIcon path={image}/>
      )}
</View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSearchBar:{
    width:75,
    borderBottomWidth:1,
    borderColor:GRIGIO_SECONDARIO,

    justifyContent: 'space-between',
    paddingHorizontal:10,
    paddingVertical:7,
    flexDirection:'row',
    height:40
  },
  inputGenerico:{
    width:'100%',
    height:'100%',
    backgroundColor:'#EEEEEE',
    borderRadius:8,
    fontFamily:REGULAR,
    textAlign:'center'
  },
  input: {
    width: 296,
    height: 53,
    paddingLeft: 15,
    marginTop: 15,
    fontFamily: LIGHT,
    fontSize: 17,
    borderColor:GRIGIO_SECONDARIO,
    borderWidth:1,
    color: GRIGIO_PRIMARIO,
    marginBottom:15,
  },
  overlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 42,

  },
  headerText: {
    fontFamily: LIGHT,
    fontSize: 35,
  },
  nomeFs:{
    color: VERDE_PRIMARIO,
    marginLeft:-20

  },
  nomeNd:{
    color: MARRONE,

  },
  inputEnabled: {
    backgroundColor: 'white',
  },
  headerContainer: {
    width: "100%",
    height: 173,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 108,
    marginLeft: 15,
  },
  textJust: {
    fontSize: 30,
    fontFamily: EXTRABOLD,
    color: BLU_SECONDARIO,
  },
  textSea: {
    fontSize: 30,
    fontFamily: EXTRABOLD,
    color: '#F5CC00',
  },
  textAndImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  
  textStabilimento: {
    fontSize: 40,
    fontFamily: 'Nunito-Light',
    color: BLU_SECONDARIO,
  },
  textNumero:{
    fontSize: 30,
    fontFamily: 'Nunito-Light',
    color: '#7F7F7F',
  },
  textProfilo: {
    fontSize: 40,
    fontFamily: 'Nunito-Light',
    color: '#7F7F7F',
    marginLeft:-20
  },
  leftContainer:{
    marginRight: 20,

  },
  image: {
    width: 40,
    height: 40,
  },
});

export default Header;
