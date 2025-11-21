import './App.css'
import Header from './components/header'
import ProductCard from './components/product-card'

function App() {

  return (
    <div className="w-full h-screen bg-pink-200 flex justify-center items-center">
      <div className="w-[500px] h-[600px] flex flex-col  items-center bg-gray-200 relative">
        <div className="w-[90px] h-[90px] bg-red-500"></div>
        <div className="w-[90px] h-[90px] bg-yellow-500 absolute right-[50px] bottom-[50px]"></div>
        <div className="w-[90px] h-[90px] bg-blue-500 fixed right-[50px] bottom-[50px]"></div>
        <div className="w-[90px] h-[90px] bg-green-500"></div>
      </div>
    </div>
  )
}

export default App
