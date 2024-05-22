/**
 * @access public
 * @package src.scripts.constants
 * @author Vittorio Piotti
 * @class interfaces.tsx
 * @description Interfacce utilizzate
*/

import { ImageSourcePropType } from 'react-native';

export interface Hotel {
    id: number;
    name: string;
    image: ImageSourcePropType; 
    description: string;
    idAdmin: number; 
    totalRooms: number;
    availability: number;
  }
  
export interface Room {
    id: number;
    name: string;
    image: ImageSourcePropType; 
    description: string;
    number: number;
    cost: number;
    totalRooms: number;
    availability: number;
  }
  

  export interface Book {
    bookingId: number;
    bookingStartDate: Date;
    bookingEndDate: Date;
    bookingRoomNumber: number;
    roomName: string;
    totalCost: number;
    roomHotelId: number;
    hotelName: string;
    clientId: number; 
    clientName: string;
  }
  
  
  
  export interface User {
    id: number;
    email: string;
    password: string;
  }