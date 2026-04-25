import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";
import { useState } from "react";
import Card from "@mui/material/Card";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import SplitButton from "../components/ui/SplitButton";
import { MuiChipsInput } from "mui-chips-input";

export default function Homepage() {
  const [chips, setChips] = useState<string[]>([]);

  const [language, setLanguage] =
    useState<keyof typeof languages>("javascript");

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as keyof typeof languages);
  };

  const handleChangeTags = (newChips: string[]) => {
    setChips(newChips);
  };

  return (
    <React.Fragment>
      <TextField
        fullWidth
        size="small"
        id="input-code-title"
        label="Enter code title"
        variant="outlined"
        sx={{ marginBottom: 4 }}
      />
      <Card variant="outlined" sx={{ width: "100%", p: 2 }}>
        <Stack direction="row" spacing={4} sx={{ mb: 4, alignItems: "center" }}>
          <FormControl>
            <InputLabel id="simple-select-label">Language</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={language}
              label="Language"
              size="small"
              sx={{ minWidth: 120 }}
              onChange={handleChange}
            >
              {Object.entries(languages).map(([name]) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiChipsInput
            size="small"
            placeholder="Add tags"
            fullWidth
            value={chips}
            onChange={handleChangeTags}
          />
        </Stack>
        <CodeMirror
          value="console.log('hello world');"
          extensions={[languages[language]]}
          theme={"dark"}
          width="100%"
          height="400px"
        />
      </Card>
      <Stack
        direction="row"
        sx={{
          mt: 4,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button size="medium" variant="outlined">
          Save snippit
        </Button>
        <SplitButton />
      </Stack>
    </React.Fragment>
  );
}
