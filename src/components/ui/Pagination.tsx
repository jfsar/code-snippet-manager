import { Button, Stack } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSearchParams } from "react-router-dom";
import { PER_PAGE } from "../../lib/utils";

export default function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PER_PAGE);

  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", previous.toString());
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: "100%", justifyContent: "center" }}
    >
      <Button
        size="small"
        variant="outlined"
        startIcon={<NavigateBeforeIcon />}
        onClick={previousPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        onClick={nextPage}
        disabled={currentPage === pageCount}
        endIcon={<NavigateNextIcon />}
      >
        Next
      </Button>
    </Stack>
  );
}
