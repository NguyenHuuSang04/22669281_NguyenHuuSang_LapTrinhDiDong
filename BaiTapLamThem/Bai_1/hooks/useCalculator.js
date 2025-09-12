import { useState } from 'react';

export default function useCalculator() {
  const [displayValue, setDisplayValue] = useState('');
  const [result, setResult] = useState('');
  
  const handleButtonPress = (button) => {
    switch (button) {
      case 'C':
        setDisplayValue('');
        setResult('');
        break;
      case '=':
        try {
          if (displayValue) {
            const evalResult = eval(displayValue);
            setResult(evalResult.toString());
          }
        } catch (error) {
          setResult('Error');
        }
        break;
      default:
        setDisplayValue((prev) => prev + button);
        break;
    }
  };

  return {
    displayValue,
    result,
    handleButtonPress,
  };
}