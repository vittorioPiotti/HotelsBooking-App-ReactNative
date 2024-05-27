



# Gestione Hotels

Applicazione Android e IOS per prenotare le stanze di un Hotel

### Indice

1. [Riepilogo Prodotto](#riepilogo-prodotto)
2. [Casi d'uso](#casi-duso)
3. [Riepilogo Tecnico](#riepilogo-tecnico)



---


<img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/header.png" alt="Icona" />


| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/onboarding.PNG" alt="Icona" width="200"/> | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/lista_alberghi.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/albergo_scelto.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/lista_stanze.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/errore_prenotazione_accesso.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/errore_lista_prenotazioni_accesso.PNG" alt="Icona" width="200"/>  |  <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/autenticazione.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/accesso.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/registrazione.PNG" alt="Icona" width="200"/>  | 
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | 
<img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/errore_disdici.PNG" alt="Icona" width="200"/>| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/prenota_stanza.PNG" alt="Icona" width="200"/>| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/errore_lista_prenotazio%20ni_nessuna.PNG" alt="Icona" width="200"/>| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/calendario.PNG" alt="Icona" width="200"/>| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/metodo_pagamento.PNG" alt="Icona" width="200"/>|  <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/checkout.PNG" alt="Icona" width="200"/>  | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/giusto_checkout.PNG" alt="Icona" width="200"/>  |    



---


## Riepilogo Prodotto 

### Prodotto

Applicazione Android e IOS per la prenotazione delle stanze di un hotel.

### Scopo

  Un cliente può prenotare la stanza di un albergo scegliendo tra le stanze degli alberghi forniti.


### Copyright

> [!CAUTION]
> L’utilizzo e la distribuzione dell’app o delle sue risorse può violare il copyright.
> Non è stata verificata la conformità dell’app e delle sue risorse alle varie licenze.
> Le immagini di hotel e stanze sono state scaricate da internet.
> Molte delle icone sono copie di quelle fornite da SF Symbols.


## Casi d'Uso

Le schermate sono state acquisite da dispositivo fisico IOS: Iphone 14 Plus

| Scegli Hotel| Scegli Stanza | Prenota | Scegli Data | 
| ------------ | ------------ | ------------ | ------------ | 
| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/lista_alberghi.PNG" alt="Icona" width="200"/> | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/lista_stanze.PNG" alt="Icona" width="200"/> | <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/checkout.PNG" alt="Icona" width="200"/>| <img src="https://github.com/vittorioPiotti/GestioneHotels/blob/main/project/screenshots/calendario.PNG" alt="Icona" width="200"/>| 
|1| 2 | 3 |  4 | 

1. L'utente sceglie l'hotel
2. L'utente sceglie la stanza
3. l'utente prenota
4. l'utente sceglie la data




## Riepilogo Tecnico

### Obbiettivo

App Multi Platform in React-Native che gestisce le richieste con un server web

### Tecnologie

Framework e linguaggi
  - React-native v.0.74.0
  - Typescript
    
Comunicazione con server web:
  -  Uso protocollo HTTPS
  -  Utilizzo di Fetch
  -  Sistena di API e Endpoints

### Testing


> [!TIP]
> iPhone 14 Plus ([video](https://drive.google.com/file/d/1GU0UdAivfWaAG_9hqdG9vJs4TBVn2FR_/view?pli=1))
> L’app è pronta per essere distribuita.



### Distribuzione Locale

  1. Si crea il progetto React-Native dalla guida [React-Native](https://reactnative.dev/docs/environment-setup)
  2. Si caricano i file sorgente sostituendo quelli già presenti
  3. Si segue la guida per il caricamento dei font ([link](https://medium.com/@lewie9021/custom-fonts-in-react-native-85d814ca084))
    

### Implementazioni Future

| | Routing tra le schermate| Richieste HTTPS| Token di accesso| Sicurezza dei dati|
| ------------| ------------ | ------------ | ------------ | ------------ | 
| Libreria | React Navigation| Axios| AsyncStorage| crypto-js|
| Attualmente | no | no | no | no |
| Versioni Future | si | si | si | si |





### Albero di Path

```bash
$ tree
.
└── src
    ├── assets 
    │   ├── fonts
    │   └── images
    ├── scripts
    │   ├── constants
    │   │   ├── activities.tsx
    │   │   ├── colors.tsx
    │   │   ├── connection.tsx
    │   │   ├── fonts.tsx
    │   │   ├── images.tsx
    │   │   └── screens.tsx
    │   ├── features
    │   │   ├── navigation
    │   │   │   ├── Books.tsx
    │   │   │   ├── Home.tsx
    │   │   │   ├── Hotel.tsx
    │   │   │   ├── Room.tsx
    │   │   │   └── Rooms.tsx
    │   │   ├── onboarding
    │   │   │   └── Preview.tsx
    │   │   └── profile
    │   │       ├── Auth.tsx
    │   │       ├── Profile.tsx
    │   │       ├── Settings.tsx
    │   │       └── SignIn.tsx
    │   └── layouts
    │       ├── Calendar.tsx
    │       ├── Footer.tsx
    │       ├── Header.tsx
    │       └── Modal.tsx
    └── App.tsx

```


