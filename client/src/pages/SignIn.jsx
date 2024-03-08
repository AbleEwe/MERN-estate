import OAuth from "../components/OAuth";
import useSignIn from "../hooks/useSignIn"
import { Link } from "react-router-dom"


const SignIn = () => {
  const {
    error,
    loading,
    handleChance,
    handleSubmit,
  } = useSignIn();

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="email" 
        className="border p-3 rounded-lg" id='email' onChange={handleChance}/>
        <input type="text" placeholder="password" 
        className="border p-3 rounded-lg" id='password' onChange={handleChance}/>
        <OAuth/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Sign in'}</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
        <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error.message}</p>}
    </div>
  )
}

export default SignIn
