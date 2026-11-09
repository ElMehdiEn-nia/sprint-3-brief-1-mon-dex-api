import { creatures } from "./data.js";
let teamCount = 0;
const MAX_TEAM = 6; 
function Afficher(Array) {
    const section = document.getElementById("grid");
    Array.forEach((pokemon) => {
        section.innerHTML += `
        <article data-id="${pokemon.id}" class="pokemon-card flex flex-col gap-3 rounded-card bg-white p-3 pb-4">
          <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
            
            <span class="absolute left-3 top-2 font-mono text-sm">${pokemon.id}</span>
            <img class="col-span-1 " src="${pokemon.image}"/>
          </div>
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-display text-xl font-semibold">${pokemon.name}</h3>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">${pokemon.type}</span>
          </div>
          <p class="text-sm text-black">${pokemon.level} · Total 470</p>
          <button type="button" class="btn-outline add-team-btn">Ajouter à l'équipe</button>
        </article>`;
    });
}
Afficher(creatures);

const teamCounterEl = document.getElementById('team-counter');
const searchInput = document.getElementById('search');
const lesBoutons = document.querySelectorAll("#filters button");
const cards = document.querySelectorAll('.pokemon-card');


function AfficherDétails(pokemon){
    const Section = document.getElementById("detail");
    Section.innerHTML = `
    <div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">${pokemon.id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="btn-outline w-11 px-0">✕</button>
          </div>
          <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
            <img class="col-span-1 " src="${pokemon.image}" alt="${pokemon.name}"/>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold">${pokemon.name}</h2>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold">${pokemon.type}</span>
          </div>
          <p class="text-gray-700">${pokemon.type}</p>
          <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">PV</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" style="width:${pokemon.stats.hp}%;"></span></span><span class="text-right font-mono"></span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" style="width:${pokemon.stats.attack}%;"></span></span><span class="text-right font-mono"></span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" style="width:${pokemon.stats.defence}%;"></span></span><span class="text-right font-mono"></span></div>
          </div>
          <button type="button" class="btn-primary">Ajouter à l'équipe</button>`;
}


cards.forEach((card) => {

    card.addEventListener('click', () => {
        const id = card.getAttribute("data-id");
        const pokemon = creatures.find(p => p.id === id);
        if (!pokemon) return;
        AfficherDétails(pokemon);

    });
})




document.querySelectorAll('.add-team-btn').forEach(button => {
    button.addEventListener('click', () => {
        AfficherDétails(creatures);
        if (teamCount < MAX_TEAM) {
            teamCount++;
            teamCounterEl.textContent = teamCount;
            button.textContent = 'Le Pokemon est ajouté !';
            button.classList.remove('bg-gray-900', 'hover:bg-gray-800');
            button.classList.add('bg-green-600', 'cursor-not-allowed');
            button.disabled = true;
        } else {
            alert("Votre équipe est complète (6 créatures max) !");
        }
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedType = btn.getAttribute('data-type');
        filterBtns.forEach(b => {
            b.classList.remove('bg-red-600', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-700');
        });
        btn.classList.remove('bg-gray-200', 'text-gray-700');
        btn.classList.add('bg-red-600', 'text-white');


        cards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            if (selectedType === 'tous' || cardType === selectedType) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

searchInput.addEventListener("input", (e) => {
  const texte = e.target.value.toLowerCase().trim();
  const cartesTrouvees = creatures.filter(c => c.name.toLowerCase().includes(texte));
  renderGrid(cartesTrouvees);})

lesBoutons.forEach(bouton => {
  bouton.addEventListener("click", (e) => {
  const typeChoisi = e.target.textContent.trim();
  const cartesFiltrees=creatures.filter(c =>c.type.toUpperCase()===typeChoisi);
    renderGrid(cartesFiltrees);
    })})