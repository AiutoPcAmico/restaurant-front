import { DateTimePicker } from "@mui/x-date-pickers";

export function DateTimeCustom({ handleOnChange }) {
  return <DateTimePicker ampm={false} onAccept={handleOnChange} />;
}
