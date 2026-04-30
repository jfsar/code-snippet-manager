import { useUser } from "../actions/auth/useUser";
import { useGetSnippetByUser } from "../actions/snippets/useGetSnippetByUser";
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { languages } from "../lib/langsupport";
import SnippetSkeleton from "../components/skeletons/SnippetSkeleton";
import AppLink from "../components/ui/AppLink";

export default function SnippetPage() {
  const { user } = useUser();
  const { snippets, isLoading } = useGetSnippetByUser(user?.id as string);

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <SnippetSkeleton key={index} />
        ))}
      </Box>
    );
  }

  if (!snippets || snippets.length == 0) {
    return (
      <Box sx={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
          }}
        >
          <Typography color="inheret">You have no snippets.</Typography>
        </div>
      </Box>
    );
  }

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
                  <AppLink
                    underline="hover"
                    color="info"
                    to={`/snippets/${snippet.id}`}
                  >
                    {snippet.id}
                  </AppLink>
                </Breadcrumbs>
              </div>
            </Stack>
            <Card variant="outlined" sx={{ width: "100%", p: 2, mb: 2 }}>
              <Container
                maxWidth={false}
                sx={{ width: "100%", paddingBlock: 2 }}
              >
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
