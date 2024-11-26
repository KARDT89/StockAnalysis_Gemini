import React from 'react'
import './Result.css'
import DOMPurify from 'dompurify';

const Result = ({ result }) => {
  const sanitizedHtml = DOMPurify.sanitize(result);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} className='resultdiv'/>
  );
};

export default Result;