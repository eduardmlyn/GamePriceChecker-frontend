import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PriceSnapshot} from "../model/price-snapshot.model";
import * as d3 from 'd3';


@Component({
  selector: 'app-price-line-chart',
  templateUrl: './price-line-chart.component.html',
  styleUrls: ['./price-line-chart.component.scss']
})
export class PriceLineChartComponent implements OnInit, OnChanges {
  @Input() priceSnapshots: PriceSnapshot[]
  private width = 700;
  private height = 300;
  private margin = 50;

  private svg: any;
  private chart: any;
  private yScale: any;
  private xScale: any;
  private xAxis: any;
  private yAxis: any;
  private tooltip: any;

  public averagePriceColor = "red"
  public minimumPriceColor = "blue"
  public lineOpacity = 0.35
  private unselectedOpacity = 0.1
  private selectedOpacity = 1
  private dotRadius = 3

  constructor() {
  }

  ngOnInit(): void {
    this.sortSnapshots()
    this.initializeSvg()
    this.initializeElements()
    this.setXAxis()
    this.setYAxis()
    this.addAveragePriceLine()
    this.addMinimumPriceLine()
    this.addAveragePriceDots()
    this.addMinimumPriceDots()
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private sortSnapshots() {
    this.priceSnapshots.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }

  private initializeSvg() {
    this.svg = d3.select("#price-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width + 2 * this.margin} ${this.height + this.margin}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
    this.chart = this.svg
      .append("g")
      .attr("transform", `translate(${this.margin}, ${this.margin})`)
  }

  private initializeElements() {
    this.tooltip = d3.select("#price-chart")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "0.5rem")
      .style("border", "solid")
      .style("border-width", "0.15rem")
      .style("border-color", "grey")
      .style("border-radius", "0.5rem")
      .style("opacity", 1)
      .style("background-color", "rgba(128, 128, 128, 0.3)")
      .style("visibility", "hidden")
      .style("white-space", "pre")
      .style("text-align", "center")
  }

  private setXAxis() {
    this.xScale = d3.scaleTime()
      .domain(d3.extent(this.priceSnapshots, snapshot => new Date(snapshot.date)) as [Date, Date])
      .range([0, this.width - this.margin])

    this.xAxis = this.chart.append("g")
      .attr("transform", `translate(0, ${this.height - this.margin})`)
      .call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat("%d.%m") as any).ticks(this.priceSnapshots.length))

    this.chart.append("text")
      .attr("transform", "translate(" + (this.width / 2 - this.margin) + "," + this.height + ")")
      .attr("font-size", 10)
      .attr("fill", "#000")
      .text("Date")
  }

  private setYAxis() {
    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(this.priceSnapshots, snapshot => snapshot.averagePrice)] as number[])
      .range([this.height - this.margin, 0])

    this.yAxis = this.chart.append("g")
      .call(d3.axisLeft(this.yScale).tickFormat((domainValue) => `${domainValue.valueOf()}€`))

    this.chart.append("text")
      .attr("transform", `translate(-${this.margin / 2}, -10)`)
      .attr("font-size", 10)
      .attr("fill", "#000")
      .text("Price")
  }

  private addAveragePriceLine() {
    this.svg.append("path")
      .datum(this.priceSnapshots)
      .classed("avg-line", true)
      .attr("fill", "none")
      .style("opacity", this.lineOpacity)
      .attr("stroke", this.averagePriceColor)
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .on("mouseover", () => {
        d3.select(".min-line")
          .style('opacity', this.unselectedOpacity)
        d3.select(".avg-line")
          .style('opacity', this.selectedOpacity)
      })
      .on("mouseout", () => {
        d3.select(".min-line")
          .style('opacity', this.lineOpacity)
        d3.select(".avg-line")
          .style('opacity', this.lineOpacity)
      })
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")")
      .attr("d", d3.line()
        .x((d: any) => this.xScale(new Date(d.date)))
        .y((d: any) => this.yScale(d.averagePrice)))
  }

  private addMinimumPriceLine() {
    this.svg.append("path")
      .datum(this.priceSnapshots)
      .classed("min-line", true)
      .attr("fill", "none")
      .style("opacity", this.lineOpacity)
      .attr("stroke", this.minimumPriceColor)
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .on("mouseover", () => {
        d3.select(".avg-line")
          .style('opacity', this.unselectedOpacity)
        d3.select('.min-line')
          .style('opacity', this.selectedOpacity)
      })
      .on("mouseout", () => {
        d3.select(".avg-line")
          .style('opacity', this.lineOpacity)
        d3.select('.min-line')
          .style('opacity', this.lineOpacity)
      })
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")")
      .attr("d", d3.line()
        .x((d: any) => this.xScale(new Date(d.date)))
        .y((d: any) => this.yScale(d.minimumPrice)))
  }

  private addAveragePriceDots() {
    this.chart.selectAll("dot")
      .data(this.priceSnapshots)
      .enter()
      .append("circle")
      .attr("class", "avg-dot")
      .attr("r", this.dotRadius)
      .attr("cx", (d: any) => {
        return this.xScale(new Date(d.date))
      })
      .attr("cy", (d: any) => {
        return this.yScale(d.averagePrice)
      })
      .style("fill", this.averagePriceColor)
      .on("mouseover", (_: any, d: any) => {
        this.tooltip.style("visibility", "visible")
          .text(`Average price: ${d.averagePrice.toFixed(2)}€ \nMinimum price: ${d.minimumPrice.toFixed(2)}€`)
      })
      .on("mousemove", (event: any, _: any) => {
        this.tooltip
          .style("left", (d3.pointer(event, d3.select("#price-chart"))[0]) + "px")
          .style("top", (d3.pointer(event, d3.select("#price-chart"))[1]) + "px")
      })
      .on("mouseout", () => {
        this.tooltip.style("visibility", "hidden")
      })
  }

  private addMinimumPriceDots() {
    this.chart.selectAll("dot")
      .data(this.priceSnapshots)
      .enter()
      .append("circle")
      .attr("class", "min-dot")
      .attr("r", this.dotRadius)
      .attr("cx", (d: any) => {
        return this.xScale(new Date(d.date))
      })
      .attr("cy", (d: any) => {
        return this.yScale(d.minimumPrice)
      })
      .style("fill", this.minimumPriceColor)
      .on("mouseover", (_: any, d: any) => {
        this.tooltip.style("visibility", "visible")
          .text(`Average price: ${d.averagePrice.toFixed(2)}€ \nMinimum price: ${d.minimumPrice.toFixed(2)}€`)
      })
      .on("mousemove", (event: any, _: any) => {
        this.tooltip
          .style("left", (d3.pointer(event, d3.select("#price-chart"))[0]) + "px")
          .style("top", (d3.pointer(event, d3.select("#price-chart"))[1]) + "px")
      })
      .on("mouseout", () => {
        this.tooltip.style("visibility", "hidden")
      })
  }
}
