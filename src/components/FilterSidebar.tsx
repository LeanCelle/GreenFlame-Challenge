import "../styles/App.css";
import Filter from "../assets/filter.svg";
import Slider from "@mui/material/Slider";

interface FilterSidebarProps {
  selectedCompanies: string[];
  onCompanyChange: (values: string[]) => void;
  selectedCategories: string[];
  onCategoryChange: (values: string[]) => void;
  selectedPassengers: string[];
  onPassengersChange: (values: string[]) => void;
  selectedSuitcases: number[];
  onSuitcasesChange: (values: number[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const FilterSidebar = ({
  selectedCompanies,
  onCompanyChange,
  selectedCategories,
  onCategoryChange,
  selectedPassengers,
  onPassengersChange,
  selectedSuitcases,
  onSuitcasesChange,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) => {
  const toggleCheckbox = <T,>(
    value: T,
    selectedValues: T[],
    setSelectedValues: (values: T[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-icon-container">
        <img src={Filter} alt="Filter" />
        <h3>Filtrar resultados</h3>
      </div>
      {/* Compañía rentadora */}
      <div className="filter-section">
        <div className="filter-title-container">
          <p className="section-title">Compañía rentadora</p>
        </div>
        {["Avis", "Budget", "Payless"].map((company) => (
          <label key={company}>
            <input
              type="checkbox"
              checked={selectedCompanies.includes(company)}
              onChange={() =>
                toggleCheckbox(company, selectedCompanies, onCompanyChange)
              }
            />
            {company}
          </label>
        ))}
      </div>

      {/* Categoría */}
      <div className="filter-section">
        <div className="filter-title-container">
          <p className="section-title">Categoría del auto</p>
        </div>
        {[
          "Económico",
          "Compacto",
          "Intermedio",
          "Standard",
          "Full Size",
          "SUV Intermedio",
          "Premium",
          "Lujo",
          "Convertible",
          "Maxivan",
          "SUV Premium",
          "Minivan",
          "SUV Standard Elite",
          "SUV Standard",
        ].map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() =>
                toggleCheckbox(cat, selectedCategories, onCategoryChange)
              }
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Maletas */}
      <div className="filter-section">
        <div className="filter-title-container">
          <p className="section-title">Capacidad de maletas</p>
        </div>
        {[1, 2, 3, 4, 6, 7].map((n) => (
          <label key={n}>
            <input
              type="checkbox"
              checked={selectedSuitcases.includes(n)}
              onChange={() =>
                toggleCheckbox(n, selectedSuitcases, onSuitcasesChange)
              }
            />
            {n} ó más maletas
          </label>
        ))}
      </div>

      {/* Pasajeros */}
      <div className="filter-section">
        <div className="filter-title-container">
          <p className="section-title">Cantidad de pasajeros</p>
        </div>
        {["4", "5", "7", "12", "7/8"].map((p) => (
          <label key={p}>
            <input
              type="checkbox"
              checked={selectedPassengers.includes(p)}
              onChange={() =>
                toggleCheckbox(p, selectedPassengers, onPassengersChange)
              }
            />
            {p} pasajeros
          </label>
        ))}
      </div>

      {/* Precio */}
      <div className="filter-section">
        <div className="filter-title-container">
          <p className="section-title">Rango de precio (COP)</p>
        </div>
        <div className="range">
          <Slider
            value={priceRange}
            onChange={(_, newValue) => {
              if (Array.isArray(newValue)) {
                onPriceChange([newValue[0], newValue[1]]);
              }
            }}
            valueLabelDisplay="auto"
            min={0}
            max={7000000}
            step={50000}
          />
        </div>
        <div className="price-inputs">
          <div>
            <span className="cop-price">COP</span>
            <span className="desde">desde:</span>
            <span className="min-max">
              {priceRange[0].toLocaleString("es-CO")}
            </span>
          </div>
          <div>
            <span className="cop-price">COP</span>
            <span className="desde">desde:</span>
            <span className="min-max">
              {priceRange[1].toLocaleString("es-CO")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
