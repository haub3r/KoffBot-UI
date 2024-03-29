import axios from "axios";
import { useEffect, useState } from "react";
import {
  QueryFunction,
  QueryObserverResult,
  useQuery,
} from "@tanstack/react-query";

export interface StatsDto {
  DrunkCount: number;
  FridayCount: number;
  ToastCount: number;
}

export interface StatsQueryResults {
  data: StatsDto | undefined;
  isFetching: boolean;
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

  const {
    data: data,
    refetch: refetch,
    isFetching: isFetching,
  } = useQuery({
    enabled: enabled,
    queryFn: callback,
    queryKey: ["statistics"],
  });

  useEffect(() => {
    // Check whether data exists.
    if (!isFetching && !!data) {
      setEnabled(false);
    }
  }, [data, isFetching]);

  const results = { data: data, isFetching: isFetching, refetch: refetch };
  return results;
};

export default QueryGetStats;
