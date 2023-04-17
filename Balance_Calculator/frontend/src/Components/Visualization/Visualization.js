import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { select, pie, arc, scaleOrdinal, schemeCategory10 } from "d3";
import { InnerLayout } from "../../styles/Layouts";
import "./Visualization.scss";

const Visualization = () => {
  const { incomes, expenses } = useGlobalContext();
  const svgIncomeRef = useRef();
  const svgExpenseRef = useRef();

  useEffect(() => {
    if (!incomes || !expenses) return;

    const incomeData = incomes.reduce((acc, income) => {
      const category = income.category;
      const amount = income.amount;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

    const expenseData = expenses.reduce((acc, expense) => {
      const category = expense.category;
      const amount = expense.amount;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

    const visualizationDataIncome = Object.entries(incomeData).map(([label, value]) => ({ label, value }));
    const visualizationDataExpense = Object.entries(expenseData).map(([label, value]) => ({ label, value }));

    const createPieChart = (svgRef, visualizationData, chartTitle) => {
      const width = 400;
      const height = 400;
      const margin = 50;

      const radius = Math.min(width, height) / 2 - margin;

      const svg = select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text(chartTitle);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2 + 20})`);

      // const d3Pie = pie().value((d) => d.value);
      const d3Pie = pie().value((d) => d.value).sort(null);

      const d3Arc = arc()
        .innerRadius(0)
        .outerRadius(radius);

      const colorScale = scaleOrdinal(schemeCategory10);

      g.selectAll("path")
        .data(d3Pie(visualizationData))
        .enter()
        .append("path")
        .attr("d", d3Arc)
        .attr("fill", (d, i) => colorScale(i));

        g.selectAll("text")
        .data(d3Pie(visualizationData))
        .enter()
        .append("text")
        .each(function (d) {
          const centroid = d3Arc.centroid(d);
          const xPos = centroid[0];
          const yPos = centroid[1];
          const text = select(this)
            .attr("x", xPos)
            .attr("y", yPos)
            .attr("dy", "0.35em")
            .style("text-anchor", "middle")
            .style("font-size", "12px");
    
          const tspanY = d3Arc.centroid(d)[1] + 15;
          text.append("tspan")
            .attr("x", xPos)
            .attr("y", tspanY)
            .text(d.data.label)
            .style("font-weight", "bold");
    
          text.append("tspan")
            .attr("x", xPos)
            .attr("y", tspanY + 15)
            .text(`${((d.data.value / d3Pie(visualizationData).reduce((acc, d) => acc + d.data.value, 0)) * 100).toFixed(2)}%`);
          });
           // Add a legend
      const legend = svg
      .append("g")
      .attr("transform", `translate(${width - margin}, ${height - margin})`);

      const legendItemSize = 15;
      const legendSpacing = 5;

      visualizationData.forEach((data, i) => {
        const legendItem = legend.append("g").attr("transform", `translate(0, ${i * (legendItemSize + legendSpacing)})`);

        legendItem
          .append("rect")
          .attr("width", legendItemSize)
          .attr("height", legendItemSize)
          .style("fill", colorScale(i))
          .style("stroke", colorScale(i));

        legendItem
          .append("text")
          .attr("x", legendItemSize + legendSpacing)
          .attr("y", legendItemSize - legendSpacing)
          .text(data.label)
          .style("font-size", "12px");
        });
    };
      createPieChart(svgIncomeRef, visualizationDataIncome, "Income by Category");
      createPieChart(svgExpenseRef, visualizationDataExpense, "Expense by Category");
  
    }, [incomes, expenses]);
    return (
      <div className="visualization-main">
        <InnerLayout>
          <h1>Income and Expense Visualization</h1>
          <div className="visualization-charts">
            <svg ref={svgIncomeRef}></svg>
            <svg ref={svgExpenseRef}></svg>
          </div>
        </InnerLayout>
      </div>
    );
  };
  
  export default Visualization;