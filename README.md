# App — Ejercicio II de Shellcatch

Este proyecto corresponde al ejercicio 2 de la prueba técnica. Es una aplicación para Android hecha con React Native y JavaScript.

## ¿Qué hace la aplicación?

La aplicación tiene un menú con tres opciones:

- **Login:** una pantalla con campos de usuario y contraseña, sin iniciar sesión realmente.
- **Jokes:** mostrar un chiste de Chuck Norris y permitir pedir otro.
- **Wifi:** mostrar las redes Wi-Fi cercanas al teléfono.

El selector Idioma permite cambiar entre español, inglés y portugués sin reiniciar la aplicación. Traduce el menú, los campos, los botones y los mensajes. Los chistes conservan el texto original que devuelve la API y los nombres de las redes no se modifican. Al cerrar y volver a iniciar la aplicación, el idioma inicial es español.

## Lo que está listo

- El proyecto ya se instaló y se probó en un teléfono Android.
- El menú permite cambiar entre Login, Jokes y Wifi.
- El botón seleccionado se muestra en azul.
- Las tres pantallas tienen el mismo estilo de colores y tarjetas.
- Login tiene campos de usuario y contraseña, un botón para mostrar u ocultar la contraseña y el botón Ingresar. Es una interfaz visual: no exige reglas de complejidad ni valida credenciales. Al pulsar Ingresar, avisa que no se inició sesión porque es una demostración.

Jokes consulta un chiste al abrir la pantalla y permite pedir otro con Actualizar. Mientras espera, muestra un indicador de carga y desactiva el botón. Si falla la conexión o el servicio, muestra un mensaje y permite volver a intentarlo.

Wifi tiene un botón para escanear y una lista con el nombre, la señal y la frecuencia de cada red detectada. Usa `react-native-wifi-reborn` y solicita ubicación precisa antes de escanear. Se instaló el APK actualizado y se comprobó en el teléfono que aparecen las redes cercanas.

## Avances

- **Fase 1:** proyecto base y menú con las tres pantallas.
- **Fase 2:** Login de demostración completado. Se probó en el teléfono la contraseña oculta, Mostrar/Ocultar, el aviso de demostración y el desplazamiento con el teclado abierto.
- **Fase 3:** apartado de chistes completado. Se probó la carga, el botón Actualizar, el mensaje sin internet y la recuperación al volver a conectarse.
- **Avance 4:** librería Wi-Fi instalada y lista de redes reales implementada con FlatList. Se comprobó el escaneo en el teléfono.
- **Avance 5:** cambio entre español, inglés y portugués implementado y comprobado en el teléfono. Los textos de la interfaz cambian al momento; los chistes conservan el inglés original de la API.

## Archivos principales

- `App.js`: tiene el menú y decide qué pantalla mostrar.
- `screens/`: guarda el archivo de cada pantalla.
- `styles/theme.js`: reúne los colores y estilos que se usan en varias pantallas.
- `services/jokesApi.js`: hace la consulta al servicio de chistes y devuelve el texto recibido.
- `services/wifiService.js`: comprueba el permiso y el Wi-Fi, solicita el escaneo y ordena las redes por señal.
- `app.json`: contiene el nombre y la configuración de la aplicación.
- `translations/languages.js`: contiene los textos de los tres idiomas. App.js guarda la selección y pasa los textos a cada pantalla.
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
npm ci
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

Se usa Expo Development Build porque la librería Wi-Fi que pide el ejercicio, `react-native-wifi-reborn`, no funciona en Expo Go. Está instalada la versión 4.13.6 y configurada en `app.json`. Al añadirla o cambiar los permisos hay que generar de nuevo el proyecto Android con `npx expo prebuild --platform android --no-install` y recompilar la aplicación.

## ¿Necesita internet?

Para trabajar por USB no hace falta que el teléfono y la computadora estén conectados al mismo Wi-Fi. Si las librerías ya están instaladas, también se puede iniciar el proyecto sin internet:

```powershell
adb reverse tcp:8081 tcp:8081
$env:EXPO_OFFLINE = '1'
npm start
```

La versión de desarrollo necesita Metro abierto en la computadora. El APK de entrega incluye el código de la aplicación y se abre directamente desde el teléfono, sin servidor de desarrollo ni conexión USB.

Consultar chistes nuevos sí necesitará internet. Buscar redes Wi-Fi cercanas no requiere conectarse a ellas, pero sí aceptar los permisos que pida Android.

## Cómo probar lo que está listo

1. Abrir App. Si se usa el APK de desarrollo, mantener Metro funcionando; con el APK de entrega no hace falta.
2. Pulsar los botones Login, Jokes y Wifi.
3. Revisar que cambien el título y la descripción de la tarjeta.
4. Comprobar que solo el botón seleccionado quede azul.
5. En Login, escribir un usuario y una contraseña de prueba. Revisar que la contraseña aparezca oculta.
6. Pulsar Mostrar: la contraseña debe verse sin perder el texto escrito. Pulsar Ocultar para esconderla otra vez.
7. Pulsar Ingresar con el teclado abierto: debe cerrarse y aparecer el mensaje de que no se inició sesión porque es una demostración.
8. Con el teclado abierto, deslizar la pantalla hacia arriba: se debe poder llegar a Mostrar/Ocultar e Ingresar sin cerrar el teclado.
9. Abrir Jokes con internet: debe cargar un chiste. Pulsar Actualizar para hacer una nueva consulta.
10. Desactivar internet en el teléfono y pulsar Actualizar: debe aparecer un error, como máximo después de unos 15 segundos. Activar internet y volver a pulsar Actualizar para recuperarse.
11. En Wifi, activar Wi-Fi y ubicación, pulsar Escanear redes y permitir ubicación precisa. Deben aparecer las redes detectadas, ordenadas de mayor a menor señal.
12. Repetir con el Wi-Fi apagado o sin permiso de ubicación y comprobar que aparezca una indicación para corregirlo. Si se bloqueó el permiso, usar Abrir ajustes de la app.
13. Cambiar entre Español, English y Português en cada pantalla. Revisar los botones, los campos y los mensajes de error. Los chistes mantienen el inglés de la API.

La lista usa `FlatList`, el componente actual para listas de React Native. Los resultados son los que devuelve la librería; no se agregan redes de ejemplo. Android limita la frecuencia de los escaneos, por lo que conviene esperar entre intentos si rechaza uno.

## APK para la demostración

Con Java y Android SDK configurados como se explicó arriba, se puede compilar desde la carpeta del proyecto:

```powershell
npm ci
npx expo prebuild --platform android --no-install
$env:NODE_ENV = 'production'
.\android\gradlew.bat -p android app:assembleRelease -PreactNativeArchitectures=arm64-v8a
Remove-Item Env:NODE_ENV
```

El archivo se genera en `android/app/build/outputs/apk/release/app-release.apk`. Esta compilación es para teléfonos Android ARM de 64 bits, como el usado en las pruebas. Si se necesita otra arquitectura, hay que ajustar el parámetro de compilación.

Para esta entrega se generó también una copia llamada `App-Entrega.apk` en la carpeta del proyecto y en Descargas del teléfono. Se comprobó que incluye el código JavaScript, tiene una firma válida y usa la misma firma que la versión anterior para permitir actualizarla.

Para instalarlo, copiar el APK al teléfono, abrirlo desde Archivos y completar los avisos de Android. Si ya está instalada App, debe ofrecer actualizarla. Después se puede cerrar Metro y desconectar el USB para comprobar que abre por sí sola. La instalación y la prueba final de este APK están pendientes de confirmar.

Se utiliza la firma de depuración del proyecto para esta demostración técnica. Publicarlo en una tienda requeriría una clave de firma propia. El APK se entrega por separado; no se guarda como parte del código en Git.

## Revisión de dependencias

La revisión final con `npm audit` reportó 22 avisos: 7 moderados y 15 altos. La simulación de correcciones con `npm audit fix --dry-run` siguió mostrando los 22 avisos. Algunas soluciones propuestas cambian Expo o React Native por versiones mayores anteriores, por lo que no se aplicó `--force`. Queda pendiente resolver estos avisos con versiones compatibles y volver a probar antes de usar el proyecto en producción.

Aunque el punto 7 del ejercicio menciona servidor y página web, las funciones del ejercicio 2 corresponden a una aplicación móvil. Por eso este proyecto se centra en la app de React Native.
