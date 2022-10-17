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

const Influencers = lazy(() => import("pages/Influencers"));
const AddInfluencers = lazy(() => import("pages/Influencers/components/AddInfluencers"));

const Members = lazy(() => import("pages/Members"));
const AddMembers = lazy(() => import("pages/Members/components/AddMembers"));

const Managers = lazy(() => import("pages/Managers"));
const AddManagers = lazy(() => import("pages/Managers/components/AddManagers"));

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

          <Route path="/influencers" element={<Influencers />} />
          <Route path="/influencers/add" element={<AddInfluencers />} />
          <Route path="/influencers/edit/:id" element={<AddInfluencers />} />
          <Route path="/influencers/view/:id" element={<AddInfluencers />} />

          <Route path="/managers" element={<Managers />} />
          <Route path="/managers/add" element={<AddManagers />} />
          <Route path="/managers/edit/:id" element={<AddManagers />} />
          <Route path="/managers/view/:id" element={<AddManagers />} />

          <Route path="/members" element={<Members />} />
          <Route path="/members/add" element={<AddMembers />} />
          <Route path="/members/edit/:id" element={<AddMembers />} />
          <Route path="/members/view/:id" element={<AddMembers />} />

        </Routes>
      </Suspense>
    </Dashboard>
  );
}

export default App;
