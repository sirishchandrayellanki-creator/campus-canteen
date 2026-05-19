import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDwiDw5Cg_8Yrb-vK57mA0tkvxjD8P8svw",

  authDomain: "canteen-app-12ca6.firebaseapp.com",

  projectId: "canteen-app-12ca6",

  storageBucket: "canteen-app-12ca6.appspot.com",

  messagingSenderId: "949329514299",

  appId: "1:949329514299:web:21186da842b0bf8e22b11e"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);