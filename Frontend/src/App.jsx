import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Base/Header";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Camera from "./pages/Camera";
import Footer from "./components/Base/Footer";
import Challenge from "./pages/Challenge";
import Community from "./components/community/Community";
import CreatePost from "./components/community/CreatePost";
import PostView from "./components/community/PostView";
import MiracleMorning from "./pages/MiracleMorning";
import Study from "./pages/Study";
import Health from "./pages/Health";
import MiracleFeed from "./components/Feed/MiracleFeed";
import MyPage from "./pages/MyPage";
import Reinforce from "./pages/Reinforce";
import Login from "./pages/Login";
import Landmark from "./pages/Landmark";
import "bootstrap/dist/css/bootstrap.min.css";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";
import UpdatePost from "./components/community/UpdatePost";
import Deposit from "./pages/Deposit";
import HealthFeed from "./components/Feed/HealthFeed";
import StudyFeed from "./components/Feed/StudyFeed";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { BrowserView, MobileView } from "react-device-detect";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <div className={styles.App}>
        <BrowserRouter>
          <Header className={styles.Header} />
          <BrowserView>
            <div className={styles.Contents2}>
              <Routes>
                {/* <Route path="/*" element={<Store />}></Route> */}
                <Route path="/" element={<Home />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
                <Route
                  path="/oauth2/redirect"
                  element={<OAuth2RedirectHandler />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/store" element={<Store />}></Route>
                <Route path="/landmark" element={<Landmark />}></Route>
                <Route path="/camera" element={<Camera />}></Route>
                <Route path="/challenge" element={<Challenge />}></Route>
                <Route path="/community" element={<Community />}></Route>
                <Route
                  path="/community/create"
                  element={<CreatePost />}></Route>
                <Route
                  path="/community/update/:postIdx"
                  element={<UpdatePost />}></Route>
                <Route
                  path="/community/:postIdx"
                  element={<PostView />}></Route>
                <Route
                  path="/challenge/morning"
                  element={<MiracleMorning />}></Route>
                <Route path="/challenge/health" element={<Health />}></Route>
                <Route path="/challenge/study" element={<Study />}></Route>
                <Route path="/challenge/deposit" element={<Deposit />}></Route>
                <Route
                  path="/challenge/morning/feed"
                  element={<MiracleFeed />}></Route>
                <Route
                  path="/challenge/health/feed"
                  element={<HealthFeed />}></Route>
                <Route
                  path="/challenge/study/feed"
                  element={<StudyFeed />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/reinforce" element={<Reinforce />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/main" element={<MainPage />}></Route>
              </Routes>
            </div>
          </BrowserView>
          <MobileView>
            <div className={styles.Contents}>
              <Routes>
                {/* <Route path="/*" element={<Store />}></Route> */}
                <Route path="/" element={<Home />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
                <Route
                  path="/oauth2/redirect"
                  element={<OAuth2RedirectHandler />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/store" element={<Store />}></Route>
                <Route path="/landmark" element={<Landmark />}></Route>
                <Route path="/camera" element={<Camera />}></Route>
                <Route path="/challenge" element={<Challenge />}></Route>
                <Route path="/community" element={<Community />}></Route>
                <Route
                  path="/community/create"
                  element={<CreatePost />}></Route>
                <Route
                  path="/community/update/:postIdx"
                  element={<UpdatePost />}></Route>
                <Route
                  path="/community/:postIdx"
                  element={<PostView />}></Route>
                <Route
                  path="/challenge/morning"
                  element={<MiracleMorning />}></Route>
                <Route path="/challenge/health" element={<Health />}></Route>
                <Route path="/challenge/study" element={<Study />}></Route>
                <Route path="/challenge/deposit" element={<Deposit />}></Route>
                <Route
                  path="/challenge/morning/feed"
                  element={<MiracleFeed />}></Route>
                <Route
                  path="/challenge/health/feed"
                  element={<HealthFeed />}></Route>
                <Route
                  path="/challenge/study/feed"
                  element={<StudyFeed />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/reinforce" element={<Reinforce />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/main" element={<MainPage />}></Route>
              </Routes>
            </div>
          </MobileView>
          <Footer className={styles.Footer} />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
