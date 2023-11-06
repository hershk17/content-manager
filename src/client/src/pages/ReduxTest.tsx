import React from "react";
import { Counter } from "../redux/counter/counter";
import { IsLoading } from "../redux/isLoading/isLoading";

const ReduxTest = () => {
    return (
        <div>
            <h1>ReduxTest</h1>
            <Counter />
            <IsLoading />
        </div>
    );
};

export default ReduxTest;
