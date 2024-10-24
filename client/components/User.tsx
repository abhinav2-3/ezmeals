"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { fetchUserData } from "../lib/features/userSlice";
import { useEffect } from "react";

const User = ({ email }: { email: string }) => {
  const { isAuthenticated, userId } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (!isAuthenticated && email) {
      dispatch(fetchUserData(email));
    }
  }, [dispatch, email, isAuthenticated]);
  return <div></div>;
};

export default User;
