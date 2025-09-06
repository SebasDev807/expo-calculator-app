import { useEffect, useRef, useState } from "react";

// Lógica de calculadora
enum Operator {
    add = '+',
    substract = '-',
    multiply = 'x',
    divide = '÷'
}

export const useCalculator = () => {
    // Estado principal de la calculadora
    const [formula, setFormula] = useState('0');    // Muestra toda la operación en pantalla (ej: "5 + 3")
    const [number, setNumber] = useState('0');      // Número que el usuario está escribiendo actualmente
    const [prevNumber, setPrevNumber] = useState('0'); // Resultado parcial o número anterior

    // Ref para guardar la última operación (+, -, x, ÷)
    // Se usa useRef porque no queremos que cause re-render al cambiar
    const lastOperation = useRef<Operator>(undefined);

    // 🔹 Actualiza la "formula" cuando cambia el número actual
    useEffect(() => {
        if (lastOperation.current) {
            // Si ya hay una operación seleccionada, mantenemos el número anterior + operación + nuevo número
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            // Si no hay operación, la fórmula es solo el número que escribimos
            setFormula(number);
        }
    }, [number]);

    // 🔹 Cada vez que cambia la fórmula, recalculamos un "subresultado"
    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(`${subResult}`); // Guardamos este subresultado como prevNumber
    }, [formula]);

    // 🔹 Reinicia la calculadora
    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        setFormula('0')
        lastOperation.current = undefined
    }

    // 🔹 Borrar último dígito
    const deleteLast = () => {
        let currentSign = '';
        let temporalNumber = number;

        // Si el número es negativo, lo separamos para no borrar el signo
        if (number.includes('-')) {
            currentSign = '-';
            temporalNumber = number.substring(1);
        }

        // Si hay más de un dígito → borramos el último
        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, -1));
        }

        // Si queda un solo dígito → reiniciamos a "0"
        setNumber('0');
    }

    // 🔹 Guarda el número actual en prevNumber y resetea number a "0"
    const setLastNumber = () => {
        calculateResult(); // antes de guardar, intentamos calcular el resultado acumulado

        if (number.endsWith('.')) {
            // Si termina con punto decimal, quitamos el "."
            setPrevNumber(number.slice(0, -1));
        }

        setPrevNumber(number);
        setNumber('0');
    }

    // 🔹 Acciones de las operaciones matemáticas
    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const substractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.substract;
    }

    // 🔹 Cambiar el signo del número actual
    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', '')); // Si ya tiene "-", lo quitamos
        }
        return setNumber('-' + number); // Si no, lo agregamos
    }

    // 🔹 Calcula un subresultado según la fórmula actual
    const calculateSubResult = () => {
        const [firstValue, operation, secondValue] = formula.split(' ');

        const numberOne = Number(firstValue);
        const numberTwo = Number(secondValue);

        // Si no hay segundo número todavía → devolvemos el primero
        if (isNaN(numberTwo)) return numberOne;

        switch (operation) {
            case Operator.add:
                return numberOne + numberTwo;
            case Operator.multiply:
                return numberOne * numberTwo;
            case Operator.divide:
                return numberOne / numberTwo;
            case Operator.substract:
                return numberOne - numberTwo;
            default:
                throw new Error(`[calculateSubResult] ${operation} not implemented`)
        }
    }

    // 🔹 Calcula el resultado final y resetea estado
    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${result}`)              // Mostramos el resultado en pantalla
        lastOperation.current = undefined;   // Reiniciamos operación pendiente
        setPrevNumber('0');                  // Limpia prevNumber
    }

    // 🔹 Construcción de un número a partir de los botones pulsados
    const buildNumber = (numberString: string) => {
        // Evitar múltiples puntos decimales
        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            // Si ya hay punto decimal → permitimos más ceros
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            // Si es distinto de 0 y no hay punto decimal → reemplazamos "0" por ese número
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            // Evitar números tipo "0000"
            if (numberString === '0' && !number.includes('.')) {
                return;
            }

            return setNumber(number + numberString);
        }

        // Si no empieza con 0 → concatenamos normalmente
        console.log({ number });
        setNumber(number + numberString);
    }

    return {
        // Props expuestos
        formula,
        number,
        prevNumber,

        // Métodos básicos
        buildNumber,
        clean,
        toggleSign,
        deleteLast,

        // Operaciones
        divideOperation,
        multiplyOperation,
        substractOperation,
        addOperation,

        // Cálculo
        calculateSubResult,
        calculateResult
    }
}
