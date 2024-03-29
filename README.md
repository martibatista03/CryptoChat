
# CryptoChat
CryptoChat és una aplicació web de missatgeria en directe on totes les dades transmeses a través d'ella són encriptades amb una nova proposta de sistema de xifratge, la qual està fonamentada en els dos coneguts criptosistemes RSA i ElGamal. 

Per a més informació tant del funcionament d'aquesta nova proposta de criptosistema com del funcionament en sí de CryptoChat recomano consultar la memòria escrita del meu Treball de Recerca.

CryptoChat es troba disponible seguint la direcció web [https://crypto-chat.onrender.com/](https://crypto-chat.onrender.com/) o escanejant el següent codi QR:

<div align="center">
  <img width="160" src="https://user-images.githubusercontent.com/71564709/214841516-87c1596f-0f88-4445-9730-32f33094011a.png"/>
</div>

## Tecnologies utilitzades
CryptoChat ha estat desenvolupada amb les següents tecnologies:

* [Node.js](https://nodejs.org/en/) - versió 12.16.2
* [Express](https://expressjs.com/) - versió 4.17.1
* [Socket.io](https://socket.io/) - versió 2.3.0

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

3. En aquest punt, els usuaris inicien la seva comunicació en xarxa, iniciant tot el protocol d'intercanvi de claus i xifratge, primer amb el servidor i després amb l'altre usuari. Un cop finalitzat aquest procés, tots dos usuaris finalment podràn accedir al xat:

<br />

<div align="center">
  <span> <img width="160" src="https://i.imgur.com/evchnCV.png" alt="CryptoChat"/> </span>
  <span> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </span>
  <span> <img width="160" src="https://i.imgur.com/evchnCV.png" alt="CryptoChat"/> </span>
</div>

<br />

4. Un cop al xat, tots dos usuaris podràn enviar i rebre missatges encriptats en temps real. En aquest moment, en cas de que un dels dos usuaris decideixi abandonar la sala, l'altre executarà un refresh de la pàgina, tornant així a l'estat descrit anteriorment, a l'espera d'intercanviar les claus de xifratge amb el proper usuari que hi entri.

<br />

<div align="center">
  <span> <img width="160" src="https://i.imgur.com/QvBLt5E.png" alt="CryptoChat"/> </span>
  <span> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </span>
  <span> <img width="160" src="https://i.imgur.com/jnvJBLH.png" alt="CryptoChat"/> </span>
</div>

<br />

## Llicència
Copyright © 2020 Martí Batista Obiols

Tot el codi disponible en aquest repositori es troba sota la llicència GNU General Public License, versió 3 (per a més informació, consultar el fitxer [LICENSE](https://github.com/martibatista03/CryptoChat/blob/master/LICENSE)).

## Contacte
Pots posar-te en contacte amb l'autor a través de la següent adreça de correu electrònic: [martibatista03@gmail.com](mailto:martibatista03@gmail.com)
