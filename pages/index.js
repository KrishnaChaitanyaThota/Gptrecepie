import { Flex, Button,Input, Card, CardBody } from '@chakra-ui/react'
import {useState } from 'react';
const Home = () =>{

  const [Ingredients, setIngredients] = useState("");

  const [result, setresult] = useState([]);

  const handleChange =  (e) =>{
    setIngredients(e.target.value);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('/api/suggest', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        Ingredients,
      }),
    })

    const data = await response.json();
    setresult(data.data[0].text.trim('\n').split("\n"))

    console.log(data.data[0].text.trim('\n').split("\n"));
  }
  

  return (
  
    <div  height={"100vh"} width={"100vw"} overflow={'scroll'}>
    <Input onChange={(e)=>{handleChange(e)}} marginTop= '6' color='gold'_placeholder={{ color: 'inherit' }} bg={"black"} textColor={"gold"} placeholder=" Enter recepie's for your dish"/>

<Button
  size='md'
  height='48px'
  width='200px'
  border='2px'
  borderColor='black'
  bg={"gray"}
  marginTop= '6'
  textColor={"gold"}
  onClick={handleSubmit}
>
  Get My Dish
</Button>
{ result.length > 0 &&
result.map((item, index)=>{
    return (
      <Card variant={'filled'} m={4} key={index}><CardBody>{item}</CardBody></Card>
    )
  })}
    </div>
   
    
  );

  
};

export default Home;