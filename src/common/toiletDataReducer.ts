/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import localInfo from '../../localInfo';

interface ReviewData {
  id: string;
  name: string;
  main: string;
}

interface ToiletData {
  id: string;
  name: string;
  address: string;
  rating: number;
  review: Array<ReviewData>;
}

interface stateType {
  datas: Array<ToiletData>;
}

const addData = createAsyncThunk(
  'toiletData/addData',
  async (toiletId: string, thunkAPI) => {
    const newData = await axios
      .get(`${localInfo.hostIp}/info/${toiletId}`)
      .then(fileData => JSON.parse(fileData.data))
      .catch(err => {
        console.log(err);
        throw err;
      });
    return {...newData, id: toiletId};
  },
);

const initialState: stateType = {
  datas: [
    {
      id: '0',
      name: 'test-name',
      address: 'test-address',
      rating: 4.3,
      review: [{id: '1', name: 'test-name', main: 'test-review'}],
    },
  ],
};

const dataSlice = createSlice({
  name: 'toiletData',
  initialState,
  reducers: {
    deleteData(state, action) {
      //  action.payload = toilet ID to delete
      state.datas = state.datas.filter(data => data.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(addData.fulfilled, (state, action) => {
      const newToilet = {
        id: action.payload['0'].id,
        name: action.payload['0'].name,
        rating: action.payload['0'].rating,
        address: action.payload['0'].road_address
          ? action.payload['0'].road_address
          : action.payload['0'].parcel_address,
        review: [],
      };
      state.datas.unshift(newToilet);
      if (state.datas.length > 5) state.datas.pop();
    });
  },
});

export {ReviewData, ToiletData};
export const {deleteData} = dataSlice.actions;
export {addData};

export default dataSlice.reducer;
