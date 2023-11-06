import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setTrue, setFalse } from "./isLoadingSlice";

export function IsLoading() {
    const loadingState = useSelector((state: RootState) => state.isLoading.value);
    const dispatch = useDispatch();

    return (
        <div>
            <button
                aria-label="Set value to true"
                onClick={() => dispatch(setTrue())}
            >
                Set true
            </button>
            <span>{loadingState ? "true" : "false"}</span>
            <button
                aria-label="Set value to false"
                onClick={() => dispatch(setFalse())}
            >
                Set false
            </button>
        </div>
    );
}
