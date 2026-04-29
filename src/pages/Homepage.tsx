import React, { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";
import { useState } from "react";
import Card from "@mui/material/Card";
import {
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
import { useAddSnippet } from "../actions/snippets/useAddSnippit";
import { useSnackBarAlert } from "../contexts/snackbar/SnackbarAlertContext";
import { useUser } from "../actions/auth/useUser";
import { useQueryClient } from "@tanstack/react-query";

export default function Homepage() {
  const { showSnackBar } = useSnackBarAlert();
  const [chips, setChips] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] =
    useState<keyof typeof languages>("javascript");

  const { saveSnippet, isAdding } = useAddSnippet();
  const { user } = useUser();

  const isValid = value.length > 0 && title.length > 0;

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as keyof typeof languages);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeTags = (newChips: string[]) => {
    setChips(newChips);
  };

  const handleSnippetChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handleSaveSnippet = () => {
    saveSnippet(
      {
        user_id: user?.id as string,
        title,
        content: value,
        syntax: language,
        tags: chips,
      },
      {
        onSuccess: () => {
          const queryClient = useQueryClient();
          queryClient.invalidateQueries({ queryKey: ["snippets", user?.id] });
          showSnackBar("Snippet saved successfully!", "success");
          setTitle("");
          setValue("");
          setChips([]);
        },
        onError: (error) => {
          showSnackBar(
            error.message || "Failed to save snippet. Please try again.",
            "error",
          );
        },
      },
    );
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
        value={title}
        onChange={handleTitleChange}
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
          value={value}
          extensions={[languages[language]]}
          theme={"dark"}
          width="100%"
          height="400px"
          onChange={handleSnippetChange}
        />
      </Card>
      <Stack
        direction="row"
        sx={{
          mt: 4,
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <SplitButton
          onClick={handleSaveSnippet}
          isLoading={isAdding}
          disabled={!isValid}
        />
      </Stack>
    </React.Fragment>
  );
}
