import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function SkeletonLoading() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}

        {/* For other variants, adjust the size with `width` and `height` */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem", width: "100%", marginTop: "5px" }}
            />
          </div>
        </div>

        <Skeleton variant="rectangular" width={310} height={60} />
        <Skeleton variant="rounded" width={310} height={60} />
      </Stack>
    </div>
  );
}

export default SkeletonLoading;
