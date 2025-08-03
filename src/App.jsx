import { useState } from 'react'
import React from "react"
import confetti from 'canvas-confetti'
import './App.css'




function App() {

  const [array, setArray] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [target, setTarget] = useState('')
  const [foundIndex, setFoundIndex] = useState(null)
  const [leftIndex, setLeftIndex] = useState(null)
  const [midIndex, setMidIndex] = useState(null)
  const [rightIndex, setRightIndex] = useState(null)
  const [stepText, setStepText] = useState('')
  const [chheckingIndex, setCheckingIndex] = useState(null)
  const [isSearching, setIsSearching] = useState(false)


  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const BinarySearch = async (arr, target) => {
    let left = 0
    let right = arr.length - 1
    setIsSearching(true)
    setStepText("Starting Binary Search...")

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      setLeftIndex(left)
      setMidIndex(mid)
      setRightIndex(right)
      await sleep(1000)
      
      
      if (arr[mid] === target) {
        setFoundIndex(mid)
        setStepText(`🎯 Found value ${target} at index ${mid}. Search complete.🎉`)
        confetti({
          particleCount: 150,
          spread: 100,
          origin: {y: 0.6}
        })
        await sleep(1000)
        break
      } else if (arr[mid] < target) {
        
        setStepText(`Value ${arr[mid]} < ${target}. Searching right half.`)
        await sleep(4000)
        left = mid + 1
        
        
      } else {
        
        setStepText(`Value ${arr[mid]} > ${target}. Searching left half.`)
        await sleep(4000)
        right = mid - 1
        
        
      }

      setLeftIndex(left)
      setRightIndex(right)
      setMidIndex(Math.floor((left+right)/2))
    }
    if (left > right) {
      setFoundIndex(null)
      setStepText(`❌ Value ${target} not found.`)
      
    }

    setIsSearching(false)
    setLeftIndex(null)
    setMidIndex(null)
    setRightIndex(null)

  }

  const handleFind = async() => {
   const num = parseFloat(target)
   if(isNaN(num)) return 

   await BinarySearch(array, num)
  }



  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSort = () => {
    const nums = inputValue.trim().split(/\s+/).map(Number).filter((n) => !isNaN(n))

    const sorted = [...nums].sort((a, b) => a - b)
    setArray(sorted)
  }



  return (
    <div className="app">
      <h1>Binary Search Visualizer</h1>


      <div className="array-input-section">
        <label>Enter Array Elements: </label>
        <input
          type="text"
          placeholder="e.g. 10 5 3 8 "
          value={inputValue}
          onChange={handleChange}
        />

        <button onClick={handleSort}>Sort</button>

      </div>

      <div className="array-display">
        {array.map((num, index) => {
          let className = "array-box"

          if (index === foundIndex) className += " found"
          else if (index === midIndex) className += " mid"
          else if (index === leftIndex) className += " left"
          else if (index === rightIndex) className += " right"


          let label =""
          if (index === leftIndex) label ="L"
          if(index === midIndex) label +="M"
          if(index === rightIndex) label += "R"

          return (
            <div key={index} className='array-box-wrapper'>
              <div className='index-label'>{index}</div>
              <div className={className}>{num}</div>
              <div className='label'>{label}</div>
            </div>
          )
        })}

      </div>

      <div className={`step-text ${foundIndex === null && !isSearching? 'not-found' :''} ${foundIndex !==null? 'found' : ''}`}>
        <p>{stepText}</p>
      </div>

      <div className="target-section">
        <label>Target:</label>
        <input type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="enter the target" />

        <button onClick={handleFind} disabled={array.length === 0 || isSearching}>Find</button>

      </div>

      <button onClick={() => {
        setArray([])
        setTarget('')
        setFoundIndex(null)
        setInputValue('')
        setLeftIndex(null)
        setMidIndex(null)
        setRightIndex(null)
        setStepText("")
        setIsSearching(false)
      }}>
        Clear All
      </button>


    </div >
  )


}
export default App
