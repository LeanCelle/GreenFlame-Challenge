import "../styles/App.css";
import Logo from "../assets/logo.svg";
import Whatsapp from "../assets/whatsapp.png";
import Instagram from "../assets/instagram.png";
import Facebook from "../assets/facebook.png";
import Linkedin from "../assets/linkedin.png";
import Twitter from "../assets/twitter.png";
import Anato from "../assets/anato.png";
import Camara from "../assets/camara.png";
import Superintendencia from "../assets/superintendencia.png";
import Transporte from "../assets/transporte.png";
import Aeronautica from "../assets/aeronautica.png";
import Iata from "../assets/iata.svg";
import GreenFlame from "../assets/GreenFlame.svg";

const Footer = () => {
  return (
    <>
      <div className="newsletter">
        <div className="want-to-container">
          <div className="want-to">
            <h3>¿Quieres estar al tanto de nuestras novedades?</h3>
            <p>
              Suscríbete a nuestro newsletter y mantente al día con nuestras
              novedades, lanzamientos de productos y ofertas exclusivas.
            </p>
          </div>
          <form className="newsletter-form">
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Dirección de e-mail" />
            <button type="submit">¡Suscríbete!</button>
            <div className="checkbox">
              <input type="checkbox" id="accept" />
              <label htmlFor="accept">
                Acepto registrarme en la base de datos de Unión de
                Representaciones para recibir información y promociones en esta
                dirección de correo electrónico.
              </label>
            </div>
          </form>
        </div>
      </div>
      <footer className="footer-container">
        <div className="footer-main">
          <div className="footer-column logo-social">
            <img src={Logo} alt="Logo" />
            <div className="social-icons">
              <img src={Whatsapp} alt="Whatsapp" />
              <img src={Instagram} alt="Instagram" />
              <img src={Facebook} alt="Facebook" />
              <img src={Linkedin} alt="Linkedin" />
              <img src={Twitter} alt="Twitter" />
            </div>
          </div>

          <div className="footer-column">
            <h4>¿Necesitas ayuda?</h4>
            <p>union@udr.com.co</p>
            <p>Teléfono: +57 601 589 7880 / 99</p>
            <p>Calle 20 No. 4-55, Piso 3, Bogotá</p>
          </div>

          <div className="footer-column">
            <h4>Instructivos</h4>
            <p>Disney</p>
            <p>Universal</p>
            <p>Avis Budget</p>
            <p>Terrawind</p>
          </div>

          <div className="footer-column">
            <h4>Información</h4>
            <p>Aviso legal</p>
            <p>Políticas de privacidad</p>
            <p>Términos y condiciones</p>
            <p>Ver mis transacciones</p>
          </div>

          <div className="footer-column">
            <h4>Nosotros</h4>
            <p>¿Quiénes somos?</p>
            <p>NIT: 860535628-1</p>
            <p>Registro Nacional de Turismo No. 1041</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logos">
              <img src={Anato} alt="Anato" />
              <img src={Camara} alt="Camara" />
              <img src={Superintendencia} alt="Superintendencia" />
              <img src={Transporte} alt="Transporte" />
              <img src={Aeronautica} alt="Aeronautica" />
              <img src={Iata} alt="Iata" />
          </div>
          <div className="copyright">
            <p>
              © 2025 - Copyright Unión de Representaciones S.A.S. Todos los
              derechos reservados.
            </p>
              <img src={GreenFlame} alt="GreenFlame" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
