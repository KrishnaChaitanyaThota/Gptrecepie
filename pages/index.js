import { Button, Input, Card, CardBody, HStack} from '@chakra-ui/react' ;
import { useColorMode } from '@chakra-ui/react';
import {useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';




const Home = () => {
  const [Ingredients, setIngredients] = useState('');

  const [loading, setloading] = useState(false);

  const [result, setresult] = useState([]);

  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  useEffect( () =>{
    const data =  JSON.parse(window.localStorage.getItem('result'));
    if (data !== []) setresult(data);
    console.log('data', data);

  }, [])

  // useEffect( () =>{
  //   window.localStorage.setItem('result', JSON.stringify(result));

  // }, [result])

  const handleChange = (e) => {
    setIngredients(e.target.value);
    // setIngredients((prev) =>({ ...prev, [name]:value }))
    
  }

  const handleSubmit = async (e) => {
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
    console.log(data.data[0])
    const myResult = data.data[0].text.trim('\n').split("\n")
    setresult(myResult)
    window.localStorage.setItem('result', JSON.stringify(myResult));

    setloading(false)

  }

  const handlerecipe = (recipe) => () =>{
    // window.history.forward();
    // function noBack()
    // {
    //     window.history.forward();
    // }
      router.push({pathname: "/recipe", query: {recipe}})
      
  };

  return (
    <>
    <Head>
      <title>Recipe suggesting App</title>
    </Head>


    <div height={"100vh"} width={"100vw"} overflow={'scroll'} >
      <center >
        <Input type="search" name="q" onChange={(e) => { handleChange(e) }} margin='6' color='gold' _placeholder={{ color: 'inherit' }} bg={"black"} textColor={"gold"} placeholder=" Enter ingredients for your dish" width='80vw' />

        <Button onClick={toggleColorMode}>
       {colorMode === 'light' ? 'Dark' : 'Light'} Theme
      </Button>

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

      {loading ? 
       <center> <Button
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
            <>
            <HStack>
            <Card direction='row' width='80vw' variant={'filled'} m={4} key={index}><CardBody>{item}</CardBody>
            </Card> <Button onClick={handlerecipe(item)}  colorScheme='teal' variant='outline' > view recipe </Button>
            
            </HStack>
            </>
          )
        })}
    </div>
    </>
  );
};




export default Home;

