import { Skeleton } from "@mui/material";
import React from "react";

export default function SnippetSkeleton({
  height = 300,
}: {
  height?: number | string;
}) {
  return (
    <React.Fragment>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="30%"
        height={20}
        sx={{ mb: 2 }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={height}
        sx={{ mb: 2 }}
      />
    </React.Fragment>
  );
}
