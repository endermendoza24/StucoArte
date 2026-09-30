# StucoArte 🇳🇮 - Estuco, Texturas & Acabados Arquitectónicos

Sitio web oficial de **StucoArte**, empresa nicaragüense especializada en la aplicación de estuco arquitectónico, texturas decorativas en tonos tierra y arcilla, molduras, frisos y enmarcados, con una destacada especialidad en acabados coloniales y rústicos para residencias, fachadas, terrazas y ranchos campestres.

- **Página oficial de Facebook:** [facebook.com/StucoArte](https://www.facebook.com/StucoArte)
- **WhatsApp Oficial:** [+505 83771116](https://wa.me/50583771116)

Desarrollado exclusivamente con tecnologías nativas web: **HTML5, CSS3 y JavaScript Vanilla puro**, sin frameworks ni dependencias. Optimizado para visualización estática local y despliegue inmediato en **GitHub Pages**.

---

## 📁 Estructura del Proyecto

```text
StucosDeNicaragua/
├── index.html          # Estructura semántica, SEO y contenidos oficiales de StucoArte
├── css/
│   └── style.css       # Paleta cálida y noble (teja, ocre, cal y madera), diseño responsive y animaciones
├── js/
│   └── script.js       # Menú móvil, galería con lightbox y generador de mensajes a WhatsApp
├── images/
│   ├── logo.png                     # Logotipo oficial circular (Web y Favicon)
│   ├── logo-facebook.jpg            # Logotipo de alta resolución para avatar de Facebook
│   ├── fachada-villa-blanca.jpg     # Foto real: Fachada de villa residencial moderna
│   ├── muro-estuco-terracota.jpg    # Foto real: Muro interior de acento en arcilla
│   ├── rancho-estuco-organico.jpg   # Foto real: Muros orgánicos y rancho campestre
│   ├── terraza-estuco-arena.jpg     # Foto real: Corredor colonial en tono arena
│   └── residencia-estuco-tropical.jpg # Foto real: Fachada exterior con molduras
└── README.md           # Documentación y guía de despliegue a GitHub Pages
```

---

## 🎨 Paleta de Color: Inspiración Arquitectónica y Materiales Nobles

```css
:root {
  --color-primary: #964326;       /* Teja y arcilla profunda */
  --color-primary-light: #B85836; /* Arcilla tostada clara */
  --color-primary-dark: #6E2B16;  /* Almagre y barro cocido */
  --color-ochre: #C88A42;         /* Ocre mineral cálido */
  --color-ochre-light: #E0A765;   /* Reflejo ocre al sol */
  --color-dark: #1A1412;          /* Madera oscura / Hierro forjado */
  --color-dark-surface: #261F1B;  /* Superficie de tarjetas */
  --color-sand: #ECE2D0;          /* Mortero y arena caliza cálida */
  --color-sand-light: #F8F4EC;    /* Cal apagada / Blanco cálido */
  --color-white: #FFFFFF;
}
```

---

## 🏛️ Especialidades de StucoArte

1. **Estuco para Fachadas Residenciales:** Revestimiento exterior continuo, impermeable y de alta durabilidad.
2. **Muros de Acento & Texturas Interiores:** Relieves decorativos y diseño visual para salas, comedores y lobbies.
3. **Acabados Coloniales & Rústicos:** Estética clásica y atemporal en armonía con madera y teja.
4. **Terrazas, Ranchos & Muros Orgánicos:** Bordes continuos y curvas suaves para áreas de descanso al aire libre.
5. **Molduras, Frisos & Enmarcados:** Diseños geométricos, cornisas y enmarcados de ventanas y puertas.
6. **Sellado & Protección de Acabados:** Sellado transparente mate que preserva el color y previene manchas de humedad.

---

## 🚀 Cómo Subir a GitHub y Activar GitHub Pages

1. **Crear repositorio en GitHub:**
   - Entra a [github.com](https://github.com) y crea un nuevo repositorio público (ejemplo: `stucoarte-nicaragua`).

2. **Subir los archivos mediante terminal:**
   En la carpeta del proyecto, ejecuta:
   ```bash
   git init
   git add .
   git commit -m "Lanzamiento web oficial StucoArte con enfoque arquitectónico integral"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/stucoarte-nicaragua.git
   git push -u origin main
   ```

3. **Activar GitHub Pages:**
   - Ve a tu repositorio de GitHub > **Settings** > **Pages**.
   - En **Source**, selecciona `Deploy from a branch`.
   - En **Branch**, selecciona `main` y la carpeta `/ (root)`.
   - Haz clic en **Save**. En un par de minutos tu página estará activa en:
     `https://TU-USUARIO.github.io/stucoarte-nicaragua/`
