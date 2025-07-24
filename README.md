# Estructura del Proyecto

```text
src/
  components/
    Auth/                # Componentes de autenticación (formularios, iconos)
    Input/               # Campos de entrada reutilizables
    Loading/             # Indicadores de carga
  pages/
    Auth/                # Páginas de login y registro
    Dashboard/           # Página principal tras login
    Home/                # Página de inicio
    NotFound/            # Página de error 404
  hooks/                 # Hooks personalizados (auth, registro, etc)
  shared/
    models/              # Modelos y tipos para datos y formularios
    services/            # Funciones para llamadas a APIs/endpoints
    validationSchemas/   # Esquemas Yup para validación de formularios
    utils/               # Utilidades generales (ej: manejo de token, toasts)
  store/                 # Redux store y slices
  routes/                # Definición de rutas y rutas protegidas
  config/                # Constantes y configuración global
  assets/
    icons/               # Iconos SVG
    images/              # Imágenes y logos
public/                  # Archivos públicos y estáticos
vite.config.ts           # Configuración de Vite y alias
tsconfig*.json           # Configuración de TypeScript y paths
eslint.config.js         # Configuración de ESLint
prettier.config.cjs      # Configuración de Prettier
README.md                # Documentación del proyecto
```

Cada carpeta y archivo está organizado para separar la lógica de negocio, componentes visuales, configuración y utilidades, facilitando el mantenimiento y escalabilidad del proyecto.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
