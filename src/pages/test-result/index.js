import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TestResultHome from '../../../Components/TestResult/TestResultHome';
import TestParameterCard from './TestParameterCard';



const Index = () => {
  const [testResults, setTestResults] = useState([]);

  function transformInput(input) {
    const output = {};

    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const [mainKey, subKey] = key.split('#');

        if (!output[mainKey]) {
          output[mainKey] = [];
        }

        if (subKey?.includes('&')) {
          const [mainSubKey, nestedSubKey] = subKey.split('&');

          let mainSubKeyObj = output[mainKey].find(obj => obj.hasOwnProperty(mainSubKey));
          if (!mainSubKeyObj) {
            mainSubKeyObj = { [mainSubKey]: true, [`${mainSubKey}&`]: [] };
            output[mainKey].push(mainSubKeyObj);
          }

          if (!mainSubKeyObj[`${mainSubKey}&`]) {
            mainSubKeyObj[`${mainSubKey}&`] = [];
          }

          mainSubKeyObj[`${mainSubKey}&`].push({ [nestedSubKey]: input[key] });
        } else {
          const obj = { [subKey]: input[key] };
          output[mainKey].push(obj);
        }
      }
    }

    // Fix the nested keys to remove & from keys
    for (const key in output) {
      output[key] = output[key].map(item => {
        for (const subKey in item) {
          if (subKey.includes('&')) {
            const newKey = subKey.split('&')[0];
            item[newKey] = item[subKey];
            delete item[subKey];
          }
        }
        return item;
      });
    }

    return output;
  }

  useEffect(() => {
    const id = '665af0c79c4f321d34a9758c'
    axios.get(`http://localhost:5000/api/v1/test/test-result/${id}`).then(res => {
      let result = res.data?.data?.data;
      setTestResults(result);
      // console.log(result[0]?.data);
      // console.log(transformInput(result[0]?.data));
    });
  }, []);


  return (
    <div>
      <TestResultHome />
      <div className="text-black m-5 bg-white p-3">
        {testResults?.map((test, index) => (
          <div key={test?._id} >
            <div className="row m-0 bg-dark-subtle border border-black border-bottom-0">
              <div className="col-2 m-0 p-0"><h4 className="text-black  m-0 p-1 ">{test?.name}</h4></div>
              <div className="col-10 m-0 p-0"><h4 className="text-black border-start border-black border-bottom-0 m-0 ms-2 p-1">Result</h4></div>
            </div>


            {Object.entries(transformInput(test?.data)).map(([key, value], idx) => (
              <div key={idx} className={`m-0 row border border-black`}>
                <TestParameterCard name={key} data={value} />
              </div>
            ))}
          </div>

        ))}
      </div>
    </div>
  );
};

export default Index;
