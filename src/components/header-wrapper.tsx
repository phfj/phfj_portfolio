import { getSearchItems, type SearchItem } from "@/lib/search-data";
import { Header } from "@/components/header";

export async function HeaderWrapper() {
  const searchItems: SearchItem[] = await getSearchItems();
  return <Header searchItems={searchItems} />;
}
