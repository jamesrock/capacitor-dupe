import { data } from './data';
import { shuffle, createNode } from './utils';

const 
symbols = 'letters',
cards = 'order11',
rotations = [0, 90, 270];

let targetNodes = null;

const getRandomRotation = () => rotations[Math.floor(Math.random() * rotations.length)];
const getRandomBlockRotation = () => Math.floor(Math.random() * 360);
// const getCard = () => shuffle(data.cards[cards].splice(Math.floor(Math.random() * data.cards[cards].length), 1)[0]);
const getCard = () => shuffle(data.cards[cards][Math.floor(Math.random() * data.cards[cards].length)]);
const highlightRandomBlocks = () => {

	// const blocks = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	// const spliceCount = Math.floor(Math.random() * (2 - 1 + 1) + 1);
	const blocksToHighlight = [0];
	console.log(blocksToHighlight);

	targetNodes = blocksToHighlight.map((id) => {
		return document.querySelector(`[data-id="${id}"]`);
	});

	console.log(targetNodes);
	
	// document.querySelectorAll(`.container`).forEach((container) => {
	// 	container.classList.remove('focus');
	// });

	// targetNodes.forEach((node) => {
	// 	node.classList.add('focus');
	// });

	document.querySelectorAll(`.blocks.completed`).forEach((blocksNode) => {
		blocksNode.parentNode.removeChild(blocksNode);
	});

};

const gridNode = createNode('div', 'grid');

const createBlock = () => {

	const blocksNode = createNode('div', 'blocks');
	const numbers = shuffle([...getCard(), ...getCard()]);
	const letters = numbers.map((number) => {
		return data.symbols[symbols][cards][number];
	});

	blocksNode.style.transform = `rotate(${getRandomRotation()}deg)`;

	letters.forEach((letter) => {
		const blockNode = createNode('div', 'block');
		const rotatekNode = createNode('span', 'block-value');
		blockNode.setAttribute('data-value', letter[0]);
		blockNode.setAttribute('data-shape', letter[1]);
		rotatekNode.innerHTML = letter[0];
		rotatekNode.style.transform = `rotate(${getRandomBlockRotation()}deg)`;
		// rotatekNode.style.transform = `rotate(${letter[1]*90}deg)`;
		blockNode.append(rotatekNode);
		blocksNode.append(blockNode);
	});

	// console.log('createBlock');
	// console.log(numbers);
	// console.log(letters);

	return blocksNode;

};

let selected;
let count = 0;

gridNode.addEventListener('click', (e) => {
	
	const value = e.target.getAttribute('data-value');
	
	if(!value) {
		return;
	};
	
	if(selected) {
		if(selected === e.target) {
			// unselect
			selected.classList.remove('selected');
			selected = null;
			count --;
		}
		else if(e.target.getAttribute('data-value') === selected.getAttribute('data-value')) {

			count ++;
			
			e.target.classList.add('selected');
			// selected.classList.add('matched');
			
			if(count === targetNodes.length || targetNodes.length === 1 && count === 2) {

				targetNodes.forEach((node) => {
					node.prepend(createBlock());
				});

				setTimeout(() => {

					targetNodes.forEach((node) => {
						node.querySelector('.blocks:last-child').classList.add('completed');
					});

					setTimeout(() => {
						highlightRandomBlocks();
					}, 250);

				}, 500);

				selected = null;
				count = 0;

			};

		};
	}
	else {
		selected = e.target;
		selected.classList.add('selected');
		count ++;
	};

	console.log('count', count);
	
});

console.log('cards', data.cards[cards]);
console.log('symbols', data.symbols[symbols][cards]);

const levels = 1;

for(var i=0;i<levels;i++) {
	const container = createNode('div', 'container');
	container.setAttribute('data-id', i);
	container.append(createBlock());
	gridNode.append(container);
};

document.body.append(gridNode);

highlightRandomBlocks();

console.log(data);