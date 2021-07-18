import './App.css';
import { PropTypes } from 'prop-types';
import Info from './Info.js'
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AddItem from './AddItem';
import ItemsDisplay from './ItemsDisplay';
import styled from 'styled-components';

function App() {

  const [filters, setFilters] = useState({});
  const [data, setData] = useState({items: []});
  //const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((data) => setData({items: data}));
  }, []);

  const deleteItem = (item) => {
    const items = data["items"];

    const requestOptions = {
      method: "DELETE"
    }

    fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
    .then((response) => {
      if(response.ok){
        const idx = items.indexOf(item);
        items.splice(idx, 1);
        setData({items: items});
      }
    });
  }
  
  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  }

  const addItemToData = (item) => {
    let Items = data['items']; //current state of data
    //item.id = Items.length;

    const requestOptions = {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(item)
    }
    fetch("http://localhost:3000/items", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      Items.push(data);
      setData({items: Items});
    });
    //console.log('Data ',data);
  }

  const filterData = (data) => {
      const filteredData = [];

      if(!filters.name){
        return data;
      }

      for(const item of data){

        if(filters.name !== "" && item.name !== filters.name){
          continue;
        }
        if(filters.price !== 0 && item.price > filters.price){
          continue;
        }
        if(filters.type !== "" && item.type !== filters.type){
          continue;
        }
        if(filters.brand !== "" && item.brand !== filters.brand){
          continue;
        }

        filteredData.push(item);
      }

      return filteredData;
  }

  return (
    <div className="container">

    <div className="row mt-3">
    <SearchBar updateSearchParams={updateFilters}/>
    </div>

    <div className="row mt-3">
    <ItemsDisplay deleteItem={deleteItem} items={filterData(data['items'])}/>
    </div>
    
    <div className="row mt-3">
    <AddItem addItem={addItemToData}/>
    </div>
    
    <div className="row">
      <div className="row mt-3"><p>Bare Bones app.</p> </div>
      <Info title="Inventory"/>
      <AddItems text="Rice" amt={10}/>
      <AddItems />
      <ButtonState/>
    </div>
    </div>
  );
}

function AddItems(props){
  return(
    <form>
    <label for="text-form">Add Item: </label>
    <input type="text" value={props.text} id="text-form"/>

    <label for="amt-form">Amount: </label>
    <input type="text" value={props.amt} id="amt-form"/>
    </form>
  );
}

function ButtonState(){
  const [title, setTitle] = useState("");
  const [counter, setCounter] = useState(0);

  const updateTitleClicked = () =>{
    setTitle('Title Updated');
  }

  const updateCounterClicked = () => {
    setCounter(counter + 1);
  }

  return(
    <div>
      <p>Parent Title: {title}</p>
      <p>Parent Counter: {counter}</p>
      <Data title={title} counter={counter}/>
      <button onClick={updateTitleClicked}>Update Title</button>
      <button onClick={updateCounterClicked}>Update Counter</button>
    </div>
  );
}

function Data(props){
  return(
    <div>
  <p>Child Title: {props.title}</p>
  <p>Child Counter: {props.counter}</p>
  </div>
  );
}

AddItems.defaultProps = {
  amt: 1,
  text: "grains"
}

AddItems.propTypes = {
amt: PropTypes.number,
text: PropTypes.string,
}

export default App;
