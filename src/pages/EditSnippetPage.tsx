import React, { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";
import { useState } from "react";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { useSnackBarAlert } from "../contexts/snackbar/SnackbarAlertContext";
import { useUser } from "../actions/auth/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSnippetById } from "../actions/snippets/useGetSnippetById";
import SnippetSkeleton from "../components/skeletons/SnippetSkeleton";
import { useUpdateSnippet } from "../actions/snippets/useUpdateSnippet";
import { QueryClient } from "@tanstack/react-query";

export default function EditSnippetPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { snippet, isLoading } = useGetSnippetById(params?.id as string);
  const { showSnackBar } = useSnackBarAlert();
  const [chips, setChips] = useState<string[]>(
    (snippet?.tags as string[]) || [],
  );
  const [title, setTitle] = useState<string>(snippet?.title || "");
  const [value, setValue] = useState<string>(snippet?.content || "");
  const [language, setLanguage] = useState<keyof typeof languages>(
    (snippet?.syntax as keyof typeof languages) || "javascript",
  );

  const { updateSnippetMutation: updateSnippit, isPending } =
    useUpdateSnippet();

  const { user } = useUser();

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

  const handleUpdateSnippet = () => {
    updateSnippit(
      {
        id: params?.id as string,
        // user_id: user?.id as string,
        title,
        content: value,
        syntax: language,
        tags: chips,
      },
      {
        onSuccess: () => {
          const queryClient = new QueryClient();
          setTitle("");
          setValue("");
          setChips([]);
          queryClient.invalidateQueries({ queryKey: ["snippets", user?.id] });
          queryClient.invalidateQueries({ queryKey: ["snippet", params?.id] });
          navigate(`/snippets/${params?.id}`);
          showSnackBar("Snippet updated successfully!", "success");
        },
        onError: (error) => {
          showSnackBar(
            error.message || "Failed to update snippet. Please try again.",
            "error",
          );
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <SnippetSkeleton height="60vh" />
      </Box>
    );
  }

  if (!snippet) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <Typography variant="h6">Snippet not found</Typography>
      </Box>
    );
  }

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
        <Button
          onClick={() => navigate(-1)}
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleUpdateSnippet}
          loading={isPending}
        >
          Save Changes
        </Button>
      </Stack>
    </React.Fragment>
  );
}
