
import Comp1 from '../components/Comp1';
import Comp2 from '../components/Comp2';
import Comp3 from '../components/Comp3';
import Comp4 from '../components/Comp4';
import Comp5 from '../components/Comp5';

import Hero from "../components/Hero";


const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '100%', overflow: 'hidden',backgroundColor:'black' }}>
            {/* Hero Section */}
            <Hero />
                 
                <Comp2 />
            <div>
                <Comp3 />
            </div>   
            
            <div >
                <Comp4 />
            </div>  
            
            
            <div >
                <Comp5 />
            </div>  
            
                                    
        </div>
    );
};

export default HomePage;
