import React from "react"
import "style.css"
import tw from "twin.macro";
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"

import UserLayout from "components/user/layout/Layout"
import AdminLayout from "components/admin/layout/Layout"
import Dashboard from "pages/admin/dashboard/Dashboard"

//admin
import AdminAllHeritage from "pages/admin/heritage/AllHeritage"
import AdminAddOrUpdateHeritage from "pages/admin/heritage/AddOrUpdateHeritage"

import AdminAllHeritageType from "pages/admin/heritage-type/AllHeritageType"
import AdminAddOrUpdateHeritageType from "pages/admin/heritage-type/AddOrUpdateHeritageType"

import AdminAllLocation from "pages/admin/location/AllLocation"
import AdminAddOrUpdateLocation from "pages/admin/location/AddOrUpdateLocation"

import AdminAllManagementUnit from "pages/admin/management-unit/AllManagementUnit"
import AdminAddOrUpdateManagementUnit from "pages/admin/management-unit/AddOrUpdateManagementUnit"

import AdminAllUser from "pages/admin/user/AllUser"
import AdminAddOrUpdateUser from "pages/admin/user/AddOrUpdateUser"

import AdminLogin from "pages/admin/login/Login"

//user
import HomePage from "pages/user/HomePage"
import NotFound404 from "pages/user/NotFound404"
import UserLogin from "pages/user/Login"
import UserSignup from "pages/user/Signup"
import UserAllHeritage from "pages/user/AllHeritagePage"
import AboutUs from "pages/user/AboutUs"
import UserHeritageDetail from "pages/user/HeritageDetail"

import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <AnimationRevealPage>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/all-heritage" element={<UserAllHeritage />} />
          <Route path="/all-heritage/:type/:slug" element={<UserAllHeritage />} />
          <Route path="/heritage-detail/:slug" element={<UserHeritageDetail />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:type/:slug" element={<BlogIndex />} />
          <Route path="/blog-detail/:slug" element={<BlogDetail />} />
          <Route path="/not-found-404" element={<NotFound404 />} /> */}
        </Route>

        <Route path="/admin" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard/all-heritage" element={<AdminAllHeritage />} />
          <Route path="/admin/dashboard/add-heritage" element={<AdminAddOrUpdateHeritage type="add" />} />
          <Route path="/admin/dashboard/update-heritage/:id" element={<AdminAddOrUpdateHeritage type="update" />} />

          <Route path="/admin/dashboard/all-heritage-type" element={<AdminAllHeritageType />} />
          <Route path="/admin/dashboard/add-heritage-type" element={<AdminAddOrUpdateHeritageType type="add" />} />
          <Route path="/admin/dashboard/update-heritage-type/:id" element={<AdminAddOrUpdateHeritageType type="update" />} />
       
          <Route path="/admin/dashboard/all-location" element={<AdminAllLocation />} />
          <Route path="/admin/dashboard/add-location" element={<AdminAddOrUpdateLocation type="add" />} />
          <Route path="/admin/dashboard/update-location/:id" element={<AdminAddOrUpdateLocation type="update" />} />

          <Route path="/admin/dashboard/all-management-unit" element={<AdminAllManagementUnit />} />
          <Route path="/admin/dashboard/add-management-unit" element={<AdminAddOrUpdateManagementUnit type="add" />} />
          <Route path="/admin/dashboard/update-management-unit/:id" element={<AdminAddOrUpdateManagementUnit type="update" />} />
        
          <Route path="/admin/dashboard/all-user" element={<AdminAllUser />} />
          <Route path="/admin/dashboard/add-user" element={<AdminAddOrUpdateUser type="add" />} />
          <Route path="/admin/dashboard/update-user/:id" element={<AdminAddOrUpdateUser type="update" />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />

      </Routes>
    </AnimationRevealPage>
  )
}

export default App