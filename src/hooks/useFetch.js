import { useCallback, useEffect, useReducer, useRef } from "react";
import { BASE_URL } from "../service/apiConfig";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: null };
    case "success":
      return { ...state, loading: false, data: action.data, error: null };
    case "error":
      return { data: null, isLoading: false, error: action.error };
    case "custom_initial_state":
      return { ...state, data: action.data };
    default:
      return state;
  }
};

const useFetch = ({ url, method = "GET", body }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const abortController = useRef(new AbortController());
  const signal = useRef();

  const fetchData = useCallback(async () => {
    signal.current = abortController.current.signal;
    try {
      dispatch({ type: "loading" });
      const response = await fetch(`${BASE_URL}${url}`, {
        method,
        body,
        signal: signal.current,
      });
      const data = await response.json();
      dispatch({ type: "success", data });
    } catch (error) {
      dispatch({ type: "error", error });
    }
  }, [body, method, url]);

  useEffect(() => {
    const currentAbortController = abortController.current;
    return () => {
      if (signal.current && currentAbortController) {
        currentAbortController.abort();
      }
    };
  }, []);

  return { state, fetchData, dispatch };
};

export default useFetch;
