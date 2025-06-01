import { useState, useMemo } from "react";
import "../styles/App.css";
import carsData from "../data/carsJSON.json";
import Persons from "../assets/persons.svg";
import Doors from "../assets/doors.svg";
import Transmission from "../assets/transmission.svg";
import SmallSuitcase from "../assets/smallSuitcase.svg";
import LargeSuitcase from "../assets/largeSuitcase.svg";
import Air from "../assets/air.svg";
import Information from "../assets/Information.svg";

// Tipos para los vehículos
type Vehicle = {
  vehicle_group: string;
  code: string;
  name_details: string;
  picture_url?: { normal?: string };
  stars?: number;
  features?: {
    category?: string;
    seats?: string | number;
    doors?: string | number;
    transmition?: string;
    large_suitcase?: number;
    small_suitcase?: number;
    air_conditioner?: boolean;
  };
  rates?: {
    H8?: {
      pricing?: {
        COP?: {
          total_charge?: {
            total?: {
              total_amount?: string;
            };
          };
        };
        USD?: {
          total_charge?: {
            total?: {
              total_amount?: string;
            };
          };
        };
      };
    };
  };
};

type CarsJSON = {
  cars: {
    [company: string]: Vehicle[];
  };
};

// Tipo para el auto transformado
type Car = {
  company: string;
  group: string;
  type: string;
  model: string;
  priceCOPValue: number;
  priceCOP: string;
  priceUSD: string;
  rating: number;
  added: boolean;
  image: string;
  seats: string | number;
  doors: string | number;
  transmission: string;
  largeSuitcase: number;
  smallSuitcase: number;
  airConditioner: string;
};

// Props para el componente
type CarRentalCardsProps = {
  selectedCompanies: string[];
  selectedCategories: string[];
  selectedPassengers: string[];
  selectedSuitcases: number[];
  priceRange: [number, number];
};

const rawCarsData = carsData as CarsJSON;

const cars: Car[] = Object.entries(rawCarsData.cars).flatMap(
  ([company, vehicles]) =>
    vehicles.map(
      (vehicle): Car => ({
        company,
        group: `Grupo ${vehicle.vehicle_group} - ${vehicle.code}`,
        type: vehicle.features?.category || "Tipo desconocido",
        model: vehicle.name_details,
        priceCOPValue: parseFloat(
          vehicle.rates?.H8?.pricing?.COP?.total_charge?.total?.total_amount ||
            "0"
        ),
        priceCOP: parseFloat(
          vehicle.rates?.H8?.pricing?.COP?.total_charge?.total?.total_amount ||
            "0"
        ).toLocaleString("es-CO", { style: "currency", currency: "COP" }),
        priceUSD: parseFloat(
          vehicle.rates?.H8?.pricing?.USD?.total_charge?.total?.total_amount ||
            "0"
        ).toLocaleString("en-US", { style: "currency", currency: "USD" }),
        rating: vehicle.stars || 0,
        added: false,
        image: vehicle.picture_url?.normal || "",
        seats: vehicle.features?.seats || "N/A",
        doors: vehicle.features?.doors || "N/A",
        transmission: vehicle.features?.transmition || "N/A",
        largeSuitcase: vehicle.features?.large_suitcase || 0,
        smallSuitcase: vehicle.features?.small_suitcase || 0,
        airConditioner: vehicle.features?.air_conditioner ? "SI" : "NO",
      })
    )
);

const ITEMS_PER_PAGE = 7;

const CarRentalCards = ({
  selectedCompanies,
  selectedCategories,
  selectedPassengers,
  selectedSuitcases,
  priceRange,
}: CarRentalCardsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFeatured, setShowFeatured] = useState<boolean>(true);
  const [sort, setSort] = useState<
    "Mayor precio" | "Menor precio" | "Mejor calificación"
  >("Mayor precio");

  const filteredCars = useMemo<Car[]>(() => {
    return cars.filter((car) => {
      const matchesCompany =
        selectedCompanies.length === 0 || selectedCompanies.includes(car.company);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(car.type);

      const matchesPassengers =
        selectedPassengers.length === 0 ||
        selectedPassengers.includes(String(car.seats));

      const matchesSuitcases =
        selectedSuitcases.length === 0 ||
        selectedSuitcases.some(
          (n) => car.largeSuitcase + car.smallSuitcase >= n
        );

      const matchesPrice =
        car.priceCOPValue >= priceRange[0] && car.priceCOPValue <= priceRange[1];

      return (
        matchesCompany &&
        matchesCategory &&
        matchesPassengers &&
        matchesSuitcases &&
        matchesPrice
      );
    });
  }, [
    selectedCompanies,
    selectedCategories,
    selectedPassengers,
    selectedSuitcases,
    priceRange,
  ]);

  const sortedCars = useMemo<Car[]>(() => {
    const carsCopy = [...filteredCars];

    switch (sort) {
      case "Mayor precio":
        return carsCopy.sort((a, b) => b.priceCOPValue - a.priceCOPValue);
      case "Menor precio":
        return carsCopy.sort((a, b) => a.priceCOPValue - b.priceCOPValue);
      case "Mejor calificación":
        return carsCopy.sort((a, b) => b.rating - a.rating);
      default:
        return carsCopy;
    }
  }, [filteredCars, sort]);

  const totalPages = Math.ceil(sortedCars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCars = sortedCars.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="cards-container-all">
      <div className="top-bar-container">
        <span className="results-text">
          Encontramos <strong>{filteredCars.length} vehículos</strong> para tu
          búsqueda.
        </span>

        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={showFeatured}
            onChange={() => setShowFeatured(!showFeatured)}
          />
          <span>Mostrar destacados primero</span>
        </label>

        <button className="quote-button">Enviar cotización</button>

        <select
          className="sort-dropdown"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as typeof sort);
            setCurrentPage(1);
          }}
        >
          <option value="Mayor precio">Mayor precio</option>
          <option value="Menor precio">Menor precio</option>
          <option value="Mejor calificación">Mejor calificación</option>
        </select>
      </div>

      <div className="car-rental-container">
        {currentCars.map((car, index) => (
          <div key={index} className="car-card">
            <div className="car-info">
              <div className="car-company">
                <h3>{car.company}</h3>
                <div className="stars">
                  {"★".repeat(Math.round(car.rating))}
                  {"☆".repeat(5 - Math.round(car.rating))}
                </div>
                <img src={car.image} alt={car.model} className="car-image" loading="lazy"/>
              </div>
              <div className="car-details">
                <p className="car-group">{car.group}</p>
                <h4 className="car-type">{car.type}</h4>
                <p className="car-model">{car.model}</p>

                <div className="icons-row">
                  <div className="into-icons">
                    <img src={Persons} alt="Persons" />
                    <span>{car.seats}</span>
                  </div>
                  <div className="into-icons">
                    <img src={Doors} alt="Doors" />
                    <span>{car.doors}</span>
                  </div>
                  <div className="into-icons">
                    <img src={Transmission} alt="Transmission" />
                    <span>{car.transmission === "Automatic" ? "A" : "M"}</span>
                  </div>
                  <div className="into-icons">
                    <img src={SmallSuitcase} alt="SmallSuitcase" />
                    <span>{car.smallSuitcase}</span>
                  </div>
                  <div className="into-icons">
                    <img src={LargeSuitcase} alt="LargeSuitcase" />
                    <span>{car.largeSuitcase}</span>
                  </div>
                  <div className="into-icons">
                    <img src={Air} alt="Air Conditioner" />
                    <span>{car.airConditioner}</span>
                  </div>
                </div>
                <div>
                  <hr className="hr-second" />
                </div>
                {car.added ? (
                  <p className="added-msg">✓ Vehículo agregado a su cotización</p>
                ) : (
                  <p className="select-msg">Seleccionar este vehículo para cotizar</p>
                )}
              </div>
              <div className="price-box">
                <div>
                  <p className="plan">Inclusive Light</p>
                  <img src={Information} alt="Información" />
                </div>
                <p className="three-days">Precio por 3 días de renta</p>
                <hr className="hr" />
                <p className="price-cop">{car.priceCOP}</p>
                <p className="price-usd">(USD {car.priceUSD})</p>
                <button className="select-button">Seleccionar</button>
              </div>
            </div>
          </div>
        ))}

        {/* Paginación */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarRentalCards;
