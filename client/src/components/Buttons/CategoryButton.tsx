import type { Category } from '@/types/common';

interface CategoryButtonProps {
	category: Category;
	activeCategory: string | null;
	onClick: (_categoryId: string | null) => void;
}

const CategoryButton = ({ category, activeCategory, onClick }: CategoryButtonProps) => {
	const Icon = category.icon;

	return (
		<button
			onClick={() => onClick(category.id)}
			className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer border ${
				activeCategory === category.id
					? 'bg-teal-600 text-white shadow-sm'
					: 'bg-white text-slate-600 '
			}`}
		>
			<Icon className='w-4 h-4' />
			<span>{category.label}</span>
		</button>
	);
};

export default CategoryButton;