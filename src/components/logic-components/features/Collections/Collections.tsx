import { Match, Switch } from "solid-js";
import { CollectionList } from "../../../ui-components/organisms/CollectionList";
import { useCollections } from "./hooks/useCollections";
import { useAddCollection } from "./hooks/useAddCollection";

export const Collections = () => {
  const collections = useCollections();
  const addCollection = useAddCollection();

  const handleAddCollection = (name: string) => {
    addCollection.mutateAsync({ name });
  };
  return (
    <div class="mt-10">
      <Switch>
        <Match when={collections.isLoading}>Loading collections...</Match>
        <Match when={collections.error}>Error</Match>
        <Match when={collections.data}>
          <CollectionList
            collections={collections.data}
            onAddCollection={handleAddCollection}
          />
        </Match>
      </Switch>
    </div>
  );
};
