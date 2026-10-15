# App — Ejercicio II de Shellcatch

Este proyecto corresponde al ejercicio 2 de la prueba técnica. Es una aplicación para Android hecha con React Native y JavaScript.

## ¿Qué hace la aplicación?

La aplicación tendrá un menú con tres opciones:

- **Login:** una pantalla con campos de usuario y contraseña, sin iniciar sesión realmente.
- **Jokes:** mostrar un chiste de Chuck Norris y permitir pedir otro.
- **Wifi:** mostrar las redes Wi-Fi cercanas al teléfono.

También se podrá cambiar el idioma entre español, inglés y portugués.

## Lo que está listo

- El proyecto ya se instaló y se probó en un teléfono Android.
- El menú permite cambiar entre Login, Jokes y Wifi.
- El botón seleccionado se muestra en azul.
- Las tres pantallas tienen el mismo estilo de colores y tarjetas.

Por ahora las pantallas solo muestran su título y una descripción. Todavía faltan los campos del login, la consulta de chistes, el escaneo Wi-Fi y el cambio de idioma.

## Archivos principales

- `App.js`: tiene el menú y decide qué pantalla mostrar.
- `screens/`: guarda el archivo de cada pantalla.
- `styles/theme.js`: reúne los colores y estilos que se usan en varias pantallas.
- `app.json`: contiene el nombre y la configuración de la aplicación.
- `package.json`: contiene las librerías y los comandos del proyecto.

## Cómo ejecutar el proyecto

Se necesita Node.js, Android Studio con las herramientas de Android y un teléfono conectado por USB con la depuración USB activada.

En Windows, estas líneas indican a la terminal dónde están Java y las herramientas de Android. Las rutas corresponden a la instalación usada en este proyecto:

```powershell
$env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
$env:ANDROID_HOME = "$env:USERPROFILE\AppData\Local\Android\Sdk"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"
```

Para instalar las librerías del proyecto y ejecutar la aplicación por primera vez:

```powershell
npm install
npm run android
```

Hay que aceptar los avisos de instalación que aparezcan en el teléfono. Si la instalación por USB queda esperando, se puede copiar el archivo `android/app/build/outputs/apk/debug/app-debug.apk` a Descargas del teléfono y abrirlo desde Archivos.

Si la aplicación ya está instalada, para volver a trabajar en ella:

```powershell
adb reverse tcp:8081 tcp:8081
npm start
```

El primer comando conecta el teléfono con el proyecto por USB. El segundo inicia Metro, que permite cargar el código desde la computadora y ver los cambios al guardar.

Después se abre **App** en el teléfono. Si pide la dirección del servidor, se escribe `http://127.0.0.1:8081`.

Se usa Expo Development Build porque la librería Wi-Fi que pide el ejercicio, `react-native-wifi-reborn`, no funciona en Expo Go. Esa librería se agregará cuando se trabaje en la pantalla Wifi.

## ¿Necesita internet?

Para trabajar por USB no hace falta que el teléfono y la computadora estén conectados al mismo Wi-Fi. Si las librerías ya están instaladas, también se puede iniciar el proyecto sin internet:

```powershell
adb reverse tcp:8081 tcp:8081
npm start -- --offline
```

La versión actual necesita que Metro siga abierto en la computadora. Para la entrega se preparará otra versión que se pueda abrir directamente desde el teléfono. Esa versión todavía está pendiente.

Consultar chistes nuevos sí necesitará internet. Buscar redes Wi-Fi cercanas no requiere conectarse a ellas, pero sí aceptar los permisos que pida Android.

## Cómo probar lo que está listo

1. Abrir App con Metro funcionando.
2. Pulsar los botones Login, Jokes y Wifi.
3. Revisar que cambien el título y la descripción de la tarjeta.
4. Comprobar que solo el botón seleccionado quede azul.

## Pendientes antes de la entrega

- Completar las funciones de cada pantalla y los idiomas.
- Revisar los avisos de seguridad que mostró npm al instalar las librerías.
- Preparar y probar la versión que funcionará sin la computadora.
- Actualizar este README con los avances.

Aunque el punto 7 del ejercicio menciona servidor y página web, las funciones del ejercicio 2 corresponden a una aplicación móvil. Por eso este proyecto se centra en la app de React Native.
