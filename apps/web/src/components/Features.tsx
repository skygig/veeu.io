import Image from "next/image";

import {
  MotionSection,
  MotionDiv,
  container,
  featureItem,
  item,
} from "./Framer";

import styles from "@/styles/features.module.scss";
import stars from "@/assets/svgs/stars.svg";
import server from "@/assets/features/server.svg";
import shield from "@/assets/features/shield.svg";
import code from "@/assets/features/code.svg";
import analytics from "@/assets/features/analytics.svg";

const Features = () => {
  return (
    <MotionSection
      className={styles.main}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className={styles.title}>
        <MotionDiv variants={item}>
          <h2>Powerful features</h2>
          <h2>for modern developers</h2>
        </MotionDiv>
        <MotionDiv variants={item}>
          <p>
            Everything you need to manage your domains and DNS records in one
            place, with a developer-first approach.
          </p>
        </MotionDiv>
      </div>

      <div className={styles.features}>
        <div className={styles.divider}>
          <div className={styles.image}>
            <Image src={stars} alt="stars" width={28} />
          </div>
          <div className={styles.line}></div>
        </div>

        <MotionDiv className={styles.feature} variants={featureItem}>
          <Image src={server} alt="Domain" width={40} />
          <h2>Free Subdomains</h2>
          <p>
            Get started instantly with free subdomains under veeu.io for your
            projects.
          </p>
        </MotionDiv>

        <MotionDiv className={styles.feature} variants={featureItem}>
          <Image src={shield} alt="Shield" width={40} />
          <h2>DNS Management</h2>
          <p>
            Full control over DNS records with support for A, AAAA, CNAME, MX,
            and TXT.
          </p>
        </MotionDiv>

        <MotionDiv className={styles.feature} variants={featureItem}>
          <Image src={code} alt="Code" width={48} />
          <h2>Developer-First</h2>
          <p>
            Clean, intuitive interface designed specifically for developers.
          </p>
          <div></div>
        </MotionDiv>

        <MotionDiv className={styles.feature} variants={featureItem}>
          <Image src={analytics} alt="Analytics" width={34} />
          <h2>Real-time Monitoring</h2>
          <p>Monitor DNS propagation and queries across global networks.</p>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Features;
