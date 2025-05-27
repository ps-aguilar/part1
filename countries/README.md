Countries App – Parte 2 del Curso Full Stack
Esta aplicación permite buscar información de países y visualizar detalles relevantes como su capital, área, idiomas, bandera e incluso el clima actual en su ciudad capital.

🔎 Funcionalidades
Búsqueda dinámica de países a través de un input de texto.

Muestra diferentes comportamientos según el número de coincidencias:

Si hay más de 10 países: muestra advertencia para refinar la búsqueda.

Si hay de 2 a 10 países: lista los países con un botón show.

Si hay 1 país o se presiona show: muestra detalles del país.

Clima actual de la capital usando la API de OpenWeatherMap.

📦 Tecnologías utilizadas
React + Vite

Axios para peticiones HTTP

API de Rest Countries

API de OpenWeatherMap

🔐 Uso de variables de entorno
Para proteger tu clave de OpenWeatherMap:

Crea un archivo .env.local en la raíz del proyecto.

Agrega tu clave API así:

env
Copiar
Editar
VITE_WEATHER_KEY=tu_clave_aquí
⚠️ Este archivo ya está en .gitignore, por lo que no se subirá a GitHub ni debe compartirse.

⚠️ Si tu clave no funciona de inmediato, espera unos minutos. A veces las claves recién generadas tardan un poco en activarse.

💡 Cómo ejecutar localmente
bash
Copiar
Editar
# Clonar repositorio
git clone https://github.com/usuario/repositorio.git

# Entrar al proyecto
cd countries

# Instalar dependencias
npm install

# Crear archivo .env.local con tu clave API
echo "VITE_WEATHER_KEY=tu_clave" > .env.local

# Iniciar servidor de desarrollo
npm run dev