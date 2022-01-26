import { Image } from './Image';
import config from '../config.json';

function ProfilePicture ({ img = "" }) {
    return (
        <>
            <section className='profile-picture'>
                {img && (<Image src={img} />)}
                <div></div>
            </section>
            <style jsx>{`

                section {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    background: transparent linear-gradient(
                        180deg, ${config.theme.colors.primary.green} 0%, ${config.theme.colors.primary.blue600} 100%) 0% 0% no-repeat padding-box;
                    box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
                    backdrop-filter: blur( 10px );
                    -webkit-backdrop-filter: blur( 10px );
                    border-radius: 50%;
                    height: 150px;
                    width: 150px;
                    margin: 20px 0;
                }

                section :global(img) {
                    border-radius: 50%;
                    height: 130px;
                    width: 130px;
                }
            `}</style>
        </>
    );
}

export { ProfilePicture }
