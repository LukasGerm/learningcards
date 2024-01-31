import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { createCollection } from "../../../../../adapters/collection";
import { CardCollection } from "../../../../../adapters/types/CardCollection";
import { useSession } from "../../../hooks/user.selectors";

export const useAddCollection = () => {
  const client = useQueryClient();
  const user = useSession();
  const query = createMutation(() => ({
    mutationKey: ["addCollection"],
    mutationFn: (options: { name: string }) => {
      if (!user) return Promise.reject("User not logged in");
      const oldCollections = client.getQueryData([
        "collections",
      ]) as CardCollection[];
      const newCollections = [
        ...oldCollections,
        { name: options.name, cards: [] },
      ];
      client.setQueryData(["collections"], newCollections);
      return createCollection({ ...options, userId: user.uid });
    },
  }));

  return query;
};
