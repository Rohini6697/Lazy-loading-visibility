import logo from './logo.svg';
import './App.css';
import { useState,useRef,useEffect } from 'react';

function App() {
  const [component,setComponent] = useState(null)
  const [observer,setObserver] = useState(null)
  const elementRef = useRef(null)

  useEffect(() =>{
    if (!observer){
      const newObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          import('./component/LazyComponent').then((mod) => {
            setComponent(mod.default);
          });
          newObserver.disconnect();
        }
      })
      setObserver(newObserver);
    }
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    }
  }, [observer])
  if(!component)
    return (<div className='demo'>
  <div ref = {elementRef}>Loading.....</div>
  </div>)
  return component
}

export default App;
