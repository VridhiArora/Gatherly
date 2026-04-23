import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export default function Login(){

const navigate = useNavigate()
const [isSignup, setIsSignup] = useState(false)

function showSignup(){ setIsSignup(true) }
function showSignin(){ setIsSignup(false) }

async function createAccount(){
  let user = document.getElementById("newUser").value
  let pass = document.getElementById("newPass").value
  let roll = document.getElementById("newRoll").value

  if(!user || !pass || !roll){
    alert("Please fill all fields")
    return
  }

  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass, rollno: roll })
    })
    const data = await res.json()

    if(res.ok){
      alert("Account Created Successfully")
      setIsSignup(false)
    } else {
      alert(data.error || "Signup failed")
    }
  } catch(err) {
    alert("Server not reachable. Is your backend running?")
  }
}

async function login(){
  let user = document.getElementById("loginUser").value
  let pass = document.getElementById("loginPass").value
  let roll = document.getElementById("loginRoll").value

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass, rollno: roll })
    })
    const data = await res.json()

    if(res.ok){
      localStorage.setItem("userId",   data.userId)
      localStorage.setItem("username", data.username)
      localStorage.setItem("rollno",   data.rollno)
      localStorage.setItem("session",  data.session)

      alert("Login Successful")
      navigate("/home")
    } else {
      alert(data.error || "Invalid Credentials")
    }
  } catch(err) {
    alert("Server not reachable. Is your backend running?")
  }
}

return(

<div className="main">
<div className="container">
<div className="header">
<img src="/LOGO2.png" alt="logo"/>
<div className="uni">
Chitkara University Institute of Engineering & Technology
</div>
</div>

{!isSignup && (
<div>
<label>Username</label>
<input type="text" id="loginUser" placeholder="Enter Username"/>

<label>Roll No</label>
<input type="text" id="loginRoll" placeholder="Enter Roll No"/>

<label>Password</label>
<input type="password" id="loginPass" placeholder="Enter Password"/>

<label>Session</label>
<select>
<option>JanJun2026</option>
<option>JulDec2026</option>
</select>

<div className="remember">
<input type="checkbox"/> Remember Password
</div>

<button onClick={login}>Sign In</button>

<div className="links">
Forgot your password? <a>Click here</a>
</div>
<div className="links">
<a>Privacy Policy</a>
</div>
<div className="switch">
New user? <a onClick={showSignup}>Create Account</a>
</div>
</div>
)}

{isSignup && (
<div>
<label>Create Username</label>
<input type="text" id="newUser" placeholder="Create Username"/>

<label>Roll No</label>
<input type="text" id="newRoll" placeholder="Enter Roll No"/>

<label>Create Password</label>
<input type="password" id="newPass" placeholder="Create Password"/>

<button onClick={createAccount}>Sign Up</button>

<div className="switch">
Already have account? <a onClick={showSignin}>Sign In</a>
</div>
</div>
)}

<div className="apps">
<img src="/apple.png" alt="apple"/>
<img src="/play.png" alt="play"/>
</div>

<div className="footer">
<b>Mobile App Code : 69696969</b>
<br/><br/>
</div>

</div>
</div>
)
}