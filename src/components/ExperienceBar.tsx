import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperiences, experienceToNextLevel } = useContext(ChallengeContext);
  
  const percentToNextLevel = Math.round((currentExperiences * 100) / experienceToNextLevel);
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%`}} />

        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}}>{currentExperiences} xp</span>
      </div>
      <span> {experienceToNextLevel} px</span>
    </header>
  );
};