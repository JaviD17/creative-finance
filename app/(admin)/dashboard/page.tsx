"use client";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const datasets = [
  {
    month: "January",
    data: 5,
  },
  {
    month: "February",
    data: 46,
  },
  {
    month: "March",
    data: 92,
  },
  {
    month: "April",
    data: 53,
  },
  {
    month: "May",
    data: 35,
  },
  {
    month: "June",
    data: 67,
  },
  {
    month: "July",
    data: 45,
  },
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: datasets.map((data) => data.data),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: datasets.map((data) => data.data),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const DashboardPage = () => {
  const deals = useQuery(api.deals.getAll);

  const openDeals = deals
    ?.map((deal) => deal.status)
    .filter((status) => status === "open").length;
  const closedDeals = deals
    ?.map((deal) => deal.status)
    .filter((status) => status === "closed").length;
  const completedDeals = deals
    ?.map((deal) => deal.status)
    .filter((status) => status === "completed").length;

  const data2 = {
    labels: ["Open Deals", "Closed Deals", "Completed Deals"],
    datasets: [
      {
        label: "# of Deals",
        data: [openDeals, closedDeals, completedDeals],
        backgroundColor: [
          "hsla(156, 72%, 67%, 0.5)",
          "hsla(353, 96%, 82%, 0.5)",
          "hsla(252, 95%, 85%, 0.5)",
        ],
        borderColor: [
          "hsl(156, 72%, 67%)",
          "hsl(353, 96%, 82%)",
          "hsl(252, 95%, 85%)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className="">
      <div className="text-black-950 bg-black-50 py-8">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Dashboard
        </h2>

        <div className="w-11/12 lg:max-w-7xl mx-auto bg-black-50 rounded-sm p-8 mt-8">
          <div className="lg:flex lg:justify-evenly space-y-12 lg:space-y-0">
            {/* <div className="w-11/12 lg:max-w-md">
              <Bar data={data} options={options} />
            </div> */}
            <div className="w-11/12 lg:max-w-sm mx-auto bg-black-100 py-12 rounded-sm border border-black-950 shadow-2xl shadow-black-950">
              <h3 className="text-center text-xl text-black-950 font-extrabold tracking-widest uppercase">
                Deal Status YTD
              </h3>
              <Pie data={data2} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
