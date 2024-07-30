import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import './style.css';

const ExcelReader = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('/assets/50-sample-contacts-list-excel.xlsx')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        const wb = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetNames = wb.SheetNames;
        setSheetNames(sheetNames);

        if (sheetNames.length > 0) {
          const defaultSheet = sheetNames[0];
          setSelectedSheet(defaultSheet);
          const ws = wb.Sheets[defaultSheet];
          const json = XLSX.utils.sheet_to_json(ws);
          
          setData(json);
          if (json.length > 0) {
            const cols = Object.keys(json[0]);
            setColumns(cols);
            setSelectedColumns(cols); // Set all columns as selected by default
          }
        }
      })
      .catch((error) => console.error('Error loading default Excel file:', error));
  }, []);

  const handleSheetChange = (sheetName) => {
    setSelectedSheet(sheetName);
    fetch('/assets/50-sample-contacts-list-excel.xlsx')
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const wb = XLSX.read(arrayBuffer, { type: 'array' });
        const ws = wb.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(ws);

        setData(json);
        if (json.length > 0) {
          const cols = Object.keys(json[0]);
          setColumns(cols);
          setSelectedColumns(cols); // Set all columns as selected by default
        }
      })
      .catch((error) => console.error('Error loading sheet:', error));
  };

  const handleColumnChange = (event) => {
    const column = event.target.name;
    setSelectedColumns((prevSelected) =>
      prevSelected.includes(column)
        ? prevSelected.filter((col) => col !== column)
        : [...prevSelected, column]
    );
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Excel Reader</h1>
      </header>
      <div className="content">
        <aside className="sidebar">
          <div className="sheet-selector">
            <h2>Sheets</h2>
            <div className="sheet-menu">
              {sheetNames.map((sheetName) => (
                <button
                  key={sheetName}
                  className={`sheet-button ${selectedSheet === sheetName ? 'active' : ''}`}
                  onClick={() => handleSheetChange(sheetName)}
                >
                  {sheetName}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main className="main-content">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {selectedColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {selectedColumns.map((col) => (
                      <td key={col}>{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExcelReader;
