import './index.css';
import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const date = new Date();

	const [value, setValue] = useState('');
	const [list, setlist] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueVaild] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите новое значение');
		setValue(promptValue.trim());
			

		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueVaild(isValueVaild);
		} else {
			setIsValueVaild(!isValueVaild);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			const updatedList = [
				...list,
				{
					id: Date.now(),
					value: value,
					data: date.toLocaleString().replace(',', ' '),
				},
			];
			setlist(updatedList);
			setIsValueVaild(!isValueVaild);
		}
		else{
			setIsValueVaild(!isValueVaild);
		}
		
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>:&quot;{value}&quot;
				<output className={styles['current-value']}></output>
			</p>
			{error && (
				<div className={styles.error}>
					{error}
				</div>
			)}

			<div className={styles['buttons-container']}>
				<button onClick={onInputButtonClick} className={styles['button']}>
					Ввести новое
				</button>

				<button
					onClick={onAddButtonClick}
					className={styles['button']}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length == 0 && (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>
					{list.map((item) => (
						<li className={styles['list-item']} key={item.id}>
							Значение = {item.value} , {item.data}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
