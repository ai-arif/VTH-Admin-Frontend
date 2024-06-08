import React, { useEffect } from "react";
import PatientRegistrationForm from "../../../../Components/PatientRegistration/PatientRegistrationForm";

const Index = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "If you reload the form data will be lost";
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <PatientRegistrationForm />
    </div>
  );
};

export default Index;
