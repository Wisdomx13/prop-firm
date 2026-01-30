/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
const Email = (props:any) => (
  <svg
    width={50}
    height={50}
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
    <title>{"email-solid"}</title>
    <path
      className="clr-i-solid clr-i-solid-path-1"
      fill="url(#goldGradient)"
      d="M32.33,6a2,2,0,0,0-.41,0h-28a2,2,0,0,0-.53.08L17.84,20.47Z"
    />
    <path
      className="clr-i-solid clr-i-solid-path-2"
      fill="url(#goldGradient)"
      d="M33.81,7.39,19.25,21.89a2,2,0,0,1-2.82,0L2,7.5a2,2,0,0,0-.07.5V28a2,2,0,0,0,2,2h28a2,2,0,0,0,2-2V8A2,2,0,0,0,33.81,7.39ZM5.3,28H3.91V26.57l7.27-7.21,1.41,1.41Zm26.61,0H30.51l-7.29-7.23,1.41-1.41,7.27,7.21Z"
    />
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </svg>
);
export default Email;
