import { Button} from '@chakra-ui/react' ;
import { useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';

const RHome = () =>{

    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();
    console.log(router.query)

    const [item, setitem] = useState(null);

    useEffect(() =>{
      const suggestrecipe = async() =>{
        try{
        const response = await fetch('/api/suggestrecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipe:router.query.recipe,
          }),
        })
    
        const data = await response.json();
        console.log(data.data[0].text)
        setitem(data.data[0].text);
      }catch(e){
      console.log(e.message);
      }
    }
    
      suggestrecipe();
   
    }, [])
      



    return(
        <>
    <Head>
      <title>Recipe suggesting App</title>
    </Head>

    <div height={"100vh"} width={"100vw"} overflow={'scroll'} >

       <Button ml="85vw" mt="6" onClick={toggleColorMode}>
       {colorMode === 'light' ? 'Dark' : 'Light'} Theme
      </Button>
      <p>{router.query.recipe}</p>
      <pre>{item}</pre>
      
    </div>
    </>
    )

}

export default RHome;