const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Azad Jagtap</span>
          </h1>
          <p className="hero-subtitle">
            Graduate Student, UC Berkeley School of Information
          </p>
          <p className="hero-description">
            Learning to build modern, responsive web experiences with HTML, CSS, and JavaScript
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;