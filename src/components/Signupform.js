import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUpOne() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success'); // Add state for alert severity
  const [alertMessage, setAlertMessage] = useState('User signed up successfully!'); // Add state for alert message

  let navigate = useNavigate();
  
  const handleForm = (e) => {
    console.log(e.target.value, e.target.id);
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username) {
      newErrors.username = 'Username is required';
    }

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(form.password)) {
      newErrors.password = 'Password must contain both uppercase and lowercase letters';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setAlertMessage('User signed up successfully!');
        setAlertSeverity('success');
        setAlertOpen(true);
        setTimeout(() => {
          navigate('/login');
          window.location.reload();
        }, 2000);
      } else if (data.message === 'User already exists') {
        throw new Error('Email already exists');
      } else {
        throw new Error(data.massage || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage(error.message);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={handlesubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="username" className="text-base font-medium text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="username"
                      value={form.username}
                      onChange={handleForm}
                    />
                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={form.email}
                      onChange={handleForm}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={form.password}
                      onChange={handleForm}
                    />
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  />
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign up with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="../assets/images/boy_codding.jpg"
            alt="logo"
          />
        </div>
      </div>

      {/* Snackbar for Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </section>
  );
}
