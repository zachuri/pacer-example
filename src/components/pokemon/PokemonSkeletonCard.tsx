import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PokemonSkeletonCard() {
	return (
		<Card className='overflow-hidden w-[300px] h-[468px]'>
			<CardHeader className='p-0'>
				<Skeleton className='h-48 w-full' />
			</CardHeader>
			<CardContent className='p-4'>
				<Skeleton className='h-4 w-3/4 mb-2' />
				<Skeleton className='h-4 w-1/2 mb-4' />
				<div className='grid grid-cols-2 gap-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
				</div>
			</CardContent>
		</Card>
	);
}
