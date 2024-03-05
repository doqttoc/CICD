import TestOne from "@/pages/ahooks/3-20/one"
import TestThree from "@/pages/ahooks/3-20/three"
import TestTwo from "@/pages/ahooks/3-20/two"
import React from "react"
import FileEdit from "./pages/work/FileEdit"

const App = () => {
  return (
    <div>
      <TestOne></TestOne>
      {/* <TestFour></TestFour> */}
      <hr />
      <TestTwo></TestTwo>
      <hr/>
      <TestThree></TestThree>
      <hr></hr>
      <FileEdit></FileEdit>
    </div>
  )
}

export default App