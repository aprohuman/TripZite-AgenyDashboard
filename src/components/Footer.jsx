import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-[#102728] '>
        <div className='flex justify-between items-start'>
        <div>
            <h3 className='text-base text-white mb-2'>SERVICE</h3>
            <nav className='text-xs text-[#A7B0AF]'>
                <ul className='flex flex-col gap-1'>
                    <li>
                        <Link className='' > Contact Us </Link>
                    </li>
                    <li>
                        <Link > FAQs </Link>
                    </li>
                    <li>
                        <Link > Sitemap </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <h3 className='text-base text-white mb-2'>ACCOUNT</h3>
            <nav className='text-xs text-[#A7B0AF]'>
                <ul className='flex flex-col gap-1'>
                    <li>
                        <Link > XYZ Agency </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <h3 className='text-base text-white mb-2'>THE COMPANY</h3>
            <nav className='text-xs text-[#A7B0AF]'>
                <ul className='flex flex-col gap-1'>
                    <li>
                        <Link > About TRIPZITE </Link>
                    </li>
                    <li>
                        <Link > News </Link>
                    </li>
                    <li>
                        <Link > Career </Link>
                    </li>
                    <li>
                        <Link > Corporate Information </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div>
            <h3 className='text-base text-white mb-2'>TERMS OF USE</h3>
            <nav className='text-xs text-[#A7B0AF]'>
                <ul className='flex flex-col gap-1'>
                    <li>
                        <Link > Legel</Link>
                    </li>
                    <li>
                        <Link > Code Of Ethics </Link>
                    </li>
                    <li>
                        <Link > Cookies </Link>
                    </li>
                    <li>
                        <Link > Privacy Policy </Link>
                    </li>
                    <li>
                        <Link > Personal Data </Link>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
        <div>
            <span className='text-xs text-[#A7B0AF] border-b border-white p-1'>INDIA(English)/ Rupees (&#8377;)</span>
        </div>
        <div className='border-t border-white mt-5 p-4'>
            <small className='text-white'>&copy;TRIPZITE 2025. All Rights Reserved.</small>

        </div>
  </footer>
  )
}
