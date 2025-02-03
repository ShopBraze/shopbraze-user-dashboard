export const BulkUploadReportsTransformer = (response: any) => {
  const reportsData = [] as BulkUploadReport[]
  if (response && response?.data?.length > 0) {
    for (let i = 0; i < response?.data?.length; i++) {
      const item = response?.data?.[i];
      const report = {} as BulkUploadReport

      report.file_name = item?.file_name,
        report.report_url = item?.report_url,
        report.seller = item?.seller,
        report.total_row = item?.total_row,
        report.upload_type = item?.upload_type,
        report.uploaded_time = item?.uploaded_time,
        report.uploaded_status = item?.uploaded_status,
        report.uploaded_completed_time = item?.uploaded_completed_time,
        report.uploaded_file_url = item?.uploaded_file_url,
        report.user_type = item?.user_type

      reportsData.push(report)
    }
  }
  return reportsData
}