<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Microservicio de Productos

Este es un microservicio desarrollado con NestJS para la gestión de productos.

## Requisitos Previos

- Node.js (versión 16 o superior)
- pnpm (gestor de paquetes)
- Docker (opcional, para la base de datos)

## Instalación

1. Clonar el repositorio:
```bash
git clone [https://github.com/Nest-Microservices-PabloH/products-microservice.git]
cd products-ms
```

2. Instalar dependencias:
```bash
pnpm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus configuraciones específicas.

4. Inicializar la base de datos (si estás usando Prisma):
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

## Ejecución del Proyecto

### Desarrollo
Para ejecutar el proyecto en modo desarrollo:
```bash
pnpm start:dev
```

## Estructura del Proyecto

```
src/
├── main.ts              # Punto de entrada de la aplicación
├── app.module.ts        # Módulo principal
├── products/            # Módulo de productos
│   ├── dto/            # Objetos de transferencia de datos
│   ├── entities/       # Entidades
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
└── prisma/             # Configuración de Prisma
```