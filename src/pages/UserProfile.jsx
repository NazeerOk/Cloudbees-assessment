import {
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Skeleton,
  Typography,
  styled,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GitHub, Twitter } from "@mui/icons-material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SkeletonAvatar from "../components/SkeletonAvatar";
import useFetch from "../hooks/useFetch";

const StyledGlassCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.background.color.grey,
  border: theme.border.grey.light,
  borderRadius: "10px",
  boxShadow: theme.boxShadow.black.light,
  minHeight: "300px",
  padding: 2,
  margin: 3,
}));

const StyledUserProfileBox = styled(Box)(({theme}) => ({
  backgroundImage: theme.gradient.primary,
  backgroundColor: theme.background.color.blue,
  minHeight: "100vh",
  minWidth:"100vw",
  display: "flex",
  justifyContent:"center",
  alignItems:"center"
}))

const ProfileInfo = ({ title, value }) => {
  if (value === null) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography sx={{ fontSize: "15px", fontWeight: "400" }}>
        {title}
      </Typography>
      <Typography variant="p" sx={{ fontWeight: "500" }}>
        {value}
      </Typography>
    </Box>
  );
};

const UserProfileSkelton = () => (
  <Box width={"250px"} ml={2}>
    <Skeleton width="100%" animation="wave">
      <Typography variant="body1">.</Typography>
    </Skeleton>
    <Skeleton width="50%" animation="wave">
      <Typography variant="body1"> .</Typography>
    </Skeleton>
    <Skeleton width="50%" animation="wave">
      <Typography variant="body1">.</Typography>
    </Skeleton>
  </Box>
);

const UserProfile = () => {
  const { userName } = useParams();

  const {
    state: { loading, data: userProfile },
    fetchData,
    dispatch,
  } = useFetch({ url: `/users/${userName}` });

  useEffect(() => {
    dispatch({ type: "custom_initial_state", data: {} }); //Dummy Object for Skeleton UI
    fetchData();
  }, [fetchData, dispatch, userName]);

  const {
    avatar_url,
    company,
    followers,
    following,
    html_url,
    location,
    name,
    public_repos,
    twitter_username,
  } = userProfile || {};

  return (
    <StyledUserProfileBox>
      <StyledGlassCard className="blurry-card">
        <CardContent
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <Grid container>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <SkeletonAvatar
                  loading={loading}
                  alt={userName}
                  src={avatar_url}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>

              {location && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: "15px" }} />
                  <Typography sx={{ fontSize: "13px", fontWeight: "600" }}>
                    {location}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid
              xs={12}
              md={8}
              item
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              <Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
                {name || userName}
              </Typography>
              <Box>
                {twitter_username && (
                  <Link
                    href={`https://twitter.com/${userProfile.twitter_username}`}
                    target="_blank"
                  >
                    <Twitter />
                  </Link>
                )}

                {html_url && (
                  <Link
                    href={html_url}
                    target="_blank"
                    sx={{ color: "inherit", ml: 1 }}
                  >
                    <GitHub />
                  </Link>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  justifyContent: "flex-start",
                  mt: 1,
                }}
              >
                {loading ? (
                  <UserProfileSkelton />
                ) : (
                  <>
                    <ProfileInfo title={"Company"} value={company} />
                    <ProfileInfo title={"Followers"} value={followers} />
                    <ProfileInfo title={"Following"} value={following} />
                    <ProfileInfo
                      title={"Public Repositories"}
                      value={public_repos}
                    />
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledGlassCard>
    </StyledUserProfileBox>
  );
};

export default UserProfile;
