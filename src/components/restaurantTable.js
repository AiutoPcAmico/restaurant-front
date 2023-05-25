import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { retrieveRestaurants } from "../api/handleAxios";

function createData(id, name, location, avgPrice, speciality, maxAllowed) {
  return { id, name, location, avgPrice, speciality, maxAllowed };
}

export default function RestaurantTable() {
  const [rows, setRows] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    setRows([]);
    restaurants.forEach((single) => {
      const toBePushed = createData(
        single.id,
        single.name,
        single.location,
        single.avgPrice,
        single.speciality,
        single.maxAllowed
      );

      console.log(toBePushed);

      setRows((rows) => [...rows, toBePushed]);
    });
  }, [restaurants]);

  React.useEffect(() => {
    retrieveRestaurants().then((restaurant) => {
      setRestaurants(restaurant.data.value);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Luogo</TableCell>
            <TableCell align="right">Prezzo medio</TableCell>
            <TableCell align="right">Specialità</TableCell>
            <TableCell align="right">Massimo clienti</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 &&
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.avgPrice}</TableCell>
                <TableCell align="right">{row.speciality}</TableCell>
                <TableCell align="right">{row.maxAllowed}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
