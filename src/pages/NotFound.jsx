import {FaHome} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function NotFound() {
  return (
    <div className='hero'>
      <div className="text-center hero-content">
        <div className="max-x-lg">
          <h1 className="text-7xl font-bold mb-8">
            Hmm that's weird... 🤔
          </h1>
          <p className="text-4xl mb-8">404 - Page not found</p>
          <Link to='/' className='btn btn-primary btn-lg'>
            <FaHome className='mr-2'/>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound