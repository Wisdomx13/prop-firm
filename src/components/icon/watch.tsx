/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
const Watch = (props: any) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
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
      fillRule="evenodd"
      d="M9 4v3.586l1.707 1.707a1 1 0 0 1-1.414 1.414L7 8.414V4a1 1 0 0 1 2 0zm7 4A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-2 0A6 6 0 1 0 2 8a6 6 0 0 0 12 0z"
    />
  </svg>
);
export default Watch;
