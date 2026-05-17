import { useUser } from "../actions/auth/useUser";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";
import SnippetSkeleton from "../components/skeletons/SnippetSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSnippetById } from "../actions/snippets/useGetSnippetById";
import { useState, useRef, useEffect } from "react";
import ConfirmItemDeletionDialog from "../components/alerts/ConfirmItemDeletionDialog";

export default function SingleSnippetPage() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { snippet, isLoading, error: isError } = useGetSnippetById(id as string);
  const [copied, setCopied] = useState(false);

  // Store timeout ref to cancel it if the component unmounts before it fires
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Responsive height for CodeMirror
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Clean up the copy timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet?.content || "");
    setCopied(true);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleEditIconClick = () => {
    navigate(`/snippets/${id}/edit`);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <SnippetSkeleton height="60vh" />
      </Box>
    );
  }

  // Error state
  if (isError) {
    return (
      <Typography variant="h6" color="error">
        Something went wrong loading this snippet. Please try again.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {snippet ? (
        <Box sx={{ width: "100%" }}>
          {/* Title row — clamps long titles with ellipsis on small screens */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {snippet.title}
            </Typography>
          </Stack>

          <Card variant="outlined" sx={{ width: "100%", p: 2, mb: 2 }}>
            {/* Meta row — wraps on small screens */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1,
                pb: 2,
              }}
            >
              {/* Tags & syntax — wraps when there are many chips */}
              <Stack
                direction="row"
                sx={{
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
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

              {/* Action icons */}
              <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
                {user && snippet.owner_id === user.id && (
                  <>
                    <IconButton
                      onClick={handleEditIconClick}
                      aria-label="Edit snippet"
                      color="primary"
                      size="small"
                    >
                      <ModeEditIcon fontSize="inherit" />
                    </IconButton>
                    <ConfirmItemDeletionDialog
                      id={snippet.id}
                      owner={snippet.owner_id}
                    />
                  </>
                )}
                <IconButton
                  aria-label={copied ? "Copied!" : "Copy snippet"}
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
            </Box>

            {/* Code editor — reduced height on mobile */}
            <Box sx={{ width: "100%" }}>
              <CodeMirror
                value={snippet.content}
                extensions={[
                  languages[snippet.syntax as keyof typeof languages],
                ]}
                theme={"dark"}
                width="100%"
                height={isMobile ? "40vh" : "60vh"}
                editable={false}
              />
            </Box>
          </Card>
        </Box>
      ) : (
        <Typography variant="h6">Snippet not found</Typography>
      )}
    </Box>
  );
}