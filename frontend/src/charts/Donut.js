import DonutChart from "react-donut-chart";

export default function Donut(props) {
  const data = props.data;
  const reactDonutChartBackgroundColor = ["#00E396", "#FEB019", "#FF4560"];
  const reactDonutChartInnerRadius = 0.3;
  const reactDonutChartSelectedOffset = 0.04;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };

  const reactDonutChartdata = [
    {
      label: "Easy",
      value: data[0],
      color: "#00E396",
    },
    {
      label: "Medium",
      value: data[1],
      color: "#FEB019",
    },
    {
      label: "Hard",
      value: data[2],
      color: "#FF4560",
    },
  ];
  return (
    <DonutChart
      width={500}
      onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
      strokeColor={reactDonutChartStrokeColor}
      data={reactDonutChartdata}
      colors={reactDonutChartBackgroundColor}
      innerRadius={reactDonutChartInnerRadius}
      selectedOffset={reactDonutChartSelectedOffset}
      onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
    />
  );
}
