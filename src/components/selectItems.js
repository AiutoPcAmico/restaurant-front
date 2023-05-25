import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function SelectItems({ handleChange, arrayOfData, label }) {
  const [selected, setSelected] = useState("");

  const handleChangeInternal = (event) => {
    setSelected(event.target.value);
    handleChange(event);
  };

  console.log({ arrayOfData });

  return (
    <div>
      <Select
        labelId="select-type-id"
        id="select-type"
        label={label}
        value={selected}
        onChange={handleChangeInternal}
      >
        {arrayOfData &&
          arrayOfData?.map(({ id, name }, index) => {
            return (
              <MenuItem key={index} value={id}>
                {name}
              </MenuItem>
            );
          })}
      </Select>
    </div>
  );
}

export { SelectItems };
