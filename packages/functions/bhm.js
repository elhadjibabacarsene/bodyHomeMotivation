import React from 'react';




function Ucfirst(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceUnderscoreToSpace(string){
  return string.replace(/_/g, ' ');
}


export default {
  Ucfirst,
  replaceUnderscoreToSpace
}
