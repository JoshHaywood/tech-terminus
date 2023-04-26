import { useState } from 'react';

export default function useFormData() {
  // Form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    postalCode: "",
    phoneNumber: "",
    cardNumber: "",
  });
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Set form data
  };

  return { formData, handleChange };
};