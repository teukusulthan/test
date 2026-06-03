import { getCategories } from "@/lib/api";
import { Dashboard } from "@/components/dashboard";

export default async function Page() {
  const categories = await getCategories();
  return <Dashboard categories={categories} />;
}
