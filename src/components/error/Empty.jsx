import React from "react";

const Empty = ({ title, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img src="/empty.png" alt="" className="max-h-[400px] object-cover" />
      <p className="text-muted text-sm text-center xs:text-lg">{title}</p>
    </div>
  );
};

export default Empty;
