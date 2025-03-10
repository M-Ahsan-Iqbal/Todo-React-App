import { useEffect, useState } from "react";
import icon from "../refresh-100.png";
import setting from "../setting-100.png";
import info from "../info.png";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function Counter(){
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const [showSection2, setShowSection2] = useState(false);
    const [showActive, setShowActive] = useState(false);
    const [bgColor, setBgColor] = useState("rgb(136, 34, 153, 0.95)");
    const [textColor, setTextColor] = useState(false);
    const [maxValue, setMaxValue] = useState(10);

    const [data, setData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [error, setError] = useState(null);


       //   fetch API data with async/await method
    // useEffect(()=> {
    //    async function fetchData(){
    //     try{
    //         const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    //         if(!response.ok) throw new error('Failed to fetch Data');
    //         const result = await response.json();
    //         setData(result); 
    //      } catch(err){
    //         setError(err.message);
    //      }
    //     }

    //     fetchData();
    // }, [])

    // if(error) return <p>Error : {error}</p>
    // if(!data) return <p>Loading .....</p>
    
    // return (<div>{JSON.stringify(data)}</div>)

        //   fetch API data with .then method

        // fetch("https://jsonplacer.typicode.com/todos/1")
        //     .then(response => response.json())
        //     .then(users => setData(users))
        //     .catch(error => setError(error));

        //     if(error) return <p>Error: {error}</p>
        //     if(!data) return <p>Loading.....</p>

        //     return (<div>{JSON.stringify(data)}</div>)

        //fetch API data with Axios library

        // useEffect(()=> {
        //     axios.get("https://jsonplaceholder.typicode.com/posts/1")
        //     .then(response => {
        //         setData(response.data);
        //     })
        //     .catch(error => {
        //         setError(error);
        //     })
        // }, [])

        // return(
        // <>
        // {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
        // </>
        // )

        // useEffect(()=> {
        //     axios.post("https://jsonplaceholder.typicode.com/posts", {
        //         title: "Post",
        //         content: "New post Created",
        //         userId: 1,
        //     }).then(response => {
        //         setData(response.data);
        //     }).catch(error => {
        //         setError(error);
        //     })
        // }, [])

        // axios.put("https://jsonplaceholder.typicode.com/posts/1", {
        //     title: "Updated Title",
        // }).then(response => {
        //     setPostData(response.data);
        // }).catch(error => {
        //     setError(error);
        // })

        // return(
        //     <>
        //     {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
        //     {postData ? <p>{JSON.stringify(postData)}</p> : <p>Loading...</p>}
        //     </>
        // )


    function add(){
        if(count < maxValue){
            setCount(count + 1);
        }
    }
    function subtract(){
        if(count > 0){
            setCount(count - 1);
     }
        else{
            setCount(0);
        }
    }
    function handleInfo(){
        setShow(!show);
        setShowSection2(false);
    }
    function handleSetting(){
        setShowSection2(!showSection2);
        setShow(false);
    }
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10 || 0);
        setCount(isNaN(value) ? 0 : value);
        if(value > maxValue){
            setCount(maxValue)
        }
    }
    const handleMaxValue = (e) => {
        const rangeValue = parseInt(e.target.value, 10);
        setMaxValue(isNaN(rangeValue) || rangeValue < 1 ? 10 : rangeValue)
    }
    const handleClick = (color) => {
        setShowActive(color); // Update active button on click

        const colorMap = {
            black: "black",
            white: "white",
            orange: "rgba(249, 115, 22, 0.95)",
            blue: "rgba(34, 211, 238, 0.8)",
        }
        setBgColor(colorMap[color]);
        if(color === "white"){
            setTextColor(true);
        }
        else{
            setTextColor(false);
        }
      };


    return(
        <>
        <div style={{position:"absolute", zIndex:"9", top:"0", left:"0", width:"100%", display:"flex", gap:"15px", justifyContent:"center", alignItems:"center", padding: "20px 0"}}>
            <img className="cursor-pointer" onClick={handleInfo} src={info} width="25"/>
            <img className="cursor-pointer" onClick={handleSetting} src={setting} width="25"/>
            <img className="cursor-pointer" onClick={() => setCount(0)} src={icon} width="25"/>          
        </div>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background: bgColor, padding:"0 30px", height:"100vh"}}>
            <div className={`${count ? "opacity-1" : "opacity-0"}`}>
                <Button onClick={subtract}>
                    <MinusIcon className="h-9 w-9 cursor-pointer"/>
                </Button>
        </div>
        <div style={{textAlign:"center", color:"#fff", fontSize: "20rem", fontFamily: "monospace"}}>
            {count}
        </div>
        <Button count={count} onClick={add}>
        <PlusIcon className="h-9 w-9 cursor-pointer"/>
        </Button>
        </div>
        <div className="absolute flex flex-col justify-center items-center bottom-8 text-white w-full">
        <p>Max Count: {maxValue}</p>
        {count >= maxValue && <p>Max Count Limit Reached</p>}  
        </div>

        {show && (        
            <div style={{position:"absolute", top:"0", left:"0", width:"100%", height:"100vh", background: bgColor, gap:"15px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div className={`text-center ${textColor ? "text-black" : "text-white "}`}>
                <h4 className="text-3xl font-bold py-5">Simple Counter</h4>
                <p className="text-md w-96">A simple tool for counting things and keeping track of numbers.</p>
                <XMarkIcon onClick={()=> setShow(!show)} className="h-8 w-8 cursor-pointer outline rounded-full p-1 text-center mx-auto my-12"/>
                </div>
                </div>
        )}

            {showSection2 && (
            <div style={{position:"absolute", top:"0", left:"0", width:"100%", height:"100vh", background: bgColor, gap:"15px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div className={`text-center ${textColor ? "text-black" : "text-white "}`}>
                <h4 className="text-3xl font-bold py-5">Setting</h4>
                <div className={`border-4 rounded-lg p-4 my-2 ${textColor ? "border-black" : "border-white"}`}>
                    <div class="flex justify-center items-center">
                        <span className="text-xl font-bold">Set Count = </span>
                        <input value={count} onChange={handleInputChange} className="w-16 rounded-sm text-black font-bold text-xl bg-white p-2 mx-3" type="number" />
                    </div>
                </div>
                <div className={`border-4 rounded-lg p-4 my-2 ${textColor ? "border-black" : "border-white"}`}>
                    <div class="flex justify-center items-center">
                        <span className="text-xl font-bold">Max Count = </span>
                        <input value={maxValue} onChange={handleMaxValue} className="w-16 rounded-sm text-black font-bold text-xl bg-white p-2 mx-3" type="number" />
                    </div>
                </div>
                <div className={`border-4 rounded-lg p-4 py-6 my-2 ${textColor ? "border-black" : "border-white"}`}>
                    <div class="flex gap-4 justify-start items-center">
                    <button className={`w-9 h-9 rounded-md bg-black ${showActive === "black" ? "shadow-[0_0_3px_3px_rgb(256,256,256)]" : "" }`} onClick={()=> handleClick("black")}></button>
                    <button className={`w-9 h-9 rounded-md bg-white ${showActive === "white" ? "shadow-[0_0_3px_3px_rgb(0,0,0)]" : "" }`} onClick={()=> handleClick("white")}></button>
                    <button className={`w-9 h-9 rounded-md bg-orange-500 ${showActive === "orange" ? "shadow-[0_0_3px_3px_rgb(256,256,256)]" : "" }`} onClick={()=> handleClick("orange")}></button>
                    <button className={`w-9 h-9 rounded-md bg-cyan-400 ${showActive === "blue" ? "shadow-[0_0_3px_3px_rgb(256,256,256)]" : "" }`} onClick={()=> handleClick("blue")}></button>
                    </div>
                </div>
                <XMarkIcon onClick={()=> setShowSection2(!showSection2)} className="h-8 w-8 cursor-pointer outline rounded-full p-1 text-center mx-auto my-12"/>
                </div>
                </div>
            )}
        </>
    )
}

function Button({children, onClick}){
    return(
        <button className="flex justify-center items-center" onClick={onClick} style={{fontSize:"3rem", lineHeight:"0", background:"#fff", border:"2px solid #829", borderRadius: "50%", height:"60px", width:"60px"}}>
            {children}
        </button>
    )
}

export default Counter;