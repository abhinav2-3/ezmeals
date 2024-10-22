"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { fetchUserData } from "../lib/features/userSlice";
import { useEffect } from "react";

const User = ({ email }: { email: string }) => {
  const { isAuthenticated, name, userId } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  // Save userId to localStorage when it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  // Fetch user data only if not authenticated and email exists
  useEffect(() => {
    if (!isAuthenticated && email) {
      dispatch(fetchUserData(email));
    }
  }, [dispatch, email, isAuthenticated]);
  return (
    <div>
      <h1>{name} Profile</h1>
    </div>
  );
};

export default User;
