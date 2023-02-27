import { Button, Input, Card, CardBody} from '@chakra-ui/react' 
import {useState } from 'react';
import Head from 'next/head';
import {SunIcon} from '@chakra-ui/icons';

const Home = () => {
  const [Ingredients, setIngredients] = useState("");

  const [loading, setloading] = useState(false);

  const [result, setresult] = useState([]);

  const handleChange = (e) => {
    setIngredients(e.target.value);
    
  }

  const handleSubmit = async (e) => {
    console.log("running sub,it")
    e.preventDefault();
    setloading(true);

    const response = await fetch('/api/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Ingredients,
      }),
    })

    const data = await response.json();
    setresult(data.data[0].text.trim('\n').split("\n"))
    setloading(false)

  }

  return (
    <>
    <Head>
      <title>Recipe suggesting App</title>
    </Head>


    <div height={"100vh"} width={"100vw"} overflow={'scroll'} >
      <center >
        <Input onChange={(e) => { handleChange(e) }} margin='6' color='gold' _placeholder={{ color: 'inherit' }} bg={"black"} textColor={"gold"} placeholder=" Enter ingrident's for your dish" width='80vw' />

        <SunIcon/>

        <Button
          size='md'
          height='48px'
          width='200px'
          border='2px'
          borderColor='black'
          bg={"gray"}
          margin='6'
          textColor={"gold"}
          onClick={handleSubmit}
        >
          Get My Dish
        </Button>

      </center>

      {loading ? <center> <Button
        isLoading
        loadingText='Loading'
        colorScheme='teal'
        variant='outline'
        spinnerPlacement='start'
        onClick={handleChange}
      >
        Submit
      </Button> </center> :
        result.map((item, index) => {
          return (
            <Card variant={'filled'} m={4} key={index}><CardBody>{item}</CardBody></Card>
          )
        })}
    </div>
    </>
  );


};


export default Home;