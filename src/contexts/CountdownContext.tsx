import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData{
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

//NodeJS.Timeout é uma variável global que terá a função de mostrar o formato do countdownTimeout
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [ hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  
  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    //clearTimeout é uma função JS, usada neste caso para concertar um delay ao parar o tempo do ciclo
    clearTimeout(countdownTimeout);
    setIsActive(false);
    //ao clicar em abandonar ciclo o tempo irá voltar para o valor inicial
    setTime(0.05 * 60);
    //resetar botão ciclo encerrado
    setHasFinished(false);
  };

  //recebe dois parametros: o que eu quero executar(função), quando executar
  //sempre que o valor de active e do time mudar irá executar a função
  useEffect(() => {
    if(isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if(isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);


  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );
}