import React, { Suspense } from "react"
import {
  Navigate,
  Route,
  Routes
} from "react-router-dom"
import "./css/common.scss"
import Header from "./pages/header"
import LeftMenu from "./pages/menu"
import { routes } from "./router"


const App = () => {

  // loading页面
  const Loading = () => (
    <>
      <div className='loadsvg'>
        <div>
          loading...
        </div>
      </div>
    </>
  )
  // 递归函数
  const rotuerViews = (routerItems) => {
    if (routerItems && routerItems.length) {
      return routerItems.map(({ path, Component, children, redirect }) => {
        return children && children.length ? (
          <Route path={path} key={path} element={<Suspense fallback={<Loading />}><Component /></Suspense>}>
            {rotuerViews(children)} // 递归遍历子路由
            {redirect ?
              (<Route path={path} element={<Navigate to={redirect} />}></Route>) :
              (<Route path={path} element={<Navigate to={children[0].path} />}></Route>)
            }
          </Route>
        ) : (
          <Route key={path} path={path} element={<Suspense fallback={<Loading />}><Component /></Suspense>}>
          </Route>
        )
      })
    }

  }
  return (
    <div >
      <Header></Header>
      <div className="content">
        <div className="leftNav">
          <LeftMenu></LeftMenu>
        </div>
        <div className="rightRoute">
          <Routes>
            {
              rotuerViews(routes)
            }
          </Routes>
        </div>
      </div>

    </div >

  )
}

export default App;