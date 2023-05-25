import { useState } from "react";
import RestaurantTable from "../components/restaurantTable";

function RestaurantsList() {
  const [restaurants, setRestaurants] = useState();
  return (
    <div>
      <h2>Lista dei ristoranti</h2>
      <RestaurantTable></RestaurantTable>
    </div>
  );
}

export { RestaurantsList };
