import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const dashboardReportSlice = createSlice({
  name: "dashboardReport",
  initialState: {
    report: [],
  },
  reducers: {
    onDashboardReportChange: (state, action) => {
      state.report = action.payload;
    },
  },
});

export default dashboardReportSlice.reducer;

export const useDashboardReportSelector = () =>
  useSelector((state) => state.dashboardReport);

export const { onDashboardReportChange } = dashboardReportSlice.actions;
