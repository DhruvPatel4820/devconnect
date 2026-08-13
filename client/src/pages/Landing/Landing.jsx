import { Link } from "react-router-dom";
import {
  FiUsers,
  FiEdit3,
  FiHeart,
  FiMessageCircle,
  FiBookmark,
  FiShield,
} from "react-icons/fi";

import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.page}>
      {/* ================= NAVBAR ================= */}

      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.logo}>
            DevConnect
          </Link>

          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#how-it-works">How it works</a>
          </div>

          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginBtn}>
              Login
            </Link>

            <Link to="/register" className={styles.registerBtn}>
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>
              🚀 Connect. Share. Grow.
            </span>

            <h1>
              Connect with developers.
              <span> Build your network.</span>
            </h1>

            <p>
              DevConnect is a social platform for developers where you can
              share your thoughts, connect with other developers, follow
              people, and build your professional network.
            </p>

            <div className={styles.heroButtons}>
              <Link to="/register" className={styles.primaryBtn}>
                Get Started
              </Link>

              <a href="#features" className={styles.secondaryBtn}>
                Explore Features
              </a>
            </div>

            <div className={styles.stats}>
              <div>
                <strong>100+</strong>
                <span>Developers</span>
              </div>

              <div>
                <strong>500+</strong>
                <span>Posts</span>
              </div>

              <div>
                <strong>1K+</strong>
                <span>Connections</span>
              </div>
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.mockProfile}>
              <div className={styles.mockAvatar}>D</div>

              <div>
                <strong>Developer Community</strong>
                <p>@devconnect</p>
              </div>
            </div>

            <div className={styles.mockPost}>
              <h3>Build. Share. Connect.</h3>

              <p>
                Share your development journey and connect with developers
                around the world.
              </p>

              <div className={styles.postActions}>
                <span>
                  <FiHeart /> 128
                </span>

                <span>
                  <FiMessageCircle /> 32
                </span>

                <span>
                  <FiBookmark /> 18
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}

        <section id="features" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span>FEATURES</span>

            <h2>Everything you need to connect</h2>

            <p>
              DevConnect provides the essential features you need to build
              your developer network.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <FeatureCard
              icon={<FiUsers />}
              title="Connect with Developers"
              description="Discover developers and build meaningful connections."
            />

            <FeatureCard
              icon={<FiEdit3 />}
              title="Create Posts"
              description="Share your thoughts, projects, achievements and ideas."
            />

            <FeatureCard
              icon={<FiHeart />}
              title="Like & Engage"
              description="Like posts and interact with the developer community."
            />

            <FeatureCard
              icon={<FiMessageCircle />}
              title="Comments"
              description="Discuss ideas and participate in conversations."
            />

            <FeatureCard
              icon={<FiBookmark />}
              title="Save Posts"
              description="Save useful posts and come back to them later."
            />

            <FeatureCard
              icon={<FiShield />}
              title="Secure Account"
              description="Your account and authentication are protected."
            />
          </div>
        </section>

        {/* ================= ABOUT ================= */}

        <section id="about" className={`${styles.section} ${styles.about}`}>
          <div>
            <span className={styles.sectionLabel}>ABOUT DEVCONNECT</span>

            <h2>A place built for developers</h2>

            <p>
              DevConnect is designed to make it easier for developers to
              discover each other, share knowledge and grow together.
            </p>

            <p>
              Whether you are a beginner learning your first technology or
              an experienced developer working on complex projects, you can
              use DevConnect to share your journey and connect with others.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <div>
              <strong>Learn</strong>
              <span>Discover new ideas</span>
            </div>

            <div>
              <strong>Connect</strong>
              <span>Meet other developers</span>
            </div>

            <div>
              <strong>Share</strong>
              <span>Share your development journey</span>
            </div>

            <div>
              <strong>Grow</strong>
              <span>Build your professional network</span>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section id="how-it-works" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span>HOW IT WORKS</span>

            <h2>Start connecting in three steps</h2>
          </div>

          <div className={styles.steps}>
            <Step
              number="01"
              title="Create your account"
              description="Register on DevConnect and create your developer profile."
            />

            <Step
              number="02"
              title="Discover developers"
              description="Search for developers and follow people you find interesting."
            />

            <Step
              number="03"
              title="Share & connect"
              description="Create posts, comment, like and build your network."
            />
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className={styles.cta}>
          <h2>Ready to join DevConnect?</h2>

          <p>
            Create your account and start connecting with developers today.
          </p>

          <Link to="/register" className={styles.ctaBtn}>
            Create Free Account
          </Link>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className={styles.footer}>
        <div>
          <Link to="/" className={styles.logo}>
            DevConnect
          </Link>

          <p>
            Connect. Share. Grow.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how-it-works">How it works</a>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </footer>
    </div>
  );
}


/* ================= FEATURE CARD ================= */

function FeatureCard({ icon, title, description }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}


/* ================= STEP ================= */

function Step({ number, title, description }) {
  return (
    <div className={styles.step}>
      <span>{number}</span>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}