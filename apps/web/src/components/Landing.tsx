import Image from "next/image";

import FindDomain from "@/components/FindDomain";

import styles from "@/styles/landing.module.scss";
import eye from "@/assets/svgs/eye.svg";
import right from "@/assets/svgs/right.svg";
import dots from "@/assets/svgs/dots.svg";

const Landing = () => {
  return (
    <section className={styles.main}>
      <div className={styles.head}>
        <div>
          <h2>Your Domain,</h2>
          <h2>Your Rules</h2>
        </div>
        <div>
          <p>Open-source, free domains — manage</p>
          <p>your online identity with ease.</p>
        </div>
      </div>

      <div className={styles.action}>
        <button>Start for free</button>
      </div>

      <div className={styles.try}>
        <FindDomain />

        <div className={styles.example}>
          <div className={styles.egDetails}>
            <div className={styles.egImage}>
              <Image src="/logo.svg" alt="logo" width={28} height={28} />
            </div>

            <div className={styles.egSite}>
              <h2>veeu.io</h2>
              <div>
                <Image src={right} alt=">" width={16} />
                <p>76.76.21.21</p>
              </div>
            </div>
          </div>

          <div className={styles.analytics}>
            <div>
              <Image src={eye} alt="eye" width={20} />
              <p>21.4k visits</p>
            </div>
            <Image src={dots} alt="option" width={28} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
