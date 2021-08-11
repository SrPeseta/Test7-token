# Test7-token

## Contrato

El contrato se encuentra [aquí](contract/Test7Token.sol)
Se trata de un contrato BEP20 al que se ha implementado el método de quema de tokens (que se llama burn). El método mint es el que permite emitir nuevos tokens.
El contrato está validado en esta dirección de la red de prueba de BSC [enlace BSCScan](https://testnet.bscscan.com/address/0x216ba6E5D9429Cc4f14B86Ab2C30d89Cc80F9C6c).
La dirección del contrato es: *0x216ba6E5D9429Cc4f14B86Ab2C30d89Cc80F9C6c*

## DApp

Para lanzar la DApp primero debemos cerciorarnos de que tenemos *Node.js* instalado en el dispositivo
```
node --version
v10.19.0
```
Después en la raíz del proyecto ejecutamos los siguientes comandos:
```
npm install
npm run server
```
Entramos en la aplicación y deberíamos poder los datos de balance de BNB y el token TST7: http://localhost:3000
