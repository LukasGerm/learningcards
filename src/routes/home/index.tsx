import { getAuth, signOut } from "firebase/auth";
import { ParentComponent } from "solid-js";
import { RootLayout } from "../../RootLayout";
import { Button } from "../../components/ui-components/atoms/Button";
import { CollectionList } from "../../components/ui-components/organisms/CollectionList";

const Layout: ParentComponent = (props) => {
  return (
    <div>
      <div class="flex justify-end w-full absolute box-border items-end px-4 py-4">
        <div>
          <Button onClick={() => signOut(getAuth())}>Sign out</Button>
        </div>
      </div>
      <RootLayout>{props.children}</RootLayout>
    </div>
  );
};

const CollectionsOverview = () => {
  return (
    <Layout>
      <CollectionList />
    </Layout>
  );
};

export default CollectionsOverview;
