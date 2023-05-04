import { Component, Input, OnInit } from '@angular/core';
import { BarchartData } from '../Services/barchart-data';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() populationData!: BarchartData[];

  public margin = { top: 20, right: 30, bottom: 60, left: 100 };
  public width = 700 - this.margin.left - this.margin.right;
  public height = 400 - this.margin.top - this.margin.bottom;
  public svg: any;

  constructor() { }

  ngOnInit(): void {
    console.log('Init : ', this.populationData);
    this.createSvg();
    this.drawChart();
  }

  createSvg() {
    //create SVG
    this.svg = d3.select('#bar-chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('viewbox', [0, 0, this.width, this.height])
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }
  drawChart() {
    //x-axis
    var x = d3.scaleLinear()
      .domain([0, 1500000])
      .range([0, this.width]);

    this.svg.append('g')
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr('transform', `translate(0, ${this.height})`)
      .attr('color', '#fff')
      .attr('font-size','12px')
      .attr('letter-spacing', '1px')
      .selectAll('text')
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style('text-anchor', 'end');

    //y-axis
    var y = d3.scaleBand()
      .range([0, this.height])
      .domain(this.populationData.map((d: any) => { return d.country }))
      .padding(0.3);

    this.svg.append('g')
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .attr('font-size','12px')
      .attr('letter-spacing', '1px');

    //Bars
    this.svg.append('g')
      .selectAll('rect')
      .data(this.populationData)
      .enter()
      .append('rect')
      .attr('x', x(0))
      .attr('y', (d: any) => { return y(d.country) })
      .attr('width', (d: any) => { return x(d.population) })
      .attr('height', y.bandwidth())
      .attr('class', 'dropshadow')
      .attr('fill', (d: any) => { return d.color })
      .append('title')
      .text((d: any) => { return 'Population : '+d.population });
      
  }
}
