import Image from "next/image";

import styles from "@/styles/opensource.module.scss";
import stars from "@/assets/opensource/stars.svg";
import merge from "@/assets/opensource/merge.svg";
import github from "@/assets/svgs/github.svg";

const OpenSource = () => {
  return (
    <section className={styles.main}>
      <div className={styles.title}>
        <h2>Proudly open-source</h2>
        <p>
          Our source code is available on GitHub - feel free to read, review, or
          contribute to it however you want!
        </p>
      </div>

      <a
        href="https://github.com/skygig/veeu.io"
        target="_blank"
        className={styles.github}
      >
        <Image src={github} alt="GitHub" width={16} height={16} />
        Star on Github
      </a>

      <div className={styles.data}>
        <a href="https://github.com/skygig/veeu.io" target="_blank">
          <Image src={stars} alt="Stars" />
          <div className={styles.dataText}>
            <span>1 Stars</span>
          </div>
        </a>
        <a
          href="https://github.com/skygig/veeu.io/tree/main/contribute.md"
          target="_blank"
        >
          <Image src={merge} alt="Merge" />
          <div className={styles.dataText}>
            <span>Contribute</span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default OpenSource;
