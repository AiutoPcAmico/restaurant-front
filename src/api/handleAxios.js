import axios from "./axios.js";

function retrieveErrors(statusCode, data) {
  var isError = false;
  var messageError = null;

  switch (statusCode) {
    case 200:
      //request ok
      break;
    case 201:
      //created element
      break;

    case 400:
      //Bad Request
      isError = true;
      messageError =
        "Errore della piattaforma.\nNello specifico, è stata inviata una richiesta non valida.\n\nRiprova";
      break;

    case 401:
      //Unauthorized Access
      isError = true;
      messageError = "La sessione è scaduta.\nPrego, rieffettuare il login.";
      break;

    case 403:
      //user not authorizated (or not found)
      isError = true;
      messageError =
        "Username o Password errati, o l'utente non è autorizzato all'accesso.\nRiprova";
      break;

    case 404:
      isError = true;
      messageError =
        "Gli elementi ricercati non sono stati trovati nel nostro sistema.\nRiprova!";
      break;

    case 409:
      isError = true;
      messageError =
        "L'utente indicato risulta già iscritto al portale.\nRiprova!";
      break;

    case 426:
      isError = true;
      messageError =
        "L'account è stato disabilitato.\nContattare il supporto Treessue";
      break;

    case 500:
      isError = true;
      messageError = "Errore del Server.\nRiprova!";
      break;

    default:
      isError = true;
      messageError =
        "Errore sconosciuto.\nContattare l'assistenza e fornire il seguente codice.\n" +
        statusCode;
      break;
  }

  return {
    isError: isError,
    messageError: messageError,
    status: statusCode,
    data: data,
  };
}

const addBooking = async (booking) => {
  try {
    const response = await axios.post("/bookings/new", {
      name: booking.name,
      surname: booking.surname,
      restaurantId: booking.restaurantId,
      dateTime: booking.dateTime,
    });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    return retrieveErrors(e.response.status, e.response.data.result);
  }
};

async function retrieveRestaurants() {
  try {
    const response = await axios.get("/restaurants");

    //todo aggiungere la quantity corretta

    console.log({ response });
    return retrieveErrors(response.status, response.data);
  } catch (e) {
    console.log(e);
    return retrieveErrors(e.response.status, e.response.data.result);
  }
}

export { addBooking, retrieveRestaurants };
