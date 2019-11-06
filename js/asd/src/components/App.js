import React, {useState, useEffect} from "react";
import {Button, Alert, Layout, Tabs, Card, Loading, Pagination, Dialog} from 'element-react'
import API from '../odd/Api.js'
import '../styles/App.css';

const Logo = props => {
  return (
    <a style={{backgroundImage: `url(${props.src})`}} className="logo" href="#"></a>
  )
}

const Header = ({setPage, filter, setFilter}) => {
  return (
    <Layout.Row>
      <Layout.Col span="4"><Logo src="../../media/dribbble-logo.svg"/></Layout.Col>
      <Layout.Col span="18" offset="1" style={{paddingTop: '20px'}}>
        <SortControl setPage={setPage} filter={filter} setFilter={setFilter}/>
      </Layout.Col>
    </Layout.Row>
  )
}

const SortControl = ({setPage, filter, setFilter}) => {
  const handleTabClick = tab => {
    if (filter[tab.props.name]) return;
    let newFilter = {}
    Object.keys(filter).forEach(f => newFilter[f] = false)  //
    newFilter[tab.props.name] = true;
    setFilter(newFilter);
    setPage(1);
  }
  return (
    <Tabs activeName={filter.new ? 'new' : 'popular'} onTabClick={handleTabClick}>
      <Tabs.Pane label="New" name="new"></Tabs.Pane>
      <Tabs.Pane label="Popular" name="popular"></Tabs.Pane>
    </Tabs>
  )
}

const Feed = ({filter, page, isLoading, setLoading, setMax}) => {
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);
  const [dialogVisible, setVisible] = useState(false);
  const [currentPhoto, setPhoto] = useState(null);

  const usePhotos = () => {
      const urlProperties = rules => {
        let ruleStr = '';
        Object.entries(rules).forEach(rule => ruleStr+=`${rule[0]}=${rule[1]}&`)
        return ruleStr;
      }
      const handleError = err => {
        setData(result);
        setLoading(false);
        setError(error);
      }
      const handleResult = result => {
        setData(result);
        setLoading(false);
        setMax(result.countOfPages);
      }
      let url = API.proxy + API.url + API.photo + `?${urlProperties(filter)}page=${page}&limit=15`;
      fetch(url)
        .then(response => response.json())
        .then(handleResult)
        .catch(handleError)
      return () => {setLoading(true)}
  }

   useEffect(usePhotos, [filter,page])  //menyaetsa tolko vmeste s filter ili page
   if (isLoading) {return (<Loader/>)}
   if (err) {return (<div>error</div>)}
   let photos = data.data;
   console.log(data);
   return (
     <div className="photos_container">
       {photos.map(photo => (
         <Card className={"photo"}>
           <div onClick={event => {setVisible(true); setPhoto(photos.find(x => x.id == event.target.id))}} id={photo.id} style={{borderRadius: '5px',padding: '70px',backgroundSize: '100% 100%', backgroundImage: `url(http://gallery.dev.webant.ru/media/${photo.image.contentUrl})`}}></div>
         </Card>
        ))}

        {dialogVisible ?
        <Dialog style={{borderRadius: '5px'}} visible={dialogVisible} size="tiny" onCancel={() => setVisible(false)}>
            <Dialog.Body style={{width: 'auto', height: '400px', padding: '10px 20px', paddingBottom: '0px'}}>
                <img style={{width: '100%', height: '100%'}} src={'http://gallery.dev.webant.ru/media/' + currentPhoto.image.contentUrl} className="image" />
            </Dialog.Body>
            <Dialog.Footer style={{textAlign: 'left', padding: '0px 20px', paddingBottom: '10px'}} className="dialog-footer">
              <p style={{fontFamily: "Courier New", fontSize: '25px', lineHeight: '0px', color: '#521AD1', paddingBottom: '5px'}} >{currentPhoto.name}</p>
              <p style={{fontFamily: "Courier New", fontSize: '18px', lineHeight: '0px', color: 'grey'}} >{currentPhoto.description}</p>
            </Dialog.Footer>
        </Dialog>
        : null}

     </div>
   )
}

const Loader = () => {
  return (
    <div className="el-loading-demo loader">
     <Loading>
     </Loading>
   </div>
  )
}

const Footer = ({setPage, max, isLoading, page}) => {
  return (
    <div className="footer">
      {isLoading ? null : <Pagination  currentPage={page} onCurrentChange={x => setPage(x)} layout="prev, pager, next" total={max * 10}/>}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState(1);
  const [max, setMax] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState({new: true, popular: false})

  console.log('apsp', page);
  return (
    [<Header setPage={setPage} filter={filter} setFilter={setFilter}/>,
     <Feed filter={filter} page={page} isLoading={isLoading} setLoading={setLoading} setMax={setMax}/>,
     <Footer max={max} isLoading={isLoading} setPage={setPage} setLoading={setLoading} page={page}/>]
  )
}

export default App;
