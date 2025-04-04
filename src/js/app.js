import { data } from './data';
import { shuffle, createNode } from './utils';

const 
symbols = 'letters',
cards = 'order11',
sizes = [40, 50, 60];

let 
selected = [],
active = null;

const getRandomIndex = (target) => Math.floor(Math.random() * target.length);
const getRandom = (target) => target[getRandomIndex(target)];
const getRandomRotation = () => Math.floor(Math.random() * 360);
const getRandomCard = () => shuffle(getRandom(data.cards[cards]));
const getRandomSize = () => getRandom(sizes);
const getRandomSymbolIndex = () => getRandomIndex(data.symbols[symbols][cards]);

const gridNode = createNode('div', 'grid');
const container = createNode('div', 'container');

const createBlocks = () => {

	const blocksNode = createNode('div', 'blocks');
	const numbers = shuffle([...getRandomCard(), ...getRandomCard()]);
	let filler = getRandomSymbolIndex();
	while(numbers.includes(filler)) {
		console.log('match!');
		filler = getRandomSymbolIndex();
	};
	numbers.push(filler);
	const letters = numbers.map((number) => {
		return data.symbols[symbols][cards][number];
	});

	console.log('filler', filler);

	// blocksNode.style.transform = `rotate(${getRandomRotation()}deg)`;

	letters.forEach((letter, i) => {
		const blockNode = createNode('div', 'block');
		const rotateNode = createNode('span', 'block-value');
		blockNode.setAttribute('data-value', `${letter[0]}${letter[1]}`);
		blockNode.setAttribute('data-color', letter[1]);
		// blockNode.setAttribute('data-index', i);
		rotateNode.innerHTML = letter[0];
		rotateNode.style.transform = `rotate(${getRandomRotation()}deg)`;
		blockNode.style.fontSize = `${getRandomSize()}px`;
		blockNode.append(rotateNode);
		blocksNode.append(blockNode);
	});

	// console.log('createBlocks');
	// console.log(numbers);
	// console.log(letters);

	return blocksNode;

};

const deselect = () => {
	selected.forEach((item) => {
		item.classList.remove('selected');
	});
	selected = [];
};

gridNode.addEventListener('click', (e) => {
	
	const value = e.target.getAttribute('data-value');
	
	if(!value) {
		return;
	};
	
	if(selected.includes(e.target)) {
		e.target.classList.remove('selected');
		selected.splice(selected.indexOf(e.target), 1);
	}
	else {
		e.target.classList.add('selected');
		selected.push(e.target);
	};

	if(selected.length === 2) {

		if(selected[0].getAttribute('data-value') === selected[1].getAttribute('data-value')) {

			const newBlocks = createBlocks();
			
			container.prepend(newBlocks);

			setTimeout(() => {

				active.classList.add('completed');

				setTimeout(() => {
					active.parentNode.removeChild(active);
					active = newBlocks;
				}, 250);

			}, 500);

			selected = [];

		}
		else {

			setTimeout(() => {
				deselect();
			}, 250);

		};

	};
	
});

document.addEventListener('click', (e) => {
	if(!e.target.getAttribute('data-value')) {
		deselect();
	};
});

active = createBlocks();
container.append(active);
gridNode.append(container);

document.body.append(gridNode);

// console.log('cards', data.cards[cards]);
// console.log('symbols', data.symbols[symbols][cards]);