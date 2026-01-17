import { useState } from "react";
import { api } from "../services/api";
import { useZUserList } from "../stores/useZUserList";
import { IListAll } from "../types/ListAllTypes";
import { IUserResponse } from "../types/userTypes";
import { useAuth } from "./useAuth";

export const useListUsers = () => {
  const {userList, setUserList, userTotalCount, setUserTotalCount} = useZUserList();
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();

  const fetchListUsers = async () => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IUserResponse>>({
      url: "/user",
      auth,
      params: {
        orderBy: "lastLoginDate:desc",
        isActive: "true",
        limit: 5,
      },
    });

    setIsLoading(false);

    if (response.error) {
      setUserList([]);
      setUserTotalCount(0);
      return;
    }

    setUserList(response.data?.result);
    setUserTotalCount(response.data?.totalCount);
  };

  return {
    isLoading,
    userList,
    userTotalCount,
    fetchListUsers,
  };
};
