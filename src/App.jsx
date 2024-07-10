import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [allowedNum, setAllowedNum] = useState(false)
  const [allowedChar, setAllowedChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz'
    if (allowedNum) str += '0123456789'
    if (allowedChar) str += '!@#$%^&*(){}~`'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    // console.log(pass)
    setPassword(pass)

  }, [length, allowedNum, allowedChar, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  }, [password])
  const passwordRef = useRef(null)
  useEffect(() => {
    passwordGenerator()
  }, [length, allowedNum, allowedChar, passwordGenerator])
  return (
    <>
      <div className='w-screen max-w-md mx-auto shadow-md rounded-lg px-5 py-5 my-8 text-orange-500    bg-gray-800'>
        <h2 className='py-5 text-2xl'>Password Generator</h2>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} /> <button onClick={copyPasswordToClipboard} className='bg-orange-500 text-white rounded-sm'>COPY</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label > label :{length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={allowedNum}
              id='numberInput'
              onChange={() => {
                setAllowedNum(prev => !prev)
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={allowedChar}
              id='charInput'
              onChange={() => {
                setAllowedChar(prev => !prev)
              }}
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App