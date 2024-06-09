import React from 'react';
import backgroundImage from './logo.png'; // Import the image

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <img src={backgroundImage} alt="UK FIT Logo" style={styles.logo} />
        <div>
          <h2 style={styles.heading}>About Us</h2>
          <p style={styles.text}>
            Welcome to UK FIT, your premier destination for high-quality, performance-driven sportswear made in India. Founded with a passion for fitness and a commitment to excellence, UK FIT blends innovative design with cutting-edge technology to create apparel that empowers athletes and fitness enthusiasts alike.
          </p>
          <h3 style={styles.subheading}>Our Mission</h3>
          <p style={styles.text}>
            At UK FIT, our mission is to support and inspire athletes at every level by providing them with the best in sports clothing. We believe that every setback is an opportunity for a comeback, and our gear is designed to help you rise stronger. Whether you're a professional athlete or a fitness enthusiast, our products are crafted to enhance your performance and comfort.
          </p>
          <h3 style={styles.subheading}>Quality and Innovation</h3>
          <p style={styles.text}>
            Quality is at the heart of everything we do. We use only the finest materials and the latest manufacturing techniques to ensure our clothing stands up to the demands of rigorous training and competition. Our design team continuously innovates to bring you the latest in sportswear technology, ensuring you stay ahead of the game.
          </p>
          <h3 style={styles.subheading}>Sustainability</h3>
          <p style={styles.text}>
            UK FIT is committed to sustainability and ethical production practices. We take pride in our eco-friendly initiatives, from using sustainable fabrics to minimizing our carbon footprint. Our goal is to create products that not only perform well but also contribute to a healthier planet.
          </p>
          <h3 style={styles.subheading}>Community and Support</h3>
          <p style={styles.text}>
            We are more than just a sports clothing brand; we are a community. We support athletes through sponsorships, collaborations, and events, fostering a culture of mutual support and motivation. Our customers are our inspiration, and their feedback drives us to continuously improve and innovate.
          </p>
          <h3 style={styles.subheading}>Join the UK FIT Family</h3>
          <p style={styles.text}>
            Discover the difference that quality and innovation can make in your athletic journey. Join the UK FIT family and let us be your strength when you rise. Together, we can achieve greatness.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: 'white',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  logo: {
    width: '100px',
    display: 'block',
    margin: '0 auto 20px',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginTop: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    textAlign: 'justify',
    paddingLeft: '20px',
    borderLeft: '2px solid #fff',
    lineHeight: '1.8',
  },
};

export default AboutUs;
