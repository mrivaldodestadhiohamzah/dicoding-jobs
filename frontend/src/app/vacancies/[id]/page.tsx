import VacancyDetailsClient from "./VacancyDetailsClient";

export const instant = false;

export default async function VacancyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VacancyDetailsClient id={id} />;
}
