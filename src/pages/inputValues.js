import { Button, TextField } from "@mui/material";
import { DateTimeCustom } from "../components/dateTime";
import { SelectItems } from "../components/selectItems";
import { useEffect, useState } from "react";
import { DialogMessage } from "../components/dialogMessage";

function InputValues() {
  const [canIProceed, setCanIProceed] = useState(false);
  const [dialogOpened, setDialogOpened] = useState({
    isOpened: false,
    title: "",
    message: "",
  });

  const [booking, setBooking] = useState({
    name: "",
    surname: "",
    email: "",
    dateTime: "",
    machineType: "",
  });

  useEffect(() => {
    console.log({ booking });
  }, [booking]);

  useEffect(() => {
    if (
      booking.name &&
      booking.surname &&
      booking.email &&
      booking.dateTime &&
      booking.machineType
    ) {
      setCanIProceed(true);
    }
  }, [booking]);

  return (
    <div>
      <h2>Prenota un lavaggio!</h2>
      Nome:<br></br>
      <TextField
        id="filled-basic"
        label="Inserisci il tuo nome"
        variant="filled"
        onChange={(el) => {
          setBooking({
            ...booking,
            name: el.target.value,
          });
        }}
      />
      <br></br>
      <br></br>
      Cognome:<br></br>
      <TextField
        id="filled-basic"
        label="Inserisci il tuo cognome"
        variant="filled"
        onChange={(el) => {
          setBooking({
            ...booking,
            surname: el.target.value,
          });
        }}
      />
      <br></br>
      <br></br>
      Email:<br></br>
      <TextField
        id="filled-basic"
        label="Inserisci la tua email"
        variant="filled"
        onChange={(el) => {
          setBooking({
            ...booking,
            email: el.target.value,
          });
        }}
      />
      <br></br>
      <br></br>
      Data e Ora: <br></br>
      <DateTimeCustom
        handleOnChange={(e) => {
          setBooking({
            ...booking,
            dateTime: e.$d,
          });
        }}
      ></DateTimeCustom>
      <br></br>
      <br></br>
      Seleziona la tipologia di vettura:<br></br>
      <SelectItems
        handleChange={(e) =>
          setBooking({ ...booking, machineType: e.target.value })
        }
      ></SelectItems>
      <br></br>
      <Button variant="contained" color="success" disabled={!canIProceed}>
        Prenota!
      </Button>
    </div>
  );
}

export { InputValues };
