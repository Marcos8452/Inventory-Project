import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div class="flex">
            <div>
                <div className="flex p-3">
                    <div className="flex justify-between text-center cursor-pointer">
                        <Link to="/createticket" className="border-1 w-36 rounded hover:bg-blue-200">Issue inventory</Link>
                        <Link to={"/inventorysearch"} className="border-1 w-36 rounded ml-2 hover:bg-blue-200">Check inventory</Link>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default MainPage
