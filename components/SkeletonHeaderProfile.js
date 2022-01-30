import { Skeleton } from './Skeleton';

function SkeletonHeaderProfile () {
    return (
        <>
            <div className='skeleton'>
                <Skeleton isCircle height="50px" width="50px" />
                <div>
                    <Skeleton borderRadius="10px" height="15px" />
                    <Skeleton borderRadius="10px" height="15px" width="70%" />
                </div>
            </div>
            <style jsx>{`
                .skeleton {
                    align-items: center;
                    display: flex;
                    padding: 24px 12px;
                    gap: 8px;
                }

                .skeleton div {
                    width: 100%;
                }
            `}</style>
        </>
    );
}

export { SkeletonHeaderProfile }
