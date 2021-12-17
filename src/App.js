import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';


export default () =>{
    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false)

    useEffect(()=>{
        const loadAll = async () =>{
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        let originals = list.filter(i=>i.slug == 'originals');
        let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        let chosen = originals[0].items.results[randomChosen]
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeatureData(chosenInfo);
        
      }

      loadAll();
    }, []);

    useEffect(()=>{
      const scrollListener = ()=>{
          if(window.scrollY > 10){
            setBlackHeader(true)
          }else{
            setBlackHeader(false)
          }
      }
        window.addEventListener('scroll', scrollListener);
      return ()=>{
        window.removeEventListener('scroll', scrollListener);
      }
    }, [])

   return (
     <div className="page">

          <Header black={blackHeader}/>

         {featureData && 
            <FeatureMovie item={featureData}/>
         }
          <section className="lists">
            {movieList.map((item, key)=>(
              <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
          </section>

          <footer>
            <p>Direitos de imagem para a Netfilx</p>
            <p>Dados pegos do site Themoviedb.org</p>  
            <p>Gomess Produções - Todos os direitos reservados</p>
          </footer>

            {movieList.length <= 0 && 
            
              <div className='loading'>
                  <img src="https://1.bp.blogspot.com/-B9juta27w6o/Xzk4GGrOziI/AAAAAAABtpE/0OMhU_0hPTY7PhayDfL3eJ5mIc2csWWWwCLcBGAsYHQ/s1600/Netflix_LoadTime.gif"/>
              </div>
            
            }
     </div>
   )
}