import {
  getProducts,
  getProduct,
  getUser,
  signup,
  login,
  logout
} from "./connectors";
// import pubsub from "./pubsub";

const resolvers = {
  User: {
    fullName: (user, args, ctx) => {
      return `${user.firstName} ${user.lastName}`;
    }
  },
  Query: {
    ping: () => true,
    me: (_, args, ctx) => {
      if (!ctx.user) {
        throw new Error("Not logged in");
      }
      return getUser(ctx.user.id);
    },
    products: () => getProducts(),
    product: (_, args) => getProduct(args.id)
  },
  Mutation: {
    signup: (_, args, ctx) => signup(args, ctx),
    login: (_, args, ctx) => login(args, ctx),
    logout: (_, args, ctx) => logout(ctx)
  }
  // Subscription: {
  //   onNewPost: {
  //     resolve(payload, args, ctx) {
  //       return payload;
  //     },
  //     subscribe: () => pubsub.asyncIterator("ON_NEW_POST")
  //   }
  // }
};

export default resolvers;
