import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
   <footer className="bg-slate-200 pt-5">
      <div className="max-w-screen-xl grid md:grid-cols-3 md:justify-items-end mx-auto md:w-5/6 lg:w-5/6 px-3 md:px-0 pb-5">
        <div className='flex flex-col md:items-start items-center mt-5'>
        <Link to='/'>
        <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap mb-5">
          <span className="text-slate-500">Cielo</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        <p className='text-black [text-wrap:balance] text-sm pb-4 text-center md:text-start'>Elevate Your Real Estate Experience with CieloEstate</p>
        
        </div>
        <div>
          <h2 className='uppercase font-semibold mt-5'>Follow us</h2>
          <div className='flex gap-3 mt-5'>
            <a href='https://web.whatsapp.com/'><FaWhatsapp className='size-6'/></a>
            <a href='https://www.facebook.com/'><FaFacebook className='size-6'/></a>
            <a href='https://www.instagram.com/'><FaInstagram className='size-6'/></a>
            <a href='https://twitter.com/'><FaTwitter className='size-6'/></a>
          </div>
        </div>
        <div className='flex flex-col md:items-start items-center'>
          <h2 className='my-5 uppercase font-semibold'>Contact us</h2>
          <ul className='flex flex-col space-y-2.5'>
            <li>
              <p className='text-sm font-semibold'>E-mail:</p>
              <p>cieloestate@outlook.com</p>
            </li>
            <li>
              <p className='text-sm font-semibold'>Phone/Whatsapp:</p>
              <p>123 456 789</p>
            </li>
            <li>
              <p className='text-sm font-semibold'>Address:</p>
              <p>Street 123, Mexico, Mexico</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-xl flex items-center justify-center mx-auto lg:w-5/6 p-3 md:pl-0 border-t-2 border-black">
        <p>
          © CieloEstate - All rights reserved
        </p>
      </div>
   </footer>
  )
}
