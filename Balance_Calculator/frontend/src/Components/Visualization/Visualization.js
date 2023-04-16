import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useGlobalContext } from "./globalContext"; 

const IncomeExpenseVisualization = () => {
    const { incomes, expenses } = useGlobalContext(); // Get data from the global context
    const svgRef = useRef(); // Ref to access the SVG element
  
    useEffect(() => {
      if (!incomes || !expenses) return;
  
      // Prepare data for visualization
      const visualizationData = [
        { label: "Income", value: incomes.reduce((sum, income) => sum + income.amount, 0) },
        { label: "Expense", value: expenses.reduce((sum, expense) => sum + expense.amount, 0) },
      ];
  
      // Create the visualization using D3.js
      const svg = d3.select(svgRef.current);
      // Add your D3.js visualization code here
  
    }, [incomes, expenses]);
  
    return (
      <div>
        <h1>Income and Expense Visualization</h1>
        <svg ref={svgRef}></svg>
      </div>
    );
  };
  
  export default IncomeExpenseVisualization;
  