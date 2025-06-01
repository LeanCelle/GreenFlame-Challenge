import "../styles/App.css";
import esFlag from "../assets/es-flag.png";
import Logo from "../assets/logo.svg";
import Down from "../assets/down.png";

const Navbar = () => {
  return (
    <header>
      <div className="navbar">
        {/* Logo */}
        <div className="navbar_container">
          <div className="navbar__logo">
            <img src={Logo} alt="Logo" />
          </div>

          {/* Links */}
          <nav className="navbar__links">
            <p>Buscar transacción</p>
            <p>Políticas</p>
            <p>Contáctenos</p>
            <div className="navbar__language">
              <img className="spanish" src={esFlag} alt="Español" />
              <span>Español</span>
              <img className="down_row" src={Down} alt="Down row" />
            </div>
            <div className="navbar__user">
              <span>Hola, Javier</span>
              <div className="navbar__avatar">J</div>
            </div>
          </nav>
        </div>
      </div>

      <div className="flight-summary">
        {/* Aeropuertos */}
        <div className="flight-summary__card">
          <span className="flight-summary__bold">
            Miami International Airport (MIA)
          </span>
          <span className="flight-summary__arrow">›</span>
          <span className="flight-summary__bold">
            Orlando International Airport (MCO)
          </span>
        </div>

        {/* Fechas */}
        <div className="flight-summary__card">
          <span className="flight-summary__bold">
            20 septiembre 2025, 12:00
          </span>
          <span className="flight-summary__arrow">›</span>
          <span className="flight-summary__bold">
            30 septiembre 2025, 18:00
          </span>
        </div>

        {/* Botón */}
        <button className="flight-summary__button">Modificar</button>
      </div>

      <div className="step-progress">
        <div className="step active">Selecciona tu vehículo</div>
        <span className="arrow">›</span>
        <div className="step">Agrega equipamiento adicional</div>
        <span className="arrow">›</span>
        <div className="step">Información del conductor</div>
        <span className="arrow">›</span>
        <div className="step">Confirmación de la reserva</div>
      </div>
    </header>
  );
};

export default Navbar;
