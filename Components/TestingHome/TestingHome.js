import React from "react";
import { useForm } from "react-hook-form";

const TestingHome = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="container-fluid">
      <div className="app-card text-center shadow-sm">
        <h3 className="page-title py-2">Routine Hematology Form for Cats and Dogs</h3>
        <div className="table-responsive">
          <table className="table table-hover table-borderless table-striped table-dark">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Result</th>
                <th>Unit</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Cart / Dogs</td>
              </tr>
              <tr>
                <td className="">Hemoglobin (Hb)</td>
                <td className="">Result</td>
                <td className="">g/dL</td>
                <td className="">9.3 - 15.9</td>
                <td className="">12 - 18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestingHome;
