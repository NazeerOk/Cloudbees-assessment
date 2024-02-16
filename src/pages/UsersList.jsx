import { useEffect } from "react";
import { Box, Grid, styled } from "@mui/material";
import UserCard from "../components/UserCard";
import useFetch from "../hooks/useFetch";

const StyledGradient = styled(Box)(({ theme }) => ({
  padding: "30px",
  backgroundImage: theme.gradient.primary,
  backgroundColor: theme.background.color.blue,
  minHeight: "100vh",
}));

const UsersList = () => {
  const {
    state: { loading, data: usersData },
    fetchData,
    dispatch,
  } = useFetch({ url: `/users` });

  useEffect(() => {
    dispatch({
      type: "custom_initial_state",
      data: Array.from({ length: 10 }, (_, i) => ({ id: i })),
    }); //Dummy Array for Skeleton UI
    fetchData();
  }, [fetchData, dispatch]);

  return (
    <StyledGradient>
      <Grid container spacing={3}>
        {usersData?.map((user) => (
          <Grid item xs={12} md={6} lg={3} key={user.id}>
            <UserCard
              userName={user.login}
              avatarURL={user.avatar_url}
              userId={user.id}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>
    </StyledGradient>
  );
};

export default UsersList;
