# 📱 Calculadora con React Native + Expo

Este proyecto implementa una calculadora básica utilizando **React Native** con el framework **Expo**.  
El objetivo es replicar las funciones principales de una calculadora estándar (suma, resta, multiplicación, división, limpiar, cambiar signo, borrar dígitos, etc.) siguiendo un enfoque modular y reutilizable.

---

## 🛠️ Arquitectura general

La aplicación se divide en dos capas principales:

1. **UI (Interfaz de usuario)**  
   - Componentes de React Native (botones, pantalla, contenedor).  
   - Muestra los números, la fórmula en curso y el subresultado.  

2. **Lógica (Hook `useCalculator`)**  
   - Encapsula todo el estado y las operaciones de la calculadora.  
   - Facilita separar la vista de la lógica para mantener el código limpio.

---

## 🔑 Estados principales (`useCalculator`)

- **`number`** → Número actual que el usuario está digitando.  
- **`formula`** → Expresión completa que se está armando (ej: `8 + 3`).  
- **`prevNumber`** → Subresultado parcial calculado en base a `formula`.  
- **`lastOperation`** → Última operación seleccionada (`+`, `-`, `x`, `÷`).  

Estos estados están sincronizados con la interfaz mediante `useState` y `useEffect`.

---

## ⚙️ Funciones principales

- **`buildNumber(numberString)`**  
  Construye el número actual, controlando decimales y ceros iniciales.

- **`clean()`**  
  Reinicia todos los valores a `0`.

- **`deleteLast()`**  
  Elimina el último dígito del número actual. Si queda vacío, vuelve a `0`.

- **`toggleSign()`**  
  Cambia el signo del número actual (positivo/negativo).

- **Operaciones (`addOperation`, `substractOperation`, `multiplyOperation`, `divideOperation`)**  
  Guardan el número actual en `prevNumber`, reinician `number` y almacenan la operación en `lastOperation`.

- **`calculateSubResult()`**  
  Evalúa la expresión en `formula` para mostrar un resultado provisional.

- **`calculateResult()`**  
  Realiza la operación final y muestra el resultado en pantalla.

---

## 🔄 Flujo de funcionamiento

1. El usuario presiona botones → se llama a las funciones correspondientes.  
2. Los **estados** se actualizan (`number`, `formula`, etc.).  
3. Los **`useEffect`** escuchan cambios y recalculan la fórmula o subresultado.  
4. La **UI** refleja los cambios automáticamente.

---

## 🖼️ Diagrama del flujo (Mermaid)

```mermaid
flowchart TD

subgraph Inputs[Entrada del Usuario]
  A1[Boton Numero]
  A2[Boton Operacion (+ - x /)]
  A3[Boton =]
  A4[Boton C (clean)]
  A5[Boton +/- (toggleSign)]
  A6[Boton Borrar]
end

subgraph Estados[Estados de React]
  S1[number -> numero actual]
  S2[formula -> expresion completa]
  S3[prevNumber -> subresultado]
  S4[lastOperation -> operacion pendiente]
end

subgraph Logica[Lógica de la calculadora]
  L1[buildNumber()]
  L2[setLastNumber()]
  L3[calculateSubResult()]
  L4[calculateResult()]
  L5[clean()]
  L6[toggleSign()]
  L7[deleteLast()]
end

subgraph UI[Salida en la UI]
  U1[Pantalla principal: number]
  U2[Subpantalla: formula y prevNumber]
end

%% Flujos
A1 --> L1 --> S1
S1 -->|useEffect| S2
S2 -->|useEffect| L3 --> S3

A2 --> L2 --> S3
L2 --> S4

A3 --> L4
L4 --> S2
L4 --> S3
L4 --> S4

A4 --> L5 --> S1 & S2 & S3 & S4
A5 --> L6 --> S1
A6 --> L7 --> S1

S1 --> U1
S2 --> U2
S3 --> U2
```

---

## 📱 UI esperada

- **Pantalla principal**: muestra el número actual (`number`).  
- **Pantalla secundaria**: muestra la fórmula y el subresultado (`formula`, `prevNumber`).  
- **Botones**: números (0-9), punto decimal, operaciones, limpiar, borrar, cambiar signo y resultado.  

---

## 🚀 Conclusión

Este proyecto ejemplifica cómo estructurar una calculadora en **React Native con Expo**, separando la lógica del UI con un custom hook (`useCalculator`).  

La arquitectura facilita:  
- Reutilización de lógica.  
- Pruebas más sencillas.  
- Escalabilidad (añadir nuevas operaciones o funciones avanzadas).  
