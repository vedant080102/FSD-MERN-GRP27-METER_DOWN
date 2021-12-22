import { useRef } from 'react';
import { useEffect } from 'react';
import { Parallax, Background } from 'react-parallax';
import mapImg from '../../Media/region.png'
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
                    }}
                    />
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

            <div className="container text-start">
                <h3>Reimagining the way the world moves for the better</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

                <h3>Sustainability</h3>
                <div className="row">
                    <div className="col-12 col-md-5 flex">
                        <div className='about-icons'>
                            <Sustain height='auto' width='200px'/>
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.</p>
                    </div>
                </div>

                <h3>Rides and beyond</h3>
                <div className="row flex-md-row-reverse">
                    <div className="col-12 col-md-5 flex">
                        <div className='about-icons'>
                            <Taxi height='auto' width='200px'/>
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quo sed in quam quaerat quae accusantium impedit blanditiis dolor recusandae animi aut quod eum accusamus, commodi possimus aspernatur non repellat a quos tempora odio saepe delectus? Recusandae libero, asperiores sunt dicta et a fuga magnam ab cupiditate voluptas necessitatibus mollitia, tenetur quo velit non ipsa soluta saepe, ullam dolores facilis obcaecati! Consequatur ratione est hic a quae, ducimus molestias vitae pariatur distinctio esse alias saepe, laudantium atque reprehenderit, quidem unde tempore veritatis. Nobis, perspiciatis. Dignissimos quibusdam, officia impedit accusantium nulla temporibus! Aliquam, error repellat sapiente corporis voluptas perferendis ducimus accusantium.</p>
                    </div>
                </div>

                <h3>Your safety drives us</h3>
                <div className="row">
                    <div className="col-12 col-md-5 flex">
                        <div className='about-icons'>
                            <Safety height='auto' width='200px'/>
                        </div>
                    </div>
                    <div className="col-12 col-md-7">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel consectetur reiciendis esse optio voluptate assumenda eum voluptatem architecto, neque voluptas blanditiis dolorum ipsam accusamus quae culpa odit aperiam quisquam consequuntur similique numquam iste cum. Saepe, atque error! Debitis repellendus et beatae, facilis ducimus repudiandae ad at iure adipisci est, soluta sapiente tempora porro. Iusto hic repudiandae et iure doloremque fuga voluptas eum voluptatem molestiae, dicta maxime facere, quidem aperiam, iste commodi. Consequuntur magni iste repellat maiores provident eos explicabo excepturi neque deserunt! Vero totam expedita error, quam libero eius voluptates, incidunt voluptatibus voluptatem magnam ullam accusamus voluptate ipsam? Illo nemo dignissimos fugit qui ratione facere dicta minima, atque, repellat laudantium, sed mollitia. Laboriosam qui voluptas veritatis dolor repellendus quisquam reiciendis, dolorem expedita! Dolorum, excepturi sit!</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='purple-bg container rounded shadow my-3 my-md-5 py-3 py-md-5 px-3 px-md-5'>
            <div className="w-100">
                <h3 className='mb-4'>Region in which we operate</h3>
                <div className="flex">
                    <RegionMap/>
                </div>
            </div>
        </div>

        <div className='purple-bg container rounded shadow my-3 my-md-5 py-3 py-md-5 px-2 px-md-5'>
            <h3>Our Team</h3>
            <div className="row w-100 m-0 mt-4">
                <div className="flex flex-column col-12 col-md-4">
                    <div className='team-img'>
                        <img className='rounded-circle' src={vedantDP} height={200} width={200} alt='vedant'/>
                        <div className="yellow-bg"></div>
                    </div>
                    VEDANT SARNOBAT<br/>1911117
                </div>
                <div className="flex flex-column col-12 col-md-4">
                    <div className='team-img'>
                        <img className='rounded-circle' src={omkarDP} height={200} width={200} alt='omkar'/>
                        <div className="yellow-bg"></div>
                    </div>
                    OMKAR SAWANT<br/>1911118
                </div>
                <div className="flex flex-column col-12 col-md-4">
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