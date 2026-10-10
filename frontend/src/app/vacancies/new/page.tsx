"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, createVacancy } from "@/lib/api";
import { VacancyForm } from "@/components/VacancyForm";
import type { VacancyFormData } from "@/types/vacancy";

export default function CreateVacancyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createVacancy,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      router.push(`/vacancies/${data.id}`);
    },
  });

  const apiError = mutation.error instanceof ApiError ? mutation.error : undefined;

  async function handleSubmit(data: VacancyFormData) {
    await mutation.mutateAsync(data);
  }

  return (
    <main className="content-shell create-shell">
      <Link className="back-link" href="/">← Back to vacancies</Link>
      <div className="form-heading">
        <p className="eyebrow">FOR EMPLOYERS</p>
        <h1>Post a vacancy</h1>
        <p>Describe the role clearly so candidates can decide whether it fits.</p>
      </div>
      <VacancyForm
        onSubmit={handleSubmit}
        isSaving={mutation.isPending}
        fieldErrors={apiError?.fieldErrors ?? {}}
        formError={apiError && !Object.keys(apiError.fieldErrors).length ? apiError.message : undefined}
      />
    </main>
  );
}
