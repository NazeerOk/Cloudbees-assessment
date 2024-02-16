import { Avatar, Skeleton } from "@mui/material";

const SkeletonAvatar = ({ loading, altName, src, sx }) => {
  return loading ? (
    <Skeleton variant="circular">
      <Avatar sx={sx} />
    </Skeleton>
  ) : (
    <Avatar alt={altName} src={src} sx={sx} />
  );
};

export default SkeletonAvatar;
