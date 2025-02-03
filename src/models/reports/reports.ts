type BulkUploadReport = {
  file_name: string;
  uploaded_file_url: string;
  upload_type: "New Catalogue";
  uploaded_time: string;
  uploaded_status: "Completed" | "Failed";
  uploaded_completed_time?: string;
  total_row: number;
  report_url: string;
  user_type: string;
  seller: string;
};
