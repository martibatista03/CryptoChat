
# CryptoChat
CryptoChat és una aplicació web de missatgeria en directe on totes les dades transmeses a través d'ella són encriptades amb una nova proposta de sistema de xifratge, la qual està fonamentada en els dos coneguts criptosistemes RSA i ElGamal. 

Per a més informació tant del funcionament d'aquesta nova proposta de criptosistema com del funcionament en sí de CryptoChat recomano consultar la memòria escrita del meu Treball de Recerca.

Disponible seguint la direcció web [https://cryptochat.es/](https://cryptochat.es/) o escanejant el següent codi QR:

<div align="center">
  <img width="160" src="https://github.com/martibatista03/CryptoChat/blob/master/public/imatges/QRcryptochat.png" alt="CryptoChat"/>
</div>

## Tecnologies emprades
CryptoChat ha estat desenvolupada amb les següents tecnologies:

* Node.js - versió 12.16.2
* Express - versió 4.17.1
* Socket.io - versió 2.3.0

## Instal·lació
1. Clona el repositori a través de [Git](https://git-scm.com/) o descarrega el fitxer Zip.
2. Instal·la [Node.js](https://nodejs.org/en/).
3. Accedeix amb la terminal al nou directori i executa ```npm install```.
4. Tot seguit, executa ```npm start``` (per a inicialitzar el servidor local) o bé ```npm run dev``` (en cas de voler inicialitzar el servidor local amb la dependència de [nodemon](https://www.npmjs.com/package/nodemon)).
5. Per últim, accedeix a l'aplicació des de qualsevol navegador a través de la direcció [http://localhost:3000/](http://localhost:3000/).
