import { useUser } from "../actions/auth/useUser";
import {
  Box,
  Card,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";
import SnippetSkeleton from "../components/skeletons/SnippetSkeleton";
import { useParams } from "react-router-dom";
import { useGetSnippetById } from "../actions/snippets/useGetSnippetById";
import { useState } from "react";

export default function SingleSnippetPage() {
  const { user } = useUser();
  const { id } = useParams();
  const { snippet, isLoading } = useGetSnippetById(id as string);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet?.content || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <SnippetSkeleton height="60vh" />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {snippet ? (
        <div
          key={snippet.id}
          style={{
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            <Typography sx={{ color: "text.primary" }}>
              {snippet.title}
            </Typography>
          </Stack>
          <Card variant="outlined" sx={{ width: "100%", p: 2, mb: 2 }}>
            <Container
              maxWidth={false}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingBlock: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ mb: 2, alignItems: "center" }}
              >
                <Typography color="textSecondary">Syntax:</Typography>
                <Chip
                  label={snippet.syntax}
                  size="medium"
                  variant="outlined"
                  color="info"
                />
                <Typography color="textSecondary">Tags:</Typography>
                {snippet.tags.length > 0 ? (
                  snippet.tags.map((tag: string) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="medium"
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No tags
                  </Typography>
                )}
              </Stack>
              <Stack direction="row" spacing={1}>
                {user && snippet.owner_id === user.id && (
                  <>
                    <IconButton aria-label="edit" color="primary" size="small">
                      <ModeEditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" size="small">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </>
                )}
                <IconButton
                  aria-label="copy"
                  color="default"
                  size="small"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <LibraryAddCheckIcon fontSize="inherit" />
                  ) : (
                    <ContentCopyIcon fontSize="inherit" />
                  )}
                </IconButton>
              </Stack>
            </Container>
            <Container maxWidth={false} sx={{ width: "100%" }}>
              <CodeMirror
                value={snippet.content}
                extensions={[
                  languages[snippet.syntax as keyof typeof languages],
                ]}
                theme={"dark"}
                width="100%"
                height="60vh"
                editable={false}
              />
            </Container>
          </Card>
        </div>
      ) : (
        <Typography variant="h6">Snippet not found</Typography>
      )}
    </Box>
  );
}
