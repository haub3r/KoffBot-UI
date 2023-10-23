import axios from "axios";
import { useEffect, useState } from "react";
import {
  QueryFunction,
  QueryObserverResult,
  useQuery,
} from "@tanstack/react-query";

export interface StatsDto {
  ToastCount: number;
  FridayCount: number;
  DrunkCount: number;
}

export interface StatsQueryResults {
  data: StatsDto | undefined;
  refetch: () => Promise<QueryObserverResult>;
}

const endpointUrl = "https://koffbot.azurewebsites.net/api/koffbotstats";

const QueryGetStats = (): StatsQueryResults => {
  const getStats = async () => {
    console.log("Fetching fresh data from server...");
    const res = await axios.get(endpointUrl);
    console.log("Response from " + endpointUrl + ":", res);

    return res.data;
  };

  const data = GetOnce(getStats);

  return data;
};

const GetOnce = (callback: QueryFunction<StatsDto>): StatsQueryResults => {
  const [enabled, setEnabled] = useState(true);

  const { isLoading, data, refetch } = useQuery({
    enabled: enabled,
    queryFn: callback,
    queryKey: ["statistics"],
  });

  useEffect(() => {
    // Check whether data exists.
    if (!isLoading && !!data) {
      setEnabled(false);
    }
  }, [data, isLoading]);

  const results = { data: data, refetch: refetch };
  return results;
};

export default QueryGetStats;
