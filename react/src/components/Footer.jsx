import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 Serviços Online. Todos os direitos reservados.</p>
      <div className="social-icons">
        <a href="#">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
