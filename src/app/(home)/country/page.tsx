"use client";
import { AlertDialogBox } from "@src/components/common_components/AlertDialogBox";
import PageTitle from "@src/components/common_components/PageTitle";
import ReusableForm from "@src/components/common_components/ReusableForm";
import { DataTable } from "@src/components/output_components/data-table";
import { Dialog, DialogContent, DialogTitle } from "@src/components/ui/dialog";
import {
  useDeleteCountry,
  useGetAllCountry,
  useSaveCountry,
} from "@src/hooks/useCountry";
import { formDefaultValue } from "@src/lib/commonFns";
import { GenerateColumns } from "@src/lib/getColumn";
import {
  CountryFormFields,
  CountryFormInput,
  CountryFormOutput,
  countrySchema,
} from "@src/schemas/countryShema";
import { ICountry } from "@src/types/country";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const Band = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [resetData, setResetData] = useState<
    {
      name: keyof CountryFormInput;
      value: CountryFormInput[keyof CountryFormInput];
    }[]
  >([]);

  const [alertopen, setAlertOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading, isFetching } = useGetAllCountry();
  console.log(data);

  const { mutate: SaveCountry } = useSaveCountry();
  const { mutate: DeleteCountry } = useDeleteCountry();

  const handleEdit = (row: ICountry, action: string) => {
    console.log(row);
    setView(action === "view");
    setOpen(true);
    const formatted = formDefaultValue({
      id: Number(row?.id ?? 0),
      name: row.name,
      code: row?.code ?? "",
      currency: row.currency,
      timezone: row.timezone,
      divisionId: row.division_id,
      isDelete: row.isdelete,
    });
    setResetData(formatted);
  };

  const handleFormSubmit = (data: CountryFormOutput) => {
    console.log("Data Sumitted", data);
    SaveCountry(data, {
      onSuccess: (data) => {
        if (data.data.success) {
          setOpen(false);
          setResetData([]);
        }
      },
    });
  };

  const handleDelete = ({ id }: ICountry) => {
    setDeleteId(id);
    setAlertOpen(true);
  };
  const confirmDelete = () => {
    if (deleteId) DeleteCountry(deleteId);
  };

  const columns: ColumnDef<ICountry>[] = GenerateColumns<ICountry>(
    data?.data ?? [],
    {
      onEdit: handleEdit,
      onDelete: handleDelete,
      excludeColumns: ["id", "Businessvertical_id", "isdelete"],
    }
  );
  return (
    <div>
      <PageTitle
        title="Country"
        description="Manage Your Country Effectively"
      />

      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setView(false);
            setResetData([]);
          }
        }}>
        <DialogContent className="min-w-max w-full rounded-2xl">
          <DialogTitle>{view ? "View Country" : "Add New Country"}</DialogTitle>
          <ReusableForm
            view={view}
            fields={CountryFormFields()}
            schema={countrySchema}
            onSubmit={handleFormSubmit}
            submitButtonText="Save Band"
            resetdata={resetData}
          />
        </DialogContent>
      </Dialog>
      {isFetching && !isLoading && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-blue-500 h-1">
          <div className="h-full bg-blue-600 animate-pulse" />
        </div>
      )}
      <DataTable
        EnableDialog
        isLoading={isLoading}
        totalCount={data?.total_count ?? 0}
        ButtonTitle="Add New Country"
        title="Country Data"
        columns={columns}
        openDialog={() => {
          setOpen(true);
          setResetData([]);
        }}
        data={data?.data ?? []}
      />
      <AlertDialogBox
        onConfirm={confirmDelete}
        alertopen={alertopen}
        setAlertOpen={setAlertOpen}
      />
    </div>
  );
};

export default Band;
