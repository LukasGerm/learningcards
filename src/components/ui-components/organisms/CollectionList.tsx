import { For, createSignal } from "solid-js";
import { CardCollection } from "../../../adapters/types/CardCollection";
import { Button } from "../atoms/Button";

export const CollectionList = (props: {
  collections?: CardCollection[];
  onAddCollection: (name: string) => void;
}) => {
  const [newCollectionName, setNewCollectionName] = createSignal("");

  const handleAddCollection = () => {
    if (!newCollectionName()) return;
    props.onAddCollection(newCollectionName());
    setNewCollectionName("");
  };

  return (
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        <For each={props.collections}>
          {(collection) => (
            <tr>
              <td class="border-b border-card px-4 py-2">{collection.name}</td>
              <td class="border-b border-card px-4 py-2">Actions</td>
            </tr>
          )}
        </For>

        <tr>
          <td class="border-b border-card px-4 py-2">
            <input
              type="text"
              class="appearance-none bg-transparent border-none w-full text-gray-300 mr-3 py-1 px-0 leading-tight focus:outline-none focus:ring-0"
              placeholder="Add collection"
              value={newCollectionName()}
              onInput={(e) => setNewCollectionName(e.currentTarget.value)}
            />
          </td>
          <td class="border-b border-card px-4 py-2">
            <Button onClick={handleAddCollection}>Add</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
