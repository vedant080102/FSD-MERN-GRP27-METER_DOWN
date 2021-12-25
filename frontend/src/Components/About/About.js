import { Parallax, Background } from 'react-parallax';
import { ReactComponent as Sustain} from '../../Media/sustainable.svg'
import { ReactComponent as Taxi} from '../../Media/taxi.svg'
import { ReactComponent as Safety} from '../../Media/safety.svg'
import bgImg from '../../Media/MUMBAI-Rick.jpg'
import vedantDP from '../../Media/vedant.png'
import omkarDP from '../../Media/omkar.png'
import adityaDP from '../../Media/aditya.png'
import './about.css'
import { RegionMap } from './RegionMap';

function About() {

    const aboutDetails = [{
            title: 'Sustainability',
            icon: Sustain,
            desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.'
        },{
            title: 'Rides and beyond',
            icon: Taxi,
            desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quo sed in quam quaerat quae accusantium impedit blanditiis dolor recusandae animi aut quod eum accusamus, commodi possimus aspernatur non repellat a quos tempora odio saepe delectus? Recusandae libero, asperiores sunt dicta et a fuga magnam ab cupiditate voluptas necessitatibus mollitia, tenetur quo velit non ipsa soluta saepe, ullam dolores facilis obcaecati! Consequatur ratione est hic a quae, ducimus molestias vitae pariatur distinctio esse alias saepe, laudantium atque reprehenderit, quidem unde tempore veritatis. Nobis, perspiciatis. Dignissimos quibusdam, officia impedit accusantium nulla temporibus! Aliquam, error repellat sapiente corporis voluptas perferendis ducimus accusantium.'
        },{
            title: 'Your safety drives us',
            icon: Safety,
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel consectetur reiciendis esse optio voluptate assumenda eum voluptatem architecto, neque voluptas blanditiis dolorum ipsam accusamus quae culpa odit aperiam quisquam consequuntur similique numquam iste cum. Saepe, atque error! Debitis repellendus et beatae, facilis ducimus repudiandae ad at iure adipisci est, soluta sapiente tempora porro. Iusto hic repudiandae et iure doloremque fuga voluptas eum voluptatem molestiae, dicta maxime facere, quidem aperiam, iste commodi. Consequuntur magni iste repellat maiores provident eos explicabo excepturi neque deserunt! Vero totam expedita error, quam libero eius voluptates, incidunt voluptatibus voluptatem magnam ullam accusamus voluptate ipsam? Laboriosam qui voluptas veritatis dolor repellendus quisquam reiciendis, dolorem expedita! Dolorum, excepturi sit!'
        },
    ]

    const printDetails = (doc, i) => <div className="row" key={i}>
        <h2>{doc.title}</h2>
        <div className="col-12 col-md-5 flex mb-4 mb-md-0">
            <div className='about-icons'>
                <doc.icon height='100%' width='200px'/>
            </div>
        </div>
        <div className="col-12 col-md-7"><p>{doc.desc}</p></div>
    </div>

    return (<div id='about-page' className='yellow-bg pb-1'>
        <div className='flex' style={{height:'calc(100vh - 76px)'}}>
            <Parallax strength={500} className='w-100 h-100 purple-bg'>
                <Background className="custom-bg">
                    <div style={{
                        height: '105vh',
                        width: '100vw',
                        backgroundImage: `linear-gradient(#2b0a2ca6, #2b0a2ca6), url('${bgImg}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}/>
                </Background>
            </Parallax>
            <h1 className='position-absolute text-white fw-bold'>About Us</h1>
        </div>
        <div className="custom-shape-divider-top-1636559095">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
            </svg>
        </div>

        <div className='purple-bg container rounded shadow my-5 py-5 px-2 px-md-5'>
            {/* <img src = {mapImg}/> */}
            <div className="about-points container">
                <h1 className='text-center mt-0'>Reimagining the way the world moves for the better</h1>
                <p className='text-start'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit minus dolorum ipsum odit maxime exercitationem, animi natus, tenetur nostrum dolore, illo ullam. Adipisci accusamus soluta sit dolore consequatur nam assumenda quisquam ratione repellendus! Molestias consectetur, velit illum eos, iure architecto id temporibus deleniti porro iusto rem earum incidunt voluptate cupiditate?</p>
                {aboutDetails.map((data, i)=>printDetails(data,i))}
            </div>
        </div>

        <div className='purple-bg container rounded shadow my-3 my-md-5 p-3 p-md-5'>
            <div className="w-100">
                <h2 className='mb-4'>Region in which we operate</h2>
                <div className="flex">
                    <RegionMap/>
                </div>
            </div>
        </div>

        <div className='purple-bg container rounded shadow my-3 my-md-5 py-3 py-md-5 px-2 px-md-5'>
            <h2>Our Team</h2>
            <div className="row w-100 m-0 mt-4">
                <div className="flex flex-column col-12 col-md-4 my-3">
                    <div className='team-img'>
                        <img className='rounded-circle' src={vedantDP} height={200} width={200} alt='vedant'/>
                        <div className="yellow-bg"></div>
                    </div>
                    VEDANT SARNOBAT<br/>1911117
                </div>
                <div className="flex flex-column col-12 col-md-4 my-3">
                    <div className='team-img'>
                        <img className='rounded-circle' src={omkarDP} height={200} width={200} alt='omkar'/>
                        <div className="yellow-bg"></div>
                    </div>
                    OMKAR SAWANT<br/>1911118
                </div>
                <div className="flex flex-column col-12 col-md-4 my-3">
                    <div className='team-img'>
                        <img className='rounded-circle' src={adityaDP} height={200} width={200} alt='aditya'/>
                        <div className="yellow-bg"></div>
                    </div>
                    ADITYA TAWADE<br/>1911126
                </div>
            </div>
        </div>
    </div>);
}

export default About;