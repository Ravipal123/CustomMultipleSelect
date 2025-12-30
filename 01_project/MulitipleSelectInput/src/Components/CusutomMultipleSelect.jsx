import React, { useState } from "react";

const array = [
  "Ravi",
  "Deepak",
  "Jitender",
  "Lovely",
  "Moti",
  "Ganja"
];

export default function CustomMultipleSelect() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (e) => {
    console.log("e.target.options", e.target.options);
    const options = e.target.options;
    console.log("options", options);
    const selected = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    
    setSelectedValues(selected);
  };

  const handleDelete = (itemToDelete) => {
    setSelectedValues(prev => prev.filter(item => item !== itemToDelete));
  };


  return (
    <>
      {/* Selected Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px", minHeight: "40px", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}>
        {selectedValues.map((item) => (
          <InsideInput 
            key={item} 
            value={item} 
            handleDelete={() => handleDelete(item)} 
          />
        ))}
      </div>

      {/* Multiple Select Dropdown */}
      <select
        multiple
        value={selectedValues} // controlled select
        onChange={handleChange}
        style={{
          width: "100%",
          height: "120px",
          fontSize: "16px",
          padding: "8px",
          borderRadius: "5px",
          border: "2px solid blue"
        }}
      >
        {array.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}

function InsideInput({ value, handleDelete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "4px 10px",
        backgroundColor: "#007bff",
        color: "white",
        borderRadius: "20px",
        fontSize: "14px",
        height: "28px"
      }}
    >
      <span>{value}</span>
      <span
        onClick={handleDelete}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          width: "18px",
          height: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "50%"
        }}
      >
        ×
      </span>
    </div>
  );
}