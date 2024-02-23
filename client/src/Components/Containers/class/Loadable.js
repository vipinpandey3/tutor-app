// import loadable from "../../utils/loadable";
// console.log("Inside the home loadable component");

// export default loadable(() => import('./index'));


import loadable from '../../../utils/loadable';

export default loadable(() => import("./index"));