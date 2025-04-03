import { data } from './data';
import { shuffle, createNode } from './utils';

const 
symbols = 'letters',
cards = 'order7',
rotations = [0, 90, 270];

const getRotation = () => rotations[Math.floor(Math.random() * rotations.length)];
const getCard = () => shuffle(data.cards[cards].splice(Math.floor(Math.random() * data.cards[cards].length), 1)[0]);

const gridNode = createNode('div', 'grid');
const levelsNode = createNode('div', 'levels');

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
		blockNode.append(rotatekNode);
		blocksNode.append(blockNode);
	});

	// console.log('createBlock');
	// console.log(numbers);
	// console.log(letters);

	return blocksNode;

};

let selected;

levelsNode.addEventListener('click', (e) => {
	
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
			// gridNode.prepend(createBlock());
			setTimeout(() => {
				parent.classList.add('completed');
			}, 500);
			selected = null;
		};
	}
	else {
		selected = e.target;
		selected.classList.add('selected');
	};
	
});

console.log('cards', data.cards[cards]);
console.log('symbols', data.symbols[symbols][cards]);

// gridNode.prepend(createBlock());

const levels = 7;
let blockCount = 1;

for(var i=0;i<levels;i++) {
	const levelNode = createNode('div', 'level');
	for(var c=0;c<blockCount;c++) {
		levelNode.append(createBlock());
	};
	levelsNode.append(levelNode);
	blockCount += 1;
};

document.body.append(levelsNode);
// document.body.append(gridNode);
