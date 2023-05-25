import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { SelectItems } from "../components/selectItems";
import { addBooking, retrieveRestaurants } from "../api/handleAxios";
import { DialogMessage } from "../components/dialogMessage";

require("./pages.css");

function Booking() {
  const [restaurants, setRestaurants] = useState();
  const [canIProceed, setCanIProceed] = useState(false);
  const [dialogOpened, setDialogOpened] = useState({
    isOpened: false,
    title: "",
    message: "",
  });
  const [booking, setBooking] = useState({
    name: "",
    surname: "",
    dateTime: "",
    restaurantId: null,
  });

  useEffect(() => {
    console.log({ booking });

    if (
      booking.name &&
      booking.surname &&
      booking.dateTime &&
      booking.restaurantId
    )
      setCanIProceed(true);
    else setCanIProceed(false);
  }, [booking]);

  function modifiedSelection(val) {
    setBooking({ ...booking, restaurantId: val.target.value });
    console.log(val);
  }

  function handleSave() {
    addBooking(booking).then((el) => {
      if (!el.isError) {
        setDialogOpened({
          isOpened: true,
          title: "Confermato!",
          message:
            "La sua prenotazione è stata confermata! Presentati all'orario e il giorno scelto. ",
        });
        setBooking({
          name: "",
          surname: "",
          dateTime: null,
          restaurantId: null,
        });
      } else {
        //in caso di errore
        setDialogOpened({
          isOpened: true,
          title: "Errore!",
          message:
            "Si è verificato un errore durante il salvataggio della prenotazione. E' pregato di riprovare.<br><br> " +
            el.errMsg,
        });
      }
    });
  }

  useEffect(() => {
    retrieveRestaurants().then((el) => {
      setRestaurants(el.data.value);
    });
  }, []);

  return (
    <div>
      <h2>Pagina di Prenotazione</h2>
      <div className="two-columns">
        <div className="column-sx">
          <h3>Inserisci i tuoi dati</h3>

          <div className="contentPrenotazione">
            <span style={{ flexGrow: 2 }}>Il tuo Nome: &nbsp;</span>

            <TextField
              id="standard-basic"
              label="Nome"
              variant="standard"
              value={booking.name}
              onChange={(el) => {
                setBooking({ ...booking, name: el.target.value });
              }}
              style={{ flexGrow: 1, marginRight: "2em" }}
            />
            <span style={{ flexGrow: 2 }}>Il tuo Cognome: &nbsp;</span>
            <TextField
              id="standard-basic"
              label="Cognome"
              variant="standard"
              style={{ flexGrow: 1 }}
              value={booking.surname}
              onChange={(el) => {
                setBooking({ ...booking, surname: el.target.value });
              }}
            />
          </div>
          <div className="contentPrenotazione">
            <span style={{ flexGrow: 2 }}>Data e ora della Prenotazione: </span>
            <DateTimePicker
              label="Controlled picker"
              value={booking.dateTime}
              ampm={false}
              onAccept={(el) => {
                setBooking({ ...booking, dateTime: el.$d });
              }}
            />
          </div>
          <div className="contentPrenotazione">
            <span style={{ flexGrow: 2 }}>
              Seleziona un ristorante preferito:
            </span>
            <SelectItems
              handleChange={modifiedSelection}
              arrayOfData={restaurants}
            ></SelectItems>
          </div>

          <div
            className="contentPrenotazione"
            style={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={!canIProceed}
              onClick={() => {
                handleSave();
              }}
            >
              Invia i dati
            </Button>
            <DialogMessage
              dialogData={dialogOpened}
              setDialogData={setDialogOpened}
            ></DialogMessage>
          </div>
        </div>

        <div className="column-dx">colonna 2</div>
      </div>
    </div>
  );
}

export { Booking };
