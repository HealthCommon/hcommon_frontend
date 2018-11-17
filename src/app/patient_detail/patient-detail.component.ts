import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { UserService } from '../_services/user.service';
import { PatientService } from '../_services/patient.service';
import { Element } from '../models/element';
import { MatTableDataSource } from '@angular/material';
import { User } from '../models/user';
import * as d3 from 'd3';

@Component({
    selector: 'patient-detail-root',
    templateUrl: './patient-detail.component.html',
    styleUrls: ['./patient-detail.component.css']
})

export class PatientDetailComponent{

    displayedColumns = ['docuName', 'reportDate', 'verified', 'download'];
    dataSource = new MatTableDataSource<Element>();
    private patientId;
    private user:User;

    ngOnInit() {
      this.user = JSON.parse(sessionStorage.getItem("currentUser"));
      this.patientId = this.activatedRoute.snapshot.queryParams["pid"];
      this.patientService.getPatientsById(this.patientId);
      this.patientService.getDoumentsByPatientId(this.patientId);
      console.log(this.patientId);
      this.initPatientHeartBeatGraph();
    }

    constructor(private router : Router, public userService : UserService, public patientService:PatientService, private activatedRoute: ActivatedRoute){

    }

    initPatientHeartBeatGraph() {
      //" + 0bf06878-dda2-11e7-9296-cec278b6b50a + "
      let heartBeatURL = "http://ec2-13-127-3-247.ap-south-1.compute.amazonaws.com:8080/hc/api/v1/device/patient/" + this.patientId + "/type/HEART_RATE";
      let svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");
      let x = d3.scaleTime()
          .rangeRound([0, width]);

      let y = d3.scaleLinear()
          .rangeRound([height, 0]);

      let line = d3.line<any>()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.hrate); });

      d3.json(heartBeatURL).then(function(data:any[]) {

      data.sort(function(a, b) {
            return parseInt(a.timestamp) - parseInt(b.timestamp);
        });

        data.forEach(function(d) {
          d.data = JSON.parse(d.data);
          if (d.data.heart != "undefined") {
             console.log(d);
             d.date = parseTime(d.dateTime);
             d.hrate = d.data.heart;
           }
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));
        y.domain(d3.extent(data, function(d) { return d.hrate; }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
          .select(".domain")
            .remove();

        g.append("g")
            .call(d3.axisLeft(y))
          .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("BPM");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1)
            .attr("d", line);
      });
    }


    addDocumentPopup(){

    }

}
