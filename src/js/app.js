import '/css/app.css';
import { data } from './data';
import { 
	shuffle, 
	createNode, 
	getRandom, 
	pluckRandom,
	randomIndex
} from '@jamesrock/rockjs';

const 
symbols = 'letters',
cards = 'order11',
sizes = [40, 50, 60],
origins = [-2, 0, 2],
colors = {
	'yellow': 'gold',
	'red': 'rgb(237, 0, 73)',
	'green': 'limegreen',
	'purple': 'rgb(177, 49, 237)',
	'blue': 'rgb(0, 111, 222)',
	'orange': 'rgb(255, 125, 0)',
	'cyan': '#00E0FF'
};

let 
selected = [],
active = null;

const getRandomRotation = () => Math.floor(Math.random() * 360);
const getRandomCard = () => shuffle(getRandom(data.cards[cards]));
const getRandomSize = () => getRandom(sizes);
const getRandomOrigin = () => getRandom(origins);
const getRandomSymbolIndex = () => randomIndex(data.symbols[symbols]);
const gridNode = createNode('div', 'grid');
const container = createNode('div', 'container');

const createBlocks = () => {

	const colorOptions = Object.keys(colors).map((id) => colors[id]);
	const blocksNode = createNode('div', 'blocks');
	const numbers = shuffle(shuffle([...getRandomCard(), ...getRandomCard()]));

	let filler = getRandomSymbolIndex();
	while(numbers.includes(filler)) {
		filler = getRandomSymbolIndex();
	};
	numbers.push(filler);

	const letters = numbers.map((number) => {
		return data.symbols[symbols][number];
	});

	[1, 2, 3, 4].forEach((key) => {
		blocksNode.style.setProperty(`--color-${key}`, pluckRandom(colorOptions));
	});

	letters.forEach((letter) => {
		const blockNode = createNode('div', 'block');
		const rotateNode = createNode('span', 'block-value');
		blockNode.setAttribute('data-value', `${letter[0]}${letter[1]}`);
		blockNode.setAttribute('data-color', letter[1]);
		rotateNode.innerHTML = letter[0];
		rotateNode.style.transformOrigin = `calc(50% + ${getRandomOrigin()}px) calc(50% + ${getRandomOrigin()}px)`;
		rotateNode.style.transform = `rotate(${getRandomRotation()}deg)`;
		blockNode.style.fontSize = `${getRandomSize()}px`;
		blockNode.append(rotateNode);
		blocksNode.append(blockNode);
	});

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
