import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchTodoFailure, fetchTodoSuccess } from "./actions";
import { FETCH_TODO_REQUEST } from "./actionTypes";

import { ITodo } from "./types";


const getTodos = () =>
    axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos");


function* fetchTodoSaga() {
    try {
        const response: AxiosResponse<ITodo[]> = yield call(getTodos);
        yield put(
            fetchTodoSuccess({
                todos: response.data,
            })
        );
    }
    catch (e: any) {
        yield put(
            fetchTodoFailure({
                error: e.message,
            })
        );
    }
}

function* todoSaga() {
    yield all([takeLatest(FETCH_TODO_REQUEST, fetchTodoSaga)]);
}


export default todoSaga;