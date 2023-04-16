import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import * as d3 from "d3";
import { InnerLayout } from "../../styles/Layouts";
import "./Visualization.scss";

const Visualization = () => {
  const { incomes, expenses } = useGlobalContext();
  const svgRef = useRef();

  useEffect(() => {
    if (!incomes || !expenses) return;

    const visualizationData = [
      { label: "Income", value: incomes.reduce((sum, income) => sum + income.amount, 0) },
      { label: "Expense", value: expenses.reduce((sum, expense) => sum + expense.amount, 0) },
    ];

    const svg = d3.select(svgRef.current);
    // Add your D3.js visualization code here

  }, [incomes, expenses]);

  return (
    <div className="visualization-main">
      <InnerLayout>
        <h1>Income and Expense Visualization</h1>
        <svg ref={svgRef}></svg>
      </InnerLayout>
    </div>
  );
};

export default Visualization;
