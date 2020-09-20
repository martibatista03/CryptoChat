
# CryptoChat
CryptoChat és una aplicació web de missatgeria en directe on totes les dades transmeses a través d'ella són encriptades amb una nova proposta de sistema de xifratge, la qual està fonamentada en els dos coneguts criptosistemes RSA i ElGamal. 

Per a més informació tant del funcionament d'aquesta nova proposta de criptosistema com del funcionament en sí de CryptoChat recomano consultar la memòria escrita del meu Treball de Recerca.

Disponible seguint la direcció web [https://cryptochat.es/](https://cryptochat.es/) o escanejant el següent codi QR:

<div align="center">
  <img width="160" src="https://i.imgur.com/EWWmCzW.png"/>
</div>

## Tecnologies emprades
CryptoChat ha estat desenvolupada amb les següents tecnologies:

* Node.js - versió 12.16.2
* Express - versió 4.17.1
* Socket.io - versió 2.3.0

## Instal·lació i ús
1. Clona el repositori a través de [Git](https://git-scm.com/) o descarrega el fitxer Zip.
2. Instal·la [Node.js](https://nodejs.org/en/).
3. Accedeix amb la terminal al nou directori i executa ```npm install```.
4. Tot seguit, executa ```npm start``` (per a inicialitzar el servidor local) o bé ```npm run dev``` (en cas de voler inicialitzar el servidor local amb la dependència de [nodemon](https://www.npmjs.com/package/nodemon)).
5. Per últim, accedeix a l'aplicació des de qualsevol navegador a través de la direcció [http://localhost:3000/](http://localhost:3000/).

## Exemple d'ús
Per a poder comprovar en primera persona el funcionament de CryptoChat poden seguir-se els següents passos:

1. Accedeix a CryptoChat des de dues diferents pestanyes de qualsevol navegador (ja sigui des de dos diferents dispositius o des d'un mateix).

<br />

<div align="center">
  <span> <img width="160" src="https://i.imgur.com/QvBLt5E.png" alt="CryptoChat"/> </span>
  <span> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </span>
  <span> <img width="160" src="https://i.imgur.com/QvBLt5E.png" alt="CryptoChat"/> </span>
</div>

<br />

2. Introdueix un nom d'usuari qualsevol de més de 3 caràcters a cadascuna de les pestanyes (per exemple, <i> usuari1 </i> i <i> usuari2 </i>). Tot seguit, escull un nom de sala qualsevol de més de 5 caràcters (en aquest cas comú en totes dues pestanyes) i presiona el botó <i> Entra </i>, arribant així a la següent pantalla:

<br />

<div align="center">
  <span> <img width="160" src="https://i.imgur.com/jnvJBLH.png" alt="CryptoChat"/> </span>
  <span> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </span>
  <span> <img width="160" src="https://i.imgur.com/jnvJBLH.png" alt="CryptoChat"/> </span>
</div>

<br />
