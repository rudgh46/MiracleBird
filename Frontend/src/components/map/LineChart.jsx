import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./LineChart.css";
import styles from "./LineChart.module.css";
import { current } from "@reduxjs/toolkit";
import Chart from "react-apexcharts";
import axios from "axios";
import { NOW_ACCESS_TOKEN, API_BASE_URL } from "/src/constants";
import { BrowserView, MobileView } from "react-device-detect";

const LineChart = ({ data }) => {
  const [landmarkPriceData, setLandmarkPriceData] = useState("");

  const [firstPrice, setFirstPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [len, setLen] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(data);
    if (data != "") {
      var tempA = [];
      var tempB = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        tempA.push(item.day);
        tempB.push(item.value);
        setCategories(tempA);
        setCategoriesData(tempB);
      }
    }

    if (data != "") {
      setFirstPrice(data[0].value == null ? null : data[0].value);
      setMinPrice(
        Math.min.apply(
          Math,
          data.map(function (o) {
            return o.value;
          })
        )
      );
      setMaxPrice(
        Math.max.apply(
          Math,
          data.map(function (o) {
            return o.value;
          })
        )
      );
      setCurrentPrice(data[data.length - 1].value);
    } else {
      setFirstPrice(5);
      setMinPrice(5);
      setMaxPrice(5);
      setCurrentPrice(5);
    }
    setLen(data.length);
  }, []);
  useEffect(() => {
    makeGraph();
  }, [len]);

  const svgRef = useRef();
  const makeGraph = () => {
    // setting canvas
    const width = 270;
    const height = 300;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // data

    // setting axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => {
      return g
        .attr("transform", `translate(0, ${height})`)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    };

    const yAxis = (g) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).tickSize(-width))
        .call((g) => g.select(".domain").remove())
        .attr("class", "grid")
        .attr("fill", "#5c5c5c");

    // apply axis to canvas
    // svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // vertical bar chart

    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    //line chart
    const line = d3
      .line()
      .x((d) => x(d.month) + x.bandwidth() / 2)
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#1d4999")
      .attr("stroke-width", 4)
      .attr("d", line);

    // add text
    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .text((d) => d.value)
      .attr("cx", (data) => x(data.month) + x.bandwidth() / 2)
      .attr("cy", (data) => y(data.value) - 2.5)
      .attr("fill", "#1d4999")
      .attr("r", "3px");

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d.value)
      .attr("x", (data) => x(data.month) + x.bandwidth() / 2)
      .attr("y", (data) => y(data.value) - 7)
      .attr("fill", "black")
      .attr("font-family", "Tahoma")
      .attr("font-size", "7px")
      .attr("text-anchor", "middle")
      .on("mouseover", function (evt, i) {
        console.log(i);
        // 이것으로 div 에 hover 될 때 동작을 변경시킬 수 있다.
        d3.select(this).transition().duration(100).attr("r", 7);
        // 툴팁이 보이게 만들어 준다.
        tooltip.transition().duration(100).style("opacity", 1).text(i.day);
      })
      .on("mousemove", function (evt) {
        const target = event.currentTarget;
        return tooltip
          .style("top", evt.y - 10 + "px")
          .style("left", evt.x + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("r", 5);
        tooltip.transition().duration(200).style("opacity", 0);
      });
  };

  return (
    <div className={styles.chart}>
      <Chart
        className={styles.apex}
        type="line"
        series={[
          {
            name: "거래가",
            data: categoriesData,
          },
        ]}
        options={{
          tools: {
            download: false,
          },
          theme: {
            mode: "light",
            palette: "palette1",
            monochrome: {
              enabled: false,
              color: "#1d4999",
              shadeTo: "light",
              shadeIntensity: 0.65,
            },
          },
          zoom: {
            type: "x",
            enabled: false,
            autoScaleYaxis: false,
          },
          markers: {
            size: 5,
          },

          chart: {
            stacked: false,
            height: 350,
            type: "area",
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            style: {
              color: "#ffffff",
            },
            background: "transparent",
          },

          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          // title: {
          //   text: "Product Trends by Month",
          //   align: "left",
          // },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: categories,
            style: {
              colors: ["#f3f3f3"],
            },
          },
          plotOptions: {
            candlestick: {},
          },
        }}></Chart>
      <BrowserView></BrowserView>
      <MobileView></MobileView>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>민팅가</th>
            <th>최저가</th>
            <th>최고가</th>
            <th>현재가</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {firstPrice}
              <span className={styles.span}> MIRA</span>
            </td>
            <td>
              {minPrice}
              <span className={styles.span}> MIRA</span>
            </td>
            <td>
              {maxPrice}
              <span className={styles.span}> MIRA</span>
            </td>
            <td>
              {currentPrice}
              <span className={styles.span}> MIRA</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default LineChart;
