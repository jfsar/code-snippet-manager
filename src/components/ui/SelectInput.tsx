import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

export default function SelectInput() {
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="simple-select-label">Age</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
