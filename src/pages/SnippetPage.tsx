import React from "react";
import { useUser } from "../actions/auth/useUser";
import { useGetSnippetByUser } from "../actions/snippets/useGetSnippetByUser";
import {
  Box,
  Breadcrumbs,
  Card,
  Chip,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";

export default function SnippetPage() {
  const { user } = useUser();
  const { snippets } = useGetSnippetByUser(user?.id as string);
  console.log(snippets);

  return (
    <Box sx={{ width: "100%" }}>
      {snippets &&
        snippets.map((snippet) => (
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
              <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Typography sx={{ color: "text.primary" }}>
                    {user?.user_metadata?.username}
                  </Typography>
                  <Link underline="hover" color="info" href="/">
                    {snippet.id}
                  </Link>
                </Breadcrumbs>
              </div>
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
                  p: 0,
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 2, alignItems: "center" }}
                >
                  <Typography color="textSecondary">Syntax:</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor: "default.main",
                      color: "text.primary",
                      px: 1,
                      borderRadius: 1,
                    }}
                  >
                    {snippet.syntax}
                  </Typography>
                  <Typography color="textSecondary">Tags:</Typography>
                  {snippet.tags.length > 0 ? (
                    snippet.tags.map((tag: string) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        color="default"
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No tags
                    </Typography>
                  )}
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
                  height="300px"
                  editable={false}
                />
              </Container>
            </Card>
          </div>
        ))}
    </Box>
  );
}
