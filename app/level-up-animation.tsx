import React from "react";

import styles from "./levelUpAnimation.module.css";

const LevelUpAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div className={styles.animationContainer}>
        <div className={styles.sparkle}></div>
        <div className={styles.fireworks}></div>
      </div>
    </div>
  );
};

export default LevelUpAnimation;
