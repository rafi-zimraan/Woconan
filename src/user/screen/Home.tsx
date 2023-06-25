import {View, Image, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import ComponentHome from '../../user/home/ComponentHome';
import axios from 'axios';
const Home = () => {
  // const [data, setData] = useState();
  // let Data = [
  //   {
  //     id: 1,
  //     value:
  //       'https://res.cloudinary.com/dzfmf0byk/image/upload/v1685972751/gambare/2023-06-05_134549_0bc2685358ad4d81bc90dc57af047dd0.jpg',
  //   },
  // ];
  // async function getData() {
  //   try {
  //     const response = await axios.get(
  //       'https://f0e5-2001-448a-4041-121f-1c6f-e23c-b1d9-1c15.ngrok-free.app/api/beranda-user',
  //       {
  //         headers: {
  //           Authorization: `Bearer 21|TzhPrKdmKn4OefXw6PWvDSBRPbocdEQIIiOkZbId`,
  //         },
  //       },
  //     );

  //     let data = JSON.parse(response.data.data);
  //     Data = data;
  //     console.log('RESPONSE', data);
  //   } catch (error: any) {
  //     console.log('ERROR', error.message);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return <ComponentHome />;
};

export default Home;
