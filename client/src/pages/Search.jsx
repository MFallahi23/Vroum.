import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CarItem from "../components/CarItem";

const fuelTypes = [
  "all",
  "Gasoline",
  "Diesel",
  "Bio-diesel",
  "Ethanol",
  "Electric",
];
const engineTypes = [
  "all",
  "Twin-cylinder",
  "Three-cylinder",
  "Four-cylinder",
  "Five-cylinder",
  "Six-cylinder",
  "Eight-cylinder or more",
];
const transmissionTypes = [
  "all",
  "Manual",
  "Torque Converter",
  "Continuously Variable",
  "Semi-Automatic",
  "Dual-Clutch",
  "Tiptronic",
];
const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    fuelType: "all",
    engine: "all",
    Transmission: "all",
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const engineFromUrl = urlParams.get("engine");
    const fuelTypeFromUrl = urlParams.get("fuelType");
    const TransmissionFromUrl = urlParams.get("Transmission");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      engineFromUrl ||
      fuelTypeFromUrl ||
      TransmissionFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        engine: engineFromUrl || "all",
        fuelType: fuelTypeFromUrl || "all",
        Transmission: TransmissionFromUrl || "all",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }
    const fetchCars = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await axios.get(`/api/car/get?${searchQuery}`);
      const { data } = res;
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setCars(data);
      setLoading(false);
    };
    fetchCars();
  }, [location.search]);

  // HANDLE CHANEG
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "engine" ||
      e.target.id === "fuelType" ||
      e.target.id === "Transmission"
    ) {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  // HANDLE SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("engine", sidebardata.engine);
    urlParams.set("fuelType", sidebardata.fuelType);
    urlParams.set("Transmission", sidebardata.Transmission);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // SHOW MORE CLICK
  const onShowMoreClick = async () => {
    const numberOfcars = cars.length;
    const startIndex = numberOfcars;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await axios.get(`/api/car/get?${searchQuery}`);
    const { data } = res;

    if (data.length < 9) {
      setShowMore(false);
    }
    setCars([...cars, ...data]);
  };
  return (
    <div className="my-20 p-4">
      <div className="flex flex-col sm:flex-row  gap-5 max-w-[1200px] mx-auto">
        <div className="">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="flex flex-col">
              <label htmlFor="searchTerm" className="font-semibold">
                Search Term:
              </label>
              <input
                type="text"
                className="border p-2 rounded-lg"
                id="searchTerm"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="" className="font-semibold">
                Type:
              </label>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name=""
                  id="all"
                  onChange={handleChange}
                  checked={sidebardata.type === "all"}
                />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name=""
                  id="sale"
                  onChange={handleChange}
                  checked={sidebardata.type === "sale"}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name=""
                  id="rent"
                  onChange={handleChange}
                  checked={sidebardata.type === "rent"}
                />
                <span>Rent</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className=" self-start font-semibold">Specificatons:</span>
              <div className="flex  items-center gap-2">
                <label htmlFor="">Engine:</label>
                <select
                  name="enigne"
                  id="engine"
                  className="border p-1 rounded-lg"
                  onChange={handleChange}
                  defaultValue={"all"}
                >
                  {engineTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex  items-center gap-2">
                <label htmlFor="">Fuel</label>
                <select
                  name="fuelType"
                  id="fuelType"
                  className="border rounded-lg p-1"
                  onChange={handleChange}
                  defaultValue="all"
                >
                  {fuelTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex  items-center gap-2">
                <label htmlFor="">Transmission</label>
                <select
                  name="Transmission"
                  id="Transmission"
                  className="border rounded-lg p-1"
                  onChange={handleChange}
                  defaultValue="all"
                >
                  {transmissionTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                onChange={handleChange}
                defaultValue={"createdAt_desc"}
                id="sort_order"
                className="border rounded-lg p-2"
              >
                <option value="price_desc">Price high to low</option>
                <option value="price_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button
              disabled={loading}
              className=" bg-myYellow text-white uppercase p-2 rounded-lg hover:opacity-55 disabled:opacity-25"
            >
              Search
            </button>
          </form>
        </div>
        <div className=" flex-1">
          <h1 className="text-3xl mb-4">Search Results:</h1>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-10">
            {!loading && cars.length === 0 && (
              <p className="text-xl text-slate-700 text-center mt-10">
                No listing found!
              </p>
            )}
            {loading && <p className=" text-center mt-10">Loading...</p>}
            {!loading &&
              cars &&
              cars.map((car) => <CarItem key={car._id} car={car} />)}
          </div>
          {showMore && (
            <div className="w-full flex justify-center mt-8">
              <button
                onClick={onShowMoreClick}
                className="text-green-700 hover:underline text-center"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
