import { Field } from "@src/components/common_components/ReusableForm";
import { IDropdown, useDivisionDropdown } from "@src/hooks/useDropdown";
import { z } from "zod";

export const countrySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  timezone: z.string().min(1, { message: "Timezone is required" }),
  divisionId: z.coerce
    .number()
    .int()
    .positive({ message: "Division is required" })
    .min(1, { message: "Division is required" }),
  isDelete: z.boolean().default(false).optional(),
});

export type CountryFormInput = z.input<typeof countrySchema>;
export type CountryFormOutput = z.output<typeof countrySchema>;

export const CountryFormFields = (): Field<CountryFormInput>[] => {
  const { data: divisions = [] } = useDivisionDropdown();
  return [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      placeholder: "Enter Code",
    },
    {
      name: "currency",
      label: "Currency",
      type: "text",
      placeholder: "Enter Currency",
    },
    {
      name: "timezone",
      label: "Timezone",
      type: "text",
      placeholder: "Enter Timezone",
    },
    {
      name: "divisionId",
      label: "Division",
      type: "SearchableSelect",
      options: divisions?.map((c: IDropdown) => ({
        label: c.name,
        value: c.id,
      })),
      placeholder: "Select Division",
    },
  ];
};
