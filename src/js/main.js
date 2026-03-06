import { projects } from "./projectList.js";

const fadeEls = document.querySelectorAll('.fade-in');
const revealObs = new IntersectionObserver(entries => {
	entries.forEach((e, i) => {
		if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 60);
	});
}, { threshold: 0.08 });
fadeEls.forEach(el => revealObs.observe(el));

const overlay = document.getElementById('modalOverlay');
const modal   = document.getElementById('modal');
const closeBtn = document.getElementById('modalClose');

function openModal(idx) {
	const p = projects[idx];
	document.getElementById('modalCategory').textContent = p.category;
	document.getElementById('modalTitle').textContent = p.title;
	document.getElementById('modalThumbImg').setAttribute('src', p.thumb);
	document.getElementById('modalPeriod').textContent = p.period;
	document.getElementById('modalRole').textContent = p.role;
	document.getElementById('modalClient').textContent = p.client;
	document.getElementById('modalOverview').textContent = p.overview;

	const taskList = document.getElementById('modalTasks');
	taskList.innerHTML = '';
	p.tasks.forEach(t => {
		const li = document.createElement('li');
		li.textContent = t;
		taskList.appendChild(li);
	});

	const urlList = document.getElementById('modalUrls');
	p.siteUrl.forEach(t => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.classList.add('btn-link')
		a.textContent = t[0]
		a.setAttribute('href', t[1]);
		a.setAttribute('target', '_blank');
		li.append(a);
		urlList.appendChild(li);
	});
	
	const tagRow = document.getElementById('modalTags');
	tagRow.innerHTML = '';
	p.tags.forEach(t => {
		const span = document.createElement('span');
		span.className = 'modal-tag';
		span.textContent = t;
		tagRow.appendChild(span);
	});

	modal.scrollTop = 0;
	overlay.classList.add('open');
	document.body.style.overflow = 'hidden';
	closeBtn.focus();
}

function closeModal() {
	overlay.classList.remove('open');
	document.body.style.overflow = '';
}

document.querySelectorAll('.project-item').forEach(item => {
	item.addEventListener('click', () => openModal(+item.dataset.project));
	item.addEventListener('keydown', e => {
		if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+item.dataset.project); }
	});
});

closeBtn.addEventListener('click', closeModal);