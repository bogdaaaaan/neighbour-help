import type { Category } from '@/types/common';

import CategoryButton from '@/components/Buttons/CategoryButton';
import { StarIcon } from 'lucide-react';

interface CategoryFilterProps {
	categories: Category[];
	activeCategory: string | null;
	onCategoryChange: (_categoryId: string | null) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
	const mainCategory: Category = {
		id: null,
		label: 'All Categories',
		icon: StarIcon
	};

	return (
		<div className='flex flex-wrap gap-3'>
			<CategoryButton category={mainCategory} activeCategory={activeCategory} onClick={() => onCategoryChange(null)} />

			{categories.map(category => {
				return (
					<CategoryButton key={category.id} category={category} activeCategory={activeCategory} onClick={onCategoryChange} />
				);
			})}
		</div>
	);
};

export default CategoryFilter;