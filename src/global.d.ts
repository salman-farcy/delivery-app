// import { Connection } from "mongoose"

// declare global {
//      var mongoose:
//           | {
//                conn: Connection | null;
//                promise: Promise<Connection> | null;
//           }
//           | undefined;
// }


// export { }


import type { Mongoose } from "mongoose";

declare global {
     // eslint-disable-next-line no-var
     var mongooseCache:
          | {
               conn: Mongoose | null;
               promise: Promise<Mongoose> | null;
          }
          | undefined;
}

export { };