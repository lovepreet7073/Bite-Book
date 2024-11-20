import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecipeCardSkeleton = () => {
    return (
        <div className='hero-title productCard hover:cursor-pointer w-[17rem]'>
            <div className="mb-4 flex flex-col gap-2">
                <div className='lg:h-[15rem] h-[13rem]'>
                    <Skeleton height="100%" />
                </div>
                <div className='px-1 textpart bg-white'>
                    <h3 className='font-bold text-xs text-neutral-400 tracking-wider mt-1'>
                        <Skeleton width="60%" />
                    </h3>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        <Skeleton width="80%" />
                    </h5>
                </div>
                <div className='p-0 flex items-center gap-1'>
                    <Skeleton  width="80%" />
                    <p className='text-sm text-slate-500'>
                        <Skeleton width="40%" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecipeCardSkeleton;
