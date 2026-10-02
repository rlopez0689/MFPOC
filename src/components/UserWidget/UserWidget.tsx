import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/users";
import { useAppContext } from "../../hooks/useAppContext";
import { Avatar, Card, Detail, Eyebrow, Notice } from "./UserWidget.styles";

export default function UserWidget() {
  const { currentUser, tenantId, appTheme } = useAppContext();
  const userId = currentUser.id;
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId)
  });

  return (
    <Card $themeName={appTheme} aria-live="polite">
      <Avatar aria-hidden="true">{data?.name?.slice(0, 1) ?? "U"}</Avatar>
      <Eyebrow>User profile · {tenantId}</Eyebrow>
      <h2>{isLoading ? "Loading profile…" : data?.name ?? "Profile unavailable"}</h2>
      {isLoading && <Notice>Fetching user {userId} from JSONPlaceholder.</Notice>}
      {error && <Notice $error role="alert">{error.message}. Please try again in a moment.</Notice>}
      {data && <>
        <p>{data.company?.catchPhrase}</p>
        <Detail><strong>Email</strong> · {data.email}</Detail>
        <Detail><strong>Website</strong> · {data.website}</Detail>
      </>}
    </Card>
  );
}
