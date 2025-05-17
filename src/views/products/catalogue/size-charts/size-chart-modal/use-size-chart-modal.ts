import { FileType } from "rsuite/esm/Uploader"
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react"
import { useGetAllCataloguesQuery, useGetCataloguesByShortIdsQuery } from "services/catalogues/index.query"
import toast from "react-hot-toast"
import { usePostCreateSizeChartMutation, useUpdateSizeChartMutation } from "services/size-charts/index.query"

type UseSizeChartModalProps = {
  sizeChartData?: SizeChartType
  handleToggleModal: () => void
}

type SizeChartFormValues = {
  name: string;
  type: string;
  static_type_image_url: string;
  static_type_image: FileType[];
  number_of_rows: number;
  number_of_columns: number;
  unit_labels: string[];
  unit_labels_conversion_factor: any;
  data_by_unit: {
    [unit: string]: string[][];
  };
  selected_products: Catalogue[];
  selected_product_short_ids: string[];
}

const useSizeChartModal = ({ sizeChartData, handleToggleModal }: UseSizeChartModalProps) => {

  const [postCreateSizeChart, { isLoading: isCreating }] = usePostCreateSizeChartMutation()
  const [updateSizeChart, { isLoading: isUpdating }] = useUpdateSizeChartMutation()

  const { data: cataloguesDataFromShortIds = [], isLoading: isLoadingCataloguesByShortIds } = useGetCataloguesByShortIdsQuery(sizeChartData?.product_short_ids!, { skip: !sizeChartData?.product_short_ids })

  const [currentPage, setCurrentPage] = useState(1)
  const { data, isFetching: isFetchingCatalogues } = useGetAllCataloguesQuery({ page: currentPage, limit: 10 })
  const { cataloguesData, totalPages, totalItems, currentPage: currentPageFromApi } = data || {}

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  }

  const [showTable, setShowTable] = useState(false)

  const { control, watch, register, setValue, getValues, handleSubmit, } = useForm<SizeChartFormValues>({
    defaultValues: {
      name: "",
      type: "static",
      static_type_image_url: "",
      static_type_image: [] as FileType[] | { name: string, url: string }[],
      number_of_rows: 0,
      number_of_columns: 0,
      unit_labels: [''],
      unit_labels_conversion_factor: '',
      data_by_unit: {},
      selected_products: [],
      selected_product_short_ids: []
    }
  })

  useEffect(() => {
    if (sizeChartData) {
      setValue("name", sizeChartData.name ?? '');
      setValue("type", sizeChartData.type ?? 'dynamic');
      setValue("static_type_image_url", sizeChartData.static_type_image_url ?? '');
      setValue("static_type_image", sizeChartData.static_type_image_url ? [{ name: "Size Chart Image", url: sizeChartData.static_type_image_url }] : []);
      setValue("unit_labels", sizeChartData.unit_labels ?? ['']);
      setValue("unit_labels_conversion_factor", sizeChartData.unit_labels_conversion_factor ?? '');
      setValue("data_by_unit", sizeChartData.data_by_unit ?? {});
      setValue("selected_products", cataloguesDataFromShortIds);
      setValue("selected_product_short_ids", sizeChartData.product_short_ids ?? []);
      setValue("number_of_rows", Object.values(sizeChartData.data_by_unit ?? {})[0]?.length ?? 0);
      setValue("number_of_columns", Object.values(sizeChartData.data_by_unit ?? {})[0]?.[0]?.length ?? 0);

      if (Object.keys(sizeChartData.data_by_unit ?? {}).length > 0) {
        setShowTable(true);
      }
    }
  }, [sizeChartData, isLoadingCataloguesByShortIds]);

  const handleSelectedProducts = (product: Catalogue, action: "Add" | "Remove") => {
    if (action === "Add") {
      setValue('selected_products', [...watch('selected_products'), product])
      setValue('selected_product_short_ids', [...watch('selected_product_short_ids'), product?.product_short_id])
    }
    else if (action === "Remove") {
      setValue('selected_products', watch('selected_products').filter((item) => item?.id !== product?.id))
      setValue('selected_product_short_ids', watch('selected_product_short_ids').filter((shortId) => shortId !== product?.product_short_id))
    }
  }


  const handleCreateSizeTable = () => {
    const rowCount = getValues("number_of_rows");
    const colCount = getValues("number_of_columns");

    if (rowCount > 0 && colCount > 0) {
      if (rowCount > 10 || colCount > 10) {
        return toast.error("Column and Row should not be more than 10");
      }

      const unitLabels = getValues("unit_labels");
      const prevData = getValues("data_by_unit") || {};

      const updatedData: { [key: string]: string[][] } = {};

      unitLabels.forEach((unit) => {
        const prevTable = prevData[unit] || [];
        const newTable: string[][] = [];

        for (let i = 0; i < rowCount; i++) {
          const prevRow = prevTable[i] || [];
          const newRow: string[] = [];
          for (let j = 0; j < colCount; j++) {
            newRow.push(prevRow[j] ?? "");
          }
          newTable.push(newRow);
        }
        updatedData[unit] = newTable;
      });

      setValue("data_by_unit", updatedData);
      setShowTable(true);
    }
  };

  const buildDataByUnit = (
    unit_labels: string[],
    data_by_unit: { [key: string]: string[][] },
    conversionFactorRaw: string
  ): { [key: string]: string[][] } => {
    const originalUnit = unit_labels?.[0]?.trim();
    const targetUnit = unit_labels?.[1]?.trim();
    const conversionFactor = parseFloat(conversionFactorRaw);
    const isValidConversion =
      originalUnit && targetUnit && !isNaN(conversionFactor);

    const originalValues = data_by_unit?.[originalUnit] ?? [];

    const convertedValues = isValidConversion
      ? originalValues.map(row =>
        row.map(value => {
          const num = parseFloat(value);
          return !isNaN(num) ? (num * conversionFactor).toString() : value;
        })
      )
      : undefined;

    const result: { [key: string]: string[][] } = {};

    if (originalUnit) {
      result[originalUnit] = originalValues;
    }

    if (isValidConversion && targetUnit && convertedValues) {
      result[targetUnit] = convertedValues;
    }

    return result;
  };


  const handleCreateOrUpdate = handleSubmit((data: SizeChartFormValues) => {

    if (!data?.selected_product_short_ids?.length) return toast.error("Please add some products")
    if (data?.type === "static" && !data?.static_type_image?.[0]) return toast.error("Please add Size Chart Image")

    if (data?.type === "dynamic" && (data?.data_by_unit && Object.values(data?.data_by_unit)?.length === 0)) return toast.error("Please add Size Chart Tabel")

    const payload = {
      name: data?.name,
      type: data?.type,
      unit_labels: data?.unit_labels,
      data_by_unit: buildDataByUnit(
        data.unit_labels,
        data.data_by_unit,
        data.unit_labels_conversion_factor
      ),
      unit_labels_conversion_factor: data?.unit_labels_conversion_factor,
      product_short_ids: data?.selected_product_short_ids
    }

    const formDataPayload = new FormData();
    formDataPayload.append("data", JSON.stringify(payload));

    const static_type_image = data?.static_type_image
    if (data.static_type_image?.[0]) {
      formDataPayload.append("static_type_image", data.static_type_image?.[0]?.blobFile!);
    }
    if (sizeChartData) {
      updateSizeChart({ body: formDataPayload, size_chart_id: sizeChartData?.id }).unwrap()
        .then(() => {
          toast.success("Size Chart Updated")
          handleToggleModal()
        })
        .catch((error) => {
          toast.error("Something went wrong")
        })
    }
    else {
      postCreateSizeChart(formDataPayload).unwrap()
        .then(() => {
          toast.success("Size Chart Created")
          handleToggleModal()
        })
        .catch((error) => {
          toast.error("Something went wrong")
        })
    }

  })

  return {
    control,
    watch,
    register,
    setValue,
    handleCreateOrUpdate,
    handleCreateSizeTable,
    showTable,


    isFetchingCatalogues,
    cataloguesData,
    totalItems,
    totalPages,
    currentPage: currentPageFromApi || currentPage,
    handlePageClick,
    handleSelectedProducts,

    isCreating,
    isUpdating
  }
}

export default useSizeChartModal
