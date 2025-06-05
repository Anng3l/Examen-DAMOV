# Rick & Morty News Forum App 🛸📰

Esta es una aplicación móvil construida con **Ionic** y **Angular** que permite a los usuarios explorar personajes de *Rick and Morty*, crear noticias basadas en ellos y compartirlas en una especie de foro social.

## 📱 Características principales

- 🔐 **Autenticación con Firebase**
- 🌌 **Consumo de la API pública de Rick and Morty**
- 📝 **Creación de noticias sobre personajes**
- 💬 **Foro estilo "chat" para ver noticias creadas**
- 📷 **Subida de fotos mediante Supabase Storage**
- 🏠 **Navegación entre páginas: Home, Detalles y Chat**

---

## 📂 Estructura de páginas

### `Home`
- Lista todos los personajes obtenidos desde la API de Rick and Morty.
- Permite seleccionar un personaje para ver sus detalles.

### `Detalles`
- Muestra información detallada del personaje seleccionado.
- Permite escribir una noticia/comentario sobre ese personaje.
- Se puede subir una foto para acompañar la noticia.

### `Chat`
- Visualiza todas las noticias creadas por los usuarios, a modo de foro.
- Cada card muestra:
  - Foto de perfil del usuario.
  - Fecha de publicación.
  - Comentario y foto subida.
  - Orden cronológico (de más reciente a más antiguo).

---

## ⚙️ Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
