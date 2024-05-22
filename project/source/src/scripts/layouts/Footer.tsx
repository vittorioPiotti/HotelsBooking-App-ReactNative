/**
 * @access public
 * @package src.scripts.layouts
 * @author Vittorio Piotti
 * @class Footer.tsx
 * @description Footer con azione al click sulle icone delle schermate per cambiare schermata
*/

//native
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

//constants
import {_IMG04,_IMG05,_IMG03,_IMG06,_IMG10,_IMG15,IMG04,IMG05,IMG03,IMG06,IMG99,_IMG99,IMG10,IMG15,GLITCH} from '../constants/images'; 

const FooterIcon = ({ path }: { path: number}) => {
        return  <Image 
                    source={
                        path == _IMG03 ? IMG03
                        :
                        path == _IMG04 ? IMG04
                        :
                        path == _IMG05 ? IMG05
                        : 
                        path == _IMG06 ? IMG06
                        :
                        path == _IMG10 ?IMG10
                        :
                        path == _IMG15 ?IMG15
                        :
                        path == _IMG99 ? IMG99
                        :
                        GLITCH
                    } 
                    style={styles.image} 
                    resizeMode="contain"
                />;
};

const Footer = (
  { imagePaths,
    onPressImage 
  }
  : {  
    imagePaths: { click:boolean, index: number; path: any }[],
    onPressImage: (index: number) => void
  }
) => {

  
  return (
    <View style={styles.footer}>
      <View style={styles.innerContainer}>
        {imagePaths.map(({ click, index, path }) => (
          click ? (
            <TouchableOpacity key={index} onPress={() => onPressImage(index)}>
              <FooterIcon path={path}/>
            </TouchableOpacity>
          ) : (
            <View key={index} style={styles.imagePlaceholder}>
               <FooterIcon path={path}/>
            </View>
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '93%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  imagePlaceholder: {
    width: 35,
    height: 35,
    marginRight: 20,
  },
  innerContainer: {
    width: '85%',
    height: 57,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Footer;