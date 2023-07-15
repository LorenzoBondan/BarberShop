import './styles.css';

const AboutUs = () => {
    return(
        <div className='about-us-container'>
            <div className='about-us-content-container'>
                <h4>About Us</h4>
                <span className='separator'></span>
                <p>More than just a barbershop, here you are at home.<br />Don Manera Barbiere offers the best products, quality services, and exceptional customer care in a comfortable and cozy environment, so you can feel completely at ease. We want you to feel like you're among friends here, not just coming to get a haircut or a shave. Stop by, have a chat, listen to some music, enjoy a cold beer. Bring along other friends and take advantage of this unique experience that only we can provide.</p>
            </div>
            <div className='about-us-image-container'>
                <img src="https://donmanera.com.br/site/wp-content/uploads/2021/08/barbearia.jpg" alt="" />
            </div>
        </div>
    );
}

export default AboutUs;