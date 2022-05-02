# API PARA COMPARTIR ENLACES

API para compartir enlaces.

## Entidades

### -Users:
- id-----------*(se genera automáticamente)*
- name---------*(obligatorio, se pone el nick_name si el usuario no aporta uno)*
- avatar-------*(obligatorio, se pone uno por defecto si el usuario no aporta uno, si se aporta se encripta con nano)*
- nick_name----*(obligatorio y único)*
- email--------*(obligatorio y único)*
- password-----*(obligatorio y encryptado con bcrypt)*
- created_at---*(se genera automáticamente)*

### -Links:
- id-----------*(se genera automáticamente)*
- user_id------*(obligatorio)*
- titulo-------*(obligatorio, maximo 30 caracteres)*
- url----------*(obligatorio)*
- description--*(obligatorio, maximo 280 caracteres)*
- created_at---*(se genera automáticamente)*

## Endpoints

### -**POST /user** Registro de usuario✔
#### -VALIDACIÓN✔
- **Name:** *opcional*
  -*Minimo 5 y maximo 10 caracteres*
- **Nick_name:**
  -*Minimo 5 y maximo 10 caracteres*
  -*Debe de ser único*
- **Email:**
  -*Debe ser un email valido*
  -*Debe de ser único*
- **Password:**
  -*Minimo 5 y maximo 10 caracteres*

### -**POST /login** Login de usuario (devuelve token)✔
#### -VALIDACIÓN✔
- **Email:**
  -*Tiene qe existir en la base de datos*
- **Password:**
  -*tiene que ser el correcto para el nick_name*

### -**GET /user/:id** Devuelve información de usuario✔
#### -VALIDACIÓN✔
- **User_id:**

### -**POST /** Permite crear un link✔
#### -VALIDACIÓN✔
- **User_id:**
  -*Necesario token*
- **Titulo:**
  -*Debe debe tener 30 caracteres como máximo*
- **Url:**
  -*Debe ser una url valida*
- **Description:**
  -*Debe debe tener 280 caracteres como máximo*

### -**GET /** Lista todos los Links✔
#### -VALIDACIÓN✔
  -*No necesita ninguna validación*

### -**GET /link/:id** Deveuelve un link✔
#### -VALIDACIÓN✔
- **id:**

### -**DELETE /tweet/:id** Borra un link sólo si eres quien lo creó✔
#### -VALIDACIÓN✔
- **id:**
- **User_id:**
  -*Necesario token*
