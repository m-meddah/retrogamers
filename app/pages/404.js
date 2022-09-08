import Image from 'next/image';
import my404 from '../public/images/retrogamers_404.png';


export default function Custom404() {
    
    return <div><Image src={my404} layout="responsive" /></div>;
  }
