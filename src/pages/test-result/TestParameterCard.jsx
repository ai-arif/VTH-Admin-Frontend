import React from "react";

const TestParameterCard = ({ name, data }) => {
  if (name !== "_id")
    return (
      <div className="parameter-card">
        <div className="parameter-header">{name}</div>
        <div className="parameter-body">
          {data.map((item, idx) => (
            <div key={idx} className="parameter-item">
              {Object.entries(item).map(([key, value], subIdx) => (
                <div key={subIdx} className="parameter-subitem">
                  <strong>
                    {key} {Array.isArray(value) ? ": True and" : ":"}
                  </strong>
                  {Array.isArray(value) ? (
                    <div className="parameter-nested">
                      {value.map((nestedItem, nestedIdx) => (
                        <div key={nestedIdx}>
                          {Object.entries(nestedItem).map(([nestedKey, nestedValue]) => (
                            <p key={nestedKey} className="parameter-nested-item">
                              {nestedKey}: {typeof nestedValue === "boolean" ? nestedValue.toString() : nestedValue}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{typeof value === "boolean" ? value.toString() : value}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
};

export default TestParameterCard;
