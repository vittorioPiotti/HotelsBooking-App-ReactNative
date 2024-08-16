/**
 * @access public
 * @package src.scripts.constants
 * @author Vittorio Piotti
 * @script images.tsx
 * @description costanti dei path delle immagini e delle referenze ai path
*/

//ImageSourcePropType definisce  il dato come fonte di immagine 
import { ImageSourcePropType } from 'react-native';


const IMGPATH:string = '../../assets/images/';                              //radice del percorso 

//sfondi
export const BG01: ImageSourcePropType = require(`${IMGPATH}bg01.png`);     //sfondo standard
export const BG02: ImageSourcePropType = require(`${IMGPATH}bg02.png`);     //sfondo autenticazione
export const BG03: ImageSourcePropType = require(`${IMGPATH}bg03.png`);     //sfondo accesso
export const BG04: ImageSourcePropType = require(`${IMGPATH}bg04.png`);     //sfondo registrazione
export const BG05: ImageSourcePropType = require(`${IMGPATH}bg05.png`);     //vedi informazioni profilo
export const BG06: ImageSourcePropType = require(`${IMGPATH}bg06.png`);     //modifica informazioni profilo
export const BG07: ImageSourcePropType = require(`${IMGPATH}bg07.png`);     //impostazioni profilo
export const BG08: ImageSourcePropType = require(`${IMGPATH}bg08.png`);     //impostazioni profilo
export const BG10: ImageSourcePropType = require(`${IMGPATH}bg10.png`);     //impostazioni profilo

//immagini
export const IMG07: ImageSourcePropType = require(`${IMGPATH}google.png`)    //logo google
export const IMG10: ImageSourcePropType = require(`${IMGPATH}arrowshape.turn.up.left.jpg`);   //indietro grigio

export const IMG51: ImageSourcePropType = require(`${IMGPATH}arrowshape.turn.up.left.blue.jpg`);   //indietro blue
export const IMG52: ImageSourcePropType = require(`${IMGPATH}info.circle.blue.jpg`);   //info blu
export const IMG53: ImageSourcePropType = require(`${IMGPATH}clock.link.png`);   //orologio link
export const IMG54: ImageSourcePropType = require(`${IMGPATH}location.circle.link.png`);   //navigation link
export const IMG55: ImageSourcePropType = require(`${IMGPATH}phone.circle.link.png`);   //phone link
export const IMG56: ImageSourcePropType = require(`${IMGPATH}location.circle.blue.png`);   //navigation blue
export const IMG57: ImageSourcePropType = require(`${IMGPATH}map.png`);   //mappa 

export const IMG66: ImageSourcePropType = require(`${IMGPATH}lessthan.circle.png`);   //freccia destra
export const IMG67: ImageSourcePropType = require(`${IMGPATH}greaterthan.circle.png`);   //freccia sinistra

export const IMG70: ImageSourcePropType = require(`${IMGPATH}calendar.jpg`);   //calendario
export const IMG71: ImageSourcePropType = require(`${IMGPATH}paypal.png`);   //logo paypal
export const IMG72: ImageSourcePropType = require(`${IMGPATH}credit-card.jpg`);   //icona carta di credito

export const IMG89: ImageSourcePropType = require(`${IMGPATH}exclamation.triangle.fill.png`);//icona avvertimento

export const IMG73: ImageSourcePropType = require(`${IMGPATH}visa.png`);   //logo visa
export const IMG74: ImageSourcePropType = require(`${IMGPATH}mastercard.png`);   //logo mastercard
export const IMG75: ImageSourcePropType = require(`${IMGPATH}americanExpress.png`);   //american express

export const IMG80: ImageSourcePropType = require(`${IMGPATH}chevron.up.chevron.down.jpg`);   //freccia in basso 


export const IMG16: ImageSourcePropType = require(`${IMGPATH}magnifyingglass.jpg`);   //lente di ingrandimento
export const IMG21: ImageSourcePropType = require(`${IMGPATH}star.fill.jpg`);   //stella none
export const IMG22: ImageSourcePropType = require(`${IMGPATH}star.fill.yellow.jpg`);   //stella 


//features
export const IMG03: ImageSourcePropType = require(`${IMGPATH}person.jpg`);   //profilo
export const IMG04: ImageSourcePropType = require(`${IMGPATH}person.fill.jpg`);   //profilo fill
export const IMG05: ImageSourcePropType = require(`${IMGPATH}location.jpg`);   //navigazione
export const IMG15: ImageSourcePropType = require(`${IMGPATH}location.fill.jpg`);   //navigazione fill
export const IMG06: ImageSourcePropType = require(`${IMGPATH}cart.jpg`);   //carrello
export const IMG99: ImageSourcePropType = require(`${IMGPATH}cart.fill.jpg`);   //carrello

//attivita
export const IMG23: ImageSourcePropType = require(`${IMGPATH}fork.knife.jpg`);   //ristorante none
export const IMG28: ImageSourcePropType = require(`${IMGPATH}fork.knife.blue.jpg`);   //ristorante 
export const IMG24: ImageSourcePropType = require(`${IMGPATH}cup.and.saucer.jpg`);   //bar none
export const IMG29: ImageSourcePropType = require(`${IMGPATH}cup.and.saucer.blue.jpg`);   //bar 
export const IMG25: ImageSourcePropType = require(`${IMGPATH}party.popper.jpg`);   //eventi none
export const IMG30: ImageSourcePropType = require(`${IMGPATH}party.popper.blue.jpg`);   //eventi 
export const IMG26: ImageSourcePropType = require(`${IMGPATH}sportscourt.jpg`);   //sport none
export const IMG31: ImageSourcePropType = require(`${IMGPATH}sportscourt.blue.jpg`);   //sport 
export const IMG40: ImageSourcePropType = require(`${IMGPATH}bed.double.jpg`);   //stanze none
export const IMG41: ImageSourcePropType = require(`${IMGPATH}bed.double.blue.jpg`);   //stanze 



//social
export const IMG35: ImageSourcePropType = require(`${IMGPATH}facebook.png`);   //facebook
export const IMG36: ImageSourcePropType = require(`${IMGPATH}instagram.png`);   //instagram
export const IMG37: ImageSourcePropType = require(`${IMGPATH}twitter.png`);   //twitter 

//icone feedback
export const IMG11: ImageSourcePropType = require(`${IMGPATH}x.circle.png`);   //operazione errata
export const IMG12: ImageSourcePropType = require(`${IMGPATH}checkmark.circle.png`);   //operazione eseguita 

//loghi
export const LOGO: ImageSourcePropType = require(`${IMGPATH}logomd.png`);   //logo 

//errore 
export const GLITCH: ImageSourcePropType = require(`${IMGPATH}glitch.png`)   //errore caricamento immagine

//referenze
export const _IMG07:number = 7;
export const _IMG03:number = 3;
export const _IMG04:number = 4;
export const _IMG05:number = 5;
export const _IMG06:number = 6;
export const _IMG10:number = 10;
export const _IMG15:number = 15;
export const _IMG16:number = 16;
export const _IMG11:number = 11;
export const _IMG12:number = 12;
export const _IMG21:number = 21;
export const _IMG22:number = 22;
export const _IMG23:number = 23;
export const _IMG28:number = 28;
export const _IMG24:number = 24;
export const _IMG29:number = 29;
export const _IMG25:number = 25;
export const _IMG30:number = 30;
export const _IMG26:number = 26;
export const _IMG31:number = 31;
export const _IMG35:number = 35;
export const _IMG36:number = 36;
export const _IMG37:number = 37;
export const _IMG99:number = 99;   //carrello





