const validLetters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,space'.split(
  ','
);

let bindKeys = ({ keys, callback }) => {
  keys.forEach((key) => {
    kontra.keys.bind(key, callback);
  });
};

export default {
  validLetters,
  bindKeys
};
