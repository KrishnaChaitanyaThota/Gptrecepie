import { Button, Card, CardBody} from '@chakra-ui/react' ;
import {useState } from 'react';

const RHome = () => {

  const [reciperesult, setreciperesult] = useState([]);

  const recipehandleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);


    const response = await fetch('/api/suggestrecipe.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Ingredients,
      }),
    })

    const data = await response.json();
    setreciperesult(data.data[0].text.trim('\n').split("\n"))
    setloading(false)

  }

  return (
    reciperesult.map((item, index) => {

          return (
            <>
            <Button  onClick={recipehandleSubmit}>View recipe</Button> 
            <Card direction='row' width='80vw' variant={'filled'} m={4} key={index}><CardBody>{item}</CardBody>
            </Card> 
            </>
          )
        })
  );


};


export default RHome;
