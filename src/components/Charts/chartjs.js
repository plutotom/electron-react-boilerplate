import React, { Component } from "react";
import { GETData } from "../utiles/PointAPI";

import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
// import * as am4plugins_regression from "@amcharts/amcharts4/plugins/regression";

import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { findFont } from "@amcharts/amcharts4/.internal/core/utils/DOM";
// import am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

am4core.useTheme(am4themes_animated);

class TestingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: moment().startOf("day"),
      endTime: moment().endOf("day"),
      slectedDate: moment(),
    };
  }

  componentDidMount() {
    let container = am4core.create("chartdiv", am4core.Container);
    let chart = container.createChild(am4plugins_timeline.CurveChart);

    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    GETData().then((res) => {
      this.setState(res);
      chart.data = res;
    });

    let interfaceColors = new am4core.InterfaceColorSet();
    let colorSet = new am4core.ColorSet();

    chart.dateFormatter.dateFormat = "MM/dd/yyyy hh:mm a";
    chart.dateFormatter.inputDateFormat = "MM/dd/yyyy hh:mm a";
    chart.dy = 90;
    chart.maskBullets = false;

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.innerRadius = 0;
    categoryAxis.renderer.radius = 100;
    categoryAxis.renderer.grid.template.location = 1;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 70;
    // dateAxis.dateFormats.setKey("MM/dd/yyyy hh:mm a");
    dateAxis.min = new Date(this.state.slectedDate.startOf("day")).getTime();
    dateAxis.max = new Date(this.state.slectedDate.endOf("day")).getTime();

    dateAxis.baseInterval = { count: 1, timeUnit: "minute" };
    dateAxis.startLocation = -0.5;

    dateAxis.renderer.points = [
      { x: -400, y: 0 },
      { x: -250, y: 0 },
      { x: 0, y: 60 },
      { x: 250, y: 0 },
      { x: 400, y: 0 },
    ];
    dateAxis.renderer.autoScale = false;
    dateAxis.renderer.polyspline.tensionX = 0.8;
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.7;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    dateAxis.tooltip.label.paddingTop = 7;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.7;
    labelTemplate.background.fill = interfaceColors.getFor("background");
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(15);
    series.columns.template.tooltipText =
      "[bold]{categoryY}[/] \n start: {openDateX.formatDate('hh:mm a')} \n end: {dateX.formatDate('hh:mm a')}";

    series.dataFields.openDateX = "event_start";
    series.dataFields.dateX = "event_end";
    series.dataFields.categoryY = "title";
    series.columns.template.propertyFields.fill = "color"; // get color from data
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.strokeOpacity = 0;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index * 3);
    });

    let flagBullet1 = new am4plugins_bullets.FlagBullet();
    series.bullets.push(flagBullet1);
    flagBullet1.disabled = true;
    flagBullet1.propertyFields.disabled = "bulletf1";
    flagBullet1.locationX = 1;
    flagBullet1.label.text = "event_start";

    let flagBullet2 = new am4plugins_bullets.FlagBullet();
    series.bullets.push(flagBullet2);
    flagBullet2.disabled = true;
    flagBullet2.propertyFields.disabled = "bulletf2";
    flagBullet2.locationX = 0;
    flagBullet2.background.fill = interfaceColors.getFor("background");
    flagBullet2.label.text = "event_end";

    let bullet = new am4charts.CircleBullet();
    series.bullets.push(bullet);
    bullet.circle.radius = 3;
    bullet.circle.strokeOpacity = 0;
    bullet.locationX = 0;

    bullet.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index * 3);
    });

    let bullet2 = new am4charts.CircleBullet();
    series.bullets.push(bullet2);
    bullet2.circle.radius = 3;
    bullet2.circle.strokeOpacity = 0;
    bullet2.propertyFields.fill = "color";
    bullet2.locationX = 1;

    bullet2.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index * 3);
    });

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";
    chart.scrollbarX.width = 800;
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.dy = -90;
    chart.scrollbarX.opacity = 0.4;

    let cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = "1,4";
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    /// clock
    let clock = container.createChild(am4charts.GaugeChart);
    clock.toBack();

    clock.radius = 120;
    clock.dy = -100;
    clock.startAngle = -90;
    clock.endAngle = 270;

    let axis = clock.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 12;
    axis.strictMinMax = true;

    axis.renderer.line.strokeWidth = 1;
    axis.renderer.line.strokeOpacity = 0.5;
    axis.renderer.line.strokeDasharray = "1,4";
    axis.renderer.minLabelPosition = 0.05; // hides 0 label
    axis.renderer.inside = true;
    axis.renderer.labels.template.radius = 30;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.ticks.template.length = 12;
    axis.renderer.ticks.template.strokeOpacity = 1;

    // serves as a clock face fill
    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 12;
    range.grid.visible = false;
    range.tick.visible = false;
    range.label.visible = false;

    let axisFill = range.axisFill;

    // hands
    let hourHand = clock.hands.push(new am4charts.ClockHand());
    hourHand.radius = am4core.percent(60);
    hourHand.startWidth = 5;
    hourHand.endWidth = 5;
    hourHand.rotationDirection = "clockWise";
    hourHand.pin.radius = 8;
    hourHand.zIndex = 1;

    let minutesHand = clock.hands.push(new am4charts.ClockHand());
    minutesHand.rotationDirection = "clockWise";
    minutesHand.startWidth = 3;
    minutesHand.endWidth = 3;
    minutesHand.radius = am4core.percent(78);
    minutesHand.zIndex = 2;

    chart.cursor.events.on("cursorpositionchanged", function (event) {
      let value = dateAxis.positionToValue(event.target.xPosition);
      let date = new Date(value);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      // set hours
      hourHand.showValue(hours + minutes / 60, 0);
      // set minutes
      minutesHand.showValue((12 * minutes) / 60, 0);
    });
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  handleSetDay = async (date) => {
    await this.setState({ slectedDate: date });
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            showTodayButton
            variant="dialog"
            ampm={true}
            label="With keyboard"
            value={this.state.slectedDate}
            onChange={(slectedDate) => {
              this.handleSetDay(slectedDate);
            }}
          />
          {console.log(this.state.startTime, " end tim >", this.state.endTime)}
        </MuiPickersUtilsProvider>

        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </div>
    );
  }
}

export default TestingChart;
