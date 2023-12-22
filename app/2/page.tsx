"use client";

import { Products } from "@/types/api.types";
import { useEffect, useState } from "react";

export default function Task_2(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"csv" | "json">("csv");
  const [encoding, setEncoding] = useState<"utf-8" | "utf-16" | "utf-32">(
    "utf-8"
  );
  const [delimiter, setDelimiter] = useState<"comma" | "tab" | "semicolon">(
    "comma"
  );
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [displayFields, setDisplayFields] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      if (event.target.files[0].type === "text/csv") {
        setFileType("csv");
      } else if (event.target.files[0].type === "application/json") {
        setFileType("json");
      }
    }
  };

  const handleStep2Change = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    switch (event.target.name) {
      case "file_type":
        setFileType(event.target.value as "csv" | "json");
        break;
      case "encoding":
        setEncoding(event.target.value as "utf-8" | "utf-16" | "utf-32");
        break;
      case "delimiter":
        setDelimiter(event.target.value as "comma" | "tab" | "semicolon");
        break;
      case "has_header":
        setHasHeader((event.target as HTMLInputElement).checked);
        break;
    }
  };

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      setDisplayFields([...displayFields, event.target.name]);
    } else {
      setDisplayFields(
        displayFields.filter((field) => field !== event.target.name)
      );
    }
  };

  const handleFieldAddition = (): void => {
    setDisplayFields([...displayFields, ...selectedFields]);
    setSelectedFields([]);
  };

  const handleFieldRemoval = (): void => {
    setSelectedFields([...selectedFields, ...displayFields]);
    setDisplayFields([]);
  };

  useEffect(() => {
    let headers: string[] = [];
    if (file) {
      switch (fileType) {
        case "csv":
          const csvReader = new FileReader();
          csvReader.readAsText(file, encoding);
          csvReader.onload = () => {
            const text = csvReader.result as string;
            const lines = text.split("\n");
            if (hasHeader) {
              headers = lines[0].split(delimiter);
            }
          };
          break;
        case "json":
          const jsonReader = new FileReader();
          jsonReader.readAsText(file, encoding);
          jsonReader.onload = () => {
            const text = jsonReader.result as string;
            const jsonObject = JSON.parse(text) as Products;
            for (const product in jsonObject.products) {
              for (const field in jsonObject.products[product]) {
                if (!headers.includes(field)) {
                  headers.push(field);
                }
              }
              break;
            }
          };
          break;
      }
    }
    setAvailableFields(headers);
  }, [file, fileType, hasHeader, delimiter, encoding]);

  return (
    <main className="text-black bg-white flex min-h-screen max-w-screen flex-col items-center p-16 max-sm:p-6 lg:p-12 gap-6 md:gap-16">
      <h1 className="text-2xl sm:text-4xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-center">
        Task 2
      </h1>
      <section className="w-full p-6 max-sm:p-2 bg-gray-200">
        <div className="flex flex-col gap-3">
          <h2>Import Products</h2>
          <div className="flex max-md:flex-wrap justify-between gap-3">
            <div className="bg-white px-5 py-6 max-md:w-full w-1/2">
              <div className="flex flex-col gap-2 md:flex-row md:gap-8">
                <p className="font-[500] md:w-[10%]">Step 1:</p>
                <div className="flex flex-col gap-2 md:w-[90%]">
                  <label htmlFor="file">Select File</label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".csv,.json"
                    className="w-fit border-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                    onChange={handleFileChange}
                    required
                  />
                  <p>Supported File Type(s): .CSV, .JSON</p>
                </div>
              </div>
            </div>
            <div className="bg-white px-5 py-6 max-md:w-full w-1/2">
              <div
                className="flex flex-col gap-2 md:flex-row md:gap-8"
                aria-disabled={!file || file.type !== "text/csv"}
              >
                <p className="font-[500] md:w-[10%]">Step 2:</p>
                <div className="w-[90%] flex flex-col gap-2">
                  <p>Specify Format</p>
                  <div className="w-full flex no-wrap items-center max-md:gap-2">
                    <label className="w-[35%] text-sm" htmlFor="file_type">
                      File Type
                    </label>
                    <select
                      className="md:min-w-[260px] max-w-[75%] px-2 py-1 border-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                      name="file_type"
                      id="file_type"
                      defaultValue="csv"
                      value={fileType}
                      onChange={handleStep2Change}
                      required
                    >
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                  <div className="w-full flex no-wrap items-center max-md:gap-2">
                    <label className="w-[35%] text-sm" htmlFor="encoding">
                      Character Encoding
                    </label>
                    <select
                      className="md:min-w-[260px] max-w-[75%] px-2 py-1 border-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                      name="encoding"
                      id="encoding"
                      defaultValue="utf-8"
                      value={encoding}
                      onChange={handleStep2Change}
                      required
                    >
                      <option value="utf-8">UTF-8</option>
                      <option value="utf-16">UTF-16</option>
                      <option value="utf-32">UTF-32</option>
                    </select>
                  </div>
                  <div className="w-full flex no-wrap items-center max-md:gap-2">
                    <label className="w-[35%] text-sm" htmlFor="delimiter">
                      Delimiter
                    </label>
                    <select
                      className="md:min-w-[260px] max-w-[75%] px-2 py-1 border-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                      name="delimiter"
                      id="delimiter"
                      defaultValue="comma"
                      value={delimiter}
                      onChange={handleStep2Change}
                      required
                    >
                      <option value="comma">Comma</option>
                      <option value="tab">Tab</option>
                      <option value="semicolon">Semicolon</option>
                    </select>
                  </div>
                  <div className="w-full flex no-wrap items-center max-md:gap-2">
                    <label className="w-[35%] text-sm" htmlFor="has_header">
                      Has Header
                    </label>
                    <input
                      type="checkbox"
                      name="has_header"
                      id="has_header"
                      defaultChecked
                      value="true"
                      onChange={handleStep2Change}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white px-5 py-6 w-full">
            <div className="flex flex-col gap-2 md:flex-row md:gap-8">
              <p className="font-[500]">Step 3:</p>
              <div className="flex flex-col gap-2">
                <p>Display Handling</p>
                <p>Select the fields to be displayed</p>
                <div className="w-full flex justify-between gap-4">
                  <div className="flex flex-col gap-2 items-center">
                    <p className="font-[500]">Available Fields</p>
                    <div className="flex flex-col p-2 border-2 border-gray-300 w-fit gap-1">
                      {availableFields.length > 0 ? (
                        availableFields.map((field) => (
                          <div className="checkbox" key={field}>
                            <input
                              type="checkbox"
                              name={field}
                              id={field}
                              onChange={handleFieldChange}
                              required
                            />
                            <label htmlFor={field}>{field}</label>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 justify-center items-center">
                    <button
                      className="px-1 py-2 border-2 border-gray-300"
                      onClick={handleFieldAddition}
                    >
                      {">>"}
                    </button>
                    <button
                      className="px-1 py-2 border-2 border-gray-300"
                      onClick={handleFieldRemoval}
                    >
                      {"<<"}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <p className="font-[500]">Fields to be Displayed</p>
                    <div className="flex flex-col p-2 border-2 border-gray-300 w-fit">
                      {displayFields.length > 0 ? (
                        displayFields.map((field) => (
                          <div className="checkbox" key={field}>
                            <input
                              type="checkbox"
                              name={field}
                              id={field}
                              required
                            />
                            <label htmlFor={field}>{field}</label>
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-3">
            <button className="px-4 py-1 font-bold text-white bg-green-500">
              Next
            </button>
            <button className="px-4 py-1 text-red-600">Cancel</button>
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
}
