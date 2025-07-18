import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Dependencies
      "node_modules/**",
      ".pnp/**",
      ".pnp.js",
      
      // Production builds
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      
      // Cache directories
      ".eslintcache",
      "*.tsbuildinfo",
      ".nyc_output/**",
      "coverage/**",
      
      // Environment files
      ".env*",
      
      // Temporary folders
      "tmp/**",
      "temp/**",
      
      // OS generated files
      ".DS_Store",
      "Thumbs.db",
      
      // IDE files
      ".vscode/**",
      ".idea/**",
      "*.swp",
      "*.swo",
      
      // Log files
      "logs/**",
      "*.log",
      
      // Build outputs
      "public/build/**"
    ],
    rules: {
      // Configuraciones para compatibilidad Windows/Linux
      "linebreak-style": "off", // Deshabilitado para evitar conflictos entre SO
      "eol-last": "off", // Evitar problemas con finales de línea
      
      // Configuraciones para Next.js y TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      
      // Configuraciones para imports y archivos
      "import/no-unresolved": "off", // Next.js maneja los imports
      "import/extensions": "off",
      
      // Configuraciones para código más limpio
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "error",
      
      // Evitar errores comunes en Windows/Linux
      "no-path-concat": "error", // Usar path.join() en lugar de concatenación
      "prefer-template": "warn" // Usar template literals
    },
    settings: {
      "import/resolver": {
        "typescript": {
          "alwaysTryTypes": true,
          "project": "./tsconfig.json"
        }
      }
    }
  }
];

export default eslintConfig;
