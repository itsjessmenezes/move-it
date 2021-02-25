import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperiences: number;
  challengesCompleted: number;
  levelUp: () => void;
  activeChallenge: Challenge;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  experienceToNextLevel: number;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({children}: ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperiences, setCurrentExperiences] = useState(30);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) + 4, 2);

  function levelUp () {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }
  }

  const { amount } = activeChallenge;
  let finalExperience = currentExperiences + amount;

  if(finalExperience >= experienceToNextLevel) {
    finalExperience = finalExperience - experienceToNextLevel;
    levelUp();
  }

  setCurrentExperiences(finalExperience);
  setActiveChallenge(null);
  setChallengesCompleted(challengesCompleted + 1);

  return (
    <ChallengeContext.Provider
    value={{
      level,
      currentExperiences,
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      levelUp}}>
      {children}
    </ChallengeContext.Provider>
  );
}