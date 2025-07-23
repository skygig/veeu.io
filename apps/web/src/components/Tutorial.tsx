import Image from "next/image";
import Link from "next/link";

import {
  MotionSection,
  MotionDiv,
  MotionButton,
  container,
  tutorialStep,
  item,
} from "./Framer";

import styles from "@/styles/tutorail.module.scss";
import tutorial from "@/assets/svgs/tutorial.svg";
import right from "@/assets/svgs/right.svg";

const Tutorial = () => {
  return (
    <MotionSection
      className={styles.main}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <MotionDiv className={styles.title} variants={item}>
        <h2>Veeu 101: A Quickstart</h2>
        <p>
          Follow our step-by-step guide to get started with domain management
        </p>
      </MotionDiv>

      <MotionDiv className={styles.map} variants={item}>
        <div>
          <Image src={tutorial} alt="tutorial" width={26} />
        </div>
        <div>
          <p>1</p>
        </div>
        <div>
          <p>2</p>
        </div>
        <div>
          <p>3</p>
        </div>
        <span></span>
      </MotionDiv>

      <div className={styles.steps}>
        <MotionDiv className={styles.step} variants={tutorialStep}>
          <h2>Register Your Domain</h2>
          <div>
            <Image src={right} alt=">" width={14} />
            <p>Getting started with Veeu is simple:</p>
          </div>
          <ol type="1">
            <li>Create a free account</li>
            <li>Choose your preferred subdomain under veeu.io</li>
          </ol>
        </MotionDiv>

        <MotionDiv className={styles.step} variants={tutorialStep}>
          <h2>Configure DNS Records</h2>
          <div>
            <Image src={right} alt=">" width={14} />
            <p>Manage your DNS records with ease:</p>
          </div>
          <ul>
            <li>Add A records to point to your servers</li>
            <li>Set up CNAME records for subdomains</li>
            <li>Configure MX records for email</li>
            <li>Add TXT records for verification</li>
          </ul>
        </MotionDiv>

        <MotionDiv className={styles.step} variants={tutorialStep}>
          <h2>Go Live</h2>
          <div>
            <Image src={right} alt=">" width={14} />
            <p>Your domain is ready to use:</p>
          </div>
          <ul>
            <li>DNS changes propagate instantly</li>
            <li>Monitor your DNS records in real-time</li>
            <li>Easily update records as needed</li>
          </ul>
          <Link href="https://app.veeu.io/auth?mode=sign-in">
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Get Started Now &nbsp; {">"}
            </MotionButton>
          </Link>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Tutorial;
