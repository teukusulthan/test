import { getCategoriesServer } from "@/lib/api";
import { Dashboard } from "@/components/dashboard";

export default async function Page() {
  const categories = await getCategoriesServer();
  return <Dashboard categories={categories} />;
}
