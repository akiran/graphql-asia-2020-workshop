import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import uuid from "uuid";
import { JWT_SECRET } from "./config";
import db from "./db";
import pubsub from "./pubsub";

export function getUsers() {
  return db.get("users");
}

export function getUser(id) {
  const users = getUsers();
  return users.find(user => user.id === id);
}

export function getProducts() {
  return db.get("products");
}

export function getProduct(id) {
  const products = getProducts();
  return products.find(product => product.id === id);
}

export function getCartItems(userId) {
  const cartItems = db.get("cartItems");
  return cartItems.filter(cartItem => cartItem.userId === userId);
}

export function getOrders(userId) {
  const orders = db.get("orders");
  return orders.filter(order => order.userId === userId);
}

export function addToCart(args, ctx) {
  const cartItems = db.get("cartItems");
  const newCartItem = {
    id: uuid.v4(),
    userId: ctx.user.id,
    productId: args.input.productId,
    quantity: args.input.quantity || 1
  };
  db.set("cartItems", cartItems.concat(newCartItem));
  return newCartItem;
}

export function emptyCart(args, ctx) {
  const cartItems = db.get("cartItems");
  const newCartItems = cartItems.filter(
    cartItem => cartItem.userId !== ctx.user.id
  );
  db.set("cartItems", newCartItems);
}

export function placeOrder(args, ctx) {
  const cartItems = getCartItems(ctx.user.id);
  const orders = db.get("orders");
  const newOrders = cartItems.map((cartItem, index) => ({
    quantity: cartItem.quantity,
    productId: cartItem.productId,
    userId: ctx.user.id,
    id: uuid.v4(),
    status: "placed"
  }));
  db.set("orders", orders.concat(newOrders));
  emptyCart(args, ctx);
  return newOrders;
}

export function getOrder(id) {
  const orders = db.get("orders");
  return orders.find(order => order.id === id);
}

export function updateOrderStatus(args, ctx) {
  const order = args.input;
  const orders = db.get("orders");
  const newOrders = orders.map(o =>
    o.id === order.id ? { ...o, status: order.status } : o
  );
  db.set("orders", newOrders);
  pubsub.publish("ON_ORDER_STATUS_CHANGE", {
    id: order.id
  });
  return getOrder(order.id);
}

export function signup(args, { res }) {
  const user = args.input;
  const users = getUsers();
  const salt = bcrypt.genSaltSync(10);
  const newUser = {
    id: uuid.v4(),
    ...user,
    role: user.role || "USER",
    password: bcrypt.hashSync(user.password, salt)
  };
  const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
  const newUsers = users.concat(newUser);
  db.set("users", newUsers);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  });
  return token;
}

export function login(args, { res }) {
  const user = args.input;
  const users = getUsers();
  const foundUser = users.find(u => u.email === user.email);
  if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
    const token = jwt.sign({ id: foundUser.id }, JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });
    return token;
  }
  throw new Error("Not Authroized");
}

export function logout({ res, user }) {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date()
  });
  return true;
}
