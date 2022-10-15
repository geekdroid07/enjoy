import React, { useEffect, lazy, Suspense } from "react";
import { auth, firestore } from "utilities/firebase.utility";
import { resetUser, modifyUser } from "redux/slices/user";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { firebaseUserAdapter } from "adapters";
import "./scss/global.scss";
import Auth from "pages/Auth";
import Dashboard from "layouts/dashboard";
import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import { CircularProgress } from "@chakra-ui/react";
import "antd/dist/antd.min.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const info = await getDoc(doc(firestore, "users", firebaseUser.uid));
        dispatch(modifyUser(firebaseUserAdapter(firebaseUser, info.data())));
      } else {
        dispatch(resetUser());
      }
    });
  }, []);

  return !user.uid ? (
    <Auth />
  ) : (
    <Dashboard>
      <Suspense fallback={<CircularProgress isIndeterminate />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Dashboard>
  );
}

export default App;
