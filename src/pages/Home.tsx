import "../styles/App.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import CarRentalCards from "../components/CarRentalCards";
import Footer from "../components/Footer";

const Home = () => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([
    "Avis",
    "Budget",
    "Payless",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);
  const [selectedSuitcases, setSelectedSuitcases] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 999999999,
  ]);

  return (
    <>
      <Navbar />
      <div className="body-container">
        <div className="body-all">
          <FilterSidebar
            selectedCompanies={selectedCompanies}
            onCompanyChange={setSelectedCompanies}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            selectedPassengers={selectedPassengers}
            onPassengersChange={setSelectedPassengers}
            selectedSuitcases={selectedSuitcases}
            onSuitcasesChange={setSelectedSuitcases}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
          <CarRentalCards
            selectedCompanies={selectedCompanies}
            selectedCategories={selectedCategories}
            selectedPassengers={selectedPassengers}
            selectedSuitcases={selectedSuitcases}
            priceRange={priceRange}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
