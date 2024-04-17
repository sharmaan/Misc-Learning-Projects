import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { StockService } from '../services/stock.service';
//https://blog.logrocket.com/data-visualization-angular-d3-js/

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrl: './scatter.component.scss',
})
export class ScatterComponent implements OnInit {
  private data!: any;
  constructor(private _stockService: StockService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._stockService.getDataToVisualize().subscribe((data) => {
      this.data = data;
      this.createSvg();
      this, this.drawPlot();
    });
    // this.createSvg();
    // this, this.drawPlot();
  }
  // private data = [
  //   { Framework: 'Vue', Stars: '166443', Released: '2014' },
  //   { Framework: 'React', Stars: '150793', Released: '2013' },
  //   { Framework: 'Angular', Stars: '62342', Released: '2016' },
  //   { Framework: 'Backbone', Stars: '27647', Released: '2010' },
  //   { Framework: 'Ember', Stars: '21471', Released: '2011' },
  // ];
  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  private createSvg(): void {
    this.svg = d3
      .select('figure#scatter')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear().domain([2009, 2017]).range([0, this.width]);
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0]);
    this.svg.append('g').call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots
      .selectAll('dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => x(d.symbol))
      .attr('cy', (d: any) => y(d.High))
      .attr('r', 7)
      .style('opacity', 0.5)
      .style('fill', '#69b3a2');

    // Add labels
    dots
      .selectAll('text')
      .data(this.data)
      .enter()
      .append('text')
      .text((d: any) => d.symbol)
      .attr('x', (d: any) => x(d.symbol))
      .attr('y', (d: any) => y(d.High));
  }
}
