import TestOne from "@/pages/ahooks/3-20/one"
import TestThree from "@/pages/ahooks/3-20/three"
import TestTwo from "@/pages/ahooks/3-20/two"
import React from "react"

const App = () => {
  return (
    <div>
      <TestOne></TestOne>
      {/* <TestFour></TestFour> */}
      <hr />
      <TestTwo></TestTwo>
      <hr/>
      <TestThree></TestThree>
    </div>
  )
}

export default App