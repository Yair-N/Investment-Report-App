
'use client'
import React, { useState, FormEvent } from "react";

import { Policy } from "@/app/types";
import { parseExcelFile } from "@/app/utils/excelReadUtils";


const UploadSection: React.FC = () => {

  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const [data, setData] = useState<Policy[]>([]);
  const [dataString, setDataString] = useState<string | null>(null);
  const [recordsWithMultipleFundIds, setRecordsWithMultipleFundIds] = useState<Policy[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  // onchange event
  const handleFile = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (e?.target.files != null) {
      let selectedFile = e.target.files[0];
      if (selectedFile) {
        if (selectedFile && fileTypes.includes(selectedFile.type)) {
          setTypeError(null);
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload = (e) => {
            const result = e.target?.result;
            if (result instanceof ArrayBuffer) {
              setExcelFile(result);
            }
          };
        }
        else {
          setTypeError('Please select only excel file types');
          setExcelFile(null);
        }
      }
    }

  }

  const handleMultipleFunds = () => {
    recordsWithMultipleFundIds.map(record => <div>{record.id}</div>)
    setReady(true)
  }

  // submit event
  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setUploadStatus(false)
    e?.preventDefault();

    if (excelFile !== null) {

      const rawData = await parseExcelFile(excelFile, 'מוצרי חיסכון')
      const data = rawData.filter(record => record.FundIds.length === 1);
      const recordsWithMultipleFundIds = rawData.filter(record => record.FundIds.length > 1);
      setData(data)
      setRecordsWithMultipleFundIds(recordsWithMultipleFundIds);
      console.log(recordsWithMultipleFundIds)
      if (recordsWithMultipleFundIds.length > 0) {
        await handleMultipleFunds()

      }
      else {
        setReady(true)
        setDataString(JSON.stringify(data))
        await uploadData()
      }

    }



  }

  const uploadData = async () => {
    try {
      const response: Response = await fetch('api/upload/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataString,
      });

      if (response.ok) {
        setUploadStatus(true);
      } else {
        setTypeError(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during data upload:', error);
      setTypeError('Error occurred while uploading data');
    }
  };


  return (

    <div className="wrapper">

      <h3>Upload & View Excel Sheets</h3>

      {/* form */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {uploadStatus ? (
          <div className="table-responsive">
            <h1>Upload complete</h1>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>

    </div>
  );
}

export default UploadSection;