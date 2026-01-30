/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
const Location = (props:any) => (
  <svg
    width={50}
    height={50}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <path
      fill="url(#goldGradient)"
      d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0-3.124 3.074-3.124 8.057 0 11.13l5.656 5.565 5.657-5.565c3.124-3.073 3.124-8.056 0-11.13zm-5.657 8.195c-.668 0-1.295-.26-1.768-.732-.975-.975-.975-2.561 0-3.536.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732c.975.975.975 2.562 0 3.536-.472.472-1.1.732-1.768.732z"
    />
  </svg>
);
export default Location;
