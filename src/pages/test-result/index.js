import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    axios.get(`http://localhost:5000/api/v1/test/test-result/test10`).then(res => {
      let result = res.data?.data?.data;
      setTestResults(result);
      console.log(result);
    });
  }, []);

  return (
    <div>
      <TestResultHome />
      <div className="test-results">
        {testResults?.map(test => (
          <div key={test?._id} className="test-result">
            <h2>{test?.name}</h2>
            <div className="parameters">
              {Object.entries(transformInput(test?.data)).map(([key, value], idx) => (
                <TestParameterCard key={idx} name={key} data={value} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
