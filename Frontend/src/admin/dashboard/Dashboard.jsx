import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import StatCard from "./components/StatCard";
import { motion } from "framer-motion";
import { CarFront, Users } from "lucide-react";
import apiRequest from "@/lib/apiRequest";
import AuthContext from "@/context/AuthContext";
import FuelTypeChart from "./components/FuelTypeChart";
import CategoryTypeChart from "./components/CategoryTypeChart";

const Dashboard = () => {
  const [userCount, setUserCount] = useState();
  const [userListingCount, setUserListingCount] = useState();
  const [totalListingCount, setTotalListingCount] = useState();
  const [fuelType, setFuelType] = useState([]);
  const [categoryType, setCategoryType] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    GetUserCount();
    GetUserListingCount();
    GetTotalListingCount();
    GetFuelType();
    GetCategoryType();
  }, []);

  const GetUserCount = async () => {
    try {
      const response = await apiRequest.get("/auth/get-user-count");
      setUserCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const GetUserListingCount = async () => {
    try {
      const response = await apiRequest.get(
        "/car-listing/get-user-listing-count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserListingCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTotalListingCount = async () => {
    try {
      const response = await apiRequest.get("/car-listing/get-listing-count");
      setTotalListingCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const GetFuelType = async () => {
    try {
      const response = await apiRequest.get("/car-listing/fuel-type-count");
      setFuelType(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCategoryType = async () => {
    try {
      const response = await apiRequest.get("/car-listing/category-count");
      setCategoryType(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Users"
            icon={Users}
            color="#8B5CF6"
            value={userCount}
          />
          <StatCard
            name="User Listing Count"
            icon={CarFront}
            color="#10B981"
            value={userListingCount}
          />
          <StatCard
            name="Total Listing Count"
            icon={CarFront}
            color="#E50046"
            value={totalListingCount}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FuelTypeChart fuelType={fuelType} />
          <CategoryTypeChart categoryType={categoryType} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
