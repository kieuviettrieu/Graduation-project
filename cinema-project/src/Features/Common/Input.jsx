import * as React from 'react';

export function App ({ ...inputProps }) {
  return (
    <>
      <input {...inputProps} />
    </>
  );
}
