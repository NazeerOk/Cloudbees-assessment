import styled from "@emotion/styled";
import { Box, Chip, Paper, Skeleton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SkeletonAvatar from "./SkeletonAvatar";

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: 4,
  transition: "box-shadow 0.3s ease",
  backgroundColor: theme.background.color.grey,
  border: theme.border.grey.light,
  boxShadow: theme.boxShadow.black.light,
  borderRadius: "8px",
  "&:hover": {
    boxShadow: theme.boxShadow.black.dark,
  },
}));

const UserCard = ({ userName, avatarURL, loading }) => {
  const [firstName, secondName] = userName?.split(" ") || "";
  return (
    <Link to={`/user/${userName}`} style={{ textDecoration: "none" }}>
      <StyledPaper elevation={0} square>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
        >
          <SkeletonAvatar
            loading={loading}
            sx={{ width: 60, height: 60 }}
            alt={userName}
            src={avatarURL}
          />

          {userName && (
            <Chip
              label={`@${userName}`}
              variant="outlined"
              sx={{ fontSize: "15px", p: 0 }}
              color="primary"
              size="small"
            />
          )}
        </Box>
        <Box>
          <Typography variant="h6">
            {loading ? (
              <Skeleton sx={{ minWidth: "60px" }} />
            ) : (
              `${firstName || ""} ${secondName || ""}`
            )}
          </Typography>
        </Box>
      </StyledPaper>
    </Link>
  );
};

export default UserCard;
