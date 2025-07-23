import Image from "next/image";

import { MotionSection, MotionDiv, MotionA, container, item } from "./Framer";

import styles from "@/styles/opensource.module.scss";
import stars from "@/assets/opensource/stars.svg";
import merge from "@/assets/opensource/merge.svg";
import github from "@/assets/svgs/github.svg";

const OpenSource = () => {
  return (
    <MotionSection
      className={styles.main}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <MotionDiv className={styles.title} variants={item}>
        <h2>Proudly open-source</h2>
        <p>
          Our source code is available on GitHub - feel free to read, review, or
          contribute to it however you want!
        </p>
      </MotionDiv>

      <MotionA
        href="https://github.com/skygig/veeu.io"
        target="_blank"
        className={styles.github}
        variants={item}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Image src={github} alt="GitHub" width={16} height={16} />
        Star on Github
      </MotionA>

      <div className={styles.data}>
        {/* Data cards have a smooth upward movement on hover */}
        <MotionA
          href="https://github.com/skygig/veeu.io"
          target="_blank"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <Image src={stars} alt="Stars" />
          <div className={styles.dataText}>
            <span>1 Stars</span>
          </div>
        </MotionA>
        <MotionA
          href="https://github.com/skygig/veeu.io/tree/main/contribute.md"
          target="_blank"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <Image src={merge} alt="Merge" />
          <div className={styles.dataText}>
            <span>Contribute</span>
          </div>
        </MotionA>
      </div>
    </MotionSection>
  );
};

export default OpenSource;
