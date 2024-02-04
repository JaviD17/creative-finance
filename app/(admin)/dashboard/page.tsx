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
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DealTable from "./components/DealTable";
import { Doc } from "@/convex/_generated/dataModel";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const deals: Doc<"deals">[] | undefined = useQuery(api.deals.getAll);
  const { user } = useUser();

  if (!deals) {
    return null;
  }

  if (!user?.publicMetadata.adminUser) {
    redirect("/");
  }

  const openDeals = deals
    ?.map((deal) => deal.status)
    .filter((status) => status === "open").length;
  const closedDeals = deals
    ?.map((deal) => deal.status)
    .filter((status) => status === "closed").length;
  const completedDeals = deals
    ?.map((deal) => deal.status)
    .filter((status) => status === "completed").length;

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Amount Needed / Return Rate",
        data: deals?.map((deal) => ({
          x: deal.returnRate,
          y: deal.amountNeeded,
        })),
        backgroundColor: "hsla(252, 95%, 85%, 1)",
      },
    ],
  };

  const data3 = {
    datasets: [
      {
        label: "Amount Needed / Flat Rate",
        data: deals?.map((deal) => ({
          x: deal.flatRate,
          y: deal.amountNeeded,
        })),
        backgroundColor: "hsla(252, 95%, 85%, 1)",
      },
    ],
  };

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

        <div className="w-11/12 lg:max-w-7xl mx-auto">
          <DealTable deals={deals} />
        </div>

        <div className="lg:max-w-7xl mx-auto pt-8">
          <div className="flex lg:flex-row lg:flex-wrap lg:justify-evenly flex-col gap-y-4">
            <div className="w-11/12 lg:max-w-sm mx-auto bg-black-100 py-8 px-2 rounded-sm border border-black-950 shadow-2xl shadow-black-950">
              <h3 className="text-center text-xl text-black-950 font-extrabold tracking-widest uppercase">
                Deal Status Distribution YTD
              </h3>
              <Pie data={data2} />
            </div>
            <div className="w-11/12 lg:max-w-sm mx-auto bg-black-100 py-8 px-2 rounded-sm border border-black-950 shadow-2xl shadow-black-950">
              <h3 className="text-center text-xl text-black-950 font-extrabold tracking-widest uppercase">
                Amount Needed vs Return Rate YTD
              </h3>
              <Scatter options={options} data={data} />
            </div>
            <div className="w-11/12 lg:max-w-sm mx-auto bg-black-100 py-8 px-2 rounded-sm border border-black-950 shadow-2xl shadow-black-950">
              <h3 className="text-center text-xl text-black-950 font-extrabold tracking-widest uppercase">
                Amount Needed vs Flat Rate YTD
              </h3>
              <Scatter options={options} data={data3} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
