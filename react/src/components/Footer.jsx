import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Serviços Online. Todos os direitos reservados.</p>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
