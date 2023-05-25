import logo from "./logo.svg";
import "./App.css";
import { DateTimeCustom } from "./components/dateTime";
import { InputValues } from "./pages/inputValues";
import { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { Headers } from "./components/headers";
import { ExamplePage } from "./pages/examplePage";
import { Booking } from "./pages/booking";
import { RestaurantsList } from "./pages/restaurantsList";

function App() {
  const navItems = ["Ristoranti", "Prenota", "Annulla Prenotazione"];
  const [opened, setOpened] = useState("Ristoranti");
  return (
    <div className="App">
      <header className="App-header">
        <Headers handleSelectionPage={setOpened} navItems={navItems} />
      </header>
      <div style={{ width: "80vw", marginLeft: "10vw" }}>
        {opened === "Annulla Prenotazione" && <ExamplePage></ExamplePage>}
        {opened === "Prenota" && <Booking></Booking>}
        {opened === "Ristoranti" && <RestaurantsList></RestaurantsList>}
      </div>
    </div>
  );
}

export default App;
