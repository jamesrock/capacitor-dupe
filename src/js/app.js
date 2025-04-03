import { data } from './data';
import { shuffle, createNode } from './utils';

const 
symbols = 'letters',
cards = 'order7',
rotations = [0, 90, 270];

const getRotation = () => rotations[Math.floor(Math.random() * rotations.length)];
const getCard = () => data.cards[cards].splice(Math.floor(Math.random() * data.cards[cards].length), 1)[0];

const gridNode = createNode('div', 'grid');

const createBlock = () => {

	const blocksNode = createNode('div', 'blocks');
	const numbers = shuffle([...getCard(), ...getCard()]);
	const letters = numbers.map((number) => {
		return data.symbols[symbols][cards][number];
	});

	blocksNode.style.transform = `rotate(${getRotation()}deg)`;

	letters.forEach((letter) => {
		const blockNode = createNode('div', 'block');
		const rotatekNode = createNode('span', 'block-value');
		blockNode.setAttribute('data-value', letter);
		rotatekNode.innerHTML = letter;
		rotatekNode.style.transform = `rotate(${getRotation()}deg)`;
		blockNode.appendChild(rotatekNode);
		blocksNode.appendChild(blockNode);
	});

	gridNode.prepend(blocksNode);

	console.log(numbers);
	console.log(letters);

};

let selected;

gridNode.addEventListener('click', (e) => {
	
	const value = e.target.getAttribute('data-value');
	
	if(!value) {
		return;
	};
	
	if(selected) {
		if(selected === e.target) {
			selected.classList.remove('selected');
			selected = null;
		}
		else if(e.target.getAttribute('data-value') === selected.getAttribute('data-value')) {
			e.target.classList.add('matched');
			selected.classList.add('matched');
			const parent = selected.parentNode;
			createBlock();
			setTimeout(() => {
				parent.classList.add('hidden');
			}, 1000);
			selected = null;
		};
	}
	else {
		selected = e.target;
		selected.classList.add('selected');
	};
	
});

// createBlock();
// createBlock();
// createBlock();
// createBlock();
// createBlock();
// createBlock();
// createBlock();
// createBlock();
createBlock();

console.log('cards', data.cards[cards]);
console.log('symbols', data.symbols[symbols][cards]);

document.body.appendChild(gridNode);
