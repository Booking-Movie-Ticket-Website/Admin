import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonItem() {
    return (
        <SkeletonTheme baseColor="#242531" highlightColor="#8d7cdd1a">
            {Array(4)
                .fill(null)
                .map((_, index) => (
                    <li key={index} className="w-[calc((100%-72px)/4)] shadow-sm">
                        <div className="group overflow-hidden rounded-xl aspect-square">
                            <Skeleton borderRadius={12} className="w-full h-full" />
                        </div>
                        <div className="pt-2">
                            <Skeleton className="text-lg w-full" />
                            <Skeleton className="text-sm w-full" />
                        </div>
                    </li>
                ))}
        </SkeletonTheme>
    );
}

export default SkeletonItem;
