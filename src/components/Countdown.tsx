import { useState, useEffect, useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

//NodeJS.Timeout é uma variável global que terá a função de mostrar o formato do countdownTimeout
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [ hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    //clearTimeout é uma função JS, usada neste caso para concertar um delay ao parar o tempo do ciclo
    clearTimeout(countdownTimeout);
    setIsActive(false);
    //ao clicar em abandonar ciclo o tempo irá voltar para o valor inicial
    setTime(0.05 * 60);
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
    <div>
      <div className={styles.countdownContainer}>
      <div>
        <span>{minuteLeft}</span>
        <span>{minuteRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondLeft}</span>
        <span>{secondRight}</span>
      </div>
    </div>

    {hasFinished ? (
      <button
      disabled
      className={`${styles.countdownButton} ${styles.countdownButtonChecked}`}
      >
        Ciclo encerrado
        <img src="icons/checked.svg" alt="Finalizado" />
      </button>
    ) : (
      <>
        {isActive ? (
          <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetCountdown}
          >Abandonar ciclo</button>
          ) : (
          <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
          >Iniciar um ciclo</button>
        )} 
      </>
    )}
    </div>
  );
}