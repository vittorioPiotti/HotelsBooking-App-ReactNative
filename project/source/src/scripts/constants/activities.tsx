/**
 * @access public
 * @package src.scripts.constants
 * @author Vittorio Piotti
 * @script activities.tsx
 * @description costanti di referenza alle attività dell'albergo
*/

export const ACT01:number = 1;                              //prenota stanze 
export const ACT02:number = 2;                              //ristorante 
export const ACT03:number = 3;                              //bar 
export const ACT04:number = 4;                              //eventi 
export const ACT05:number = 5;                              //sport 


export const ACT01NAME:string = "Stanze";                    //prenota stanze 
export const ACT02NAME:string = "Ristorante";                //ristorante 
export const ACT03NAME:string = "Bar";                       //bar 
export const ACT04NAME:string = "Eventi";                    //eventi 
export const ACT05NAME:string = "Sport";                     //sport 


export const NUMACT:number = 5;                             //numero attività
export const ACTS:number[] = [ACT01,ACT02,ACT03,ACT04,ACT05]; //array di attività


export const ACTSNAME = {
    [ACT01]: ACT01NAME,
    [ACT02]: ACT02NAME,
    [ACT03]: ACT03NAME,
    [ACT04]: ACT04NAME,
    [ACT05]: ACT05NAME
};

//referenze
export const _ACT01:number = 0;                              
export const _ACT02:number = 1;                             
export const _ACT03:number = 2;                             
export const _ACT04:number = 3;                             
export const _ACT05:number = 4;                        
