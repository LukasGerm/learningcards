import { createQuery } from "@tanstack/solid-query";
import { getCollections } from "../../../../../adapters/collection";
import { useSession } from "../../../hooks/user.selectors";

export const useCollections = () => {
  const user = useSession();
  const query = createQuery(() => ({
    queryKey: ["collections"],
    queryFn: () => {
      if (!user) return Promise.resolve([]);
      return getCollections({
        userId: user.uid,
      });
    },
  }));
  return query;
};
