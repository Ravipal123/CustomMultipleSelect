import React, { useState, useRef } from "react";

const options = [
  "Ravi",
  "Deepak",
  "Jitender",
  "Lovely",
  "Moti",
  "Ganja"
];

export default function CustomMultipleSelect() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOption = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleDelete = (itemToDelete) => {
    setSelectedValues(prev => prev.filter(item => item !== itemToDelete));
  };

  const toggleDropdown = () => setIsOpen(prev => !prev);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "500px", fontFamily: "system-ui, sans-serif" }}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: isOpen ? "0 10px 25px -5px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.1)",
          transition: "all 0.2s ease",
          cursor: "pointer"
        }}
        onClick={toggleDropdown}
      >
        {/* Selected Tags + Placeholder */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            padding: "12px 16px",
            minHeight: "56px",
            alignItems: "center"
          }}
        >
          {selectedValues.length === 0 && (
            <span style={{ color: "#9ca3af", fontSize: "16px" }}>
              Select people...
            </span>
          )}
          {selectedValues.map((item) => (
            <InsideInput
              key={item}
              value={item}
              handleDelete={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
            />
          ))}
          <div style={{ flex: 1 }} /> {/* Spacer */}
          <svg
            style={{
              width: "20px",
              height: "20px",
              color: "#6b7280",
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              marginTop: "8px",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
              maxHeight: "240px",
              overflowY: "auto",
              zIndex: 50
            }}
          >
            {options.map((item) => {
              const isSelected = selectedValues.includes(item);
              return (
                <div
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(item);
                  }}
                  style={{
                    padding: "12px 16px",
                    backgroundColor: isSelected ? "#eff6ff" : "transparent",
                    color: isSelected ? "#2563eb" : "#1f2937",
                    fontWeight: isSelected ? "600" : "400",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "background 0.15s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isSelected ? "#eff6ff" : "transparent")}
                >
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" fill="none"/>
                    </svg>
                  )}
                  {!isSelected && <div style={{width: "16px"}} />}
                  {item}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function InsideInput({ value, handleDelete }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        backgroundColor: "#3b82f6",
        color: "white",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "all 0.2s"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
    >
      <span>{value}</span>
      <span
        onClick={handleDelete}
        style={{
          cursor: "pointer",
          width: "18px",
          height: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: "50%",
          fontSize: "12px",
          fontWeight: "bold"
        }}
      >
        ×
      </span>
    </div>
  );
}