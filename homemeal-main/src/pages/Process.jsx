
import Comp6 from '../components/Comp6';
import Comp7 from '../components/Comp7';


const Process = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', maxWidth: '100%', overflow: 'hidden',backgroundColor:'black' }}>
            {/* Hero Section */}
            
            <div >
                <Comp7 />
            </div>  
            <div >
                <Comp6 />
            </div>  
            
                                    
        </div>
    );
};

export default Process;